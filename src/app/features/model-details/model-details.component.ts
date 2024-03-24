import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Subscription,
  catchError,
  flatMap,
  map,
  mergeMap,
  switchMap,
} from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { FileMetaDto } from 'src/app/shared/dto/file-meta.dto';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CheckoutService } from 'src/app/shared/services/checkout.service';
import { Model3dService } from 'src/app/shared/services/model3d.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-model-details',
  templateUrl: './model-details.component.html',
  styleUrls: ['./model-details.component.css'],
})
export class ModelDetailsComponent implements OnInit, OnDestroy {
  public id!: string;
  public modelUrl!: string;
  private apiUrl = environment.apiUrl;

  public availableFiles: Array<FileMetaDto> = [];

  private authSubscription!: Subscription;
  private isLoggedIn = false;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly model3dService: Model3dService,
    private readonly checkoutService: CheckoutService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.modelUrl = `${this.apiUrl}models/preview/${this.id}/file`;

    this.authSubscription = this.authService.isLoggedIn$.subscribe(
      (value) => (this.isLoggedIn = value)
    );

    this.model3dService.getAvailableExtOf(this.id).subscribe((value) => {
      this.availableFiles = value;
    });
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  onFileDownload(fileExt: string) {
    // if (!this.isLoggedIn) return;

    

    this.model3dService
      .getModel3d(this.id)
      .pipe(
        mergeMap((model) =>
          this.model3dService
            .downloadFile(this.id, fileExt)
            .pipe(map((blob) => ({ meta: model, blob })))
        )
      )
      .subscribe(
        ({ meta, blob }) => {
          const fileName = `${meta.name}.${fileExt}`;

          saveAs(blob, fileName);
        },
        (err) => {
          if (err.status == 400) {
            this.checkoutService.createCheckoutSession(this.id).subscribe(
              ({ url }) => {
                location.href = url;
              },
              (err) => console.error(err)
            );
          }
        }
      );
  }
}

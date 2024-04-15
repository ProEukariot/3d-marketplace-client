import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Observable,
  Subscription,
  catchError,
  flatMap,
  map,
  mergeMap,
  switchMap,
  tap,
} from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { FileMetaDto } from 'src/app/shared/dto/file-meta.dto';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CheckoutService } from 'src/app/shared/services/checkout.service';
import { Model3dService } from 'src/app/shared/services/model3d.service';
import { saveAs } from 'file-saver';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { Model3d } from 'src/app/shared/models/model3d';

@Component({
  selector: 'app-model-details',
  templateUrl: './model-details.component.html',
  styleUrls: ['./model-details.component.css'],
})
export class ModelDetailsComponent implements OnInit {
  public modelId!: string;
  public modelUrl!: string;
  public model3d$!: Observable<Model3d>;

  // public availableFiles: Array<FileMetaDto> = [];

  public isLoggedIn$!: Observable<boolean>;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly notificationService: NotificationService,
    private readonly model3dService: Model3dService,
    private readonly checkoutService: CheckoutService
  ) {}

  ngOnInit(): void {
    // this.modelId = this.route.snapshot.params['id'];
    this.modelUrl = 'assets/NeilArmstrong.glb';
    // this.modelUrl = 'XXX';

    this.isLoggedIn$ = this.authService.isLoggedIn$;

    this.model3d$ = this.route.data.pipe(map(({ model }) => model));

    // this.model3d$ = this.model3dService
    //   .get3dModel(this.modelId)
    //   .pipe(tap((o) => console.log(o)));

    // this.model3dService.getAvailableExtOf(this.id).subscribe((value) => {
    //   this.availableFiles = value;
    // });
  }

  onLoadError(err: unknown) {
    this.notificationService.showNotification('Cannot load the model', 'error');
  }

  onFileDownload(id: string) {
    console.log('DOWNLOAD FILE', id);

    // redirect to file url in storage
    // ...

    // if url is null

    
  }

  // onFileDownload(fileExt: string) {
  //   // if (!this.isLoggedIn) return;

  //   this.model3dService
  //     .getModel3d(this.id)
  //     .pipe(
  //       mergeMap((model) =>
  //         this.model3dService
  //           .downloadFile(this.id, fileExt)
  //           .pipe(map((blob) => ({ meta: model, blob })))
  //       )
  //     )
  //     .subscribe(
  //       ({ meta, blob }) => {
  //         const fileName = `${meta.name}.${fileExt}`;

  //         saveAs(blob, fileName);
  //       },
  //       (err) => {
  //         if (err.status == 400) {
  //           this.checkoutService.createCheckoutSession(this.id).subscribe(
  //             ({ url }) => {
  //               location.href = url;
  //             },
  //             (err) => console.error(err)
  //           );
  //         }
  //       }
  //     );
  // }
}

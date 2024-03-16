import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { FileMetaDto } from 'src/app/shared/dto/file-meta.dto';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Model3dService } from 'src/app/shared/services/model3d.service';

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
  public isLoggedIn = false;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly authService: AuthService,
    private readonly model3dService: Model3dService
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
    if (!this.isLoggedIn) return;

    
  }
}

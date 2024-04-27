import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  EMPTY,
  Observable,
  Subscription,
  catchError,
  filter,
  finalize,
  flatMap,
  fromEvent,
  map,
  mergeMap,
  of,
  switchMap,
  take,
  takeWhile,
  tap,
} from 'rxjs';
import { File } from 'src/app/shared/models/file';
import { environment } from 'src/app/environments/environment';
import { FileMetaDto } from 'src/app/shared/dto/file-meta.dto';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CheckoutService } from 'src/app/shared/services/checkout.service';
import { Model3dService } from 'src/app/shared/services/model3d.service';
import { saveAs } from 'file-saver';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { Model3d } from 'src/app/shared/models/model3d';
import { Viewer3dComponent } from 'src/app/shared/components/viewer3d/viewer3d.component';
import { LoaderService } from 'src/app/shared/services/loader.service';

@Component({
  selector: 'app-model-details',
  templateUrl: './model-details.component.html',
  styleUrls: ['./model-details.component.css'],
})
export class ModelDetailsComponent implements OnInit {
  // public modelId!: string;
  public blobUrl$!: Observable<string>;
  public canvasDimensions!: { x: number; y: number };
  public model3d$!: Observable<Model3d>;

  // public availableFiles: Array<FileMetaDto> = [];

  public isLoggedIn$!: Observable<boolean>;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly notificationService: NotificationService,
    private readonly model3dService: Model3dService,
    private readonly checkoutService: CheckoutService,
    private readonly loader: LoaderService
  ) {}

  ngOnInit(): void {
    const modelId = this.route.snapshot.params['id'];
    this.blobUrl$ = this.model3dService.getModelPublicBlobUrl(modelId);
    // this.modelUrl = 'XXX';

    this.isLoggedIn$ = this.authService.isLoggedIn$;

    this.model3d$ = this.route.data.pipe(map(({ model }) => model));

    this.canvasDimensions = { x: window.innerWidth, y: window.innerHeight };

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

  onFileDownload(file: File) {
    // redirect to file url in storage
    // ...

    this.model3d$
      .pipe(
        tap((_) => {
          this.loader.show();
        }),
        mergeMap((model3d) =>
          this.model3dService.getModelPrivateBlobUrl(model3d.id, file.id).pipe(
            mergeMap((url) => {
              if (url) {
                return this.model3dService.getBlobFromUrl(url).pipe(
                  tap((blob) => saveAs(blob, file.name)),
                  finalize(() => {
                    this.loader.hide();
                  }),
                  catchError((err) => {
                    console.error(err);
                    return EMPTY;
                  })
                );
              } else {
                return this.checkoutService
                  .createCheckoutSession(model3d.id)
                  .pipe(
                    tap(({ url }) => {
                      location.href = url;
                      // console.log(url);
                    }),
                    catchError((err) => {
                      console.error(err);
                      return EMPTY;
                    })
                  );
              }
            })
          )
        ),
        catchError((err) => {
          console.error(err);
          return EMPTY;
        })
      )
      .subscribe();

    // this.model3d$
    //   .pipe(
    //     switchMap((model3d) =>
    //       this.model3dService.getModelPrivateBlobUrl(model3d.id, file.id).pipe(
    //         filter((url) => !!url),
    //         mergeMap((url) => this.model3dService.getBlobFromUrl(url))
    //       )
    //     )
    //   )
    //   .subscribe((blob) => saveAs(blob, file.name));

    // this.model3d$
    //   .pipe(
    //     switchMap((model3d) =>
    //       this.model3dService.getModelPrivateBlobUrl(model3d.id, file.id).pipe(
    //         filter((url) => !url),
    //         mergeMap((_) =>
    //           this.checkoutService.createCheckoutSession(model3d.id)
    //         )
    //       )
    //     )
    //   )
    //   .subscribe(({ url }) => {
    //     location.href = url;
    //     // console.log(url);
    //   });
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

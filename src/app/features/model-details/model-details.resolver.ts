import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { EMPTY, catchError, tap } from 'rxjs';
import { Model3d } from 'src/app/shared/models/model3d';
import { Model3dService } from 'src/app/shared/services/model3d.service';

export const modelDetailsResolver: ResolveFn<Model3d> = (route, state) => {
  const model3dService = inject(Model3dService);
  const router = inject(Router);

  return model3dService.get3dModel(route.params['id']).pipe(
    catchError(() => {
      router.navigate(['']);
      return EMPTY;
    })
  );
};

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserProfileComponent } from './user-profile/user-profile.component';
import { MaterialModule } from 'src/app/material/material.module';
import { RouterModule, Routes } from '@angular/router';
import { UploadModelComponent } from './upload-model/upload-model.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponentsModule } from '../shared/components/app-components.module';
import { ExploreComponent } from './explore/explore.component';
import { ModelDetailsComponent } from './model-details/model-details.component';
import { AppDirectivesModule } from '../shared/directives/app-directives.module';

const routes: Routes = [
  { path: 'profile', component: UserProfileComponent },
  { path: 'explore', component: ExploreComponent },
  { path: 'explore/:id', component: ModelDetailsComponent },
  { path: 'upload-model', component: UploadModelComponent },
];

@NgModule({
  declarations: [
    UserProfileComponent,
    UploadModelComponent,
    ExploreComponent,
    ModelDetailsComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    AppComponentsModule,
    AppDirectivesModule,
  ],
  exports: [RouterModule],
})
export class AppFeaturesModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserProfileComponent } from './user-profile/user-profile.component';
import { MaterialModule } from 'src/app/material/material.module';
import { RouterModule, Routes } from '@angular/router';
import { UploadModelComponent } from './upload-model/upload-model.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponentsModule } from '../shared/components/app-components.module';

const routes: Routes = [
  {
    path: 'profile',
    component: UserProfileComponent,
    children: [
      { path: '', redirectTo: 'user-settings', pathMatch: 'full' },
      { path: 'upload-model', component: UploadModelComponent },
      { path: 'user-settings', component: UserSettingsComponent },
    ],
  },
];

@NgModule({
  declarations: [
    UserProfileComponent,
    UploadModelComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    AppComponentsModule,
  ],
  exports: [RouterModule],
})
export class UserProfileModule {}

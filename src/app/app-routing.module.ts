import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './features/user-profile/user-profile.component';
import { UploadModelComponent } from './features/upload-model/upload-model.component';
import { UserSettingsComponent } from './features/user-settings/user-settings.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

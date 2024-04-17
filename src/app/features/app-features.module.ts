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
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { authGuard } from '../shared/guards/auth.guard';
import { modelDetailsResolver } from './model-details/model-details.resolver';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';
import { PaymentFailureComponent } from './payment-failure/payment-failure.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'profile',
    component: UserProfileComponent,
    canActivate: [authGuard],
  },
  {
    path: 'explore',
    children: [
      { path: '', component: ExploreComponent },
      {
        path: ':id',
        component: ModelDetailsComponent,
        resolve: { model: modelDetailsResolver },
      },
    ],
  },
  {
    path: 'upload-model',
    component: UploadModelComponent,
    canActivate: [authGuard],
  },
  {
    path: 'auth',
    children: [
      { path: 'signin', component: SigninComponent },
      { path: 'signup', component: SignupComponent },
    ],
  },
  {
    path: 'payment',
    children: [
      { path: 'success', component: PaymentSuccessComponent },
      { path: 'failure', component: PaymentFailureComponent },
    ],
  },
];

@NgModule({
  declarations: [
    UserProfileComponent,
    UploadModelComponent,
    ExploreComponent,
    ModelDetailsComponent,
    HomeComponent,
    SigninComponent,
    SignupComponent,
    PaymentSuccessComponent,
    PaymentFailureComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    AppComponentsModule,
    AppDirectivesModule,
  ],
  exports: [],
})
export class AppFeaturesModule {}

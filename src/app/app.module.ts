import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { UserProfileModule } from './features/user-profile.module';
import { LayoutModule } from './layout/layout.module';
import { UserSettingsComponent } from './features/user-settings/user-settings.component';
import { FileInputComponent } from './shared/components/file-input/file-input.component';

@NgModule({
  declarations: [AppComponent, FileInputComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    LayoutModule,
    UserProfileModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

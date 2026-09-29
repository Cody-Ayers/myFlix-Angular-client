import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { DirectorViewComponentComponent } from './director-view-component/director-view-component.component';
import { GenreViewComponentComponent } from './genre-view-component/genre-view-component.component';
import { UserProfileComponentComponent } from './user-profile-component/user-profile-component.component';
import { MovieDescriptionComponentComponent } from './movie-description-component/movie-description-component.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';

@NgModule({
  declarations: [
    /** @component AppComponent */
    AppComponent,
    /** @component UserRegistrationFormComponent */
    UserRegistrationFormComponent,
    /** @component UserLoginFormComponent */
    UserLoginFormComponent,
    /** @component MovieCardComponent */
    MovieCardComponent,
    /** @component WelcomePageComponent */
    WelcomePageComponent,
    /** @component DirectorViewComponentComponent */
    DirectorViewComponentComponent,
    /** @component GenreViewComponentComponent */
    GenreViewComponentComponent,
    /** @component UserProfileComponentComponent */
    UserProfileComponentComponent,
    /** @component MovieDescriptionComponentComponent */
    MovieDescriptionComponentComponent,
    /** @component NavigationBarComponent */
    NavigationBarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    MatTooltipModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

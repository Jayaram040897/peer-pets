import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PetsListComponent } from './pets-list/pets-list.component';
import { AddPetComponent } from './add-pet/add-pet.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MyPetsListComponent } from './my-pets-list/my-pets-list.component';
import { HeaderComponent } from './header/header.component';

import { AppHttpInterceptor } from './app-http.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PetsListComponent,
    AddPetComponent,
    LoginComponent,
    RegisterComponent,
    MyPetsListComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [HttpClient,{ provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }

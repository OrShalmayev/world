import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// pagination
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module


import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { FooterComponent } from './components/footer/footer.component';
import { CitiesComponent } from './components/cities/cities.component';

import { HttpClientModule } from '@angular/common/http';
import { CityService } from './services/city.service';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { CreateComponent } from './components/cities/components/create/create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Flash Messages
import { FlashMessagesModule } from 'angular2-flash-messages';

import { EditComponent } from './components/cities/components/edit/edit.component';
import { BackComponent } from './components/inc/back/back.component';
import { LoadingComponent } from './components/inc/loading/loading.component';

// Spinner
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CarouselComponent,
    FooterComponent,
    CitiesComponent,
    HomeComponent,
    PagenotfoundComponent,
    CreateComponent,
    EditComponent,
    BackComponent,
    LoadingComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    FlashMessagesModule.forRoot(),
    NgxSpinnerModule,
    BrowserAnimationsModule
  ],
  providers: [CityService],
  bootstrap: [AppComponent]
})
export class AppModule { }

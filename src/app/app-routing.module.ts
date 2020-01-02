import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CitiesComponent } from './components/cities/cities.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { CreateComponent } from './components/cities/components/create/create.component';
import { EditComponent } from './components/cities/components/edit/edit.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cities', component: CitiesComponent },
  { path: 'cities/create', component: CreateComponent },
  { path: 'cities/edit/:id', component: EditComponent },
  { path: '**', component: PagenotfoundComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
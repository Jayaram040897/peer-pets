import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPetComponent } from './add-pet/add-pet.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MyPetsListComponent } from './my-pets-list/my-pets-list.component';
import { PetsListComponent } from './pets-list/pets-list.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './login/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/pets-list', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'pets-list', component: PetsListComponent,canActivate:[AuthGuard] },
  { path: 'my-pets', component: MyPetsListComponent,canActivate:[AuthGuard] },
  { path: 'add-pet', component: AddPetComponent ,canActivate:[AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

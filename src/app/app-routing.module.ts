import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './components/form/form.component';
import { TestComponent } from './components/test/test.component';
import { VillesComponent } from './components/villes/villes.component';
import { EreurComponent } from './components/ereur/ereur.component';
import { ModifierFormComponent } from './components/modifier-form/modifier-form.component';
import { LoginComponent } from './components/login/login.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { VilleComponent } from './components/ville/ville.component';
import { VehiculeComponent } from './components/vehicule/vehicule.component';
import { ProduitComponent } from './components/produit/produit.component';
import { ProblemeComponent } from './components/probleme/probleme.component';
import { SolutionComponent } from './components/solution/solution.component';
import { UserComponent } from './components/user/user.component';
import { DashComponent } from './dash/dash.component';
import { ReferenceComponent } from './components/reference/reference.component';

const routes: Routes = [
  { path:'' ,component:LoginComponent},
  { path:'dashboard' ,component:DashComponent},
  { path:'acceuil' ,component:AdminHomeComponent},
  { path:'gestion/user' ,component:UserComponent},
  { path:'gestion/ville' ,component:VilleComponent},
  { path:'gestion/vehicule' ,component:VehiculeComponent},
  { path:'gestion/produit' ,component:ProduitComponent},
  { path:'gestion/probleme' ,component:ProblemeComponent},
  { path:'gestion/solution' ,component:SolutionComponent},
  { path:'gestion/ref' ,component:ReferenceComponent},
  { path:'home' ,component:FormComponent},
  { path:'ereur' ,component:EreurComponent},
  { path:'ville' ,component:VillesComponent},
  { path:'forms' ,component:TestComponent},
  { path:'mod/:form' ,component:ModifierFormComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

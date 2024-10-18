import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllergensComponent } from './pages/allergens.component';

const routes: Routes = [
  { path: '', component: AllergensComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllergensRoutingModule { }

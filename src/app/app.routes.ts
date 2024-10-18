import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./modules/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'signin',
    loadChildren: () =>
      import('./modules/signin/signin.module').then((m) => m.SigninModule),
  },
  {
    path: 'allergens',
    loadChildren: () =>
      import('./modules/allergens/allergens.module').then(
        (m) => m.AllergensModule
      ),
  },
  {
    path: 'diet',
    loadChildren: () =>
      import('./modules/diet/diet.module').then((m) => m.DietModule),
  },
];

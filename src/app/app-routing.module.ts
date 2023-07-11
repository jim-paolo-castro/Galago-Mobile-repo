import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login-option',
    pathMatch: 'full'
  },
  {
    path: 'login-option',
    loadChildren: () => import('./pages/login-option/login-option.module').then( m => m.LoginOptionPageModule)
  },
  {
    path: 'login-email',
    loadChildren: () => import('./pages/login-email/login-email.module').then( m => m.LoginEmailPageModule)
  },
  {
    path: 'login-password',
    loadChildren: () => import('./pages/login-password/login-password.module').then( m => m.LoginPasswordPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

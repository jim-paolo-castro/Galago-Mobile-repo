import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
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
  {
    path: 'email-confirmation',
    loadChildren: () => import('./pages/email-confirmation/email-confirmation.module').then( m => m.EmailConfirmationPageModule)
  },
  {
    path: 'create-account',
    loadChildren: () => import('./pages/create-account/create-account.module').then( m => m.CreateAccountPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },  {
    path: 'book-a-flight',
    loadChildren: () => import('./pages/flights/book-a-flight/book-a-flight.module').then( m => m.BookAFlightPageModule)
  },
  {
    path: 'flying-from-to',
    loadChildren: () => import('./pages/flights/flying-from-to/flying-from-to.module').then( m => m.FlyingFromToPageModule)
  },
  {
    path: 'select-dates',
    loadChildren: () => import('./pages/flights/select-dates/select-dates.module').then( m => m.SelectDatesPageModule)
  },
  {
    path: 'passengers-input',
    loadChildren: () => import('./pages/flights/passengers-input/passengers-input.module').then( m => m.PassengersInputPageModule)
  },
  {
    path: 'preferred-class',
    loadChildren: () => import('./pages/flights/preferred-class/preferred-class.module').then( m => m.PreferredClassPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

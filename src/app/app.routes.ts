import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then( m => m.HomePage)
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'create-player',
    loadComponent: () => import('./create-player/create-player.page').then( m => m.CreatePlayerPage)
  },  {
    path: 'game',
    loadComponent: () => import('./game/game.page').then( m => m.GamePage)
  },

];

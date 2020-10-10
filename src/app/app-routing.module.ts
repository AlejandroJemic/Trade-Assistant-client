import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'orders',
    loadChildren: () => import('./pages/orders/orders.module').then( m => m.OrdersPageModule)
  },  {
    path: 'pos',
    loadChildren: () => import('./pages/pos/pos.module').then( m => m.PosPageModule)
  },
  {
    path: 'mesages',
    loadChildren: () => import('./pages/mesages/mesages.module').then( m => m.MesagesPageModule)
  },
  {
    path: 'walet',
    loadChildren: () => import('./pages/walet/walet.module').then( m => m.WaletPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

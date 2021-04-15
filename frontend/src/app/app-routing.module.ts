import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CattlesComponent } from './cattles/cattles.component';
import { CustomersComponent } from './customers/customers.component';
import { LoginComponent } from './login/login.component';
import { OrdersComponent } from './orders/orders.component';
import { TablesComponent } from './tables/tables.component'

const routes: Routes = [
  {
    path: '',
    component: LoginComponent

  },
  {
    path: 'customers',
    component: CustomersComponent
  },
  {
    path: 'cattles',
    component: CattlesComponent,
  },
  {
    path: 'orders',
    component: OrdersComponent,
  },
  {
    path: 'tables',
    component: TablesComponent,
  },  
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

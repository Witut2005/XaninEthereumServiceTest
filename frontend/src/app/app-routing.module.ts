import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactComponent } from './transact/transact.component';
import { MenuItem } from 'primeng/api';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: 'transact', component: TransactComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: TransactComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

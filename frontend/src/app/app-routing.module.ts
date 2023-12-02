import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactComponent } from './transact/transact.component';

const routes: Routes = [{ path: 'transact', component: TransactComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

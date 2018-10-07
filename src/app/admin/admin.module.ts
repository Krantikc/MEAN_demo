import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import {AdminComponent} from './admin.component';
import {OnlyAdminUsersGuard} from './admin-user-guard';
import { SharedModule } from '../shared/shared.module'

@NgModule({
  declarations: [
    AdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ],
  providers: [
    OnlyAdminUsersGuard
  ]})
export class AdminModule {}

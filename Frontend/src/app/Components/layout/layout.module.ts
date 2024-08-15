
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { SharedModule } from 'app/Reusable/shared/shared.module';
import { ReportConversationsComponent } from './Pages/report-conversations/report-conversations/report-conversations.component';

@NgModule({
  declarations: [
    ReportConversationsComponent

  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    SharedModule

  ]
})
export class LayoutModule { }

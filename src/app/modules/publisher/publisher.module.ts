import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';
import { SharedModule } from '../shared/shared.module';
import { PublisherRoutingModule } from './publisher-routing.module';
import { PublisherLayoutComponent } from './pages/publisher-layout/publisher-layout.component';
import { LandingComponent } from './pages/landing/landing.component';

@NgModule({
  declarations: [PublisherLayoutComponent, LandingComponent],
  imports: [
    CommonModule,
    PublisherRoutingModule,
    TranslocoModule,
    SharedModule,
  ],
  providers: [],
})
export class PublisherModule {}

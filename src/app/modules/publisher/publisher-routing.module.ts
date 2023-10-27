import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublisherLayoutComponent } from './pages/publisher-layout/publisher-layout.component';
import { LandingComponent } from './pages/landing/landing.component';
import { RoleGuard } from 'src/app/core/guards/role.guard';

const routes: Routes = [
  {
    path: '',
    component: PublisherLayoutComponent,
    children: [
      {
        path: '',
        component: LandingComponent,
        canActivate: [RoleGuard],
        data: { roles: ['publisher'] },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublisherRoutingModule {}

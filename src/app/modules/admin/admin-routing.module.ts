import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePanelComponent } from './pages/home-panel/home-panel.component';
import { EBookComponent } from './pages/ebook/e-book.component';
import { OrderComponent } from './pages/order/order.component';
import { AddEventComponent } from './pages/add-event/add-event.component';
import { MassageComponent } from './pages/massage/massage.component';
import { AddCategoryComponent } from './pages/add-category/add-category.component';
import { LoginComponent } from './pages/login/login.component';
import { NewPublisherComponent } from './pages/new-publisher/new-publisher.component';
import { CatageryComponent } from './pages/Catagery/catagery.component';
import { AllElectronicBooksComponent } from './pages/all-electronic-books/all-electronic-books.component';
import { AllPaperBooksComponent } from './pages/all-paper-books/all-paper-books.component';
import { ShowUsersComponent } from './pages/show-users/show-users.component';
import { ShowPublishersComponent } from './pages/show-publishers/show-publishers.component';
import { ShowAdminsComponent } from './pages/show-admins/show-admins.component';
import { RoleGuard } from 'src/app/core/guards/role.guard';
import { AdminLayoutComponent } from './pages/admin-layout/admin-layout.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        component: HomePanelComponent,
        canActivate: [RoleGuard],
        data: { roles: ['admin'] },
      },
      {
        path: 'ebook',
        component: EBookComponent,
        canActivate: [RoleGuard],
        data: { roles: ['admin'] },
      },
      {
        path: 'order',
        component: OrderComponent,
        canActivate: [RoleGuard],
        data: { roles: ['admin'] },
      },
      {
        path: 'add-event',
        component: AddEventComponent,
        canActivate: [RoleGuard],
        data: { roles: ['admin'] },
      },
      {
        path: 'massage',
        component: MassageComponent,
        canActivate: [RoleGuard],
        data: { roles: ['admin'] },
      },
      {
        path: 'AddCategory',
        component: AddCategoryComponent,
      },
      // { path: 'login', component: LoginComponent },
      {
        path: 'add-publisher',
        component: NewPublisherComponent,
        canActivate: [RoleGuard],
        data: { roles: ['admin'] },
      },
      {
        path: 'cate',
        component: CatageryComponent,
        canActivate: [RoleGuard],
        data: { roles: ['admin'] },
      },
      {
        path: 'Electronic_Books',
        component: AllElectronicBooksComponent,
        canActivate: [RoleGuard],
        data: { roles: ['admin'] },
      },
      {
        path: 'Paper_Books',
        component: AllPaperBooksComponent,
        canActivate: [RoleGuard],
        data: { roles: ['admin'] },
      },
      {
        path: 'Users',
        component: ShowUsersComponent,
        canActivate: [RoleGuard],
        data: { roles: ['admin'] },
      },
      {
        path: 'Publishers',
        component: ShowPublishersComponent,
        canActivate: [RoleGuard],
        data: { roles: ['admin'] },
      },
      {
        path: 'Admins',
        component: ShowAdminsComponent,
        canActivate: [RoleGuard],
        data: { roles: ['admin'] },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}

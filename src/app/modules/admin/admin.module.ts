import { NgModule } from '@angular/core';
import { AdminRoutingModule } from './admin-routing.module';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';
import { LayerComponent } from './pages/layer/layer.component';
import { HomePanelComponent } from './pages/home-panel/home-panel.component';
import { HomePanelServiceService } from './Service/home-panel-service.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from 'src/app/auth.interceptor';
import { AllPaperBooksComponent } from './pages/all-paper-books/all-paper-books.component';
import { AllElectronicBooksComponent } from './pages/all-electronic-books/all-electronic-books.component';
import { OrderComponent } from './pages/order/order.component';
import { MassageComponent } from './pages/massage/massage.component';
import { ShowAdminsComponent } from './pages/show-admins/show-admins.component';
import { ShowPublishersComponent } from './pages/show-publishers/show-publishers.component';
import { ShowUsersComponent } from './pages/show-users/show-users.component';
import { CatageryComponent } from './pages/Catagery/catagery.component';
import { NewPublisherComponent } from './pages/new-publisher/new-publisher.component';
import { AddCategoryComponent } from './pages/add-category/add-category.component';
import { AddEventComponent } from './pages/add-event/add-event.component';
import { EBookComponent } from './pages/ebook/e-book.component';
import { AdminLayoutComponent } from './pages/admin-layout/admin-layout.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    LayerComponent,
    HomePanelComponent,
    AllPaperBooksComponent,
    AllElectronicBooksComponent,
    OrderComponent,
    MassageComponent,
    ShowAdminsComponent,
    ShowPublishersComponent,
    ShowUsersComponent,
    CatageryComponent,
    NewPublisherComponent,
    AddCategoryComponent,
    AddEventComponent,
    EBookComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    TranslocoModule,
    SharedModule,
  ],
  providers: [
    HomePanelServiceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
})
export class AdminModule {}

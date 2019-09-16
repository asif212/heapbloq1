import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { CookieModule } from 'ngx-cookie';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ForgetpasswordComponent } from './home/forgetpassword/forgetpassword.component';
import { VerificationComponent } from './home/verification/verification.component';
import { ChangepasswordComponent } from './home/changepassword/changepassword.component';
import { WallComponent } from './wall/wall.component';
import { BlogComponent } from './blog/blog.component';
import { CardcollectionComponent } from './wall/cardcollection/cardcollection.component';
import { AdminComponent } from './wall/admin/admin.component';
import { CardComponent } from './card/card.component';
import { CategoriesWidgetComponent } from './categories-widget/categories-widget.component';
import { TopPostComponent } from './top-post/top-post.component';
import { ProfileHeaderComponent } from './profile-header/profile-header.component';
import { HeaderComponent } from './header/header.component';
import { CommentComponent } from './comment/comment.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { HttpService } from '../app/services/http.service'
import { TransferHttpCacheModule } from '@nguniversal/common';
import { WallcardComponent } from './wallcard/wallcard.component';
import { CategoryComponent } from './category/category.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ForgetpasswordComponent,
    VerificationComponent,
    ChangepasswordComponent,
    WallComponent,
    CardComponent,
    CategoriesWidgetComponent,
    TopPostComponent,
    ProfileHeaderComponent,
    HeaderComponent,
    BlogComponent,
    CommentComponent,
    CardcollectionComponent,
    AdminComponent,
    WallcardComponent,
    CategoryComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'my-app' }),
    CookieModule.forRoot(),
    RouterModule.forRoot([
      { path: 'cardcollection', component: CardcollectionComponent },
      { path: 'admin', component: AdminComponent },
      { path: '', component: WallComponent },
      { path: 'timeline', component: WallComponent },
      { path: 'login', component: HomeComponent },
      { path: 'forgetpassword', component: ForgetpasswordComponent },
      { path: 'verification', component: VerificationComponent },
      { path: 'changepassword', component: ChangepasswordComponent },
      { path: 'blog', component: BlogComponent },
      { path: 'blog/:id', component: BlogComponent },
      { path: 'lazy', loadChildren: './lazy/lazy.module#LazyModule' },
      { path: 'lazy/nested', loadChildren: './lazy/lazy.module#LazyModule' }
    ]),
    TransferHttpCacheModule, CKEditorModule, FormsModule, HttpClientModule, HttpModule,
  ],
  providers: [HttpService],
  bootstrap: [AppComponent],
  entryComponents:[CardComponent]
})
export class AppModule { }

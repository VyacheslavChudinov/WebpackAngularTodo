import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from './angular-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { PostListComponent } from './posts/post-list/post-list.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { PostsComponent } from './posts/posts.component';
import { PostEditComponent } from './posts/post-list/post/post-edit/post-edit.component';
import { PostAddComponent } from './posts/post-add/post-add.component';
import { PostComponent } from './posts/post-list/post/post.component';
import { SortPostListPipe } from './posts/sort-post-list.pipe';

@NgModule({
	declarations: [
		AppComponent,
		AuthComponent,
		LayoutComponent,
		HomeComponent,
		HeaderComponent,
        PostListComponent,
        PostsComponent,
        PostEditComponent,
        PostAddComponent,
        PostComponent,
        SortPostListPipe
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		FormsModule,
		AngularMaterialModule,
		BrowserAnimationsModule,
		FlexLayoutModule,
        AppRoutingModule,
        ReactiveFormsModule
	],
	bootstrap: [AppComponent],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptorService,
			multi: true,
        }
	],
})
export class AppModule {}

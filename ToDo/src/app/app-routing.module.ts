import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { AuthComponent } from "./auth/auth.component";
import { AuthGuard } from "./auth/auth.guard";
import { PostsComponent } from "./posts/posts.component";
import { PostEditComponent } from "./posts/post-list/post/post-edit/post-edit.component";

const appRoutes: Routes = [
  { path: "", component: HomeComponent, pathMatch: "full" },
  { path: "register", component: AuthComponent },
  { path: "login", component: AuthComponent },
  { path: "posts", component: PostsComponent, canActivate: [AuthGuard] },
  { path: "**", redirectTo: "/" },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {useHash: true})],
  exports: [RouterModule],
})
export class AppRoutingModule {}

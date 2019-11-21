import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MovieCardsComponent } from './movie-cards/movie-cards.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { FilterMenuComponent } from './filter-menu/filter-menu.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { FormatHeaderPipe } from './pipes/format-header.pipe';
import { TruncateOverviewPipe } from './pipes/truncate-overview.pipe';
import { LimitArraySizePipe } from './pipes/limit-array-size.pipe';

import { DropdownDirective } from './directives/dropdown.directive';
import { ProfileComponent } from './profile/profile.component';

const appRoutes: Routes = [
  {path: 'movies', component: MovieCardsComponent,
    children: [{path: 'discover', component: FilterMenuComponent}]
  },
  {path: 'movie-detail/:id', component: MovieDetailComponent, pathMatch: 'full'},
  {path: 'profile', component: ProfileComponent},
  {path: '', redirectTo: 'movies', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MovieCardsComponent,
    FormatHeaderPipe,
    TruncateOverviewPipe,
    LimitArraySizePipe,
    DropdownDirective,
    MovieDetailComponent,
    FilterMenuComponent,
    PageNotFoundComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }

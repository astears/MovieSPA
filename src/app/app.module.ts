import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CardViewMoviesShowsComponent } from './cardview-movies-shows/cardview-movies-shows.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { FilterMenuComponent } from './filter-menu/filter-menu.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { FormatHeaderPipe } from './pipes/format-header.pipe';
import { TruncateOverviewPipe } from './pipes/truncate-overview.pipe';
import { LimitArraySizePipe } from './pipes/limit-array-size.pipe';

import { DropdownDirective } from './directives/dropdown.directive';

const appRoutes: Routes = [
  {path: 'movies', component: CardViewMoviesShowsComponent,
    children: [{path: 'discover', component: FilterMenuComponent}]
  },
  {path: 'movie-detail/:id', component: MovieDetailComponent, pathMatch: 'full'},
  {path: '', redirectTo: 'movies', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CardViewMoviesShowsComponent,
    FormatHeaderPipe,
    TruncateOverviewPipe,
    LimitArraySizePipe,
    DropdownDirective,
    MovieDetailComponent,
    FilterMenuComponent,
    PageNotFoundComponent
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

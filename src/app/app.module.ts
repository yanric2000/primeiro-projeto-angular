import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';    
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { GamesComponent } from './components/games/games.component';
import { PlatformsComponent } from './components/platforms/platforms.component';
import { HomeComponent } from './components/home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NewGameComponent } from './components/new-game/new-game.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'games/name/:name', component: GamesComponent },
    { path: 'games/new', component: NewGameComponent },
    { path: 'platforms', component: PlatformsComponent },
];
@NgModule({
    declarations: [
        AppComponent,
        GamesComponent,
        PlatformsComponent,
        HomeComponent,
        NewGameComponent,
        HeaderComponent,
        FooterComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule,
        RouterModule.forRoot(routes),
        BrowserAnimationsModule
    ],
    exports: [RouterModule],
    providers: [],
    bootstrap: [AppComponent]
})

export class AppModule { }
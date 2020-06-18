import { Component, OnInit } from '@angular/core';
import { GameServices } from '../games/service/game.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.styl']
})
export class HomeComponent implements OnInit {

    constructor(
        private gameServices: GameServices,
    ) { }

    allGames;

    type = {
        company: String,
        id: Number,
        name: String,
    };

    ngOnInit() {
        this.gameServices.getGames().subscribe(
            data => {
                this.allGames = data;
            }
        );
    }
}

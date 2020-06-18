import { Component, OnInit } from '@angular/core';
import { PlatformsService } from './services/platforms.service';

@Component({
    selector: 'app-studio',
    templateUrl: './platforms.component.html',
    styleUrls: ['./platforms.component.styl']
})
export class PlatformsComponent implements OnInit {

    platforms = {};

    constructor(
        private platformsService: PlatformsService
    ) { }

    ngOnInit(): void {
        this.platformsService.getAllPlatforms().subscribe(
            data => {
                this.platforms = data;
            }
        );
    }

}

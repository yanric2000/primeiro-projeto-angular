import { Injectable } from '@angular/core';
import { ApiService } from '../../../api/api.service';

@Injectable({
    providedIn: 'root'
})
export class GameServices {

    defaultPath = '/games';

    constructor(
        private apiService: ApiService,
    ) { }

    getGames() {
        return this.apiService.get(this.defaultPath);
    }

    addGame(game: any) {
        return this.apiService.post(this.defaultPath, game);
    }

    saveGame(game: any) {
        return this.apiService.put(`${this.defaultPath}/${game.id}`, game);
    }

    getGameByName(gameName: string) {
        return this.apiService.get(`${this.defaultPath}/name/${gameName}`);
    }

    deleteGame(gameId: string) {
        return this.apiService.delete(`${this.defaultPath}/${gameId}`);
    }
}
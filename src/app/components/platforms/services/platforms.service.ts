import { Injectable } from '@angular/core';
import { ApiService } from '../../../api/api.service';

@Injectable({
    providedIn: 'root'
})
export class PlatformsService {

    defaultPath = '/platforms';
    constructor(
        private apiService: ApiService,
    ) { }

    getAllPlatforms(){
        return this.apiService.get(this.defaultPath);
    }
}

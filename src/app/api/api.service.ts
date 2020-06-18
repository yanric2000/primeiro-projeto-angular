import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    private readonly readOnly = 'http://naodivulguedesafiofasus.brazilsouth.azurecontainer.io/api';
    //baseUrl = 'https://jsonplaceholder.typicode.com';
    httpOptionsDefault = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        })
    };

    constructor(
        private httpClient: HttpClient
    ) { }

    public get(path: string) {
        const fullPath = this.readOnly + path;
        console.log(fullPath);
        return this.httpClient.get(fullPath);
    }

    public post(path: string, params: object, httpOptions: Object = this.httpOptionsDefault) {
        const fullPath = this.readOnly + path;
        return this.httpClient.post(fullPath, params, httpOptions);
    }

    public put(path: string, params: object, httpOptions: Object = this.httpOptionsDefault) {
        const fullPath = this.readOnly + path;
        return this.httpClient.put(fullPath, params, httpOptions);
    }

    public delete(path: string) {
        const fullPath = this.readOnly + path;
        return this.httpClient.delete(fullPath);
    }
}

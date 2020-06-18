import { Component, ComponentFactoryResolver } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.styl']
})

export class AppComponent {
    title = 'SHOW APP';
    
    constructor(private resolver: ComponentFactoryResolver) { }
}

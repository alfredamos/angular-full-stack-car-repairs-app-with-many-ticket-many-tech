import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavigationBar} from "./components/navigation-bar/navigation-bar";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavigationBar],
  template: `
    <app-navigation-bar/>
    <router-outlet />
  `,
  standalone: true
})
export class App {}

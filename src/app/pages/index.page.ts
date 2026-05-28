import { Component } from '@angular/core';

import { AnalogWelcome } from './analog-welcome';
import {HomePage} from "../components/home-page/home-page";

@Component({
  selector: 'app-home',
  imports: [HomePage],
  template: `
    <app-home-page/>
  `,
})
export default class Home {}

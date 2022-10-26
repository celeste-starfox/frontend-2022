import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = `angularTest2022 Celeste Engelbrecht`;
  currentYear = (new Date()).getFullYear();
}


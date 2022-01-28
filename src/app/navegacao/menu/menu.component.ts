import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent {
  nav: Nav[] = [
    {
      link: '/home',
      name: 'Home'
    },
    {
      link: '/todo',
      name: 'ToDo'
    }
  ]

}

interface Nav {
  link: string;
  name: string;
}
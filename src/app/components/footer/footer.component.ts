import { Component } from '@angular/core';

import { faHeart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  faHeart = faHeart;
  customStyles = {
    color: 'red',
    margin: '0px 3px',
  };
  author = {
    name: 'Dbrandy',
    url: 'https://dbrandy.dev',
  };
}

import { Component } from '@angular/core';
import { faTrash ,faLongArrowAltLeft} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent {
  icons={
    p:faTrash,
    b:faLongArrowAltLeft
  };

}

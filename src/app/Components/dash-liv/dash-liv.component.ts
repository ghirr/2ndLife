import { Component, OnInit } from '@angular/core';
import { faCheck} from '@fortawesome/free-solid-svg-icons';
import { PayementService } from 'src/app/Services/payement.service';
@Component({
  selector: 'app-dash-liv',
  templateUrl: './dash-liv.component.html',
  styleUrls: ['./dash-liv.component.css']
})
export class DashLivComponent implements OnInit{
  icons:any={
    check:faCheck
  };
  livraisons:any=[];
constructor(private service:PayementService){}

ngOnInit(): void {
  this.getLivraisons();
  
}

getLivraisons(){
 return this.service.getLivraison().subscribe((result) => {
  console.log(result.livraison);
  
    this.livraisons=result.livraison;
    
  console.log(this.livraisons);
  });
  
}
}

import { Component } from '@angular/core';
import { faTrash ,faLongArrowAltLeft} from '@fortawesome/free-solid-svg-icons';
import { PanierService } from 'src/app/Services/panier.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent { 
  count:any=0;
  total:any=0;
  zebda:any=0;
  objets:any=[]
  icons={
    p:faTrash,
    b:faLongArrowAltLeft
  };
  selectedOption: any='1';

  constructor(private panierService:PanierService){
    this.getObjets();
    this.countn();
    this.price();
    this.onOptionChange();
  }
  getObjets(){
this.objets=JSON.parse(localStorage.getItem('objets') || '[]');
  }
  delete(o:any){
    this.panierService.deleteFromPanier(o);
    this.getObjets()
    this.countn();
    this.price();
  }
  countn(){
   this.count=this.objets.length;
  }
  price(){
     let p =0;
   for (let i = 0; i < this.count; i++) {
   
    p+=this.objets[i].price;
}
this.total=p;
this.zebda=this.total;
  }

  onOptionChange(){
    if(this.selectedOption==='1'&&this.total>0){
      this.zebda=this.total+10;
    }else{
      this.zebda=this.total;
    }
  }
 
}

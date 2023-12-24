import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { faTrash ,faLongArrowAltLeft} from '@fortawesome/free-solid-svg-icons';
import { error } from 'cypress/types/jquery';
import { PanierService } from 'src/app/Services/panier.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit { 
  count:any=0;
  total:any=0;
  zebda:any=0;
  objets:any=[]
  icons={
    p:faTrash,
    b:faLongArrowAltLeft
  };
  selectedOption: any='1';
  @ViewChild('payment',{static:true}) payment!:ElementRef;
  constructor(private panierService:PanierService){
    
  }
  ngOnInit(): void {
    
    this.getObjets();
    this.countn();
    this.price();
    this.onOptionChange();

    //Paypal Solution
    console.log(window.paypal);
    
    window.paypal.Buttons(
      {
        /*style:{
          layout:"horizontal",
        }*/
      
      createOrder:(data:any,actions:any)=>{
        return actions.order.create({
          purchase_units:[
           { amount:{
              value:this.zebda,
              currency_code:'USD'
            },}
          ]
        })
      },
      //si le paiment et fait
      onAprove:(data:any,actions:any)=>{
        return actions.order.captute().then((details:any)=>{
          
          
        });
      },
      onError:(error:any)=>{
        console.log(error);
        
      }
    }
    ).render(this.payment.nativeElement);
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

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { faTrash ,faLongArrowAltLeft} from '@fortawesome/free-solid-svg-icons';
import { error } from 'cypress/types/jquery';
import { PanierService } from 'src/app/Services/panier.service';
import { PayementService } from 'src/app/Services/payement.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit { 
  count:any=0;
  total:any=0;
  zebda:any=0;
  objets:any=[];
  ids:Array<String>=[]
  icons={
    p:faTrash,
    b:faLongArrowAltLeft
  };
  selectedOption: any='1';
  livraison:Boolean=true;
  payementConfig={};
  connectedUser:any;
  @ViewChild('payment',{static:true}) payment!:ElementRef;
  constructor(private panierService:PanierService,private payementService:PayementService,private router:Router){
    
  }
  ngOnInit(): void {
    this.getObjets();
    this.countn();
    this.price();
    this.onOptionChange();
    this.checkProduit();
    this.connectedUser = JSON.parse(localStorage.getItem("connectedUser") || '{}')

    //Paypal Solution
    //console.log(window.paypal);
    
    window.paypal.Buttons({
      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: this.zebda,
                currency_code: 'USD'
              }
            }
          ]
        });
      },
      // si le paiement est fait
      onApprove:  (data: any, actions: any) => {
        console.log("here");
        console.log("dkhalet");
    
        localStorage.removeItem("objets");
    
        // Utilisation de await ici
        this.payementService.achatProduit(this.ids, this.connectedUser, this.livraison);
    
        // Utilisation de await ici
        this.router.navigate(['/']);
      },
      onError: (error: any) => {
        console.log(error);
      }
    }).render(this.payment.nativeElement);
    
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
    this.ids.push(this.objets[i]._id)
    console.log(this.ids);
    
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
  checkProduit(): Boolean{
    this.payementService.checkProduit(this.ids).subscribe((res:any)=>{
      console.log(res);
      
      if(res.message==="mriguel"){
        return true;
      }else{
        this.objets = this.objets.filter((objet: any) => !res.objetnotfound.includes(objet._id));
        localStorage.setItem("objets", JSON.stringify(this.objets));
        this.getObjets();
        this.countn();
        this.price();
        this.onOptionChange();
        this.panierService.countSubject.next(this.objets.length);

        this.panierService.getCount();
      }
      return false
    })
    return false
  }
  payement(){
    if(this.checkProduit()===true){
      this.payementConfig= {createOrder:(data:any,actions:any)=>{
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
          localStorage.removeItem("objets");
          this.payementService.achatProduit(this.ids,this.connectedUser,this.livraison);
          this.router.navigate(['/'])
          
        });
      },
      onError:(error:any)=>{
        console.log(error);
        
      }
    }
  }else{
    console.log("check moch mriguel");
    
  }
  
 
}
}
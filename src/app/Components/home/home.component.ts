import { Component, OnInit } from '@angular/core';
import { ProduitService } from 'src/app/Services/produit.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  latets:any=[];
  constructor(private service:ProduitService){}
  ngOnInit(): void {
    this.getLatest();
    
  }

  getLatest(){
      return this.service.getLatestProduit().subscribe((res)=>{
        console.log(res.objets);
        
        this.latets=res.objets;
        console.log(this.latets);
        
      })
  }

}

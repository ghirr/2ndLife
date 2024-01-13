import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PayementService } from 'src/app/Services/payement.service';

@Component({
  selector: 'app-mes-livraisons',
  templateUrl: './mes-livraisons.component.html',
  styleUrls: ['./mes-livraisons.component.css']
})
export class MesLivraisonsComponent implements OnInit {
  connectedUser:any;
  livraisons:any=[];
  constructor(private service:PayementService,private router:Router){}
  ngOnInit(): void {
    this.connectedUser = JSON.parse(localStorage.getItem("connectedUser") || '{}');
    this.getMesLivraisons(this.connectedUser.id);

  }

  getMesLivraisons(id:any){
    this.service.getMesLivraisons(id).subscribe((res)=>{
      this.livraisons=res.livraison;
    }) }

    terminer(id:any){
      this.service.terminer(id).subscribe(() => {
        // This code will be executed after the termination is completed
        this.getMesLivraisons(this.connectedUser.id);
      });
    }
}

import { Component, OnInit } from '@angular/core';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  ngOnInit(): void {

  }
  itemList: string[] = ['Item C', 'Item A', 'Item B', 'Item D'];
  filteredList: string[] = [...this.itemList];
  searchQuery: string = '';

  sortList() {
    this.filteredList.sort();
  }
}

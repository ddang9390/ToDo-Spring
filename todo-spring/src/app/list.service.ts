import { Injectable, OnInit } from '@angular/core';
import { Item } from './item';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ListService {
  itemsChanged = new Subject<Item[]>();

  private items : Item[] = [];
  constructor() {}



  getItems(){
    return this.items.slice();
  }

  getItem(id: number){
    return this.items[id];
  }

  addItem(item: Item){
    this.items.push(item);
    this.itemsChanged.next(this.items.slice());
  }

  updateItem(index: number, item: Item){
    this.items[index] = item;
    this.itemsChanged.next(this.items.slice());
  }

  setItems(items: Item[]){
    this.items = items;
    this.itemsChanged.next(this.items.slice());
  }

  deleteItem(index: number){
    this.items.splice(index,1);
    this.itemsChanged.next(this.items.slice());
  }
}

import { Injectable, OnInit } from '@angular/core';
import { Item } from './item';
import { Subject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ItemsComponent } from './items/items.component';


@Injectable({
  providedIn: 'root'
})
export class ListService {
  dataUrl = "http://localhost:8080";
  itemsChanged = new Subject<Item[]>();

  private items : Item[] = [];
  index = this.items.length;

  private headers = new HttpHeaders().set('Content-Type', 'application/json')
  .set('Accept', 'application/json');

  constructor(private http: HttpClient) {}

  getItems(){
    return this.items.slice();
  }

  getItem(id: number){
    return this.items[id];
  }

  addItem(item: Item){
    if(this.items.length > 0){
      if(this.index < Number(this.items[this.items.length-1].id)){
        this.index = Number(this.items[this.items.length-1].id)+1;
      }
    }

    item.id = String(this.index);
    this.index++;
    this.items.push(item);
    this.itemsChanged.next(this.items.slice());

    this.http.post(this.dataUrl + "/items", item, { headers: this.headers })
      .subscribe(
        (response: Response) => {
          console.log(response);
        }
      );
  }

  updateItem(index: number, item: Item){
    item.id = this.items[index].id;
    this.items[index] = item;
    this.itemsChanged.next(this.items.slice());

    this.http.put(this.dataUrl + "/items/" + this.items[index].id, item, { headers: this.headers })
      .subscribe(
        (response: Response) => {
          console.log(response);
        }
      );;
  }

  setItems(items: Item[]){
    this.items = items;
    this.itemsChanged.next(this.items.slice());
  }

  deleteItem(index: number){
    let id = this.items[index].id;
    this.items.splice(index,1);
    this.itemsChanged.next(this.items.slice());

    this.http.delete(this.dataUrl + "/items/" + id)
      .subscribe(
        (response: Response) => {
          console.log(response);
        }
      );;

    
  }
}

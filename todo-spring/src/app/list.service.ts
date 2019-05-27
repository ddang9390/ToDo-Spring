import { Injectable, OnInit } from '@angular/core';
import { Item } from './item';
import { Subject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ListService {
  dataUrl = "http://localhost:8080";
  itemsChanged = new Subject<Item[]>();

  private items : Item[] = [];
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
    this.items[index] = item;
    this.itemsChanged.next(this.items.slice());

    this.http.put(this.dataUrl + "/items/" + index, item, { headers: this.headers });
  }

  setItems(items: Item[]){
    this.items = items;
    this.itemsChanged.next(this.items.slice());
  }

  deleteItem(index: number){
    this.items.splice(index,1);
    this.itemsChanged.next(this.items.slice());

    this.http.delete(this.dataUrl + "/items/" + index);
  }
}

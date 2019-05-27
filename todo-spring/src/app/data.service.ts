import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ListService } from './list.service';
import { Item } from './item';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  dataUrl = 'https://todo-a1c70.firebaseio.com/todo.json?';


  constructor(private http: HttpClient,
              private listService: ListService) { }

  getData(){
    return this.http.get(this.dataUrl)
    .subscribe(
      (items: Item[]) => {
        this.listService.setItems(items);
      }
    );;
  }

  putData(): Observable<any>{
    return this.http.put(this.dataUrl, this.listService.getItems());
  }
}

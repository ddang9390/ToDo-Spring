import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ListService } from './list.service';
import { Item } from './item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'angular-crud';
  dataUrl = "http://localhost:8080";
  constructor(private http: HttpClient,
              private listService: ListService) {}
  ngOnInit(){
    this.http.get(this.dataUrl + "/items")
      .subscribe(
        (items: Item[]) => {
          console.log(items);
          this.listService.setItems(items);
        }
      )
  }
}

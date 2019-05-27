import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ListService } from '../list.service';
import { Item } from '../item';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  items: Item[] = [];
  subscription: Subscription;
  constructor(private listService: ListService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.subscription = this.listService.itemsChanged
      .subscribe(
        (items: Item[]) => {
          this.items = items;
        }
      )
    this.items = this.listService.getItems();
  }

  addItem(){
    this.router.navigate(["new"], {relativeTo: this.route});
  }
}

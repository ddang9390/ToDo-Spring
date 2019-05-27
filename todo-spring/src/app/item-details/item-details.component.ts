import { Component, OnInit } from '@angular/core';
import { ListService } from '../list.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Item } from '../item';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {
  item: Item;
  id: number;

  constructor(private listService: ListService, 
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.item = this.listService.getItem(this.id);
        }
      );
  }

  onEditItem(){
    this.router.navigate(["edit"], {relativeTo: this.route});
  }

  onDeleteItem(){
    this.listService.deleteItem(this.id);
    this.router.navigate(['../']);
  }
}

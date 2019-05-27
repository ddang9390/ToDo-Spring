import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ListService } from '../list.service';

@Component({
  selector: 'app-list-edit',
  templateUrl: './list-edit.component.html',
  styleUrls: ['./list-edit.component.css']
})
export class ListEditComponent implements OnInit {
  id: number;
  editMode = false;
  listForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private listService: ListService,
              private router: Router) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null; //does it have an id
          this.initForm();
        }
      )
  }

  private initForm(){
    let itemName = '';
    let itemDescription = '';


    if(this.editMode){
      const item = this.listService.getItem(this.id);
      itemName = item.name;
      itemDescription = item.desc;
    }
    else{

    }
    this.listForm = new FormGroup({
      'name': new FormControl(itemName, Validators.required),

      'desc': new FormControl(itemDescription, Validators.required),

    })
  }


  onSubmit(){
    if(this.editMode){
      this.listService.updateItem(this.id, this.listForm.value);
    }
    else{
      this.listService.addItem(this.listForm.value);
    }
    this.onCancel();
  }


  onCancel(){
    this.router.navigate(['../']);
  }
}

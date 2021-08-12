import { asLiteral } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-pets-list',
  templateUrl: './pets-list.component.html',
  styleUrls: ['./pets-list.component.scss']
})
export class PetsListComponent implements OnInit {
  petList: any;
  searchForm = this.fb.group({
    searchValue: ['', [Validators.required]],


  });
  loginUserId: any;
  constructor(private eventsService: EventService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loginUserId = JSON.parse(localStorage.getItem('userDetails') || '{}');
    this.eventsService.getPetsList().subscribe((res: any) => {
      this.petList = res
    }
    )
  }

  buyPet(value: any) {
    value.loginUserId = this.loginUserId._id
    this.eventsService.updatePetStatus(value).subscribe((res: any) => {
      if (res.success) {
        alert(`${value.name} bought successfully`)
        this.eventsService.getPetsList().subscribe((res: any) => {
          this.petList = res

        })
      }
    }
    )
  }
  searchValue() {
    let payload = {
      'searchValue': this.searchForm.value.searchValue
    }
    this.eventsService.getSearchValue(payload).subscribe((res: any) => {
      this.petList = res
    })
  }
}

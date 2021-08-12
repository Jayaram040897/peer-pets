import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-my-pets-list',
  templateUrl: './my-pets-list.component.html',
  styleUrls: ['./my-pets-list.component.scss']
})
export class MyPetsListComponent implements OnInit {
  loginUserId: any;
  myPetList: any;

  constructor(private eventsService: EventService) { }

  ngOnInit(): void {
    this.eventsService.getMyPetList().subscribe((res:any) => {
       this.myPetList = res
    })
  }

}

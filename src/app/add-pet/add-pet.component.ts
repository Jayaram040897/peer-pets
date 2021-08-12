import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.component.html',
  styleUrls: ['./add-pet.component.scss']
})
export class AddPetComponent implements OnInit {
  // submitAttempt: boolean = false;
  addPetForm = this.fb.group({
    name: ['', [Validators.required]],
    age: ['', [Validators.required]],
    place: ['', [Validators.required]],

  });
  constructor(private fb: FormBuilder,private eventsService: EventService,private router: Router) { }

  ngOnInit(): void {
  }
  onAddPet(){
    // this.submitAttempt = true;
    if(this.addPetForm.invalid){
      return;
    }else{
      let data = this.addPetForm.value;
      this.eventsService.addPets(data).subscribe((res:any) => {
        if(res.success == true){
          this.router.navigate(['pets-list'])
        }
      })
    }
  }
}

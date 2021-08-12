import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
  styles: [
    `
      .backdrop-class {
        opacity:0.8 !important;
      }
    `,
  ],
})
export class HomeComponent implements OnInit {
  // login: boolean;

  // login: boolean;

  constructor(public modalService: NgbModal) { }

  ngOnInit(): void {
  }

}

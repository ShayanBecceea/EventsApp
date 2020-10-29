import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  dropdown:boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  createEvent(){
    console.log("clicked");
    this.router.navigateByUrl('/contentEvent');
  }

  DropdownToggle(): void {
    this.dropdown = !this.dropdown;
  }

}

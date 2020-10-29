import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})

export class CardsComponent implements OnInit {

  eventList: any = [];
  eventId: number = null;
  eventSelected: any = [];

  constructor(private _eventService:EventService) { }

  ngOnInit(): void {
    this.getEventDetails();
    window.onbeforeunload = function() {window.scrollTo(0,0);}

  }

  getEventDetails(){
    this._eventService.getData()
    .subscribe((result: any) => {
      this.eventList = result;
      console.log(this.eventList);
    });
  }

  eventClick(id: number){
    this.eventId = id;
    this.eventSelected = this.eventList.filter(
      event => event.eventId == this.eventId);
    console.log(this.eventId);
  }
}

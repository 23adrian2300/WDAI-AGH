import { ParseSourceFile } from '@angular/compiler';
import { Component, EventEmitter, Output } from '@angular/core';
import { Trips } from 'src/app/interface/trips'

@Component({
  selector: 'app-adding',
  templateUrl: './adding.component.html',
  styleUrls: ['./adding.component.css']
})

export class AddingComponent {

  @Output() formSubmitEvent = new EventEmitter<Trips>();
  @Output() reset = new EventEmitter<number>();
  trip: Trips = {
    Name: '',
    Destination: '',
    StartDate: '',
    EndDate: '',
    Price: 0,
    MaxPeople: 0,
    Reserved: 0,
    Likes: 0,
    Dislikes: 0,
    Description: '',
    Photo: ''
  }

  constructor() {
   }

  IsGoodEndDate() {
    let dateOfStart: string[] = this.trip.StartDate.split("-")
    let dateOfEnd: string[] = this.trip.EndDate.split("-")
    if (parseInt(dateOfEnd[0]) < parseInt(dateOfStart[0])) {
      return false
    }
    if (parseInt(dateOfEnd[0]) == parseInt(dateOfStart[0]) && parseInt(dateOfEnd[1]) < parseInt(dateOfStart[1])) {
      return false
    }
    if (parseInt(dateOfEnd[0]) == parseInt(dateOfStart[0]) && parseInt(dateOfEnd[1]) == parseInt(dateOfStart[1]) && parseInt(dateOfEnd[2]) < parseInt(dateOfStart[2])) {
      return false
    }
    return true
  }


  IsGoodTodaysDate() {
    let dateOfStart: string[] = this.trip.StartDate.split("-")

    const todaysDate = new Date()

    if (parseInt(dateOfStart[0]) < todaysDate.getFullYear()) {
      return false
    }

    if (parseInt(dateOfStart[0]) == todaysDate.getFullYear() && parseInt(dateOfStart[1]) < todaysDate.getMonth() + 1) {
      return false
    }

    if (parseInt(dateOfStart[0]) == todaysDate.getFullYear() && parseInt(dateOfStart[1]) == todaysDate.getMonth() + 1 && parseInt(dateOfStart[2]) < todaysDate.getDate()) {
      return false
    }

    return true
  }

  Checking() {
    return (this.IsGoodTodaysDate() && this.IsGoodEndDate())
  }

  resetTrip() {
    if (this.Checking()) {
      this.reset.emit(this.trip.Price)
    }
  }

  addTrip() {
    if (this.Checking()) {
      this.formSubmitEvent.emit(this.trip)

      this.trip = {
      Name: '',
      Destination: '',
      StartDate: '',
      EndDate: '',
      Price: 0,
      MaxPeople: 0,
      Reserved: 0,
      Likes: 0,
      Dislikes: 0,
      Description: '',
      Photo: ''
    }
    }
    else{

      return;
    }
  }
}
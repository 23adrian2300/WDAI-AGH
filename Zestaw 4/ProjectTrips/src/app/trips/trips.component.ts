import { Component } from '@angular/core';
import tours from 'src/assets/trips.json';
import { Trips } from 'src/app/interface/trips'


@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})

export class TripsComponent {
  trips: Trips[] = tours.Trips;
  formVisibility: boolean = false;
  filterVis: boolean = false
  cartVisibility: boolean = false
  allTripsInCart: number
  dest: string = ""
  minPrice: number = this.getMinPrice()
  maxPrice: number = this.getMaxPrice()
  likes: number = this.findMinLikes()
  dislikes: number = this.findMaxDislikes()
  startDate: string = ""
  endDate: string = ""
  date = new Date;
  date2 = new Date;
  destinations: string[] = []

  constructor() {

    this.allTripsInCart = 0
    
  }

  getTrips() {
    return this.trips
  }
  showCart() {
    this.cartVisibility = !this.cartVisibility
  }

  getMinPrice(): number {
    let minPrice: number = 10 ** 10
    for (let trip of this.trips) {
      if (trip.MaxPeople != trip.Reserved) {
        minPrice = minPrice >= trip.Price ? trip.Price : minPrice
      }
    }
    return minPrice
  }

  getMaxPrice(): number {
    let maxPrice: number = 0
    for (let trip of this.trips) {
      if (trip.MaxPeople != trip.Reserved) {
        maxPrice = maxPrice <= trip.Price ? trip.Price : maxPrice
      }
    }
    return maxPrice
  }


  addVisFilter() {
    this.filterVis = !this.filterVis
  }
 
  removeClick(trip: Trips) {
    trip.Reserved -= 1
    this.allTripsInCart -= 1
    this.dislikes = this.findMaxDislikes()
  }

  addClick(trip: Trips) {
    trip.Reserved += 1
    this.allTripsInCart += 1
    this.likes = this.findMinLikes()
  }

  reset(trip: Trips) {
    this.minPrice = trip.Price
    this.maxPrice = trip.Price
    this.likes = trip.Likes
    this.dislikes = trip.Dislikes
  }


  visibilityAddForm() {
    this.formVisibility = !this.formVisibility
  }

  findMaxDislikes() {
    let maxDislikes: number = 0
    for (let trip of this.trips) {
      maxDislikes = maxDislikes <= trip.Dislikes ? trip.Dislikes : maxDislikes
    }
    return maxDislikes
  }

  findMinLikes() {
    let minLikes: number = Infinity
    for (let trip of this.trips) {
      minLikes = minLikes >= trip.Likes ? trip.Likes : minLikes
    }
    return minLikes
  }


  formResetEvent(newP: number) {
    this.maxPrice = newP
  }

  formSubmitEventHandler(trip: Trips) {
    this.trips.push(trip)
    this.visibilityAddForm()
    this.dest = ""
    this.startDate = ""
    this.endDate = ""
    this.minPrice = this.getMinPrice()
    this.maxPrice = this.getMaxPrice()
    this.likes = this.findMinLikes()
    this.dislikes = this.findMaxDislikes()
  }

  ratingEventHandler(trip: Trips, event: any) {
    switch (event) {
      case 1: {
        trip.Likes += 1
        this.likes = this.findMinLikes()
        break
      }
      case 2: {
        trip.Dislikes += 1
        this.dislikes = this.findMaxDislikes()
        break
      }
      case 3: {
        trip.Likes += 1
        trip.Dislikes -= 1
        this.likes = this.findMinLikes()
        this.dislikes = this.findMaxDislikes()
        break
      }
      case 4: {
        trip.Likes -= 1
        trip.Dislikes += 1
        this.likes = this.findMinLikes()
        this.dislikes = this.findMaxDislikes()
        break
      }
      case 5: {
        trip.Likes -= 1
        this.likes = this.findMinLikes()
        break
      }
      case 6: {
        trip.Dislikes -= 1
        this.dislikes = this.findMaxDislikes()
        break
      }
      default: {
        break
      }
    }
  }

  countRanges() {
    for (let t of this.trips) {
      console.log(t);
      if (!this.dest.includes(t.Destination))
        this.destinations.push(t.Destination);
      if (t.Price > this.maxPrice) {
        this.maxPrice = t.Price;
      }
      if (t.Price < this.minPrice) {
        this.minPrice = t.Price;
      }
      if (t.Dislikes > this.dislikes) {
        this.dislikes = t.Dislikes;
      }
      if (t.Likes < this.likes) {
        this.likes = t.Likes;
      }
    }
    this.dislikes = this.dislikes;
    this.likes = this.likes;
    this.minPrice = this.minPrice;
    this.maxPrice = this.maxPrice;
  }

  ngOnInit(): void {
    this.countRanges();
    this.date = new Date;
    this.date2 = new Date;

  }

  removeFilters() {
    this.dest = '';
    this.dislikes = this.findMaxDislikes();
    this.likes = this.findMinLikes();
    this.startDate = "";
    this.endDate = "";
    this.ngOnInit();
  }
  
  removeTrip(trip: Trips) {
    for (let i = 0; i < this.trips.length; i++) {
      if (this.trips[i] == trip) {
        this.allTripsInCart -= this.trips[i].Reserved
        this.trips.splice(i, 1)
        this.dest = ""
        this.minPrice = this.getMinPrice()
        this.maxPrice = this.getMaxPrice()
        this.likes = this.findMinLikes()
        this.dislikes = this.findMaxDislikes()
        this.startDate = ""
        this.endDate = ""
        return
      }
    }
  }

}
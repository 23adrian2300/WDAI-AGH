import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent {
  @Input() trips: any = 0

  getSum() {
    let cost = 0
    for (let trip of this.trips) 
    {
      cost =  cost + (trip.Price* trip.Reserved) 
    }
    return cost
  }
}
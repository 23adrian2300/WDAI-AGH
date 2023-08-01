import { Pipe, PipeTransform } from '@angular/core';
import { Trips } from 'src/app/interface/trips'

@Pipe({
  name: 'fliterbyprice'
})
export class FliterbypricePipe implements PipeTransform {

  transform(trips: Trips[], mini: number, maxi: number): Trips[] {
    if (!mini && !maxi) {
      return trips
    }

    if (!mini) {
      return trips.filter(trip => {
        return trip.Price <= maxi
      })
    }

    if (!maxi) {
      return trips.filter(trip => {
        return trip.Price >= mini
      })
    }
    
    return trips.filter(trip => {
      return trip.Price >= mini && trip.Price <= maxi
    })
  }

}

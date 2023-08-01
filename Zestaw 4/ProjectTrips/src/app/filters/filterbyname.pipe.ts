import { Pipe, PipeTransform } from '@angular/core';
import { Trips } from 'src/app/interface/trips'

@Pipe({
  name: 'filterbyname'
})
export class FilterbynamePipe implements PipeTransform {

  transform(trips: Trips[], search: string): Trips[] {
    if (!trips) {
      return []
    }
    if (!search) {
      return trips
    }
    
    search = search.toLowerCase()

    return trips.filter(trip => {
      return trip.Destination.toLowerCase().includes(search)
    })
  }

}

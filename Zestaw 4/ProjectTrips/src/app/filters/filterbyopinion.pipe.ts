import { Pipe, PipeTransform } from '@angular/core';

import { Trips } from 'src/app/interface/trips'
@Pipe({
  name: 'filterbyopinion'
})
export class FilterbyopinionPipe implements PipeTransform {

  transform(trips: Trips[], likes: number, dislikes: number): Trips[] {
    if (!likes && !dislikes) {
      return trips
    }
    if (!likes) {
      return trips.filter(trip => {
        return trip.Dislikes <= dislikes
      })
    }
    if (!dislikes) {
      return trips.filter(trip => {
        return trip.Likes >= likes
      })
    }
    return trips.filter(trip => {
      return (trip.Likes >= likes && trip.Dislikes <= dislikes)
    })
  }

}

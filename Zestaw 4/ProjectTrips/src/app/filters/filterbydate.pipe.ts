import { Pipe, PipeTransform } from '@angular/core';
import { Trips } from 'src/app/interface/trips'

@Pipe({
  name: 'filterByDate'
})
export class FilterByDatePipe implements PipeTransform {

  transform(trips: Trips[], startDate: string, endDate: string): Trips[] {
    let startDateSpl = startDate.split("-")
    let endDateSpl = endDate.split("-")

    if (!trips) {
      return []
    }
    if (!startDate && !endDate) {
      return trips
    }
    if (!endDate) {
      let spl
      return trips.filter(trip => {
        spl = trip.StartDate.split("-")
        return ((parseInt(spl[2]) > parseInt(startDateSpl[0])) ||
          (parseInt(spl[2]) == parseInt(startDateSpl[0]) && parseInt(spl[0]) > parseInt(startDateSpl[1])) ||
          (parseInt(spl[2]) == parseInt(startDateSpl[0]) && parseInt(spl[0]) == parseInt(startDateSpl[1]) && parseInt(spl[1]) >= parseInt(startDateSpl[2])))
      })
    }


    if (!startDate) {
      let spl2
      return trips.filter(trip => {
        spl2 = trip.EndDate.split("-")
        return ((parseInt(spl2[2]) < parseInt(endDateSpl[0])) ||
          (parseInt(spl2[2]) == parseInt(endDateSpl[0]) && parseInt(spl2[0]) < parseInt(endDateSpl[1])) ||
          (parseInt(spl2[2]) == parseInt(endDateSpl[0]) && parseInt(spl2[0]) == parseInt(endDateSpl[1]) && parseInt(spl2[1]) <= parseInt(endDateSpl[2])))
      })
    }


    let spl1
    let spl2
    return trips.filter(trip => {
      spl1 = trip.StartDate.split("-")
      spl2 = trip.EndDate.split("-")
      return ((parseInt(spl1[2]) > parseInt(startDateSpl[0])) ||
        (parseInt(spl1[2]) == parseInt(startDateSpl[0]) && parseInt(spl1[0]) > parseInt(startDateSpl[1])) ||
        (parseInt(spl1[2]) == parseInt(startDateSpl[0]) && parseInt(spl1[0]) == parseInt(startDateSpl[1]) && parseInt(spl1[1]) >= parseInt(startDateSpl[2]))) &&
        ((parseInt(spl2[2]) < parseInt(endDateSpl[0])) ||
          (parseInt(spl2[2]) == parseInt(endDateSpl[0]) && parseInt(spl2[0]) < parseInt(endDateSpl[1])) ||
          (parseInt(spl2[2]) == parseInt(endDateSpl[0]) && parseInt(spl2[0]) == parseInt(endDateSpl[1]) && parseInt(spl2[1]) <= parseInt(endDateSpl[2])))
    })
  }


}
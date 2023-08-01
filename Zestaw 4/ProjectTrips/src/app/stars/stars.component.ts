import { Component } from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css']
})
export class StarsComponent {

  elementStars: number = -1;
  isRated: boolean = false;

  ratedStars: number = -1;

  ratedObject(stars: number){
    this.ratedStars = stars;
    this.isRated=true;
  }

  rateObject(itr: number): void{
    this.elementStars=itr;
  }

  disrateObject(){
    this.elementStars=-1;
  }

}
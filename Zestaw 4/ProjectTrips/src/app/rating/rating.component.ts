import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent {
  constructor(){}

  @Input() Likes = 0
  @Input() Dislikes = 0

  @Output() ratingChanged = new EventEmitter<Number>()

  likeStatus:number = 0

  AddOpinion(like:number){
    if(like == 1){
      if(this.likeStatus == 0){
        this.ratingChanged.emit(1)
        this.likeStatus = 1
      }

      else if(this.likeStatus == 1){
        this.ratingChanged.emit(5)
        this.likeStatus = 0
      }
      else{
        this.ratingChanged.emit(3)
        this.likeStatus = 1
      }

      
    }

    else{
      if(this.likeStatus == 0){
        this.ratingChanged.emit(2)
        this.likeStatus = 2
      }

      else if(this.likeStatus == 2){
        this.ratingChanged.emit(6)
        this.likeStatus = 0
      }

      else{
        this.ratingChanged.emit(4)
        this.likeStatus = 2
      }
      
    }
  }
}
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css']
})
export class ModelComponent {
  @Input() topics : any = 0
  @Output() emiter = new EventEmitter<number>()

  readMore(i:number){
    this.emiter.emit(i)
}
}
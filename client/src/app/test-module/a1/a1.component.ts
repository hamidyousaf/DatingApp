import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-a1',
  templateUrl: './a1.component.html',
  styleUrls: ['./a1.component.css']
})

export class A1Component implements OnInit {
  @Input() Val: number = 0;
  @Input() users;
  @Output() addDataEvent = new EventEmitter<string>(); 
  constructor() { }

  ngOnInit(): void {
  }
  generateRandom(){
    this.Val = Math.floor(Math.random() * 10);
  }
}

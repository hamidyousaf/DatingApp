import { Component, OnInit } from '@angular/core';
import { TestService } from '../_services/test.service';

@Component({
  selector: 'app-comp2',
  templateUrl: './comp2.component.html',
  styleUrls: ['./comp2.component.css']
})
export class Comp2Component implements OnInit {

  subject : string = "Subject"; 
  constructor(private _testService: TestService) {
    _testService.subject.subscribe(
      result => {
        this.subject = result;
      }
    );
   }
  ngOnInit(): void {
  }
  onChange(val: string){
    console.log(val);
    this._testService.subject.next(val);
  }
}

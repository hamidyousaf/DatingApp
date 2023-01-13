import { Component, OnInit } from '@angular/core';
import { TestService } from '../_services/test.service';

@Component({
  selector: 'app-comp3',
  templateUrl: './comp3.component.html',
  styleUrls: ['./comp3.component.css']
})
export class Comp3Component implements OnInit {

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

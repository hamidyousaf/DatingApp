import { Component, OnInit } from '@angular/core';
import { TestService } from '../_services/test.service';

@Component({
  selector: 'app-comp1',
  templateUrl: './comp1.component.html',
  styleUrls: ['./comp1.component.css']
})
export class Comp1Component implements OnInit {
  subject :string = "Subject";
  constructor(private _testService: TestService) { }
  
  ngOnInit(): void {
    this._testService.subject.subscribe(
      result => {
      this.subject = result;
    });
  }
  onChange(val: string){
    console.log(val);
    this._testService.subject.next(val);
  }
}

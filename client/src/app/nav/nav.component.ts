import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';
import { TestService } from '../_services/test.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  constructor(public accountService: AccountService, private router: Router, private toastr : ToastrService,
  private _testService: TestService) { }
  model: any = {};
  subject: string = "Subject";
  ngOnInit(): void {
    this._testService.subject.subscribe(
      result => {
      this.subject = result;
    });
  }

  login(){
    this.accountService.login(this.model).subscribe(response => {
      this.router.navigateByUrl("/members");
      console.log(response);
    }, error => {
      this.toastr.error(error.error);
      console.log(error);
    });
  }

  loggedOut(){
    this.accountService.logout();
    this.router.navigateByUrl("/");
  }
}

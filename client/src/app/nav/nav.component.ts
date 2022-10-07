import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  constructor(public accountService: AccountService, private router: Router, private toastr : ToastrService) { }
  model: any = {};
  
  ngOnInit(): void {
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

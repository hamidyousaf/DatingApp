import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // @Input() usersFromHomeComponent: any;
  @Output() cencelRegister = new EventEmitter();
  constructor(private accountService: AccountService, private toastr : ToastrService) { }

  ngOnInit(): void {
  }
  model : any = {};

  register(){
    this.accountService.register(this.model).subscribe(response => {
      console.log(response);
      this.cancel();
    }, error => {
      this.toastr.error(error.error);
      console.log(error);
    })
  }

  cancel(){
    console.log("cencelled");
    this.cencelRegister.emit(false);
  }
}

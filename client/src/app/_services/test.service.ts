import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AsyncSubject, BehaviorSubject, ReplaySubject, Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http: HttpClient) { }
  baseURL = "https://localhost:7059/api/";
  getUsers(){
    return this.http.get(this.baseURL + "TestUser/GetTestUserss").pipe(
      catchError(this.handleError)
    );
  }
  addUser(data:any){
    return this.http.post(this.baseURL + "TestUser/AddTestUser", data);
  }

  subject = new Subject<string>();//1)- In Subject, we cannot set initial value. 2)- It hold single value.
  bSubject = new BehaviorSubject<string>("Subject");//1)- In BehaviorSubject, we set initial value of it. 2)- It hold single value.
  rSubject = new ReplaySubject<string>(5, 5000); //1) It hold multiple value 2)- it takes previous 5 values. 3)- values avaialbe for 5 seconds
  aSubject = new AsyncSubject<string>(); //1) Emit its last value on completion 

  handleError(error: HttpErrorResponse){
    var message = "";
    if(error.status == 404){
      message = "There is invalid url path.";
    } else if(error.statusText == "Unknown Error"){
      message = "There is server error.";
    }
    else{
      message = "Unexpected error!"
    }
    return throwError(message);
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  getMembers(){
    return this.http.get<Member[]>(this.baseUrl + "users"/*, this.getHttpOptions()*/);
  }

  getMember(username: String){
    return this.http.get<Member>(this.baseUrl + "users/" + username/*, this.getHttpOptions()*/);
  }

  updateMember(member: Member){
    return this.http.put(this.baseUrl + "users", member);
  }

  // This method is use to pass token in header
  // getHttpOptions(){
  //   const userString = localStorage.getItem("user");
  //   if(!userString) return;

  //   const user = JSON.parse(userString);
  //   return {
  //     headers: new HttpHeaders ({
  //       Authorization: "Bearer " + user.token
  //     })
  //   }
  // }
}
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.baseUrl;
  members :Member[] = [];
  constructor(private http: HttpClient) { }

  getMembers(){
    if(this.members.length > 0) return of(this.members);
    return this.http.get<Member[]>(this.baseUrl + "users"/*, this.getHttpOptions()*/).pipe(
      map((members) => {
       this.members = members;
       return members;
      }),
    );
  }

  getMember(username: String){
    const user = this.members.find(member => member.userName == username);
    if(user) return of(user);
    return this.http.get<Member>(this.baseUrl + "users/" + username/*, this.getHttpOptions()*/);
  }

  updateMember(member: Member){
    return this.http.put(this.baseUrl + "users", member).pipe(
      map(() => {
        const index = this.members.indexOf(member);
        this.members[index] = {...this.members[index], ...member};
      })
    );
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
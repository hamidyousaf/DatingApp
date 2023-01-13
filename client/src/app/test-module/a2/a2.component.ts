import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { TestService } from 'src/app/_services/test.service';
import { TestUser } from  "../../_models/TestUser";

@Component({
  selector: 'app-a2',
  templateUrl: './a2.component.html',
  styleUrls: ['./a2.component.css']
})
export class A2Component implements OnInit {

  constructor(private test: TestService) {
    test.getUsers().subscribe(
      result => {
        this.usersFromService = result;
        console.log(this.usersFromService);
      }
    )
   }

  ngOnInit(): void {
  }
  displayVal  :string = "";
  number      :number = 20;
  title       :string = "Hello World";
  disable     :boolean = false;
  show        :boolean = true;
  color       :string = "BLUE";
  users       :string[] = ["Hamid", "Hamza", "Hassan"];
  userDetails :object[] = [
    {name: "Hamid", email: "hamid@gmail.com", phone:"111", accounts: ["Facebook", "Youtube"]},
    {name: "Hamza", email: "Hamza@gmail.com", phone:"222", accounts: ["LinkedIn", "Youtube"]},
    {name: "Hassan", email: "Hassan@gmail.com", phone:"333", accounts: ["Facebook", "GMAil"]}
  ];
  textColor   :string = "BLUE";
  bgColor     :string = "green";
  tasks       :string[] = [];
  aProperty   :string = "";
  today       = Date();
  usersFromService: any;

  loginForm = new FormGroup({
    // username: new FormControl("Hamid"),
    // password: new FormControl("Hamid@123"),
     username: new FormControl("",[Validators.required, Validators.email]),
     password: new FormControl("", [Validators.required, Validators.minLength(5)]),
  });

  addUser(user:TestUser){
    this.test.addUser(user).subscribe(
      success => {
        console.log(success);
      },
      error => {
        console.log(error);
      }
    );
  }

  login(){
    console.log(this.loginForm.value);
  }
  get usernameGetter(){
    return this.loginForm.get("username");
  }
  get passwordGetter(){
    return this.loginForm.get("password");
  }
  getData(val: string){
    
    if(val != ""){
      this.displayVal = "Typing...";
    }else{
      this.displayVal = "";
    }
  }

  counter(operator: string){
    if(operator === "+"){
      this.number++; 
    }else{
      this.number--; 
    }
  }

  updateColor(){
    this.textColor = "green";
    this.bgColor = "BLUE";
  }
  alertMessage(){
    alert("you clicked on button");
  }
  postData(data:NgForm){
    console.log(data);
    this.userDetails.push(data);
  }
  toggle(){
    this.show = !this.show;
  }

  addTask(task: string){
    this.tasks.push(task);
  }
  removeTask(ta: string){
    this.tasks = this.tasks.filter(t => t != ta);
  }
  addItem(item: string){
    
    console.log(item);
  }

  templateReference(data: HTMLInputElement){
    console.log(data);
  }
}
//when we false strick mode in tsconfig.json

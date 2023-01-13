import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { combineLatest, concat, forkJoin, from, fromEvent, interval, merge, Observable, of, Subscription, timer, zip } from 'rxjs';
import { concatAll, concatMap, debounceTime, delay, distinctUntilChanged, exhaustMap, filter, map, mergeAll, mergeMap, pluck, retry, retryWhen, scan, shareReplay, switchAll, switchMap, take, takeLast, takeUntil, tap, toArray, withLatestFrom } from 'rxjs/operators';
import { TestService } from '../_services/test.service';

@Component({
  selector: 'app-rx-js',
  templateUrl: './rx-js.component.html',
  styleUrls: ['./rx-js.component.css']
})
export class RxJsComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(private http: HttpClient, private _testService: TestService) { }
  title = "Rx Js";
  counter = 1;
  user       :string[] = ["Hamid", "Hamza", "Hassan"];
  users = [
    {
      id:1,
      name: "Hamid",
       age: 25,
       job :{
        title: "Software Engineer"
       }
    },
    {
      id:2,
      name: "Hamza", 
      age: 26,
      job :{
        title: "Software Engineer"
       }
    },
    {
      id:3,
      name: "hassan", 
      age: 22,
      job :{
        title: "Software Engineer"
       }
    },
    {
      id:4,
      name: "Yousaf",
      age: 50,
      job :{
        title: "Software Engineer"
       }
    }
  ];
  count: number = 0;
  //this is use to manupulate the DOM element. And use ngAfterViewInit() life cycle hook
  //ElementRef us element ka reference hota he jis k under template reference hum Use krte he.
  @ViewChild("btn") btn: ElementRef; 
  @ViewChild("input") input: ElementRef;
  @ViewChild("btn1") btn1: ElementRef;
  @ViewChild("name") name: ElementRef;
  @ViewChild("color") color: ElementRef;

  subscription: Subscription;
  subscription1: Subscription;

  urlOnline = "https://api.publicapis.org/entries";
  allUsers : Observable<any>;
  maleUsers;
  femaleUsers;

  ngOnInit(): void {
    // this._testService.rSubject.subscribe(
    //   result => {
    //     this.userList1.push(result);
    //   }
    // );
    // this._testService.aSubject.subscribe(
    //   result => {
    //     this.onCompleteVal = result;
    //   }
    // );
    //====================
    // this.RetryandRetrywhenandDelayandScan();
    // this.IntervalandTimer();
    // this.Tap();
    // this.ToArray();
    // this.Map();
    // this.Pluck();
    // this.Filter();
    // this.TakeandTakelastandTakeuntil();
    // this.ConcatandMerge();
    // this.MapandMergeAllandMergeMap();
    //this.MapandConcatAllandConcatmap();
    //this.MapandSwitchallandSwitchmap();
    // this.MergemapandConcatemapandSwitchmap();
    // this.ShareReplay();
    // this.CatchErrorandThrowError();
    //====================
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ngAfterViewInit(): void{
    //====================
    // this.Fromevent();
    // this.DebouceTimeandDistinctUntilChanged();
    // this.Exaustmap();
    // this.CombineLatestandWithLatestFrom();
    // this.ZipandForkzip();
    //====================
  }
  getData(){
    var data = new Promise((resolve, reject) => {
      reject("This is rejected!");
      //resolve("This is resolved!");
    });
    data.then(res => {
      console.log("Then called: ",res);
    }).catch(res => {
      console.log("catch called: ",res);
    });
  }
  userList1 = [];
  userList2 = [];
  user2Subscribe = "Subscribe";
  user2Subscription :Subscription;
  user2Mode = false;
  addVideo(video: string){
    this._testService.rSubject.next(video);
  }
  userList2Subscribe(){
    if(!this.user2Mode){
      this.user2Subscription = this._testService.rSubject.subscribe(
        result => {
        this.user2Subscribe = "Unsubscribe"
          this.userList2.push(result);
          this.user2Mode = true;
        }
      );
    }else{
      this.user2Subscribe = "Subscribe"
      this.user2Subscription.unsubscribe();
      this.user2Mode = false;
    }
  }

  addAsyncVideo(val: string){
    console.log(val);
    this._testService.aSubject.next(val);
  }
  onCompleteVal: string = "";
  onComplete(){
    this._testService.aSubject.complete();
  }
  getPrimeMinister(data){
    return of(data + " is Prime Minister").pipe(delay(3000));
  }
  postDataForExaustmap(){
    return of(this.count).pipe(
      delay(1000),
      map(data => data + 1)
    );
  }
  //catchErrorandThrowError
  CatchErrorandThrowError(){
    this._testService.getUsers().subscribe(
      result => {
        console.log(result);
      },
      error => {
        console.log(error);
      },
    );
  }
  // Zip: when we detect changes on both obserable, than it emit data.
  // forkZip: combine final values and then emit. after that it not emit any data.
  ZipandForkzip(){
    var nameObs = fromEvent<any>(this.name.nativeElement, "change").pipe(take(2), map(x => x.target.value));
    var colorObs = fromEvent<any>(this.color.nativeElement, "change").pipe(take(2), map(x => x.target.value));
    zip(nameObs, colorObs).subscribe(
      ([name, color]) => {
        console.log(name, color);
      }
    );
    forkJoin(nameObs, colorObs).subscribe(
      ([name, color]) => {
        console.log("Fork Join:"+ name, color);
      }
    );
  }
  // combineLatest: Get latest single value of two streams and than combine it.
  // WithLatestFrom: we set master and slave 1)- Master: when we change in master than data emit. 2)- Slave: when we change in slave than changes no effect.
  CombineLatestandWithLatestFrom(){
    console.log(this.name);
    var nameObs = fromEvent<any>(this.name.nativeElement, "change").pipe(map(x => x.target.value));
    var colorObs = fromEvent<any>(this.color.nativeElement, "change").pipe(map(x => x.target.value));
    // combineLatest()
    combineLatest(nameObs, colorObs).subscribe(
      ([name, color]) => {
        // console.log(name, color);
      }
    );
    // WithLatestFrom ==> here nameObs is master and colorObs is slave: mean when master change than its working.
    nameObs.pipe(withLatestFrom(colorObs)).subscribe(
      result => {
        console.log(result);
      }
    )
  }
  //ShareReplay: This is use to avoid duplicate Http request.
  ShareReplay(){
    this.allUsers = this._testService.getUsers().pipe(
      shareReplay()
    );
    this.maleUsers = this.allUsers.pipe(
      map(res => res.filter(
        fil => {
          return fil.gender == "Male"
          // return fil['gender'] == "Male"
        }
      ))
    );
    this.femaleUsers = this.allUsers.pipe(
      map(res => res.filter(
        fil => {
          return fil.gender == "Female"
          // return fil['gender'] == "Female"
        }
      ))
    );
    console.log(this.allUsers);
  }
  //Exaustmap : It is use to send single request on multiple clicking. like on save button
  Exaustmap(){
    fromEvent(this.btn1.nativeElement, "click").pipe(
      // concatMap(() => this.postDataForExaustmap())
      exhaustMap(() => this.postDataForExaustmap()) // we should use API on this site.
    ).subscribe(
      result => {
        this.count = result;
        console.log(result);
      }
    );
  }

  //mergeMap, concatMap and, switchMap
  MergemapandConcatemapandSwitchmap(){
    var source = from(["Imran Khan", "Zardari", "Nawaz Sharif"]);
    // mergeMap
    source.pipe(
      mergeMap(x => this.getPrimeMinister(x))
    ).subscribe(
      result =>{
        console.log("M => "+ result);
      }
    );
    // concatMap
    source.pipe(
      concatMap(x => this.getPrimeMinister(x))
    ).subscribe(
      result => {
        console.log("C => "+ result);
      }
    );
    // switchMap
    source.pipe(
      switchMap(x => this.getPrimeMinister(x))
    ).subscribe(
      result => {
        console.log("S => "+result);
      }
    );
  }

  //Concat and Merge
  ConcatandMerge(){
    //concat complete first stream, than second and then so on.
    //merge works parallel on all stream to emit data.
    var techSource = interval(1200).pipe(take(5), map(res => "Tech Video# " + (res+1)));
    var newsSource = interval(900).pipe(take(3), map(res => "News Video# " + (res+1)));
    var vlogSource = interval(1000).pipe(take(4), map(res => "Vlog Video# " + (res+1)));

    var concatResult = concat(techSource, newsSource, vlogSource);
    concatResult.subscribe(
      result => {
        // console.log(result);
      }
    )
    var mergeResult = merge(techSource, newsSource, vlogSource);
    mergeResult.subscribe(
      result => {
        // console.log(result);
      }
    )
  }
  //map, switchAll, switchMap : unsubscribe all previous emits and emit latest data.(This is use in search functionality like Google Search)
  // switch app
  MapandSwitchallandSwitchmap(){
    var source = from(["Hamid", "Hassan", "Hamza"]);
    // Example# 1
    source.pipe(
      map(x => this.getDataforMergeMap(x))).subscribe(
      result => {
        result.subscribe(
          result2 =>{
            // console.log(result2);
          }
        );
      }
    );
    // Example# 2
    source.pipe(
      map(x => this.getDataforMergeMap(x)),
      switchAll()
    ).subscribe(
      result => {
        // console.log(result);
      }
    );
    // Example# 3
    source.pipe(
      switchMap(x => this.getDataforMergeMap(x))
    )
    .subscribe(
      result => {
        console.log(result);
      }
    );
  }

  //map, concatAll, concatMap : (This is use in mobile notifications)
  MapandConcatAllandConcatmap(){
    var source = from(["Hamid", "Hassan", "Hamza"]);
    // Example# 1
    source.pipe(map(x => this.getDataforMergeMap(x)))
    .subscribe(
      result => {
         result.subscribe(
          result2 => {
            // console.log(result2);
          }
         );
      }
    );
    // Example# 2
    source.pipe(
      map(res => this.getDataforMergeMap(res)),
      concatAll()
      ).subscribe(
      result => {
        // console.log(result);
      }
    );
    // Example# 3: Difference between concatMap() and mergeMap() 
    source.pipe(
      concatMap(x => this.getDataforMergeMap(x))
    ).subscribe(
      result => {
        console.log(result);
      }
    );
    source.pipe(
      mergeMap(x => this.getDataforMergeMap(x))
    ).subscribe(
      result => {
        console.log(result);
      }
    );
  }

  //map, mergeAll, mergeMap : This is a Flattening Operator beacause we subscribe obserable within subscribe.
  //Flattening operator: kisi subscribe k ander kisi or ko subscribe krna.mean inner oberservable ki value ko extract krna.
  MapandMergeAllandMergeMap(){
     var source = from(["Tech", "News", "Vlog", "Entertainment"]);
    // Example# 1
     source.pipe(
      map(res => this.getDataforMergeMap(res)) //This function will be return observable.
      ).subscribe(
      result => {
        result.subscribe(
          x => {
            // console.log(x);
          }
        )
      }
     );
    // Example# 2
    source.pipe(
      map(res => this.getDataforMergeMap(res)),
      mergeAll() //By using mergeAll, we don't need to subscribe within subscribe.
    ).subscribe(
      result => {
        // console.log(result);
      }
    );
    // Example# 3
    source.pipe(
      mergeMap(res => this.getDataforMergeMap(res))
    ).subscribe(
      result => {
        // console.log(result);
      }
    );
  }
  getDataforMergeMap(data)
  {
    return of( data +" video uploaded!").pipe(delay(2000));
  }
    //debouceTime() and distinctUntilChanged(): This is mostly use in search
  DebouceTimeandDistinctUntilChanged(){
    var source = fromEvent<any>(this.input.nativeElement, "keyup");

    source.pipe(
      map(event => event.target.value),
      debounceTime(2000),
      distinctUntilChanged()
    ).subscribe(
      result => {
        console.log(result);
      }
    );
  }
  //take, takelast, takeuntil.
  TakeandTakelastandTakeuntil(){
    //Example# 1
    var source = timer(1000, 1000)
    source.pipe(
      take(5)
      ).subscribe(
        result => {
          console.log(result);
      }
    )
    //Example# 2
    var user = from(this.user);
    user.pipe(
      takeLast(2)
    ).subscribe(
      result => {
        console.log(result);
      }
    )
    //Example# 3
    var condition = interval(5000);
    source.pipe(
      takeUntil(condition) // takeUntil uses condition.
    ).subscribe(
      result => {
        console.log(result);
      }
    )
  }
    // filter: this is use to filter the data.
    Filter(){
      const source = from(this.users);
      source.pipe(
        filter(user => user.age > 24 && user.name == 'Hamid'),
        toArray()
      ).subscribe(
        result => {
          console.log(result);
        }
      );
    }
  
  // Pluck: this is use to get property of object of data.
  Pluck(){
    var source = from(this.users); 
    source.pipe(
      // pluck("name")  
      pluck("job", "title") // This is use to get nested object property
     )
     .subscribe(
      result => {
        console.log(result);
      }
     );
  }
  // map() operator is use to transfer data accourding to our need.
  Map(){
    //Example# 1
    let source = interval(1000);
    this.subscription1 = source
    .pipe(
      map(mapx => "Video: " + mapx)
    )
    .subscribe(
      result => {
        console.log(result);
      }
    );
    setTimeout(()=> {
      this.subscription1.unsubscribe();
    }, 5000);
    //Example# 2
    this.subscription1 = source.pipe(
      map(data => data * 10)
    ).subscribe(
      result => {
        console.log(result);
      }
    );
     setTimeout(()=> {
         this.subscription1.unsubscribe();
     }, 5000);
    //Example# 3
     var users = from(this.users).pipe(
      map(data => data.name)
     ).subscribe(
      result => {
        console.log(result);
      }
     );
  }
  // create custom obserable
  CreateCustomObservable(){
    // Example# 1
    var obs = Observable.create(observer => {
      setTimeout(() => {
        observer.next("Video: 1"); // next() is use to emit data.
      }, 1000);
      setTimeout(() => {
        observer.next("Video: 2");
        observer.error(new Error("This is error!")); //error() is use to emit error.
      }, 2000);
      setTimeout(() => {
        observer.next("Video: 3");
        observer.complete(); // complete() is use when our observer completed.
      }, 3000);
      setTimeout(() => {
        observer.next("Video: 4");
      }, 4000);
    });
    obs.subscribe(
      result => {
        // console.log(result);
      },
      error => {
        // console.log(error);
      },
      () => {
        // console.log("this is completd");
      }
    );
    // Example# 2
    var obs1 = Observable.create(observer => {
      let coun = 1;
      setInterval(() => {
        observer.next("Video: ", coun);
        coun++;
      }, 1000);
    });
    this.subscription = obs1.subscribe(
      result => {
        // console.log(result);
      }
    )
  }
  // toArray() operator : Collects all emissions and emit them as an array when the source completes.
  ToArray(){
    // Example# 1
    var source = of("Hamid", "Hamza", "Hassan");
    source.pipe(
      toArray()
    ).subscribe(
      result => {
        console.log(result);
      }
    );
    // Example# 2
    var source2 = interval(1000);
    source2.pipe(
      take(5),
      toArray()
    ).subscribe(
      result => {
        console.log(result);
      }
    );
    // Example# 3
    var source3 = from(this.users);
    source3.pipe(
      toArray()
    ).subscribe(
      result => {
        console.log(result);
      }
    );
  }
  // Of and From operator
  OfandFrom(){
    // Of operator converts aurgument to observable stream.
    // Example# 1
    var source = of("Hamid", "Hamza", "Hassan");
    source.subscribe(
      response => {
        console.log(response);
      }
      );
    // Example# 2
    var source2 = of({a:"Hamid", b:"Hamza", c:"Hassan"});
    source2.subscribe(
      response => {
        console.log(response);
      }
    );
    //From operator we use Array, array-liked object, an iterable object, Promise. We can use array in From operator and use array item as observable stream.
    // Example# 1
    var fromOp = from(["Hamid", "Hamza", "Hassan"]);
    fromOp.subscribe(
      response => {
        console.log(response);
      }
    );
    // Example# 2
    var promise = new Promise((res) => {
      setTimeout(()=>{
        res("Promise Resolved!");
      }, 3000);
    });
    var fromOp1 = from(promise);
    fromOp1.subscribe(
      response => {
        console.log(response);
      }
    );
    // Example# 3
    var fpromOp2 = from("Hamid");
    fpromOp2.subscribe(
      response => {
        console.log(response);
      }
    );
  } 
  // Tap/Do: this is use to transparently perform actions or side effects, such as logging.
  Tap(){
  var source = interval(1000);
    this.subscription = source.pipe(
      tap(x => {
        if(x > 2){
          this.subscription.unsubscribe();
        };
      }),
      map(x => this.user[x]),

    ).subscribe(
      result => {
        console.log(result);
      }
    );
  }
  // Interval and Timer operator
  IntervalandTimer(){
    //intarval and timer are same but main diiference is timer take two parameters. timer(delay, interval)
    var videoSubscription = new Subscription();
    var broadCasting = interval(1000);  
    var broadCasting = timer(5000,1000);
    videoSubscription = broadCasting.subscribe(
      response => {
        console.log("Video: ", response);
        if(response >= 5){
          videoSubscription.unsubscribe();
        }
      }
    );
  }
  // retry, retryWhen, delay, scan: this is test by closing internet
  RetryandRetrywhenandDelayandScan(){
    this.http.get("https://api.publicapis.org/entries").pipe(
      // retry(2)
      retryWhen(err => err.pipe(
        delay(5000),
        scan(count => {
          if(count > 3){
            throw err;
          }else{
            return count = count + 1;
          }
        }, 0)
      ))
    ).subscribe(
      result => {
        console.log(result);
      }
    );
  }
  // How we create Obserable stream by using FromEvent.
  //   1)- we can create stream as below by:
  //       User Input(Click on button)
  //       Http Request
  //       Array
  //       Objects
  Fromevent(){
     fromEvent(this.btn.nativeElement, "click").subscribe(
      response => {
        // console.log("Video: ", this.counter++);
      },
      error => {
        // console.log(error);
      }
    )
  }
}
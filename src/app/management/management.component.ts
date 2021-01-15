import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import { User } from '../user';
import { UserService } from '../user.service';
import { Station } from '../station';
import { StationService } from '../station.service';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.less']
})

export class ManagementComponent implements OnInit {

  error = '';
  success = '';
  test = '';
  users: User[];
  stations: Station[];
  selectedUser: User[];
  control: any;
  

  

  //constructor(private userService: UserService, private stationService: StationService, private fb: FormBuilder) {
    constructor(private userService: UserService, private stationService: StationService) {
    /*
    this.control = this.fb.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      //email: ['', [Validators.required]], //TODO validation
      site: ['', [Validators.required, Validators.minLength(5)]] //TODO validation
    });
    */
  }



  getUsers(): void {
    this.userService.getUsers().subscribe(
      (res: any) => {
        this.users = res;
      },
      (err) => {
        this.error = err;
      }
    );
  }

  onSelect(user): void {
    this.selectedUser = user;
  }

  onSubmitUpdate(f: NgForm):void {
      console.log('update', f.value);
      this.userService.updateUser(f.value).subscribe();
      //window.location.reload();
  }

  onSubmitDelete(id):void {
    console.log(id);
        this.userService.deleteUser(id).subscribe();
        //window.location.reload();
  }


  createUser(f: NgForm): void {
    this.userService.createUser(f.value).subscribe();
  }


  ngOnInit(): void {
    this.getUsers();
    this.stationService.getStations()
    .subscribe(stations =>  this.stations = stations);

  }
}

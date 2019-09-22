import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as UsersActions from './ngrx/user.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ngrx-users-app';

  constructor(private store:Store<{ users: any }>){}

  ngOnInit(){
    //this.loadUsers()
  }

  loadUsers(){
    this.store.dispatch(UsersActions.loadUsers)
  }

}

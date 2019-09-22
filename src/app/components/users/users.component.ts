import { Component, OnInit, TemplateRef} from '@angular/core';
import * as UsersActions from '../../ngrx/user.actions'; 
import { Observable } from 'rxjs'
import { Store , select} from '@ngrx/store';
import { selectAllUsers ,selectLastUserId} from '../../ngrx';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { faEdit,faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users$: Observable<any>;
  lastUserId:any;
  modalRef: BsModalRef;
  payload:any = { }
  icons:any = {
    edit : faEdit,
    remove:faTrash
  }
  editMode:boolean = false;

  constructor(private store: Store<{ users: any }>,
              private modalService: BsModalService) {
    this.users$ = store.pipe(select(selectAllUsers));        
    store.pipe(select(selectLastUserId)).subscribe(lastUserId => {      
      this.lastUserId = lastUserId;      
    })
  }

  ngOnInit() {
    this.loadUsers()
  }

  loadUsers(){
    this.store.dispatch(UsersActions.loadUsers())
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  addUser(){
    this.store.dispatch(UsersActions.addUser({
      user:{
        id:++this.lastUserId,
        name:this.payload.name,
        phone:this.payload.phone,
        email:this.payload.email,
        website:this.payload.website
      }}
    ));
    this.modalRef.hide();
    this.payload = {
      name:'',
      phone:'',
      email:'',
      website:''
    }
  }

  getUserDetails(user){
      this.payload = {
        id:user.id,
        name:user.name,
        phone:user.phone,
        website:user.website,
        email:user.email
      }
  }

  setSelectedUserId(id){
    this.store.dispatch(UsersActions.setSelectedUserId({id}))
  }

  updateUser(){
    this.store.dispatch(UsersActions.updateUser({
      user:{
        id:this.payload.id,
        changes:{
          name:this.payload.name,
          phone:this.payload.phone,
          email:this.payload.email,
          website:this.payload.website
        }
      }}
    ));
    this.modalRef.hide();
    this.payload = {
      name:'',
      phone:'',
      email:'',
      website:''
    }
  }

  deleteUser(){
    this.store.pipe(select(state => state.users.selectedUserId)).subscribe(selectedUserId =>{
      if(selectedUserId){
        this.store.dispatch(UsersActions.deleteUser({id:selectedUserId}))
        this.modalRef.hide();
      }
    }).unsubscribe(); // unsubscribe to not delete users every time selectedUserId changed
  }

  deleteAllUsers(){
    this.store.dispatch(UsersActions.clearUsers())
    this.modalRef.hide()
  }

}

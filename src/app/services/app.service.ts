import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  ApiUrl = "https://jsonplaceholder.typicode.com/users";

  constructor(private http:HttpClient) { }

  loadUsers(){
    return this.http.get(this.ApiUrl)
  }
}

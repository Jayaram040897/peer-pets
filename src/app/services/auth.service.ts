import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  public isAuthenticated(): boolean {
    const token:any = localStorage.getItem('token');
    if(!token){
      return false;
    }
    return true;
  }

  login(user:any): Observable<any>{
    return this.httpClient.post(`${environment.baseAPI}/api/login`, user);
  }

  register(user:any): Observable<any>{
    return this.httpClient.post(`${environment.baseAPI}/api/register`, user);
  }

  userIdExist(user:any): Observable<any>{
    return this.httpClient.post(`${environment.baseAPI}/api/userIdExist`, user);
  }
}

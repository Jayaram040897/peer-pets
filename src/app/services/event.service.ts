import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservableLike } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventService {



  constructor(private httpClient: HttpClient) { }

  // private getHttpOptionWithLogin() {
  //   let userData = localStorage.getItem('token') || '{}';
  //   let userRefreshToken = localStorage.getItem('refreshToken') || '{}';
  //   let headers = new HttpHeaders();
  //   headers = headers.append('authorization', userData);
  //   headers = headers.append('userRefreshToken', userRefreshToken);
  //   let options = { headers: headers };
  //   return options;
  // }

  addPets(petData:any): Observable<any>{
    //  let authHeader = this.getHttpOptionWithLogin();
    return this.httpClient.post(`${environment.baseAPI}/api/addPet`, petData);
  }
  getPetsList(){
    // let authHeader = this.getHttpOptionWithLogin();
    return this.httpClient.get(`${environment.baseAPI}/api/getPetList`);
  }
  getMyPetList(){
    // let authHeader = this.getHttpOptionWithLogin();
    return this.httpClient.get(`${environment.baseAPI}/api/getMyPetList`);
  }
  updatePetStatus(petValue:any): Observable<any>{
    //  let authHeader = this.getHttpOptionWithLogin();
    return this.httpClient.put(`${environment.baseAPI}/api/updatePet`, petValue);
  }
  getSearchValue(searchValue:any): Observable<any>{
    // let authHeader = this.getHttpOptionWithLogin();
    return this.httpClient.post(`${environment.baseAPI}/api/petSearch`, searchValue);
}
}

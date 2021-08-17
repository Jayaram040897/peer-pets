import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        
        let userData = localStorage.getItem('token') || '{}';
        let userRefreshToken = localStorage.getItem('refreshToken') || '{}';
            const headers = new HttpHeaders({
                'authorization': userData,
                'userrefreshtoken':userRefreshToken
            });
            request = request.clone({headers});
        
        return next.handle(request);
    }
}
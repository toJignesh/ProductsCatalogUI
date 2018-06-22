import { Observable } from 'rxjs';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";

export class JwtInterceptor implements HttpInterceptor{
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if(currentUser && currentUser.token){
            request = request.clone({
                setHeaders:{
                    Authorization: `Bearer ${currentUser.token}`
                }
            });
        }

        return next.handle(request);
    }
}
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './components/user/user.service';
import { SessionStorageService } from 'ngx-webstorage';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router, private sessionSt: SessionStorageService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {

    if (this.userService.isAuthenticated) return true;
    let authStatus = this.userService.tokenCheck();
    authStatus.subscribe(
      isAuthenticated => {
        if (!isAuthenticated) {
          this.sessionSt.store("redirectURL", state.url);
          this.router.navigate(['/users/sign-in']);
        }
      }
    );
    return authStatus;

  }
}

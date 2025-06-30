import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { NotificationService } from '../service/notification.service';
import { NotificationType } from '../enum/notification-type.enum';

@Injectable({
  providedIn: 'root'
})
/**
* Checks if the user is logged in before allowing access to certain routes.
* If the user is not logged in, it redirects them to the login page.
*/
export class AuthenticationGuard implements CanActivate {

  constructor(private authenticationService: AuthenticationService, private router: Router, private notificationService: NotificationService) { }

  canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.isUserLoggedIn();
  }
  
  private isUserLoggedIn(): boolean {
    if(this.authenticationService.isUserLoggedIn()){
      return true;
    }
    this.router.navigate(['/login']);
    this.notificationService.notify(NotificationType.ERROR, `You need to log in to access this page.`.toUpperCase());
    return false;
  }
}

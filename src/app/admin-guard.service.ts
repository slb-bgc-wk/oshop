import { Injectable } from '@angular/core';
import { CanActivate} from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate {


  constructor(private userService: UserService, private auth: AuthService) { }

  canActivate(){
      return this.auth.user$.pipe(switchMap((user) => {
        return this.userService.read(user!.uid);
      })).pipe(map(appUser => {
        console.log(appUser);
        // return appUser.isAdmin;
        return appUser[0] as boolean;
      }));
    }
}

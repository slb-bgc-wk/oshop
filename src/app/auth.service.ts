import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat/app';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<firebase.User | null>;

  constructor(private afAuth: AngularFireAuth, private router : Router, private route : ActivatedRoute,
    private user: UserService
    ) {
    this.user$ = afAuth.authState!; 
  }


  logout() {
    this.afAuth.signOut();
    this.router.navigate(['/']);
  }

  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(response => {
      //console.log(response);
      this.router.navigateByUrl(localStorage.getItem('returnUrl') || '/');
    });
  }

}

import { Injectable } from '@angular/core';
import { getDatabase, set, ref, onValue } from 'firebase/database';
import firebase from 'firebase/compat/app';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';





interface Appuser{
  name: string,
  email: string,
  isAdmin: boolean
}

@Injectable({
  providedIn: 'root'
})



export class UserService {

  public isAdmin = false;
  items: Observable<any>;

  constructor(private db: AngularFireDatabase) { }

  save(user: firebase.User) {
    let db = getDatabase();
    set(ref(db, '/users/' + user.uid), {
      name: user.displayName,
      email: user.email
    });
  }

  read(uid : string){
    return this.db.list('/admins/' + uid).valueChanges();
  }
}

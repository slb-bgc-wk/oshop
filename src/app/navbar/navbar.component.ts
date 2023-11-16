import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { CartService } from '../cart.service';
import { ShoppingCart } from '../models/shopping-cart';
import { UserService } from '../user.service';


@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public isCollapsed = true;
  public isAdmin : boolean;
  public cart$ : Observable<ShoppingCart>;
  constructor(
    public auth : AuthService, 
    public userService : UserService,
    private cartService : CartService
    ) {}

  async ngOnInit() {
    this.auth.user$.pipe(switchMap((user) => this.userService.read(user!.uid)))
    .subscribe(_userAdd => {this.isAdmin = _userAdd[0] as boolean});
    this.cart$ = await this.cartService.getCart();
  }

  logout() {
    this.auth.logout();
  }



}

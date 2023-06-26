import { Injectable } from "@angular/core";
import { CanLoad, Route, Router, UrlSegment, UrlTree } from "@angular/router";
import { UserService } from "../services/user/user.service";
import { User } from "../shared/models/User";
import { ToastrService } from "ngx-toastr";


@Injectable({
    providedIn: 'root'
})

export class RoleGuard implements CanLoad {

    private USER_KEY = 'User';

    constructor(private userService: UserService,private router: Router, private toastr: ToastrService) { }

    getUserFromLocalStorage(): User | null {
        const userJson = localStorage.getItem(this.USER_KEY);
        if (userJson) {
          const user = JSON.parse(userJson) as User;
          return user;
        }
        return null;
      }
    
    canLoad(route: Route): boolean {
        const user = this.getUserFromLocalStorage()
        if (user?.isAdmin == true) {
          return true; // User has the required role, allow loading
        } else if (user) {
          this.toastr.warning('Not Authorized!') // Redirect to unauthorized page if user does not have the required role
          return false; // Prevent loading
        } else {
            this.router.navigate(['/login']);
            return false
        }
    }

}
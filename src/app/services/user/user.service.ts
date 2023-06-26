import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Data } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IUserLogin, IUserRegister, User } from 'src/app/shared/models/User';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

 
export class UserService {

  USER_KEY: string = "User";

  private readonly userUrl: string;
  private readonly userLogin: string;
  private readonly userRegister: string;

  user!: User;
  private user$ = new BehaviorSubject<User>(this.getUserFromLocaleStorage())
  public userObservable: Observable<User>;

  constructor(private httpClient: HttpClient, private toastrService: ToastrService) { 
    this.userUrl = `${environment.baseUrl}/api/users`;
    this.userLogin = `${this.userUrl}/login`;
    this.userRegister = `${this.userUrl}/register`
    this.userObservable = this.user$.asObservable();
   }

  getUsers(): Observable<User[]> {
  return this.httpClient.get<User[]>(this.userUrl)  
  }

  login(userLogin: IUserLogin): Observable<User>{
    return this.httpClient.post<User>(this.userLogin, userLogin).pipe(
      tap({
        next: (user) => {
          this.setUserToLocaleStorage(user)
          this.user$.next(user);
          this.toastrService.success(
            `Welcom ${user.name}`,
            'Login Successful'
          )
        },
        error: (errorRespone) => {
          this.toastrService.error(errorRespone.error, 'Login Faild')
        }
      })
    );
  }

  register(userRegister: IUserRegister): Observable<User> {
    return this.httpClient.post<User>(this.userRegister, userRegister).pipe(
      tap({
        next: (user) => {
        this.setUserToLocaleStorage(user);
        this.user$.next(user);
        this.toastrService.success(`
        Welcome ${user.name}!,`, 'Register Successful')
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error,
            'Register Failed')
        }
      })
    )
  }

  logout(): void {
    this.user$.next(this.user);
    this.toastrService.info(`Logout successful`)
    localStorage.removeItem(this.USER_KEY);
    setTimeout(() => {
      window.location.reload();
    }, 400); 
  }

  private setUserToLocaleStorage(user: User): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user))
  }

  private getUserFromLocaleStorage(): User {
    const jsonUser = localStorage.getItem(this.USER_KEY)
    if(jsonUser) return JSON.parse(jsonUser) as User;
    return this.user
  }
}

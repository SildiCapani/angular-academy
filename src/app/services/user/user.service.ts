import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IUserLogin, User } from 'src/app/shared/models/User';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})


export class UserService {

  private readonly userUrl: string;
  private readonly userLogin: string;

  user!: User;
  private user$ = new BehaviorSubject<User>(this.user)
  public userObservable: Observable<User>;

  constructor(private httpClient: HttpClient, private toastrService: ToastrService) { 
    this.userUrl = `${environment.baseUrl}/api/users`;
    this.userLogin = `${this.userUrl}/login`
    this.userObservable = this.user$.asObservable()
   }

  getUsers(): Observable<User[]> {
  return this.httpClient.get<User[]>(this.userUrl)  
  }

  login(userLogin: IUserLogin): Observable<User>{
    return this.httpClient.post<User>(this.userLogin, userLogin).pipe(
      tap({
        next: (user) => {
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
}

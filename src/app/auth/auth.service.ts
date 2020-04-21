import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { AuthDataLogin } from './auth-data-login.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
    providedIn: "root"
})
export class AuthService{
    private isAuthenticated = false;
    private token: string;
    private authStatusListener = new Subject<boolean>();
    private userName : string;
    constructor(private http: HttpClient, private router: Router){}

    getToken(){
        return this.token;
    }

    getUserName(){
        if(this.isAuthenticated){
            return
        }
        return this.userName;
    }

    getIsAuth(){
        return this.isAuthenticated;
    }

    getAuthStatusListener(){
        return this.authStatusListener.asObservable();
    }

    createUser(name: string, email: string, password: string){
        const authData: AuthData = {name: name, email: email, password: password}
        this.http.post("http://localhost:3000/api/user/signup", authData).subscribe(response =>{
            console.log(response);
        })
    }

    login(email: string, password: string){
        const authData: AuthDataLogin = {email: email, password: password}
        this.http.post<{token: string}>("http://localhost:3000/api/user/login", authData).subscribe(response => {
            const token = response.token;
            this.token = token;
            this.userName = JSON.parse(atob(token.split('.')[1])).email;
            if(token){
                console.log(this.userName);
                this.isAuthenticated = true;
                this.authStatusListener.next(true);
                this.router.navigate(['/']);
            }
        });
    }

    logout(){
        this.token = null;
        this.isAuthenticated = false;
        this.authStatusListener.next(false);
        this.router.navigate(['/']);
    }
}
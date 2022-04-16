import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {
  constructor(private router: Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): 
    Observable<boolean> | boolean{
if(localStorage.getItem("getToken") !=null && localStorage.getItem("getToken")){
  console.log("true",localStorage.getItem("getToken"));
  this.router.navigate(['']);

  return true

} 
else{
  console.log(localStorage.getItem("getToken"));
  this.router.navigate(['/login'])
  return false
}
    
  }
  
}

import { Component, OnInit } from '@angular/core';
import {HttpClient,HttpHeaders,HttpParams} from '@angular/common/http';
import {AppServiceService} from '../app-service.service'; 
import { Router } from '@angular/router';

declare var $:any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  ElectionName="";
  getData:any[]; 
  myheader:any;
  loggedUser:string;

  firstName:string=localStorage.getItem('firstName');
  lastName:string=localStorage.getItem('lastName');
  

  constructor(private getservicename: AppServiceService,  private router: Router) {
    this.myheader=this.getservicename.getHeaders();     
  }

  
  getActiveElectionData()
   {
    this.getservicename.GetActiveElectionName({headers: this.myheader}).subscribe(data=>{
      this.getData=data.data; 
      this.ElectionName=data.data.electionName+' ('+data.data.electionYear+')';
      console.log(this.ElectionName);
    });
   }

   logout() {
    //this.authenticationService.logout();
    localStorage.removeItem("getToken");        
    localStorage.removeItem("electionId");
    localStorage.removeItem("uId");
    localStorage.removeItem("role");
    localStorage.removeItem("userName");
    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");
    localStorage.removeItem("photo"); 
    sessionStorage.clear();
    this.router.navigate(['/login']);

   }
  
  ngOnInit(): void {
    this.getActiveElectionData();
    this.loggedUser = this.firstName+' '+this.lastName;
  }
}

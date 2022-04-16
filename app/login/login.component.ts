import { Component, OnInit, ɵConsole } from '@angular/core';
import {AppServiceService} from '../app-service.service';
import {HttpClient,HttpHeaders,HttpParams} from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import{LoginModel} from '../ViewModel';
import {NgxSpinnerService} from 'ngx-spinner';


declare var $:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit { 
  submitText="";
  returnUrl: string;
  error: string;
  loginModel:LoginModel=new LoginModel();

  username:string;
  password:string;
  constructor(private appservice: AppServiceService,
    
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService
    
    ) {}
 
  onSubmit(data){
  this.submitText="Loading...";
  this.loginModel=data;
//console.log(userlogin);
     sessionStorage.clear();
    this.spinner.show();
    this.appservice.PostLogin(this.loginModel).subscribe(res=>{
      
      if(res.response ==1){         
        localStorage.setItem("getToken",res.data.token);        
        localStorage.setItem("electionId",res.data.electionId);
        localStorage.setItem("uId",res.data.id);
        localStorage.setItem("role",res.data.role);
        localStorage.setItem("userName",res.data.userName);
        localStorage.setItem("firstName",res.data.firstName);
        localStorage.setItem("lastName",res.data.lastName);
        localStorage.setItem("photo",res.data.photo);
        setTimeout(() => { 
          this.spinner.hide();
        }, 2000);        
        this.router.navigate(['./home']);
      }
      else{
        this.submitText="Sign In";  
        this.spinner.hide();
        $('.msgagr').html("* Invalid UserName/Password...!").fadeIn('slow').css({"color": "red", "padding": "6px", "border-radius": "2px" }); //also show a success message 
        $('.msgagr').delay(2000).fadeOut('slow');
      } 
    });   
  }

  ngOnInit(): void {
    this.submitText="Sign In";  
  }
}


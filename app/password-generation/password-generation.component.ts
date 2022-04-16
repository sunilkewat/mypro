import { Component, OnInit } from '@angular/core';
import {AppServiceService} from '../app-service.service'; 
import { Router } from '@angular/router'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';

declare var $:any;

@Component({
  selector: 'app-password-generation',
  templateUrl: './password-generation.component.html',
  styleUrls: ['./password-generation.component.css']
})
export class PasswordGenerationComponent implements OnInit {
 
  
  myheader:any;  
  roleType:string; 
  menuList:any; 

  responceData:Array<any>;
  totalRecords:string;
  pageNo:Number=1;
  

  constructor(private getservicename: AppServiceService,private router: Router) {
    this.myheader=this.getservicename.getHeaders(); 
   }

   GetPasswordAllotmentList(Id: any) {   
   this.roleType = (document.getElementById("role") as HTMLInputElement).value;    
    this.getservicename.getPasswordgenerateList(this.roleType,{headers: this.myheader}).subscribe(data=>{
      this.responceData=data.data;
      this.totalRecords=data.data.length; 
    });
 }

 SaveData()
 {     
   var getarr = [];
   var getarr1 = [];
   var getarr2 = [];
   var getarr3 = [];
   var modelArray:Array<any>=[]; 
   this.roleType = (document.getElementById("role") as HTMLInputElement).value; 

   $('.txtmain').each(function(){ 
    if($(this).val()!="")
    {
      getarr.push($(this).val());
    }
  });

  $('.txtmain1').each(function(){ 
    if($(this).val()!="")
    {
      getarr1.push($(this).val());
    }
  });

  $('.txtmain2').each(function(){ 
    if($(this).val()!="")
    {
      getarr2.push($(this).val());
    }
  });

  $('.txtmain3').each(function(){ 
    if($(this).val()!="")
    {
      getarr3.push($(this).val());
    }
  });
 
  for(var i = 0; i < getarr1.length; i++)
       {
        modelArray.push(
        {
         "userId":getarr[i],
         "role":this.roleType,
         "userName":getarr1[i],
         "password":getarr2[i],
         "isActive":getarr3[i]
        });
      }

      var dataList='{ "_passwordGenModel": '+JSON.stringify(modelArray)+"}";
      this.getservicename.postPasswordgenerate(dataList,{headers: this.myheader})
      .subscribe(res=>{ 
        if(res["response"]=="1")
         {
          $('.msgagr').html("Data Save Successfully.!").fadeIn('slow').css({"color": "#1e8449 ", "padding": "6px", "border-radius": "2px" }); //also show a success message 
          $('.msgagr').delay(2000).fadeOut('slow'); 
         }
         else  if(res["response"]=="2")
         {
          $('.msgagr').html("Data Save Successfully.!").fadeIn('slow').css({"color": "#1e8449 ", "padding": "6px", "border-radius": "2px" }); //also show a success message 
          $('.msgagr').delay(2000).fadeOut('slow'); 
         }
         else
         {
          $('.msgagr').html("Try Again.!").fadeIn('slow').css({"color": "#1e8449 ", "padding": "6px", "border-radius": "2px" }); //also show a success message 
          $('.msgagr').delay(2000).fadeOut('slow'); 
         }
      });
 }

  ngOnInit(): void {
  }
}

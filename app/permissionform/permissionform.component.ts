import { Component, OnInit } from '@angular/core';
import { MenuModel } from '../ViewModel';
import {AppServiceService} from '../app-service.service'; 
import { Router } from '@angular/router';

declare var $:any;

@Component({
  selector: 'app-permissionform',
  templateUrl: './permissionform.component.html',
  styleUrls: ['./permissionform.component.css']
})
export class PermissionformComponent implements OnInit {

  getData:any[]; 
  myheader:any;  
  roleType:string;
  uId:any;
  menuList:any;
  menumodel:MenuModel=new MenuModel();

  constructor(private getservicename: AppServiceService,private router: Router) {
    this.myheader=this.getservicename.getHeaders(); 
   }

   getMenuList()
   {
    this.getservicename.getMenuData({headers: this.myheader}).subscribe(data=>{
      this.getData=data.data;    
    });
   }
 
   GetMenuList(Id: any) {  
     console.log(Id);  
    this.roleType = (document.getElementById("role") as HTMLInputElement).value;    
     this.getservicename.getpermissionmenuList(this.roleType,{headers: this.myheader}).subscribe(data=>{
      this.getData=data.data;   
     });
  }

   SaveData()
   {
      var chkArray=[];         
      this.menuList="";
      this.roleType = (document.getElementById("role") as HTMLInputElement).value;

      $('#tableData').find('input[type=checkbox]:checked').each(function() {         
        chkArray.push(this.value);
       }); 

       for(var i = 0; i < chkArray.length; i++)
       {
        this.menuList+=chkArray[i]+', ';
       }
  
       this.menumodel.role=this.roleType;
       this.menumodel.menu=this.menuList.substring(0, this.menuList.length - 2);
 
       this.getservicename.postAddUserMenuList(this.menumodel,{headers: this.myheader})    
       .subscribe(res=>{
         if(res["response"]=="1")
         {
           $('.msgagr').html("MenuList Save Successfully").fadeIn('slow').css({"color": "#1e8449 ", "padding": "6px", "border-radius": "2px" }); //also show a success message 
           $('.msgagr').delay(2000).fadeOut('slow');      
         }
         else if(res["response"]=="2")
         {
           $('.msgagr').html("MenuList Update Successfully").fadeIn('slow').css({"color": "#1e8449 ", "padding": "6px", "border-radius": "2px" }); //also show a success message 
           $('.msgagr').delay(2000).fadeOut('slow'); 
         }
         else
         {
           $('.msgagr').html("Try Again !").fadeIn('slow').css({"color": "#1e8449 ", "padding": "6px", "border-radius": "2px" }); //also show a success message 
           $('.msgagr').delay(2000).fadeOut('slow'); 
         }
          
       });

   }

  ngOnInit(): void {
    if(!localStorage.getItem('getToken'))
    {
      this.router.navigate(['/login']);  
    }
    this.getMenuList();
  }
}

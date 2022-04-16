import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppServiceService } from '../app-service.service'; 

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  menuData:any[];
  myheader:any;
  tempdata:any;

  constructor(private getservicename: AppServiceService, private router: Router) {
    this.myheader=this.getservicename.getHeaders(); 
   }

   getmenuList()
   {
    this.getservicename.getMenulist4user({headers: this.myheader}).subscribe(data=>{
      this.menuData=data.data;
     // this.tempdata="Jeevan Mahar";
      //console.log(this.menuData);
    });
   }

  ngOnInit(): void {
    if(!localStorage.getItem('getToken'))
    {
      this.router.navigate(['/login']);  
    }
    this.getmenuList();
  }
}

import { Component, OnInit } from '@angular/core';
import {HttpClient,HttpHeaders,HttpParams} from '@angular/common/http';
import {AppServiceService} from '../app-service.service'; 
import { stringify } from '@angular/compiler/src/util';
import { __makeTemplateObject } from 'tslib';
import { Router } from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import Swal  from 'sweetalert2';

declare var $:any;

@Component({
  selector: 'app-voterallot',
  templateUrl: './voterallot.component.html',
  styleUrls: ['./voterallot.component.css']
})
export class VoterallotComponent implements OnInit {

  submitText=""; 
  villageId:any;
  pageprabhariId:any;  
 
  getVillageData:any[]; 
  getpageprabhariData:any[];  
  
  myheader:any;  

  responceData:Array<any>;
  totalRecords:string;
  pageNo:Number=1;

  electionId:string=localStorage.getItem('electionId');

  constructor(private getservicename: AppServiceService, private router: Router,private spinner: NgxSpinnerService) {
    this.myheader=this.getservicename.getHeaders(); 
   }

   GetDataBind(Id: any) {    
    this.spinner.show();
    this.getservicename.GetAllocationVoterList(Id,{headers: this.myheader}).subscribe(data=>{  
      this.responceData=data.VoterList.data;
      this.totalRecords=data.VoterList.data.length;
      this.getpageprabhariData=data.PagePrabhariList.data;   
    });    
    setTimeout(() => { 
      this.spinner.hide();
    }, 2000);
   }

   getVillageList()
   {
    this.getservicename.getVillagedataList({headers: this.myheader}).subscribe(data=>{
      this.getVillageData=data.data;  
    });
   }
 
   SaveData() {  
     this.spinner.show();
    var chkArray=[]; 
    var modelArray:Array<any>=[];         
    $('#tableData').find('input[type=checkbox]:checked').each(function() {         
      chkArray.push(this.value);
     });     
     this.villageId=(document.getElementById("villageId") as HTMLInputElement).value;
     this.pageprabhariId=(document.getElementById("pagePrabhariId") as HTMLInputElement).value;      
     for(var i = 0; i < chkArray.length; i++)
     {
      modelArray.push(
      {
       "voterCardNo":chkArray[i],
       "electionId":this.electionId,
       "villageId":this.villageId,
       "pageprabhariId":this.pageprabhariId
      });
     }
 
     var dataList='{ "dataList": '+JSON.stringify(modelArray)+"}";       
      this.getservicename.postAllotVoterData(dataList,{headers: this.myheader})
      .subscribe(res=>{ 
        if(res.success==true)
         {
          Swal.fire('Voter Alloted Record Successfully!', '');
         }
         else
         {
          Swal.fire('Try Again ...!', '') 
         }
      });
      setTimeout(() => { 
        this.spinner.hide();
      }, 2000);
     }


  ngOnInit(): void {
      if(!localStorage.getItem('getToken'))
       {
         this.router.navigate(['/login']);  
       }

    this.getVillageList(); 
  }

}

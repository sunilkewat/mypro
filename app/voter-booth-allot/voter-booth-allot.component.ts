import { Component, OnInit } from '@angular/core';
import {HttpClient,HttpHeaders,HttpParams} from '@angular/common/http'; 
import {AppServiceService} from '../app-service.service'; 
import { stringify } from '@angular/compiler/src/util';
import { __makeTemplateObject } from 'tslib';
import { Router } from '@angular/router';

declare var $:any;

@Component({
  selector: 'app-voter-booth-allot',
  templateUrl: './voter-booth-allot.component.html',
  styleUrls: ['./voter-booth-allot.component.css']
})
export class VoterBoothAllotComponent implements OnInit {

  submitText="";
  voterTempId=0; 
  villageId:any;  
  boothNo:any;
  boothArea:any; 

  getData:any[]; 
  getVillageData:any[]; 
  getBoothNoData:any[]; 
  getElectionData:any[];  
  myheader:any;  

  responceData:Array<any>;
  totalRecords:string;
  pageNo:Number=1;

  electionId:string=localStorage.getItem('electionId');
  
  constructor(private getservicename: AppServiceService,private router: Router) {
    this.myheader=this.getservicename.getHeaders(); 
   }

   GetDataBind(Id: any) {    
     
    this.getservicename.getVoterboothallotdataList(Id,{headers: this.myheader}).subscribe(data=>{
    this.responceData=data.BoothAllotedVoterList.data;
    this.totalRecords=data.BoothAllotedVoterList.data.length; 

    this.getBoothNoData=data.BoothList.data;
    });

   
   }

   getVillageList()
   {
    this.getservicename.getVillagedataList({headers: this.myheader}).subscribe(data=>{
      this.getVillageData=data.data;    
     });
   }
   
   SaveData() {  
      var chkArray=[]; 
      var modelArray:Array<any>=[]; 
          
      $('#tableData').find('input[type=checkbox]:checked').each(function() {         
        chkArray.push(this.value);
       }); 

       this.villageId=(document.getElementById("villageId") as HTMLInputElement).value;
       this.boothNo=(document.getElementById("boothNo") as HTMLInputElement).value;
       this.boothArea=(document.getElementById("areaName") as HTMLInputElement).value;

       
       for(var i = 0; i < chkArray.length; i++)
       {
        modelArray.push(
        {
         "voterId":chkArray[i],
         "electionId":this.electionId,
         "villageId":this.villageId,
         "boothNo":this.boothNo,
         "boothArea":this.boothArea
        });
      }
 
       var dataList='{ "dataList": '+JSON.stringify(modelArray)+"}"; 
       //console.log(dataList);
        this.getservicename.postBoothAllotData(dataList,{headers: this.myheader})
        .subscribe(res=>{ 
          if(res["response"]=="1")
           {
            alert("Booth Alloted Successfully");
            this.GetDataBind(this.villageId);
           }
           else
           {
            alert("Try Again ...!");
           }
        });
      }
  
  ngOnInit(): void { 

    if(!localStorage.getItem('getToken'))
    {
      this.router.navigate(['/login']);  
    }
    
    this.getVillageList();
    //this.getBoothNoList();
   // this.getElectionList();
  }
}

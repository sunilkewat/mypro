import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import {HttpClient,HttpHeaders,HttpParams} from '@angular/common/http';
import{VoterModel} from '../ViewModel';
import {AppServiceService} from '../app-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { DatePipe } from '@angular/common'
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Pipe, PipeTransform } from '@angular/core';
import { stringify } from '@angular/compiler/src/util';
import {NgxSpinnerService} from 'ngx-spinner';
import Swal  from 'sweetalert2';

@Component({
  selector: 'app-voterlistform',
  templateUrl: './voterlistform.component.html',
  styleUrls: ['./voterlistform.component.css']
})
export class VoterlistformComponent implements OnInit {

  getVillageData:any[];
  myheader:any;
  responceData:Array<any>;
  totalRecords:string;
  pageNo:Number=1;
  searchText:any;

  constructor(private getservicename: AppServiceService, private formBuilder: FormBuilder, private router: Router,private spinner: NgxSpinnerService) {
    this.myheader=this.getservicename.getHeaders(); 
   }

   GetVillageList()
   {
    this.getservicename.getVillagedataList({headers: this.myheader}).subscribe(data=>{
        this.getVillageData=data.data;   
    });
   }

   getVoterDataList()
   {
    var Id=(document.getElementById("villageId") as HTMLInputElement).value;
    
    if(parseInt(Id)==0)
    {
       alert('Select village name');
    }
    else{
    this.spinner.show();
    this.getservicename.GetVillageVoterList(Id,{headers: this.myheader}).subscribe(data=>{
      this.responceData=data.VoterList.data;
      this.totalRecords=data.VoterList.data.length; 
      if(this.totalRecords>'0')
      {
        this.searchText;     
        //this.getVillageData=data.VillageList.data;   
      }  
    });
    setTimeout(() => { 
      this.spinner.hide();
    }, 2000);
   }
  }

  ngOnInit(): void {
    if(!localStorage.getItem('getToken'))
    {
      this.router.navigate(['/login']);  
    }
     this.GetVillageList();
  }

}

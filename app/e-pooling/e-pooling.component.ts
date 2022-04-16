import { Component, OnInit,ViewChild } from '@angular/core';
import {HttpClient,HttpHeaders,HttpParams} from '@angular/common/http';
import {AppServiceService} from '../app-service.service';
import { Router } from '@angular/router';
import * as  pluginDataLabels from 'chartjs-plugin-datalabels'; 
import {NgxSpinnerService} from 'ngx-spinner';
import { stringify } from '@angular/compiler/src/util';
import {  FormGroup} from '@angular/forms';
import Swal  from 'sweetalert2';

declare var $:any;

@Component({
  selector: 'app-e-pooling',
  templateUrl: './e-pooling.component.html',
  styleUrls: ['./e-pooling.component.css']
})
export class EPoolingComponent implements OnInit {

  searchText:any;
  myheader:any;
  isE_poolingShown:boolean;
  responceData:Array<any>;
  getVillageData: any[];  
  totalRecords:string;

  constructor(private getservicename: AppServiceService, private router: Router,private spinner: NgxSpinnerService) {
    this.myheader=this.getservicename.getHeaders(); 
   }


  getVillageList()
   {
    this.getservicename.getVillagedataList({headers: this.myheader}).subscribe(data=>{
      this.getVillageData=data.data;  
    });
   }

   GetePooling_villagedData(Id:number)
   { 
     this.isE_poolingShown=true; 
     this.spinner.show();
     this.getservicename.GetepoolingVillageVoterList(Id,{headers: this.myheader}).subscribe(data=>{  
      this.responceData=data.VoterList.data;
      this.totalRecords=data.VoterList.data.length; 
      this.searchText;
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

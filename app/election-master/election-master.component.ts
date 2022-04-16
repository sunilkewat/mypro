import { Component, OnInit } from '@angular/core';
import {HttpClient,HttpHeaders,HttpParams} from '@angular/common/http';
import{ElectionModel} from '../ViewModel';
import {AppServiceService} from '../app-service.service';
import {NgxSpinnerService} from 'ngx-spinner';
import { from } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

declare var $:any;

@Component({
  selector: 'app-election-master',
  templateUrl: './election-master.component.html',
  styleUrls: ['./election-master.component.css']
})
export class ElectionMasterComponent implements OnInit {
 
submitText="";
electionTempId=0;
myheader:any;
submitForm: FormGroup;
submitted = false;

getData:any[]; 
electionModel:ElectionModel = new ElectionModel();

responceData:Array<any>;
totalRecords:string;
pageNo:Number=1;

  constructor(private getservicename: AppServiceService, private formBuilder: FormBuilder, private ngxspinner: NgxSpinnerService,private router: Router) {
    this.myheader=this.getservicename.getHeaders(); 
   }

   getElectionDataList()
   { 
      this.getservicename.getElectionDataList({headers: this.myheader}).subscribe(data=>{
        this.responceData=data.data;
        this.totalRecords=data.data.length;
    });
   }

   CreateNew()
   {
    this.submitText="Save";
    this.clear();
    $("#modal-default").modal(); 
   }

   clear()
   {
    this.electionTempId=0; 
    this.electionModel.electionId=0;  
    this.electionModel.electionName='';
    this.electionModel.electionYear='';  
   }

   SelectedData(data)
   {
    this.submitText="Update";
    this.electionModel=data;    
    this.electionTempId=this.electionModel.electionId;  
    $("#modal-default").modal('show');
  }

  get f() { return this.submitForm.controls; }

  onSubmit(data){
    this.submitted = true; 
    if (this.submitForm.invalid) {
        return;
    }
    this.submitText="Loading ..";
    this.electionModel=data; 
    this.electionModel.electionId=this.electionTempId;  
    this.getservicename.postElectionData(this.electionModel,{ headers: this.myheader})    
    .subscribe(res=>{
      if(res["response"]=="1")
      {
        $('.msgagr').html("New Election Name Created Successfully").fadeIn('slow').css({"color": "#1e8449 ", "padding": "6px", "border-radius": "2px" }); //also show a success message 
        $('.msgagr').delay(2000).fadeOut('slow');
      setTimeout(function(){
        $("#modal-default").modal('hide');
      },2000)
      }
      else if(res["response"]=="2")
      {
        $('.msgagr').html("Election Name Record Update Successfully").fadeIn('slow').css({"color": "#1e8449 ", "padding": "6px", "border-radius": "2px" }); //also show a success message 
        $('.msgagr').delay(2000).fadeOut('slow');
      setTimeout(function(){
        $("#modal-default").modal('hide');
      },2000)
      }
      else
      {
        $('.msgagr').html("Try Again !").fadeIn('slow').css({"color": "#1e8449 ", "padding": "6px", "border-radius": "2px" }); //also show a success message 
        $('.msgagr').delay(2000).fadeOut('slow');
      setTimeout(function(){
        $("#modal-default").modal('hide');
      },2000)
      }
      
      this.getElectionDataList(); 
    });    
   }

   DeleteData(data)
   { 
    this.electionModel=data;        
    this.getservicename.DeleteElectionData(this.electionModel.electionId,{headers: this.myheader})
    .subscribe(res => { 
      $('.msgagr').html("Election Name Delete Successfully").fadeIn('slow').css({"color": "#1e8449 ", "padding": "6px", "border-radius": "2px" }); //also show a success message 
      $('.msgagr').delay(2000).fadeOut('slow'); 
      this.getElectionDataList();       
       });
   }

  ngOnInit(): void {

    if(!localStorage.getItem('getToken'))
    {
      this.router.navigate(['/login']);  
    }

    this.getElectionDataList();

    this.submitForm = this.formBuilder.group({ 
      electionName: ['', Validators.required],
      electionYear: ['', Validators.required]

  });

  }

}

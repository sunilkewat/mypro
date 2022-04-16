import { Component, OnInit } from '@angular/core';
import { Params } from '@angular/router';
import { from } from 'rxjs';
import {HttpClient,HttpHeaders,HttpParams} from '@angular/common/http';
import{ParentModel} from '../ViewModel';
import {AppServiceService} from '../app-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

declare var $:any;

@Component({
  selector: 'app-paren-master',
  templateUrl: './paren-master.component.html',
  styleUrls: ['./paren-master.component.css']
})
export class ParenMasterComponent implements OnInit {

submitForm: FormGroup;
submitted = false;

  submitText="";
  parentTempId=0;
  myheader:any; 

  getData:any[]; 
  getParentNameList:any[];
  parentModel:ParentModel = new ParentModel();

  responceData:Array<any>;
  totalRecords:string;
  pageNo:Number=1;

  constructor(private getservicename: AppServiceService, private formBuilder: FormBuilder, private router: Router) {
    this.myheader=this.getservicename.getHeaders(); 
   }

   getParentDataList()
   {
    this.getservicename.getParentdataList({headers: this.myheader}).subscribe(data=>{
      this.responceData=data.data;
      this.totalRecords=data.data.length;
    });
   }

   getParentNameDataList()
   {
    this.getservicename.getAllparentNameList({headers: this.myheader}).subscribe(data=>{
      this.getParentNameList=data.data;
      //console.log(this.getParentNameList);
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
    this.parentTempId=0; 
    this.parentModel.parentId=0;  
    this.parentModel.parentNameId='';
    this.parentModel.areaName='';  
   }

   SelectedData(data)
   {
    this.submitText="Update";
    this.parentModel=data;    
    this.parentTempId=this.parentModel.parentId;  
    $("#modal-default").modal('show');
  }

  get f() { return this.submitForm.controls; }

  onSubmit(data){
    this.submitted = true; 
    if (this.submitForm.invalid) {
        return;
    }

    this.submitText="Loading ..";
    this.parentModel=data; 
    this.parentModel.parentId=this.parentTempId;  
    this.getservicename.postParentData(this.parentModel,{headers: this.myheader})    
    .subscribe(res=>{
      if(res["response"]=="1")
      {
        $('.msgagr').html("New Parent Created Successfully").fadeIn('slow').css({"color": "#1e8449 ", "padding": "6px", "border-radius": "2px" }); //also show a success message 
        $('.msgagr').delay(2000).fadeOut('slow');
      setTimeout(function(){
        $("#modal-default").modal('hide');
      },2000)
      }
      else if(res["response"]=="2")
      {
        $('.msgagr').html("Parent Name Record Update Successfully").fadeIn('slow').css({"color": "#1e8449 ", "padding": "6px", "border-radius": "2px" }); //also show a success message 
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
      this.getParentDataList(); 
    });
    
   }

   DeleteData(data)
   { 
    this.parentModel=data;        
    this.getservicename.DeleteParentData(this.parentModel.parentId,{headers: this.myheader})
    .subscribe(res => { 
      $('.msgagr').html("Parent Name Delete Successfully").fadeIn('slow').css({"color": "#1e8449 ", "padding": "6px", "border-radius": "2px" }); //also show a success message 
      $('.msgagr').delay(2000).fadeOut('slow'); 
      this.getParentDataList();       
       });
   }

  ngOnInit(): void {

    if(!localStorage.getItem('getToken'))
    {
      this.router.navigate(['/login']);  
    }
    
    this.getParentDataList();
    this.getParentNameDataList();

    this.submitForm = this.formBuilder.group({ 
      parentNameId: ['', Validators.required],
      areaName: ['', Validators.required]
  });
  }
}

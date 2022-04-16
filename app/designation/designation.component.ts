import { Component, OnInit } from '@angular/core';
import {HttpClient,HttpHeaders,HttpParams} from '@angular/common/http';
import{DesignationModel} from '../ViewModel';
import {AppServiceService} from '../app-service.service';
import {NgxSpinnerService} from 'ngx-spinner';
import { from } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

declare var $:any;

@Component({
  selector: 'app-designation',
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.css']
})
export class DesignationComponent implements OnInit {

submitText="";
designationTempId=0;
myheader:any;
submitForm: FormGroup;
submitted = false;

getData:any[]; 
designationModel:DesignationModel = new DesignationModel();

responceData:Array<any>;
totalRecords:string;
pageNo:Number=1;

  constructor(private getservicename: AppServiceService,private formBuilder: FormBuilder, private NgxSpinner: NgxSpinnerService,private router: Router) {
    this.myheader=this.getservicename.getHeaders(); 
   }

   getDesignationDataList()
   { 
      this.getservicename.getDesignationdataList({headers: this.myheader}).subscribe(data=>{  
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
    this.designationTempId=0; 
    this.designationModel.designationId=0;  
    this.designationModel.designationName=''; 
   }

   SelectedData(data)
   {
    this.submitText="Update";
    this.designationModel=data;    
    this.designationTempId=this.designationModel.designationId;  
    $("#modal-default").modal('show');
  }

  get f() { return this.submitForm.controls; }
  

  onSubmit(data){
    this.submitted = true; 
    if (this.submitForm.invalid) {
        return;
    }

    this.submitText="Loading ..";
    this.designationModel=data; 
    this.designationModel.designationId=this.designationTempId;  
    this.getservicename.postDesignationData(this.designationModel,{headers: this.myheader})    
    .subscribe(res=>{
      if(res["response"]=="1")
      {
        $('.msgagr').html("New Designation Created Successfully").fadeIn('slow').css({"color": "#1e8449 ", "padding": "6px", "border-radius": "2px" }); //also show a success message 
        $('.msgagr').delay(2000).fadeOut('slow');
      setTimeout(function(){
        $("#modal-default").modal('hide');
      },2000)
      }
      else if(res["response"]=="2")
      {
        $('.msgagr').html("Designation Record Update Successfully").fadeIn('slow').css({"color": "#1e8449 ", "padding": "6px", "border-radius": "2px" }); //also show a success message 
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
      
      this.getDesignationDataList(); 
    });    
   }

   DeleteData(data)
   { 
    this.designationModel=data;        
    this.getservicename.DeleteDesignationData(this.designationModel.designationId,{headers: this.myheader})
    .subscribe(res => { 
      $('.msgagr').html("Designation Delete Successfully").fadeIn('slow').css({"color": "#1e8449 ", "padding": "6px", "border-radius": "2px" }); //also show a success message 
      $('.msgagr').delay(2000).fadeOut('slow'); 
      this.getDesignationDataList();       
       });
   }

  ngOnInit(): void {

    if(!localStorage.getItem('getToken'))
    {
      this.router.navigate(['/login']);  
    }

    this.getDesignationDataList(); 
    this.submitForm = this.formBuilder.group({ 
      designationName: ['', Validators.required]
  });
  }

}

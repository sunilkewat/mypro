import { Component, OnInit } from '@angular/core';
import {HttpClient,HttpHeaders,HttpParams} from '@angular/common/http';
import{DepartmentModel} from '../ViewModel';
import {AppServiceService} from '../app-service.service';
import {NgxSpinnerService} from 'ngx-spinner';
import { from } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

declare var $:any;

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

submitText="";
departmentTempId=0;
myheader:any;
responceData:Array<any>;
totalRecords:string;
pageNo:Number=1;
submitForm: FormGroup;
submitted = false;


getData:any[];   
departmentModel:DepartmentModel = new DepartmentModel();

  constructor(private getservicename: AppServiceService,private formBuilder: FormBuilder,public ngxSpinner: NgxSpinnerService,private router: Router) {
    this.myheader=this.getservicename.getHeaders(); 
   }

   getDepartmentDataList()
   { 
      this.getservicename.getDepartmentdataList({headers: this.myheader}).subscribe(data=>{
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
    this.departmentTempId=0; 
    this.departmentModel.departmentId=0;  
    this.departmentModel.departmentName=''; 
   }

   SelectedData(data)
   {
    this.submitText="Update";
    this.departmentModel=data;    
    this.departmentTempId=this.departmentModel.departmentId;  
    $("#modal-default").modal('show');
  }

  get f() { return this.submitForm.controls; }

  onSubmit(data){ 
    this.submitted = true; 
    if (this.submitForm.invalid) {
        return;
    }
     this.submitText="Loading ..";
    this.departmentModel=data; 
    this.departmentModel.departmentId=this.departmentTempId;  
    this.getservicename.postDepartmentData(this.departmentModel,{headers: this.myheader})    
    .subscribe(res=>{
      if(res["response"]=="1")
      {
        $('.msgagr').html("New Department Created Successfully").fadeIn('slow').css({"color": "#1e8449 ", "padding": "6px", "border-radius": "2px" }); //also show a success message 
        $('.msgagr').delay(2000).fadeOut('slow');
      setTimeout(function(){
        $("#modal-default").modal('hide');
      },2000)
      }
      else if(res["response"]=="2")
      {
        $('.msgagr').html("Department Record Update Successfully").fadeIn('slow').css({"color": "#1e8449 ", "padding": "6px", "border-radius": "2px" }); //also show a success message 
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
      
      this.getDepartmentDataList(); 
    });    
   }

   DeleteData(data)
   { 
    this.departmentModel=data;        
    this.getservicename.DeleteDepartmentData(this.departmentModel.departmentId,{headers: this.myheader})
    .subscribe(res => { 
      $('.msgagr').html("Department Delete Successfully").fadeIn('slow').css({"color": "#1e8449 ", "padding": "6px", "border-radius": "2px" }); //also show a success message 
      $('.msgagr').delay(2000).fadeOut('slow'); 
      this.getDepartmentDataList();       
       });
   }

  ngOnInit(): void {

    if(!localStorage.getItem('getToken'))
  {
   this.router.navigate(['/login']);  
  }
    this.getDepartmentDataList(); 
    this.formBuild();
}

formBuild()
  {
    this.submitForm = this.formBuilder.group({ 
      departmentName: ['', Validators.required]      
  });    
}

}
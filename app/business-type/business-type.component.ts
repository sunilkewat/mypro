import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders,HttpParams } from '@angular/common/http'; 
import { AppServiceService } from '../app-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { from } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import{BusinessTypeModel} from '../ViewModel';
import { Router } from '@angular/router';

declare var $:any;

@Component({
  selector: 'app-business-type',
  templateUrl: './business-type.component.html',
  styleUrls: ['./business-type.component.css']
})

export class BusinessTypeComponent implements OnInit {

submitText="";
businessTypeTempId=0;
myheader:any;
submitForm: FormGroup;
submitted = false;

 
businesstypeModel:BusinessTypeModel = new BusinessTypeModel();

responceData:Array<any>;
totalRecords:string;
pageNo:Number=1;

constructor(private getservicename: AppServiceService,private formBuilder: FormBuilder,public ngxSpinner: NgxSpinnerService,private router: Router) {
  this.myheader=this.getservicename.getHeaders(); 
 }

 getbusinessTypeDataList()
   { 
      this.getservicename.getBusinessTypedataList({headers: this.myheader}).subscribe(data=>{
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
    this.businessTypeTempId=0; 
    this.businesstypeModel.businessTypeId=0;  
    this.businesstypeModel.businessTypeName=''; 
   }

   SelectedData(data)
   {
    this.submitText="Update";
    this.businesstypeModel=data;    
    this.businessTypeTempId=this.businesstypeModel.businessTypeId;     
    $("#modal-default").modal('show');
  }

  get f() { return this.submitForm.controls; }

  onSubmit(data){ 
    this.submitted = true; 
    if (this.submitForm.invalid) {
        return;
    }
     this.submitText="Loading ..";
    this.businesstypeModel=data; 
    this.businesstypeModel.businessTypeId=this.businessTypeTempId;  
    this.getservicename.postBusinessTypeData(this.businesstypeModel,{headers: this.myheader})    
    .subscribe(res=>{
      if(res["response"]=="1")
      {
        $('.msgagr').html("New Business Type Created Successfully").fadeIn('slow').css({"color": "#1e8449 ", "padding": "6px", "border-radius": "2px" }); //also show a success message 
        $('.msgagr').delay(2000).fadeOut('slow');
      setTimeout(function(){
        $("#modal-default").modal('hide');
      },2000)
      }
      else if(res["response"]=="2")
      {
        $('.msgagr').html("Business Type Update Successfully").fadeIn('slow').css({"color": "#1e8449 ", "padding": "6px", "border-radius": "2px" }); //also show a success message 
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
      
      this.getbusinessTypeDataList(); 
    });    
   }

   DeleteData(data)
   { 
    this.businesstypeModel=data;        
    this.getservicename.DeleteBusinessTypeData(this.businesstypeModel.businessTypeId,{headers: this.myheader})
    .subscribe(res => { 
      $('.msgagr').html("Business Type Delete Successfully").fadeIn('slow').css({"color": "#1e8449 ", "padding": "6px", "border-radius": "2px" }); //also show a success message 
      $('.msgagr').delay(2000).fadeOut('slow'); 
      this.getbusinessTypeDataList();       
       });
   }

  ngOnInit(): void {
    
  if(!localStorage.getItem('getToken'))
  {
   this.router.navigate(['/login']);  
  }
    this.getbusinessTypeDataList();
    this.formBuild();
  }

  formBuild()
  {
    this.submitForm = this.formBuilder.group({ 
      businessTypeName: ['', Validators.required]      
  });
  }

} 

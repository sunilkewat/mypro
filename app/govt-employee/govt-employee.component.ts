import { Component, OnInit, ɵConsole } from '@angular/core';
import { from } from 'rxjs';
import {HttpClient,HttpHeaders,HttpParams} from '@angular/common/http';
import{GovtEmployeeModel} from '../ViewModel';
import {AppServiceService} from '../app-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

declare var $:any;

@Component({
  selector: 'app-govt-employee',  
  templateUrl: './govt-employee.component.html',
  styleUrls: ['./govt-employee.component.css']
})

export class GovtEmployeeComponent implements OnInit {

  submitForm: FormGroup;
  submitted = false;

  submitText="";
  employeeTempId=0;
  myheader:any;
  searchText:any;

  getData:any[]; 
  getDepList:any[]; 
  getDesiList:any[]; 
  getVillageList:any[];
  EmployeeModel:GovtEmployeeModel = new GovtEmployeeModel();

  responceData:Array<any>;
  totalRecords:string;
  pageNo:Number=1;
  
  constructor(private getservicename: AppServiceService, private formBuilder: FormBuilder,private router: Router) {
    this.myheader=this.getservicename.getHeaders(); 
  }

   getGovtEmployeeData()
   {
    this.getservicename.getGovtEmployeedataList({headers: this.myheader}).subscribe(data=>{
    this.responceData=data.GovtEmployeeList.data;
    this.totalRecords=data.GovtEmployeeList.data.length;
    this.searchText;

    this.getDepList=data.DepartmentList.data;
    this.getDesiList=data.DesignationList.data;
    this.getVillageList=data.VillageList.data;
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
    this.employeeTempId=0;
    this.EmployeeModel.employeeId=0;   
    this.EmployeeModel.employeeName=''; 
    this.EmployeeModel.father='';
    this.EmployeeModel.departmentId=''; 
    this.EmployeeModel.designationId=''; 
    this.EmployeeModel.villageId=''; 
    this.EmployeeModel.contactNo='';
    this.EmployeeModel.address=''; 
    this.EmployeeModel.status='Active';    
   }


   SelectedData(data)
   {
    this.submitText="Update";
    this.EmployeeModel=data;   
    this.employeeTempId=this.EmployeeModel.employeeId;    
    $("#modal-default").modal('show');
  }

  get f() { return this.submitForm.controls; }

   onSubmit(data){
  
    this.submitted = true; 
    if (this.submitForm.invalid) {
        return;
    }
   
    this.submitText="Loading ..";
    this.EmployeeModel=data;
    this.EmployeeModel.employeeId=this.employeeTempId; 
    this.getservicename.postGovtEmployeeData(this.EmployeeModel,{headers: this.myheader})    
    .subscribe(res=>{
      if(res["response"]=="1")
      {
        $('.msgagr').html("New Govt. Employee Created Successfully").fadeIn('slow').css({"color": "#1e8449 ", "padding": "6px", "border-radius": "2px" }); //also show a success message 
        $('.msgagr').delay(2000).fadeOut('slow');
      setTimeout(function(){
        $("#modal-default").modal('hide');
      },2000)
      }
      else if(res["response"]=="2")
      {
        $('.msgagr').html("Govt. Employee Record Update Successfully").fadeIn('slow').css({"color": "#1e8449 ", "padding": "6px", "border-radius": "2px" }); //also show a success message 
        $('.msgagr').delay(2000).fadeOut('slow');
      setTimeout(function(){
        $("#modal-default").modal('hide');
      },2000)
      }
      else
      {
        $('.msgagr').html("Errors !").fadeIn('slow').css({"color": "#1e8449 ", "padding": "6px", "border-radius": "2px" }); //also show a success message 
        $('.msgagr').delay(2000).fadeOut('slow');
      setTimeout(function(){
        $("#modal-default").modal('hide');
      },2000)
      }
      
      this.getGovtEmployeeData(); 
    });
    
   }

   DeleteData(data)
   { 
     console.log(data);
    this.EmployeeModel=data;        
    this.getservicename.DeleteGovtEmployeeData(this.EmployeeModel.employeeId,{headers: this.myheader})
    .subscribe(res => { 
      $('.msgagr').html("Agent Delete Successfully").fadeIn('slow').css({"color": "#1e8449 ", "padding": "6px", "border-radius": "2px" }); //also show a success message 
      $('.msgagr').delay(2000).fadeOut('slow'); 
      this.getGovtEmployeeData();         
       });
   }

  ngOnInit(): void {

    if(!localStorage.getItem('getToken'))
    {
      this.router.navigate(['/login']);  
    }

  this.getGovtEmployeeData(); 
  
  this.submitForm = this.formBuilder.group({ 
    employeeName: ['', Validators.required], 
    father: ['', Validators.required], 
    designationId: ['', Validators.required], 
    departmentId: ['', Validators.required], 
    villageId: ['', Validators.required], 
    contactNo: ['', Validators.required], 
    address: ['', Validators.required] ,
    status:['', Validators.required]
});
}
}

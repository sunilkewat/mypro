import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import {HttpClient,HttpHeaders,HttpParams} from '@angular/common/http';
import{AgentModel, agentBoothAllotModel} from '../ViewModel';
import {AppServiceService} from '../app-service.service';
import {NgxSpinnerService} from 'ngx-spinner';
import { NumberSymbol } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';  
import { Router } from '@angular/router';



declare var $:any;

@Component({  
  selector: 'app-new-agent',
  templateUrl: './new-agent.component.html',
  styleUrls: ['./new-agent.component.css']
})

export class NewAgentComponent implements OnInit {
  urlm:any;
  photo:any;  
  submitText="";
  agentTempId=0;    
  getData:any[];
  getCategoryData:any[]; 
  getVillageData:any[]; 
  getBoothNoData:any[];  
  Agent:AgentModel = new AgentModel();
  agentBoothAllot:agentBoothAllotModel=new  agentBoothAllotModel(); 
  myheader:any;
  searchText:any;
  submitForm: FormGroup;
  submitForm2: FormGroup;
  submitted = false;

  responceData:Array<any>;
  totalRecords:string;
  pageNo:Number=1;

  constructor(private getservicename: AppServiceService, private formBuilder: FormBuilder,private router: Router,private spinner: NgxSpinnerService) {
    this.myheader=this.getservicename.getHeaders(); 
   }

   onSelectFile(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event) => { // called once readAsDataURL is completed
        this.urlm = event.target.result;  
        this.photo=this.urlm;      
      }
    }
   }
 

   getAgentDataList()
   {  
    this.spinner.show();
      this.getservicename.getAgentdataList({headers: this.myheader}).subscribe(data=>{ 
       this.searchText;
      this.responceData=data.AgentList.data;
      this.totalRecords=data.AgentList.data.length;    
      this.getCategoryData=data.CategoryList.data; 
      this.getVillageData=data.VillageList.data; 
    });
    setTimeout(() => { 
      this.spinner.hide();
    }, 2000);
   }
   
   
   getBoothNoList(Id:any)
   {
     this.getservicename.getBoothNoList(Id,{headers: this.myheader}).subscribe(data=>{
       this.getBoothNoData=data.data;
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
    this.agentTempId=0;
    this.Agent.agentId=0; 
    this.Agent.agentType='';
    this.Agent.agentName=''; 
    this.Agent.father=''; 
    this.Agent.surname=''; 
    this.Agent.caste=''; 
    this.Agent.category=''; 
    this.Agent.dob=null; 
    this.Agent.voterCardNo=''; 
    this.Agent.contactNo  =''; 
    this.Agent.address=''; 
    this.Agent.post=''; 
    }

   SelectedData(data)
   {   
    this.submitText="Update";
    this.Agent=data;        
    this.agentTempId=this.Agent.agentId;
    this.photo=data.photo;
    $("#modal-default").modal(); 
   }

   get f() { return this.submitForm.controls; }

   onSubmit(data){
    
    this.submitted = true;    // debugger;
    if (this.submitForm.invalid) {
        return;
    }
    this.submitText="Loading ..";
    this.Agent=data;
    this.Agent.agentId=this.agentTempId;
    this.Agent.fileName=this.urlm;
    this.getservicename.postAgentData(this.Agent,{headers: this.myheader}).subscribe(res=>{
      
      if(res["response"]=="1")
      {
        $('.msgagr').html("New Agent Created Successfully").fadeIn('slow').css({"color": "#1e8449 ", "padding": "6px", "border-radius": "2px" }); //also show a success message 
        $('.msgagr').delay(2000).fadeOut('slow');
      setTimeout(function(){
        $("#modal-default").modal('hide');
      },2000)
      }
      else if(res["response"]=="2")
      {
        $('.msgagr').html("Agent Record Update Successfully").fadeIn('slow').css({"color": "#1e8449 ", "padding": "6px", "border-radius": "2px" }); //also show a success message 
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
      
      this.getAgentDataList(); 
    });
  }

   DeleteData(data)
   { 
    this.Agent=data;        
    this.getservicename.DeleteAgentData(this.Agent.agentId,{headers: this.myheader})
    .subscribe(res => { 
      $('.msgagr').html("Agent Delete Successfully").fadeIn('slow').css({"color": "#1e8449 ", "padding": "6px", "border-radius": "2px" }); //also show a success message 
      $('.msgagr').delay(2000).fadeOut('slow'); 
      this.getAgentDataList();       
       });
   }

   NewBoothAllot(data)
   {    
    this.submitText="Save";    
    //agentId:number;
    this.agentTempId=data.agentId;
    this.agentBoothAllot.villageId=data.villageId;
    this.agentBoothAllot.boothNo=data.boothNo==''?'0':data.boothNo;  
    console.log(data);    
    $("#modal-default-booth-allot").modal();   
   }
   
   get f2() { return this.submitForm2.controls; }

   onAllotSubmit(data){
    this.submitted = true; 
    
    if (this.submitForm2.invalid) {
        return;
    }
    console.log(data);
    this.submitText="Loading ..";
    this.agentBoothAllot=data;  
    this.agentBoothAllot.agentId=this.agentTempId;

    this.getservicename.postAgentboothAllotData(this.agentBoothAllot,{headers: this.myheader}).subscribe(res=>{
      
      if(res["response"]=="1")
      {
        $('.msgagr').html("Agent Booth Allot Successfully").fadeIn('slow').css({"color": "#1e8449 ", "padding": "6px", "border-radius": "2px" }); //also show a success message 
        $('.msgagr').delay(2000).fadeOut('slow');
      setTimeout(function(){
        $("#modal-default-booth-allot").modal('hide');
      },2000)
      }
      else if(res["response"]=="2")
      {
        $('.msgagr').html("Agent Booth Allot Update Successfully").fadeIn('slow').css({"color": "#1e8449 ", "padding": "6px", "border-radius": "2px" }); //also show a success message 
        $('.msgagr').delay(2000).fadeOut('slow');
      setTimeout(function(){
        $("#modal-default-booth-allot").modal('hide');
      },2000)
      }
      else
      {
        $('.msgagr').html("Try again !").fadeIn('slow').css({"color": "#1e8449 ", "padding": "6px", "border-radius": "2px" }); //also show a success message 
        $('.msgagr').delay(2000).fadeOut('slow');
      setTimeout(function(){
        $("#modal-default-booth-allot").modal('hide');
      },2000)
      }
      
      this.getAgentDataList();
    });
   }

  ngOnInit(): void {
    if(!localStorage.getItem('getToken'))
    {
      this.router.navigate(['/login']);  
    }

    this.getAgentDataList();  

  this.submitForm2 = this.formBuilder.group({ 
    villageId: ['0', Validators.required],
    boothNo: ['0', Validators.required],   
});

  this.submitForm = this.formBuilder.group({ 
  agentName: ['', Validators.required],
  agentType: ['', Validators.required],
  father: ['', Validators.required],
  surname: ['', Validators.required],
  caste: ['', Validators.required],
  category: ['', Validators.required],
  dob: ['', Validators.required], 
  voterCardNo: ['', Validators.required],
  contactNo: ['', Validators.required],
  address: ['', Validators.required],
  post: ['', Validators.required],
});
  }
}

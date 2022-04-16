import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import {HttpClient,HttpHeaders,HttpParams} from '@angular/common/http';
import{LeaderModel} from '../ViewModel';
import {AppServiceService} from '../app-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

declare var $:any;

@Component({
  selector: 'app-oposition-party-leader',
  templateUrl: './oposition-party-leader.component.html',
  styleUrls: ['./oposition-party-leader.component.css']
})
export class OpositionPartyLeaderComponent implements OnInit {
  submitForm: FormGroup;
  submitted = false;

  urlm:any;
  photo:any;
  submitText="";
  leaderTempId=0;
  partyTempName="";

  myheader:any;
  searchText:any;

  getData:any[];  
  getCategoryData:any[]; 
  getReligionData:any[]; 
  LeaderModel:LeaderModel = new LeaderModel();
  
  responceData:Array<any>;
  totalRecords:string;
  pageNo:Number=1;
  
  constructor(private getservicename: AppServiceService, private formBuilder: FormBuilder,private router: Router) {
    this.myheader=this.getservicename.getHeaders(); 
   }

   onSelectFile(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event) => { // called once readAsDataURL is completed
        this.urlm = event.target.result;        
      }
    }
  }

   getLeaderDataList()
   {
    this.getservicename.getOppositionPartyLeaderdataList({headers: this.myheader}).subscribe(data=>{
     
      this.responceData=data.LeaderList.data;
      this.totalRecords=data.LeaderList.data.length;
      this.searchText;

      this.getCategoryData=data.CategoryList.data;
      this.getReligionData=data.ReligionList.data;
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
    this.leaderTempId=0;
    this.partyTempName='';
    this.LeaderModel.leaderId=0;   
    this.LeaderModel.partyName='';
    this.LeaderModel.leaderName='';
    this.LeaderModel.father='';
    this.LeaderModel.gender='';
    this.LeaderModel.religion='';
    this.LeaderModel.category='';
    this.LeaderModel.caste='';
    this.LeaderModel.dob=null;
    this.LeaderModel.contactNo='';
    this.LeaderModel.address='';     
    this.LeaderModel.fileName='';
   }

   SelectedData(data)
   {
    this.submitText="Update";
    this.LeaderModel=data;  
    this.leaderTempId=this.LeaderModel.leaderId;   
    this.partyTempName=this.LeaderModel.partyName;
    this.photo=data.photo;
    $("#modal-default").modal('show');
  }

  get f() { return this.submitForm.controls; }

  onSubmit(data){
    this.submitted = true; 
    if (this.submitForm.invalid) {
        return;
    }
    this.submitText="Loading ..";
    this.LeaderModel=data;
    this.LeaderModel.leaderId=this.leaderTempId;  
    this.LeaderModel.fileName=this.urlm;    
    this.getservicename.postOppositionLeaderData(this.LeaderModel,{headers: this.myheader}).subscribe(res=>{
      if(res["response"]=="1")
      {
        $('.msgagr').html("New opposition Leader Created Successfully").fadeIn('slow').css({"color": "#1e8449 ", "padding": "6px", "border-radius": "2px" }); //also show a success message 
        $('.msgagr').delay(2000).fadeOut('slow');
      setTimeout(function(){
        $("#modal-default").modal('hide');
      },2000)
      }
      else if(res["response"]=="2")
      {
        $('.msgagr').html("opposition Leader Record Update Successfully").fadeIn('slow').css({"color": "#1e8449 ", "padding": "6px", "border-radius": "2px" }); //also show a success message 
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
      
      this.getLeaderDataList(); 
    });
    
   }

   DeleteData(data)
   { 
    this.LeaderModel=data;        
    this.getservicename.DeleteOppositionLeaderData(this.LeaderModel.leaderId,{headers: this.myheader})
    .subscribe(res => { 
      $('.msgagr').html("Leader Data Delete Successfully").fadeIn('slow').css({"color": "#1e8449 ", "padding": "6px", "border-radius": "2px" }); //also show a success message 
      $('.msgagr').delay(2000).fadeOut('slow'); 
      this.getLeaderDataList();       
       });
   }  

  ngOnInit(): void {

    if(!localStorage.getItem('getToken'))
    {
      this.router.navigate(['/login']);  
    }
    
    this.getLeaderDataList(); 
    this.submitForm = this.formBuilder.group({ 
      leaderName: ['', Validators.required],
      father: ['', Validators.required],
      dob: ['', [Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],
      caste: ['', Validators.required],
      category: ['', Validators.required],
      gender: ['', Validators.required],
      religion: ['', Validators.required],
      contactNo: ['', Validators.required],
      address: ['', Validators.required]
  });
 }
}


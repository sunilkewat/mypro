import { Component, OnInit } from '@angular/core';
import {HttpClient,HttpHeaders,HttpParams} from '@angular/common/http';
import{PagePrabhariModel, pagePrabharibootAllotModel} from '../ViewModel';
import {AppServiceService} from '../app-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';  
import { Router } from '@angular/router';
import { parse } from '@fullcalendar/core/datelib/parsing';
import { analyzeAndValidateNgModules } from '@angular/compiler';

declare var $:any;

@Component({
  selector: 'app-page-prabhari',
  templateUrl: './page-prabhari.component.html',
  styleUrls: ['./page-prabhari.component.css']
})
export class PagePrabhariComponent implements OnInit {
  urlm:any;
  photo:any;
  submitText="";
  pagePrabhariTempId=0;
  tempVillageId=0;

  submitForm: FormGroup;
  submitForm2: FormGroup;
  submitted = false;
  searchText:any;

  getData:any[];  
  getCategoryData:any[];  
  getVillageData:any[];
  getBoothNoData:any[]; 
  dateobj:any
  pageprabhariModel:PagePrabhariModel = new PagePrabhariModel();
  bootAllotModel:pagePrabharibootAllotModel=new  pagePrabharibootAllotModel();

  myheader:any;

  responceData:Array<any>;
  totalRecords:string;
  pageNo:Number=1;
  electionId:number;

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

   getPagePrabhariList()
   {
    this.getservicename.getpageprabharidataList({headers: this.myheader}).subscribe(data=>{
      this.responceData=data.PagePrabhariList.data;
      this.totalRecords=data.PagePrabhariList.data.length;
      this.searchText;
      this.getCategoryData=data.CategoryList.data; 
      this.getVillageData=data.VillageList.data; 
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
    this.pagePrabhariTempId=0; 
    this.pageprabhariModel.pagePrabhariId=0; 
    this.pageprabhariModel.pagePrabhariName='';
    this.pageprabhariModel.surname='';
    this.pageprabhariModel.father='';
    this.pageprabhariModel.category='';
    this.pageprabhariModel.caste='';
    this.pageprabhariModel.dob=null;
    this.pageprabhariModel.contactNo='';
    this.pageprabhariModel.villageId='';     
   }

   clear2()
   {     
    this.bootAllotModel.boothNo='';
    this.bootAllotModel.areaName='';
   }

   SelectedData(data)
   {
    this.submitText="Update";
    this.pageprabhariModel=data;    
    this.photo=data.photo;
    this.dateobj = data.dob;
    this.pagePrabhariTempId=this.pageprabhariModel.pagePrabhariId;   
    $("#modal-default").modal('show');
  }

  get f() { return this.submitForm.controls; }

  onSubmit(data){
    this.submitted = true;    // debugger;
    if (this.submitForm.invalid) {
        return;
    }
    this.submitText="Loading ..";
    this.pageprabhariModel=data; 
    this.pageprabhariModel.pagePrabhariId=this.pagePrabhariTempId; 
    this.pageprabhariModel.fileName=this.urlm;  
    this.getservicename.postPagePrabhariData(this.pageprabhariModel,{headers: this.myheader,}).subscribe(res=>{
      if(res["response"]=="1")
      {
        $('.msgagr').html("New Page Prabhari Created Successfully").fadeIn('slow').css({"color": "#1e8449 ", "padding": "6px", "border-radius": "2px" }); //also show a success message 
        $('.msgagr').delay(2000).fadeOut('slow');
      setTimeout(function(){
        $("#modal-default").modal('hide');
      },2000)
      }
      else if(res["response"]=="2")
      {
        $('.msgagr').html("Page Prabhari Record Update Successfully").fadeIn('slow').css({"color": "#1e8449 ", "padding": "6px", "border-radius": "2px" }); //also show a success message 
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
      
      this.getPagePrabhariList(); 
    });
    
   }

   DeleteData(data)
   { 
    this.pageprabhariModel=data;        
    this.getservicename.DeletePagePrabhariData(this.pageprabhariModel.pagePrabhariId,{headers: this.myheader})
    .subscribe(res => { 
      $('.msgagr').html("Page Prabhari Data Delete Successfully").fadeIn('slow').css({"color": "#1e8449 ", "padding": "6px", "border-radius": "2px" }); //also show a success message 
      $('.msgagr').delay(2000).fadeOut('slow'); 
      this.getPagePrabhariList();       
       });
   }

   NewBoothAllot(data)
   {    
    this.clear2();
    this.submitText="Save";     
    this.tempVillageId = data.villageId;
    this.pagePrabhariTempId=data.pagePrabhariId; 
    this.bootAllotModel.boothNo=data.boothNo!='0'?data.boothNo:''; 
    this.bootAllotModel.areaName=data.areaName;  
    this.getBoothNoList(this.tempVillageId);

    $("#modal-default-booth-allot").modal(); 
   }

   
   getBoothNoList(Id:any)
   {
     this.getservicename.getBoothNoList(Id,{headers: this.myheader}).subscribe(data=>{
       this.getBoothNoData=data.data;
     });
   }

   get f2() { return this.submitForm2.controls; }

   onAllotSubmit(data){
    this.submitted = true;    // debugger;
    if (this.submitForm2.invalid) {
        return;
    }
    this.submitText="Loading ..";
    this.bootAllotModel=data;
    this.bootAllotModel.pagePrabhariId=this.pagePrabhariTempId; 
    this.bootAllotModel.electionId=this.electionId;
    this.getservicename.postPagePrabhariboothAllotData(this.bootAllotModel,{headers: this.myheader}).subscribe(res=>{
      
      if(res["response"]=="1")
      {
        $('.msgagr').html("Booth Allot Successfully").fadeIn('slow').css({"color": "#1e8449 ", "padding": "6px", "border-radius": "2px" }); //also show a success message 
        $('.msgagr').delay(2000).fadeOut('slow');
      setTimeout(function(){
        $("#modal-default-booth-allot").modal('hide');
      },2000)
      }
      else if(res["response"]=="2")
      {
        $('.msgagr').html("Booth Allot Update Successfully").fadeIn('slow').css({"color": "#1e8449 ", "padding": "6px", "border-radius": "2px" }); //also show a success message 
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
      
      this.getPagePrabhariList();
    });
   }

  ngOnInit(): void {

    if(!localStorage.getItem('getToken'))
    {
      this.router.navigate(['/login']);  
    }

    this.getPagePrabhariList(); 
    
    this.electionId=parseInt(localStorage.getItem('electionId'));

    this.submitForm = this.formBuilder.group({   
       pagePrabhariName: ['', Validators.required],
       surname: ['', Validators.required],
       father: ['', Validators.required],
       category: ['', Validators.required],
       caste: ['', Validators.required],
       dob: ['', Validators.required],
       contactNo: ['', Validators.required],
       villageId: ['', Validators.required]
  });

  this.submitForm2 = this.formBuilder.group({  
    boothNo: ['', Validators.required],
    areaName: ['', Validators.required] 
});

}
}

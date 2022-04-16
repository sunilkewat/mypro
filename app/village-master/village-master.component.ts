import { Component, OnInit } from '@angular/core';
import {HttpClient,HttpHeaders,HttpParams} from '@angular/common/http';
import{villageModel} from '../ViewModel';
import {AppServiceService} from '../app-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

declare var $:any;

@Component({
  selector: 'app-village-master',
  templateUrl: './village-master.component.html',
  styleUrls: ['./village-master.component.css']
})
export class VillageMasterComponent implements OnInit {

submitForm: FormGroup;
submitted = false;

submitText="";
villageTempId=0;

getData:any[];  
getJanpatPData:any[];
getDistrictPData:any[];
getBlockPData:any[];
getMandalPData:any[];
getSectorPData:any[];
villageModel:villageModel = new villageModel();

responceData:Array<any>;
totalRecords:string;
pageNo:Number=1;

myheader:any;

  constructor(private getservicename: AppServiceService,private formBuilder: FormBuilder,private router: Router) {
    this.myheader=this.getservicename.getHeaders(); 
   }

   getVillageDataList()
   {
    this.getservicename.getVillagedataList({headers: this.myheader}).subscribe(data=>{
      this.responceData=data.data;
      this.totalRecords=data.data.length;
    });
   }

   getJanpadPanchayatDataList()
   {
    this.getservicename.getJanpadPanchyatList({headers: this.myheader}).subscribe(data=>{
      this.getJanpatPData=data.data;
     // console.log(this.getJanpatPData);
    });
   }

   getDistrictPanchayatDataList()
   {
    this.getservicename.getDistrictPanchyatList({headers: this.myheader}).subscribe(data=>{
      this.getDistrictPData=data.data;
    //  console.log(this.getDistrictPData);
    });
   }

   getBlockDataList()
   {
    this.getservicename.getBlockList({headers: this.myheader}).subscribe(data=>{
      this.getBlockPData=data.data;
     // console.log(this.getBlockPData);
    });
   }

   getMandalDataList()
   {
    this.getservicename.getMandalList({headers: this.myheader}).subscribe(data=>{
      this.getMandalPData=data.data;
     // console.log(this.getMandalPData);
    });
   }

   getSectorDataList()
   {
    this.getservicename.getSectorList({headers: this.myheader}).subscribe(data=>{
      this.getSectorPData=data.data;
      //console.log(this.getSectorPData);
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
    this.villageTempId=0; 
    this.villageModel.villageId=0;  
    this.villageModel.villageName='';
    this.villageModel.panchayatName=''; 
    this.villageModel.janpatPanchayatId='';
    this.villageModel.districtPanchayatId='';
    this.villageModel.blockId='';
    this.villageModel.mandalId='';
    this.villageModel.sectorId='';
   }

   SelectedData(data)
   {
    this.submitText="Update";
    this.villageModel=data;   
   // console.log(data);
    this.villageTempId=this.villageModel.villageId;  
    $("#modal-default").modal('show');
  }

  get f() { return this.submitForm.controls; }

  onSubmit(data){ 
    this.submitted = true; 
    if (this.submitForm.invalid) {
        return;
    }
    this.submitText="Loading ..";
    this.villageModel=data; 
    this.villageModel.villageId=this.villageTempId;  
    this.getservicename.postVillageData(this.villageModel,{headers: this.myheader})    
    .subscribe(res=>{
      if(res["response"]=="1")
      {
        $('.msgagr').html("New Village Created Successfully").fadeIn('slow').css({"color": "#1e8449 ", "padding": "6px", "border-radius": "2px" }); //also show a success message 
        $('.msgagr').delay(2000).fadeOut('slow');
      setTimeout(function(){
        $("#modal-default").modal('hide');
      },2000)
      }
      else if(res["response"]=="2")
      {
        $('.msgagr').html("Village Record Update Successfully").fadeIn('slow').css({"color": "#1e8449 ", "padding": "6px", "border-radius": "2px" }); //also show a success message 
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
      
      this.getVillageDataList(); 
    });
    
   }

   DeleteData(data)
   { 
    this.villageModel=data;        
    this.getservicename.DeleteVillageData(this.villageModel.villageId,{headers: this.myheader})
    .subscribe(res => { 
      $('.msgagr').html("Village Data Delete Successfully").fadeIn('slow').css({"color": "#1e8449 ", "padding": "6px", "border-radius": "2px" }); //also show a success message 
      $('.msgagr').delay(2000).fadeOut('slow'); 
      this.getVillageDataList();       
       });
   }
  
  ngOnInit(): void {

    if(!localStorage.getItem('getToken'))
    {
      this.router.navigate(['/login']);  
    }

    this.getVillageDataList();
    this.getJanpadPanchayatDataList();
    this.getDistrictPanchayatDataList();
    this.getBlockDataList();
    this.getMandalDataList();
    this.getSectorDataList();

    this.submitForm = this.formBuilder.group({  
     // villageId: ['', Validators.required],
      villageName: ['', Validators.required],
      panchayatName: ['', Validators.required],
      janpatPanchayatId: ['', Validators.required],
      districtPanchayatId: ['', Validators.required],
      blockId: ['', Validators.required],
      mandalId: ['', Validators.required],
      sectorId: ['', Validators.required]
  });
  }

}

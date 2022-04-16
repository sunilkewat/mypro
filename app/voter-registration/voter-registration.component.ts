import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import {HttpClient,HttpHeaders,HttpParams} from '@angular/common/http';
import{VoterModel} from '../ViewModel';
import {AppServiceService} from '../app-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { DatePipe } from '@angular/common'
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Pipe, PipeTransform } from '@angular/core';
import { stringify } from '@angular/compiler/src/util';
import {NgxSpinnerService} from 'ngx-spinner';
import Swal  from 'sweetalert2';


declare var $:any;
type excelDataList = any[][];

@Component({
  selector: 'app-voter-registration',
  templateUrl: './voter-registration.component.html',
  styleUrls: ['./voter-registration.component.css']
})
export class VoterRegistrationComponent implements OnInit {

  tempdata: excelDataList = [];  
  data: excelDataList = [];

  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName: string = 'VoterSample.xlsx';
  title: string  = 'VoterSample'; 
  submitText="";
  importText="";
  voterTempId=0;  
  submitForm: FormGroup;
  UploadForm:FormGroup; 
  submitted = false;
  searchText:any;
  datepipe: DatePipe;
  
  getData:any[]; 
  getCategoryData:any[]; 
  getReligionData:any[]; 
  getVillageData:any[];
  getbusinessTypeData:any[]; 
  voterModel:VoterModel = new VoterModel(); 
  myheader:any;
  //villageuploadId:any;
  villageuploadId:number=0;
  modelArray:Array<any>=[]; 
  ageDate:Date;
  responceData:Array<any>;
  totalRecords:string;
  pageNo:Number=1;

  constructor(private getservicename: AppServiceService, private formBuilder: FormBuilder, private router: Router,private spinner: NgxSpinnerService) {
    this.myheader=this.getservicename.getHeaders(); 
   }

   GetVillageList()
   {
    this.getservicename.getVillagedataList({headers: this.myheader}).subscribe(data=>{
        this.getVillageData=data.data;   
    });
   }

   getVoterDataList()
   {
    var Id=(document.getElementById("villageId") as HTMLInputElement).value;
    
    if(parseInt(Id)==0)
    {
       alert('Select village name');
    }
    else{
      
    this.spinner.show();
    this.getservicename.GetVillageVoterList(Id,{headers: this.myheader}).subscribe(data=>{
      this.responceData=data.VoterList.data;
      this.totalRecords=data.VoterList.data.length; 
      if(this.totalRecords>'0')
      {
        this.searchText;     
        //this.getVillageData=data.VillageList.data;   
      }  
    });
    setTimeout(() => { 
      this.spinner.hide();
    }, 2000);
   }
  }

  DeleteVoterDataList()
  {
   var Id=(document.getElementById("villageId") as HTMLInputElement).value;
   
   if(parseInt(Id)==0)
   {
      alert('Select village name');
   }
   else{

    Swal.fire({
      title: 'Do you want to Delete the data?',      
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result) => {
      
   this.spinner.show();
  
      this.getservicename.DeleteVillageVoterData(Id,{headers: this.myheader}).subscribe(data=>{
        if(data.success)
        {
         Swal.fire('Record Deleted!', '')
        this.getVoterDataList();
        }
        else
        {
         Swal.fire(data.msg, '') 
        }
      });
      setTimeout(() => { 
        this.spinner.hide();
      }, 2000);
    })   
  }
 }

   CreateNew()
   {
    this.submitText="Save";
    this.clear();
    $("#modal-default").modal(); 
   }
 
  uploadExcel()
   {
    this.data =[];
    this.importText="Import";
    this.clear();
    this.modelArray=[];
    $("#modal-excel_default").modal(); 
   }

   onChange(evt) {
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => { 
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' }); 
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname]; 
      this.tempdata = <excelDataList>(XLSX.utils.sheet_to_json(ws, { header: 1,dateNF: "dd/mm/yyyy" }));
     // console.log(this.tempdata);
    };
    reader.readAsBinaryString(target.files[0]);
  }

   ImportViewExcel()
   {      
    this.data =this.tempdata;
    var arrayList=this.data;    
    var Id=(document.getElementById("villageuploadId") as HTMLInputElement).value;
    this.villageuploadId= parseInt(Id);

    for (let i = 1; i < arrayList.length; i++) { 
    this.modelArray.push(
        {
          "villageId": this.villageuploadId,
          "srNo":arrayList[i][0],
          "BoothNo":arrayList[i][1],
          "WardNo":arrayList[i][2],
          "WardName":arrayList[i][3],
          "VoterNo":arrayList[i][4],
          "HouseNo":arrayList[i][5],
          "Name":arrayList[i][6],
          "Relation":arrayList[i][7],
          "Guardian":arrayList[i][8], 
          "Surname":arrayList[i][9],
          "Caste":arrayList[i][10],
          "category":arrayList[i][11],
          "VoterCardNo":arrayList[i][12],
          "Gender":arrayList[i][13],
          "Age":arrayList[i][14],
          "contactNo":arrayList[i][15],          
          "voteStatus":arrayList[i][16],      
        }); 
     }    
      
  }
  
  exportexcelsheet()
  {    
    this.spinner.show();
    /* pass here the table id */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
 
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
 
    /* save to file */  
    XLSX.writeFile(wb, this.fileName); 
    setTimeout(() => { 
      this.spinner.hide();
    }, 2000);
  }

   onUpload(data){
    this.submitted = true; 
    if (this.UploadForm.invalid) {
        return;
    }
    this.importText="Please Wait ....";
    this.spinner.show();
    var dataList='{ "dataList": '+JSON.stringify(this.modelArray)+"}";
       //console.log(dataList);
        this.getservicename.importVoterexcelData(dataList,{headers: this.myheader})
        .subscribe(res=>{ 
          debugger;
          if(res.success==true)
           {
            alert("Import Data Successfully ...!");                
            setTimeout(function(){
              $("#modal-excel_default").modal('hide');
            },2000)       
           } 
           else if(res.responce==false)
           {
            alert("Data not found ...!");           
           }
           else
           {
            alert(res.error);
           }
        });
        this.modelArray=[];      
        setTimeout(() => { 
          this.spinner.hide();
        }, 2000);
   }
   
   clear()
   {
    this.voterTempId=0; 
    this.voterModel.Id=0;   
    this.voterModel.Name='';
    this.voterModel.surname='';

    this.voterModel.Id=0; 
    this.voterModel.AssemblyId=0;  
    this.voterModel.BoothNo=0; 
    this.voterModel.WardNo='';
    this.voterModel.WardName='';
    this.voterModel.VoterNo=0; 
    this.voterModel.houseNo='';  
    this.voterModel.Name='';
    this.voterModel.Relation='';
    this.voterModel.Guardian='';
    this.voterModel.surname='';
    this.voterModel.caste='';
    this.voterModel.VoterCardNo='';
    this.voterModel.gender='';
    this.voterModel.age='';   
    this.voterModel.contactNo='';
   }

   SelectedData(data)
   {
    this.submitText="Update";
    this.voterModel=data;  
    this.voterTempId=this.voterModel.Id;  
    $("#modal-default").modal('show');
  }

  get f() { return this.submitForm.controls; }

  onSubmit(data){
    this.submitted = true; 
    if (this.submitForm.invalid) {
        return;
    }

    this.submitText="Loading ..";
    this.voterModel=data;
    this.voterModel.Id=this.voterTempId;  
    this.getservicename.postVoterData(this.voterModel,{headers: this.myheader})    
    .subscribe(res=>{
      if(res["response"]=="1")
      {
        $('.msgagr').html("New Voter Created Successfully").fadeIn('slow').css({"color": "#1e8449 ", "padding": "6px", "border-radius": "2px" }); //also show a success message 
        $('.msgagr').delay(2000).fadeOut('slow');
      setTimeout(function(){
        $("#modal-default").modal('hide');
      },2000)
      }
      else if(res["response"]=="2")
      {
        $('.msgagr').html("Voter Record Update Successfully").fadeIn('slow').css({"color": "#1e8449 ", "padding": "6px", "border-radius": "2px" }); //also show a success message 
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
      
     // this.getVoterDataList(); 
    });
    
   }

   DeleteData(data)
   { 
    this.voterModel=data;        
    this.getservicename.DeleteVoterData(this.voterModel.Id,{headers: this.myheader})
    .subscribe(res => { 
      $('.msgagr').html("Leader Data Delete Successfully").fadeIn('slow').css({"color": "#1e8449 ", "padding": "6px", "border-radius": "2px" }); //also show a success message 
      $('.msgagr').delay(2000).fadeOut('slow'); 
      //this.getVoterDataList();       
       });
   }

  ngOnInit(): void {
    if(!localStorage.getItem('getToken'))
    {
      this.router.navigate(['/login']);  
    }
     this.GetVillageList();
    //this.getVoterDataList(); 

    this.UploadForm = this.formBuilder.group({  
      villageuploadId: ['0', Validators.required],    
    });

    this.submitForm = this.formBuilder.group({ 
    voterName: ['', Validators.required],
    surname: ['', Validators.required],
    father: ['', Validators.required],
    religion: ['0', Validators.required],
    category: ['0', Validators.required],
    caste: ['', Validators.required],
    gender: ['0', Validators.required],
    dob: ['', Validators.required],
    sssmfamilyId: ['', Validators.required], 
    sssmmemberId: ['', Validators.required], 
    familyHeadName: ['', Validators.required],
    voterCardNo: ['', Validators.required],  
    marritalStatus: ['', Validators.required],
    familyType: ['', Validators.required], 
    businessTypeId: ['0', Validators.required],
    businessName: ['', Validators.required],      
    villageId: ['0', Validators.required],
    houseNo: ['', Validators.required], 
    wardNo: ['', Validators.required],
    contactNo: ['', Validators.required]       
  });
  }
}

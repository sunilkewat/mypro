import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import {HttpClient,HttpHeaders,HttpParams} from '@angular/common/http';
import{ PopulationModel} from '../ViewModel';
import {AppServiceService} from '../app-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { DatePipe } from '@angular/common'
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Pipe, PipeTransform } from '@angular/core';
import { stringify } from '@angular/compiler/src/util';
import {NgxSpinnerService} from 'ngx-spinner';

declare var $:any;
type excelDataList = any[][];

@Component({
  selector: 'app-populationentry',
  templateUrl: './populationentry.component.html',
  styleUrls: ['./populationentry.component.css']
})
export class PopulationentryComponent implements OnInit {

  tempdata: excelDataList = [];  
  data: excelDataList = [];
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName: string = 'PopulationSample.xlsx';
  title: string  = 'PopulationSample'; 
  submitText="";
  importText="";
  tempId=0;  
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
  populationModel:PopulationModel = new PopulationModel(); 
  myheader:any; 
  villageuploadId:number=0;
  modelArray:Array<any>=[]; 
  ageDate:Date;
  responceData:Array<any>;
  totalRecords:string;
  pageNo:Number=1;

  constructor(private getservicename: AppServiceService, private formBuilder: FormBuilder, private router: Router,private spinner: NgxSpinnerService) {
    this.myheader=this.getservicename.getHeaders(); 
   }

   getPopulationDataList()
   {
    this.spinner.show();
    this.getservicename.getPopulationdataList({headers: this.myheader}).subscribe(data=>{
      this.responceData=data.PopulationList.data;
      this.totalRecords=data.PopulationList.data.length; 
      this.searchText;
     
      this.getCategoryData=data.CategoryList.data; 
      this.getReligionData=data.ReligionList.data; 
      this.getVillageData=data.VillageList.data;   
      this.getbusinessTypeData=data.BusinessTypeList.data; 
    });
    setTimeout(() => { 
      this.spinner.hide();
    }, 2000);
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
          "Id":i,
          "sssmfamilyId":arrayList[i][2],
          "sssmmemberId":arrayList[i][3],
          "Name":arrayList[i][4],  
          "father":arrayList[i][5],
          "dob": this.getAgeconvert(arrayList[i][6]),
          "age":arrayList[i][7],
          "address":arrayList[i][8],
          "familyHeadName":arrayList[i][9],
          "gender":arrayList[i][10],           
          "category":arrayList[i][11], 
          "marritalStatus":arrayList[i][12], 
          "villageId":this.villageuploadId     
        }); 
     }    
     
     
     console.log(this.modelArray);
  }

  getAgeconvert(date:any)
  {
    
    // let res = date;
    // var str ="" +res+ "";
    // var n = str.length;
    // if(n==5)
    // { 
    // this.ageDate=new Date((date - (25567 + 1))*86400*1000)
    // }
    // else
    // {
    //   var d = new Date();
    //   var year = d.getFullYear() - res; 
    //   var month = 1;
    //   var day = 1;
    //   var c = new Date(year, month, day); 
    //   this.ageDate=c;
    // }
    return date;
  }
  
  exportexcelsheet()
  {    
    /* pass here the table id */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
 
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
 
    /* save to file */  
    XLSX.writeFile(wb, this.fileName); 
  }

   onUpload(data){
    this.submitted = true; 
    if (this.UploadForm.invalid) {
        return;
    }
    this.spinner.show();
    this.importText="Please Wait ....";
    var dataList='{ "dataList": '+JSON.stringify(this.modelArray)+"}"; 
       //console.log(dataList);
        this.getservicename.importPopulationexcelData(dataList,{headers: this.myheader})
        .subscribe(res=>{ 
          debugger;
          if(res.responce=="1")
           {
            alert("Import Data Successfully ...!");  
            this.getPopulationDataList();  
            setTimeout(function(){
              $("#modal-excel_default").modal('hide');
            },2000)       
           } 
           else if(res.responce=="0")
           {
            alert("Data not found ...!");           
           }
           else
           {
            alert(res.error);
           }
        });
        setTimeout(() => { 
          this.spinner.hide();
        }, 2000);
   }
   
   clear()
   {
    this.tempId=0; 
    this.populationModel.Id=0;   
    this.populationModel.Name='';
    this.populationModel.surname='';
    this.populationModel.father='';
    this.populationModel.religion='';
    this.populationModel.category='';
    this.populationModel.caste='';
    this.populationModel.gender='';
    this.populationModel.dob=null;
    this.populationModel.sssmfamilyId=''; 
    this.populationModel.sssmmemberId=''; 
    this.populationModel.familyHeadName='';
    this.populationModel.voterCardNo='';  
    this.populationModel.marritalStatus='No'; 
    this.populationModel.familyType='APL'; 
    this.populationModel.businessTypeId=''; 
    this.populationModel.businessName='';      
    this.populationModel.villageId='';
    this.populationModel.houseNo=''; 
    this.populationModel.wardNo='';
    this.populationModel.contactNo='';   
   }

   SelectedData(data)
   {
    this.submitText="Update";
    this.populationModel=data;  
    this.tempId=this.populationModel.Id;  
    $("#modal-default").modal('show');
  }

  get f() { return this.submitForm.controls; }

  onSubmit(data){
    this.submitted = true; 
    if (this.submitForm.invalid) {
        return;
    }

    this.submitText="Loading ..";
    this.populationModel=data;
    this.populationModel.Id=this.tempId;  
    this.getservicename.postVoterData(this.populationModel,{headers: this.myheader})    
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
      
      this.getPopulationDataList(); 
    });
    
   }

   DeleteData(data)
   { 
    this.populationModel=data;        
    this.getservicename.DeleteVoterData(this.populationModel.Id,{headers: this.myheader})
    .subscribe(res => { 
      $('.msgagr').html("Voter Data Delete Successfully").fadeIn('slow').css({"color": "#1e8449 ", "padding": "6px", "border-radius": "2px" }); //also show a success message 
      $('.msgagr').delay(2000).fadeOut('slow'); 
      this.getPopulationDataList();       
       });
   }

   ngOnInit(): void {
    if(!localStorage.getItem('getToken'))
    {
      this.router.navigate(['/login']);  
    }

    this.getPopulationDataList(); 

    this.UploadForm = this.formBuilder.group({  
      villageuploadId: ['0', Validators.required],    
    });

    this.submitForm = this.formBuilder.group({ 
    Name: ['', Validators.required],
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

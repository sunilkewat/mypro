import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders,HttpParams } from '@angular/common/http'; 
import { AppServiceService } from '../app-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { from } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';  
import { Router } from '@angular/router';
import{assemblyModel} from '../ViewModel';
import * as XLSX from 'xlsx';
import { DatePipe } from '@angular/common'


declare var $:any;
type excelDataList = any[][];

@Component({
  selector: 'app-assembly-result-master',
  templateUrl: './assembly-result-master.component.html',
  styleUrls: ['./assembly-result-master.component.css']
})
export class AssemblyResultMasterComponent implements OnInit {

  tempdata: excelDataList = [];  
  data: excelDataList = [];
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName: string = 'AssemblyresultSample.xlsx';
  title: string  = 'AssemblyresultSample'; 

  submitText="";
  importText="";
  assemblyTempId=0;
  myheader:any;
  submitForm: FormGroup;
  UploadForm:FormGroup; 
  submitted = false;
  datepipe: DatePipe;
  

  getData:any[]; 
  AssemblyModel:assemblyModel=new assemblyModel(); 
  getBoothNoData:any[]; 

  responceData:Array<any>;
  totalRecords:string;
  pageNo:Number=1;

  modelArray:Array<any>=[]; 

  constructor(private getservicename: AppServiceService,private formBuilder: FormBuilder,public ngxSpinner: NgxSpinnerService,private router: Router) {
    this.myheader=this.getservicename.getHeaders(); 
   }

   getElectionDataList()
   { 
      this.getservicename.getElectionDataList({headers: this.myheader}).subscribe(data=>{
        this.getData=data.data; 
    });
   }

   getassemblyResultDataList()
   { 
      this.getservicename.getAssemblyResultdataList({headers: this.myheader}).subscribe(data=>{
      this.responceData=data.AsssemblyList.data;
      this.totalRecords=data.AsssemblyList.data.length;
      this.getBoothNoData=data.BoothList.data; 
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
    this.assemblyTempId=0; 
    this.AssemblyModel.electionId=''; 
    this.AssemblyModel.boothNo='';  
    this.AssemblyModel.congress=''; 
    this.AssemblyModel.bjp=''; 
    this.AssemblyModel.other=''; 
    this.AssemblyModel.total=''; 
   }

   SelectedData(data)
   {
    this.submitText="Update";
    this.AssemblyModel=data;    
    this.assemblyTempId=this.AssemblyModel.electionId;     
    $("#modal-default").modal('show');
  }

  get f() { return this.submitForm.controls; }
  
  onSubmit(data){ 
   
    this.submitted = true; 
    if (this.submitForm.invalid) {
        return;
    }
     this.submitText="Loading ..";
     this.AssemblyModel=data; 
    // this.AssemblyModel.electionId=this.assemblyTempId;  
     this.getservicename.postAssemblyResultData(this.AssemblyModel,{headers: this.myheader})    
    .subscribe(res=>{
      if(res["response"]=="1")
      {
        $('.msgagr').html("Assembly Result Save Successfully").fadeIn('slow').css({"color": "#1e8449 ", "padding": "6px", "border-radius": "2px" }); //also show a success message 
        $('.msgagr').delay(2000).fadeOut('slow');
      setTimeout(function(){
        $("#modal-default").modal('hide');
      },2000)
      }
      else if(res["response"]=="2")
      {
        $('.msgagr').html("Assembly Result Update Successfully").fadeIn('slow').css({"color": "#1e8449 ", "padding": "6px", "border-radius": "2px" }); //also show a success message 
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
      
      this.getassemblyResultDataList(); 
    });    
   }

   DeleteData(data)
   { 
    this.AssemblyModel=data;        
    this.getservicename.DeleteAssemblyResultData(this.AssemblyModel.electionId,{headers: this.myheader})
    .subscribe(res => { 
      $('.msgagr').html("Assembly Result Delete Successfully").fadeIn('slow').css({"color": "#1e8449 ", "padding": "6px", "border-radius": "2px" }); //also show a success message 
      $('.msgagr').delay(2000).fadeOut('slow'); 
      this.getassemblyResultDataList();       
       });
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
    };
    reader.readAsBinaryString(target.files[0]);
  }

   
   ImportViewExcel()
   {      
    this.data =this.tempdata;
    var arrayList=this.data;   

    for (let i = 1; i < arrayList.length; i++) { 
    this.modelArray.push(
        {
          "electionId":0,
          "boothNo":arrayList[i][1],
          "congress":arrayList[i][2],
          "bjp":arrayList[i][3],
          "other":arrayList[i][4],
          "total":arrayList[i][5]     
        }); 
     }     
  }
 
  onUpload(data){
    this.submitted = true; 
    
    this.importText="Please Wait ....";
    var dataList='{ "dataList": '+JSON.stringify(this.modelArray)+"}";  
        this.getservicename.ImportAssemblyresultExcelData(dataList,{headers: this.myheader})
        .subscribe(res=>{ 
          debugger;
          if(res.success==true)
           {
            alert(res.msg);  
            this.getassemblyResultDataList();
            setTimeout(function(){
              $("#modal-excel_default").modal('hide');
            },2000)       
           } 
           else
           {
            alert(res.msg);           
           } 
        });
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

  ngOnInit(): void {
    if(!localStorage.getItem('getToken'))
    {
        this.router.navigate(['/login']);  
    }

    this.getassemblyResultDataList();
    this.getElectionDataList();
    this.formBuild();
    this.UploadForm = this.formBuilder.group({});
  }

  formBuild()
  {
    this.submitForm = this.formBuilder.group({ 
      electionId: ['', Validators.required],
      boothNo: ['', Validators.required],
      congress: ['', Validators.required],
      bjp: ['', Validators.required], 
      other: ['', Validators.required]      
  });
  }

}

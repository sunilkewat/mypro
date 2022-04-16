import { Component, OnInit,ViewChild } from '@angular/core';
import {HttpClient,HttpHeaders,HttpParams} from '@angular/common/http';
import {AppServiceService} from '../app-service.service';
import { Router } from '@angular/router';
import * as  pluginDataLabels from 'chartjs-plugin-datalabels'; 
import {NgxSpinnerService} from 'ngx-spinner';
import { stringify } from '@angular/compiler/src/util';
import {  FormGroup} from '@angular/forms';
import Swal  from 'sweetalert2';

declare var $:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  form: FormGroup;
  roleType:string='';
  userId:string='0';
  public pieChartLabels:string[] = ['Congress', 'BJP', 'Other'];
  public pieChartData:number[] = [0,0,0];
  public pieChartType:string = 'pie';
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }
  searchText:any;
  myheader:any;
  allMale:any;
  allFemale:any;
  allOther:any;
  allPopulation:any;
  allVillage:any;
  allVoter:any;
  allpanchayat:any;
  allJanpad:any;
  allBlock:any;
  allJilaPanchayat:any;
  allMandal:any;
  allSector:any;
  allBooth:any;
  allWardNoPa:any;
  allWorker:any;
  allFarmar:any;
  allFamily:any;
  allAPLFamily:any;
  allBPLFamily:any;

  isHeaderhown:boolean;
  isHomeShown: boolean;
  isVillageShown: boolean;
  isBlockShown: boolean;
  isSectorShown: boolean;
  isMandalShown:boolean;
  isBoothShown:boolean;
  isPagePrabhariShown:boolean;
  ispoolingAgentShown:boolean;
  isE_poolingShown:boolean;

  totalVoterMale:any;
  totalVoterFemale:any;
  totalVoterOther:any;
  totalVoter:any;
  totalGeneral:any;
  totalObc:any;
  totalSt:any;
  totalSc:any;
  villageName:any;
  boothName:any;

  powervillageListArray:Array<any>=[];
  weekvillageListArray:Array<any>=[];

  ageModelArray:Array<any>=[];
  bussinessModelArray:Array<any>=[];
  casteModelArray:Array<any>=[];
  categoryModelArray:Array<any>=[];
  getData:any[];
  govtEmployeeArray:Array<any>=[];

  villageInfoArray:Array<any>=[];
  partyLeaderArray:Array<any>=[];
  oppositionLeaderArray:Array<any>=[];

  blockListArray:Array<any>=[];
  mandalListArray:Array<any>=[];
  sectorListArray:Array<any>=[];


  homeAssemblydataList:Array<any>=[];
  villageAssemblydataList:Array<any>=[];
  blockAssemblydataList:Array<any>=[];
  mandalAssemblydataList:Array<any>=[];
  sectorAssemblydataList:Array<any>=[];
  
  data:Array<any>=[];
  dataList:Array<any>=[];
  congressTotal:number=0;
  bjpTotal:number=0;
  otherTotal:number=0;
  allTotal:number; 
  totalVote:number;
  getVillageData: any[];  
  getBoothNoData: any[];
  getWardNoData:any[];
  getPagePrabhariData: any[];
  responceData:Array<any>;
  villageListData:Array<any>;
  totalRecords:string;
  govtBoothAllotinfoArray:Array<any>=[];
  tempVillageId:any = 0;
  tempBlockId:any = 0;
  tempMandalId:any = 0;
  tempSectorId:any = 0; 
  IsChecked:boolean=false;
 
  constructor(private getservicename: AppServiceService,private router: Router,private spinner: NgxSpinnerService) {
    this.myheader=this.getservicename.getHeaders();
  }

  
  GetDataBind() {
    this.getservicename.getElectionDataList({headers: this.myheader}).subscribe(data=>{
    this.getData=data.data;
    });
   }

   GetHomeElectionResult(assemblyId:any)
   {     
      this.getservicename.getAssemblyResultdata(assemblyId,0,'Home',{headers: this.myheader}).subscribe(data=>{
      if(data.success=true)
      {  
        //this.powervillageListArray=data.responce.data.powerVillageList;    
        //this.weekvillageListArray=data.responce.data.weekVillageList;           
        this.homeAssemblydataList=data.responce.data.dataList;
        
        this.congressTotal = this.bjpTotal = this.otherTotal =0;

        for (let i = 0; i < this.homeAssemblydataList.length; i++) {
          this.congressTotal += this.homeAssemblydataList[i].congress;
          this.bjpTotal += this.homeAssemblydataList[i].bjp;
          this.otherTotal += this.homeAssemblydataList[i].other;
        }
                
        this.pieChartLabels= ['Congress', 'BJP', 'Other'];
        this.pieChartData = [this.congressTotal,  this.bjpTotal,this.otherTotal]; 
      }   
      else
      {
        this.congressTotal=0;
        this.bjpTotal=0;
        this.otherTotal=0; 
      }   
    });
  }

    GetVillageElectionResult(assemblyId:any)
    {
       this.getservicename.getAssemblyResultdata(assemblyId,this.tempVillageId,'Village',{headers: this.myheader}).subscribe(data=>{
        if(data.success=true)
        {
          //this.powervillageListArray=data.responce.data.powerVillageList;    
        //this.weekvillageListArray=data.responce.data.weekVillageList;           
        this.villageAssemblydataList=data.responce.data.dataList;

          this.congressTotal = this.bjpTotal = this.otherTotal =0;        
          for (let i = 0; i < this.villageAssemblydataList.length; i++) {
            this.congressTotal += this.villageAssemblydataList[i].congress;
            this.bjpTotal += this.villageAssemblydataList[i].bjp;
            this.otherTotal += this.villageAssemblydataList[i].other;
          }                  
          this.pieChartLabels= ['Congress', 'BJP', 'Other'];
          this.pieChartData = [this.congressTotal,  this.bjpTotal,this.otherTotal]; 
        }   
        else
        {
          this.congressTotal=0;
          this.bjpTotal=0;
          this.otherTotal=0; 
        }  
       });
     }

     GetBlockElectionResult(assemblyId:any)
     {
        this.getservicename.getAssemblyResultdata(assemblyId,this.tempBlockId,'Block',{headers: this.myheader}).subscribe(data=>{
          if(data.success=true)
        {
          this.powervillageListArray=data.responce.data.powerVillageList;    
          this.weekvillageListArray=data.responce.data.weekVillageList;           
          this.blockAssemblydataList=data.responce.data.dataList;

          this.congressTotal = this.bjpTotal = this.otherTotal =0; 
          for (let i = 0; i < this.blockAssemblydataList.length; i++) {
            this.congressTotal += this.blockAssemblydataList[i].congress;
            this.bjpTotal += this.blockAssemblydataList[i].bjp;
            this.otherTotal += this.blockAssemblydataList[i].other;
          }                  
          this.pieChartLabels= ['Congress', 'BJP', 'Other'];
          this.pieChartData = [this.congressTotal,  this.bjpTotal,this.otherTotal]; 
        }   
        else
        {
          this.congressTotal=0;
          this.bjpTotal=0;
          this.otherTotal=0; 
        }  
       });
     }

     GetMandalElectionResult(assemblyId:any)
     {
        this.getservicename.getAssemblyResultdata(assemblyId,this.tempMandalId,'Mandal',{headers: this.myheader}).subscribe(data=>{
          if(data.success=true)
          {
            this.powervillageListArray=data.responce.data.powerVillageList;    
            this.weekvillageListArray=data.responce.data.weekVillageList;           
            this.mandalAssemblydataList=data.responce.data.dataList;

            this.congressTotal = this.bjpTotal = this.otherTotal =0;         
            for (let i = 0; i < this.mandalAssemblydataList.length; i++) {
              this.congressTotal += this.mandalAssemblydataList[i].congress;
              this.bjpTotal += this.mandalAssemblydataList[i].bjp;
              this.otherTotal += this.mandalAssemblydataList[i].other;
            }                  
            this.pieChartLabels= ['Congress', 'BJP', 'Other'];
            this.pieChartData = [this.congressTotal,  this.bjpTotal,this.otherTotal]; 
          }   
          else
          {
            this.congressTotal=0;
            this.bjpTotal=0;
            this.otherTotal=0; 
          }  
       });
     }

     GetSectorElectionResult(assemblyId:any)
     {
        this.getservicename.getAssemblyResultdata(assemblyId,this.tempSectorId,'Sector',{headers: this.myheader}).subscribe(data=>{
          if(data.success=true)
        {
          this.powervillageListArray=data.responce.data.powerVillageList;    
          this.weekvillageListArray=data.responce.data.weekVillageList;           
          this.sectorAssemblydataList=data.responce.data.dataList;

          this.congressTotal = this.bjpTotal = this.otherTotal =0;      
          for (let i = 0; i < this.sectorAssemblydataList.length; i++) {
            this.congressTotal += this.sectorAssemblydataList[i].congress;
            this.bjpTotal += this.sectorAssemblydataList[i].bjp;
            this.otherTotal += this.sectorAssemblydataList[i].other;
          }                  
          this.pieChartLabels= ['Congress', 'BJP', 'Other'];
          this.pieChartData = [this.congressTotal,  this.bjpTotal, this.otherTotal]; 
        }   
        else
        {
          this.congressTotal=0;
          this.bjpTotal=0;
          this.otherTotal=0; 
        }  
       });
        }

    //Home Dashboard

  getHomeData()
   {
     this.dataList=[];
     this.congressTotal = this.bjpTotal = this.otherTotal =0;         
    this.spinner.show();
    this.getservicename.getDashboardData({headers: this.myheader}).subscribe(data=>{
      this.isHeaderhown=true;
      this.isHomeShown=true;
      this.isVillageShown=false;
      this.isBlockShown=false;
      this.isMandalShown=false;
      this.isSectorShown=false;
      this.isBoothShown=false;
      this.isPagePrabhariShown=false;
      this.isE_poolingShown=false;
      this.powervillageListArray=[];   
      this.weekvillageListArray=[];         

      this.allMale=data.data.allMale;
      this.allFemale=data.data.allFemale;
      this.allOther=data.data.allOther;
      this.allPopulation=data.data.allPopulation;
      this.allVillage=data.data.allVillage;
      this.allVoter=data.data.allVoter;
      this.allpanchayat=data.data.allpanchayat;
      this.allJanpad=data.data.allJanpad;
      this.allBlock=data.data.allBlock;
      this.allJilaPanchayat=data.data.allJilaPanchayat;
      this.allMandal=data.data.allMandal;
      this.allSector=data.data.allSector;
      this.allBooth=data.data.allBooth;
      this.allWardNoPa=data.data.allWardNoPa;
      this.allWorker=data.data.allWorker;
      this.allFarmar=data.data.allFarmar;
      this.allFamily=data.data.allFamily;
      this.totalVoterMale=data.data.totalVoterMale;
      this.totalVoterFemale=data.data.totalVoterFemale;
      this.totalVoterOther=data.data.totalVoterOther;
      this.totalVoter=data.data.totalVoter;
      this.ageModelArray=data.data._voterAgeModel;
      this.casteModelArray=data.data._voterCasteModel;
      this.bussinessModelArray=data.data._voterOccuptionModels;
      this.categoryModelArray=data.data._voterCategoryModel;
      this.getVillageData=data.data._villageListModels;
      this.blockListArray=data.data._blockModel;
      this.mandalListArray=data.data._mandalModel;
      this.sectorListArray=data.data._sectorModel;      
      this.getBoothNoData=data.data._boothNoModel;      
      this.getPagePrabhariData=data.data._pagePrabhariModel; 

    });
    setTimeout(() => { 
      this.spinner.hide();
    }, 2000);
   }

//Village Dashboard

GetvillageDashboardData(Id:any)
    {
       if(Id==0)
       {
         this.getHomeData();
       }
       else{
        this.dataList=[];
        this.congressTotal = this.bjpTotal = this.otherTotal =0;         
        this.spinner.show();
      this.getservicename.getVillageDashboardData(Id,{headers: this.myheader}).subscribe(data=>{
 
        this.isHeaderhown=true;
        this.isHomeShown=false;
        this.isVillageShown=true;
        this.isBlockShown=false;
        this.isMandalShown=false;
        this.isSectorShown=false;
        this.isBoothShown=false;
        this.isPagePrabhariShown=false;
        this.isE_poolingShown=false;
        this.powervillageListArray=[];   
        this.weekvillageListArray=[];    
      this.allPopulation=data.data.allPopulation;
      this.allAPLFamily=data.data.allAPLFamily;
      this.allBPLFamily=data.data.allBPLFamily;
      this.allVoter=data.data.totalVoter;
      this.tempVillageId=Id;
      this.villageName=data.data.villageName;
      this.ageModelArray=data.data._voterAgeModel;
      this.casteModelArray=data.data._voterCasteModel;
      this.bussinessModelArray=data.data._voterOccuptionModels;
      this.categoryModelArray=data.data._voterCategoryModel;
      this.villageInfoArray=data.data._villageModels;
      this.partyLeaderArray=data.data._partyLeaderModels;
      this.oppositionLeaderArray=data.data._oppositionLeaderModels;
      this.govtEmployeeArray=data.data._govtEmployeeHomeModels;      
      this.blockListArray=data.data._blockModel;
      this.mandalListArray=data.data._mandalModel;
      this.sectorListArray=data.data._sectorModel;
      this.getBoothNoData=data.data._boothNoModel;    
      this.getWardNoData=data.data._wardNoList;  
       });
       setTimeout(() => { 
        this.spinner.hide();
      }, 2000);
     }
    }

     //Block Dashboard

    GetBlockDashboardData(Id:any)
    {
      if(Id==0)
      {
        this.getHomeData();
      }
      else{
        this.dataList=[];
        this.congressTotal = this.bjpTotal = this.otherTotal =0;         
        this.spinner.show();
     this.getservicename.getBlockDashboardData(Id,{headers: this.myheader}).subscribe(data=>{

      this.isHeaderhown=true;
      this.isHomeShown=false;
      this.isVillageShown=false;
      this.isBlockShown=true;
      this.isMandalShown=false;
      this.isSectorShown=false;
      this.isBoothShown=false;
      this.isPagePrabhariShown=false;
      this.isE_poolingShown=false;
      this.powervillageListArray=[];   
      this.weekvillageListArray=[];    

      this.allPopulation=data.data.allPopulation;
      this.allAPLFamily=data.data.allAPLFamily;
      this.allBPLFamily=data.data.allBPLFamily;
      this.allVoter=data.data.totalVoter;
      this.tempBlockId=Id;
      this.villageName=data.data.blockName;
      this.ageModelArray=data.data._voterAgeModel;
      this.casteModelArray=data.data._voterCasteModel;
      this.bussinessModelArray=data.data._voterOccuptionModels;
      this.categoryModelArray=data.data._voterCategoryModel;
      this.villageInfoArray=data.data._blockinfoModels;
      this.partyLeaderArray=data.data._partyLeaderModels;
      this.oppositionLeaderArray=data.data._oppositionLeaderModels; 
      this.getVillageData=data.data._villageListModels; 
      this.mandalListArray=data.data._mandalModel;
      this.sectorListArray=data.data._sectorModel; 
      this.getBoothNoData=data.data._boothNoModel;     
       });
       setTimeout(() => { 
        this.spinner.hide();
      }, 2000);
     }
    }
       //MAndal Dashboard

    GetMandalDashboardData(Id:any)
    {
      if(Id==0)
      {
        this.getHomeData();
      }
      else{
        this.dataList=[];
        this.congressTotal = this.bjpTotal = this.otherTotal =0;         
        this.spinner.show();
      this.getservicename.getMandalDashboardData(Id,{headers: this.myheader}).subscribe(data=>{

      this.isHeaderhown=true;
      this.isHomeShown=false;
      this.isVillageShown=false;
      this.isBlockShown=false;
      this.isMandalShown=true;
      this.isSectorShown=false;
      this.isBoothShown=false;
      this.isPagePrabhariShown=false;
      this.isE_poolingShown=false;
      this.powervillageListArray=[];   
      this.weekvillageListArray=[];   

      this.allPopulation=data.data.allPopulation;
      this.allAPLFamily=data.data.allAPLFamily;
      this.allBPLFamily=data.data.allBPLFamily;
      this.allVoter=data.data.totalVoter;
      this.tempMandalId=Id;
      this.villageName=data.data.mandalName;
      this.ageModelArray=data.data._voterAgeModel;
      this.casteModelArray=data.data._voterCasteModel;
      this.bussinessModelArray=data.data._voterOccuptionModels;
      this.categoryModelArray=data.data._voterCategoryModel;
      this.villageInfoArray=data.data._mandalinfoModels;
      this.partyLeaderArray=data.data._partyLeaderModels;
      this.oppositionLeaderArray=data.data._oppositionLeaderModels;
      //this.govtEmployeeArray=data.data._govtEmployeeHomeModels;
      this.getVillageData=data.data._villageListModels;
      this.blockListArray=data.data._blockModel; 
      this.sectorListArray=data.data._sectorModel;
      this.getBoothNoData=data.data._boothNoModel;  
       });
       setTimeout(() => { 
        this.spinner.hide();
      }, 2000);
     }
    }

     GetSectorDashboardData(Id:any)
     {
      if(Id==0)
      {
        this.getHomeData();
      }
      else{
        this.dataList=[];
        this.congressTotal = this.bjpTotal = this.otherTotal =0;         
        this.spinner.show();
      this.getservicename.getSectorDashboardData(Id,{headers: this.myheader}).subscribe(data=>{

        this.isHeaderhown=true;
        this.isHomeShown=false;
        this.isVillageShown=false;
        this.isBlockShown=false;
        this.isMandalShown=false;
        this.isSectorShown=true;
        this.isBoothShown=false;
        this.isPagePrabhariShown=false;
        this.isE_poolingShown=false;
        this.powervillageListArray=[];   
        this.weekvillageListArray=[];   

       this.allPopulation=data.data.allPopulation;
       this.allAPLFamily=data.data.allAPLFamily;
       this.allBPLFamily=data.data.allBPLFamily;
       this.allVoter=data.data.totalVoter;
       this.tempSectorId=Id;
       this.villageName=data.data.sectorName;
       this.ageModelArray=data.data._voterAgeModel;
       this.casteModelArray=data.data._voterCasteModel;
       this.bussinessModelArray=data.data._voterOccuptionModels;
       this.categoryModelArray=data.data._voterCategoryModel;
       this.villageInfoArray=data.data._sectorinfoModels;
       this.partyLeaderArray=data.data._partyLeaderModels;
       this.oppositionLeaderArray=data.data._oppositionLeaderModels;
       //this.govtEmployeeArray=data.data._govtEmployeeHomeModels;
       this.getVillageData=data.data._villageListModels;
       this.blockListArray=data.data._blockModel;
       this.mandalListArray=data.data._mandalModel; 
       this.getBoothNoData=data.data._boothNoModel;       
        });
        setTimeout(() => { 
          this.spinner.hide();
        }, 2000);
      }
    }

    GetBoothDashboardData(Id:any)
     {
      if(Id==0)
      {
        this.getHomeData();
      }
      else{
        this.dataList=[];
        this.congressTotal = this.bjpTotal = this.otherTotal =0;         
        this.spinner.show();
      this.getservicename.getBoothDashboardData(Id,{headers: this.myheader}).subscribe(data=>{

        this.isHeaderhown=true;
        this.isHomeShown=false;
        this.isVillageShown=false;
        this.isBlockShown=false;
        this.isMandalShown=false;
        this.isSectorShown=false;
        this.isBoothShown=true;
        this.isPagePrabhariShown=false;
        this.isE_poolingShown=false;
        this.powervillageListArray=[];   
        this.weekvillageListArray=[];   

     // this.govtBoothAllotinfoArray=data.data._boothallocateviewModels;
        
      this.allPopulation=data.data.allPopulation;
      this.allAPLFamily=data.data.allAPLFamily;
      this.allBPLFamily=data.data.allBPLFamily;
      this.allVoter=data.data.totalVoter;
      this.tempVillageId=Id;
      this.boothName=data.data.boothName;
      this.ageModelArray=data.data._voterAgeModel;
      this.casteModelArray=data.data._voterCasteModel;
      this.bussinessModelArray=data.data._voterOccuptionModels;
      this.categoryModelArray=data.data._voterCategoryModel;
      this.villageInfoArray=data.data._villageModels;
     // this.partyLeaderArray=data.data._partyLeaderModels;
     // this.oppositionLeaderArray=data.data._oppositionLeaderModels;
     // this.govtEmployeeArray=data.data._govtEmployeeHomeModels;

        });
        setTimeout(() => { 
          this.spinner.hide();
        }, 2000);
      }
    }

    GetPagePDashboardData(Id:any)
    {
     if(Id==0)
     {
      this.dataList=[];
      this.congressTotal = this.bjpTotal = this.otherTotal =0;         
       this.getHomeData();
     }
     else{
       this.spinner.show();
       this.isHeaderhown=true;
        this.isHomeShown=false;
        this.isVillageShown=false;
        this.isBlockShown=false;
        this.isMandalShown=false;
        this.isSectorShown=false;
        this.isBoothShown=false;
        this.isPagePrabhariShown=true;
        this.isE_poolingShown=false;
        this.powervillageListArray=[];   
        this.weekvillageListArray=[];   

       this.getPageprabhariHomeData(Id)
       setTimeout(() => { 
         this.spinner.hide();
       }, 2000);
     }
   }

   GetE_PoolingDashboardData()
    {
      this.spinner.show();
      this.isHeaderhown=false;
      this.isHomeShown=false;
      this.isVillageShown=false;
      this.isBlockShown=false;
      this.isMandalShown=false;
      this.isSectorShown=false;
      this.isBoothShown=false;
      this.isPagePrabhariShown=false;
      this.isE_poolingShown=false; 
      this.router.navigate(['./EPooling']);
      setTimeout(() => { 
        this.spinner.hide();
      }, 2000);
   }

   

   getPageprabhariHomeData(id:string)
   {
    this.spinner.show();
    this.isPagePrabhariShown=true;
    this.getservicename.GetPagePrabhariAllocatedVoterList(id,{headers: this.myheader}).subscribe(data=>{  
      this.responceData=data.VoterList.data;
      this.totalRecords=data.VoterList.data.length; 
    }); 
    setTimeout(() => { 
      this.spinner.hide();
    }, 2000);
   }

   getAgentHomeData(id:string)
   {
    this.spinner.show();
    this.ispoolingAgentShown=true;  
    this.getservicename.GetAgentAllocatedVoterList(id,{headers: this.myheader}).subscribe(data=>{  
      this.responceData=data.VoterList.data;
      this.totalRecords=data.VoterList.data.length; 
      this.searchText;
    }); 
    setTimeout(() => { 
      this.spinner.hide();
    }, 2000);
   }

   AddVoterVotevent(event)
   {
     if(event.target.checked)
     {
      Swal.fire({
        title: 'Do you want to Save Voter Vote?',      
        showCancelButton: true,
        confirmButtonText: 'Yes',
      }).then((result) => {
        
     this.spinner.show();     
       this.getservicename.AddVoterVote(event.target.value,'true',{headers: this.myheader}).subscribe(res=>{
        this.getAgentHomeData(this.userId); 
      });
      }) 
     }
    }

  ngOnInit(): void {
    if(!localStorage.getItem('getToken'))
    {
      this.router.navigate(['/login']);
    }
    this.isHeaderhown=false;
    this.isHomeShown=false;
    this.isVillageShown=false;
    this.isBlockShown=false;
    this.isMandalShown=false;
    this.isSectorShown=false;
    this.isBoothShown=false;
    this.isPagePrabhariShown=false;
    this.ispoolingAgentShown=false;
    this.isE_poolingShown=false;
    
    this.roleType=localStorage.getItem('role');
    this.userId=localStorage.getItem('uId');
    this.GetDataBind();
    if(this.roleType=='PagePrabhari')
    { 
      this.getPageprabhariHomeData(this.userId);
    }
    else if(this.roleType=='Agent')
    {
      this.getAgentHomeData(this.userId);
    }
    else
    {
      this.getHomeData();
    }
  }
}

import { Injectable } from '@angular/core';
import{importAssemblyModel,AgentModel, GovtEmployeeModel, LeaderModel, VoterModel, villageModel, PagePrabhariModel, ParentModel, DepartmentModel, DesignationModel, ElectionModel,  boothAllotArrayModel, voterAllotModel,  BusinessTypeModel, agentBoothAllotModel, pagePrabharibootAllotModel, MenuModel, passwordgenerateViewModel, passwordgenerateModel,  assemblyModel, importVoterModel,PopulationModel} from './ViewModel';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {observable, Observable} from 'rxjs';
import { DepartmentComponent } from './department/department.component';
import { stringify } from '@angular/compiler/src/util';

// @Injectable({
//   providedIn: 'root'
// })


export class AppServiceService { 

  constructor(private _http: HttpClient) { }
  tempData:any;
  myheader:any;
  accessToken:any;
  urlm:any;
   
  //baseUrl:string="http://rajniti.fuzenpharma.in/api"; 
  baseUrl:string="http://localhost:53523/api"; 

  electionId:string=localStorage.getItem('electionId');
  roleType:string=localStorage.getItem('role');
  uId:string=localStorage.getItem('uId');

  // Agent Section -----------------------------------------------------------

getHeaders():Observable<any>
{
  this.accessToken=localStorage.getItem('getToken');
   this.myheader = new HttpHeaders({ 
    'Content-Type': 'applicati  on/json',
    'Authorization': 'Bearer '+((this.accessToken))
 }); 
 return this.myheader;
}

PostLogin(data):Observable<any>
{   
 return this._http.post<any>(this.baseUrl+'/Login/login', data);
}

//Dashboard

getDashboardData(Headers):Observable<any>{  
  return this._http.get<any>(this.baseUrl+'/Account/GetDashboardData/'+this.electionId,Headers);
}

getVillageDashboardData(villageId,Headers):Observable<any>{  
  return this._http.get<any>(this.baseUrl+'/Account/GetVillageDashboardData/'+villageId+'/'+this.electionId,Headers);
}

getBlockDashboardData(blockId,Headers):Observable<any>{  
  return this._http.get<any>(this.baseUrl+'/Account/GetBlockeDashboardData/'+blockId+'/'+this.electionId,Headers);
}

getMandalDashboardData(mandalId,Headers):Observable<any>{  
  return this._http.get<any>(this.baseUrl+'/Account/GetMandalDashboardData/'+mandalId+'/'+this.electionId,Headers);
}

getSectorDashboardData(sectorId,Headers):Observable<any>{  
  return this._http.get<any>(this.baseUrl+'/Account/GetSectorDashboardData/'+sectorId+'/'+this.electionId,Headers);
}

getBoothDashboardData(boothId,Headers):Observable<any>{  
  return this._http.get<any>(this.baseUrl+'/Account/GetBoothDashboardData/'+boothId+'/'+this.electionId,Headers);
}
 
// Menu Permission 
 
// This Api show permited menu for  menu bar on dashboard

getMenulist4user(Headers):Observable<any>{  
  return this._http.get<any>(this.baseUrl+'/Menu/GetUserMenuList' , Headers);
}

// This Api show permited menu permission form

getpermissionmenuList(role,Headers):Observable<any>{  
  return this._http.get<any>(this.baseUrl+'/Menu/GetPermisionMenuList/'+ role, Headers);
}

// This Api show All menu list on permission form

getMenuData(Headers):Observable<any>{  
  return this._http.get<any>(this.baseUrl+'/Menu/GetAllMenuList',Headers);
}

// Api For Add new menu list for user
postAddUserMenuList(data,Headers):Observable<any>
{    
return this._http.post<MenuModel[]>(this.baseUrl+'/Menu/AddUserMenu',data,Headers);
}


//Password Gerate List

postPasswordgenerate(data,Headers):Observable<any>
{    
return this._http.post<passwordgenerateModel[]>(this.baseUrl+'/Account/AddGeneratedPassword',data,Headers);
}

getPasswordgenerateList(role,Headers):Observable<any>{  
  return this._http.get<passwordgenerateViewModel[]>(this.baseUrl+'/Account/GetGeneratedPasswordList/'+role, Headers);
}
// Pageprabhari voter allotment

GetAllocationVoterList(villageId,Headers):Observable<any>{  
  return this._http.get<any[]>(this.baseUrl+'/VoterAllot/GetAllocationVoterList/'+villageId+'/'+this.electionId, Headers);
}

postAllotVoterData(data,Headers):Observable<any>
{    
return this._http.post<voterAllotModel[]>(this.baseUrl+'/VoterAllot/AddAllotVoterData',data,Headers);
}

GetPagePrabhariAllocatedVoterList(PagePrabhariId,Headers):Observable<any>{  
  return this._http.get<any[]>(this.baseUrl+'/VoterAllot/GetPageprabhariAllotedVoterList/'+PagePrabhariId+'/'+this.electionId, Headers);
}

GetAgentAllocatedVoterList(agentId,Headers):Observable<any>{  
  return this._http.get<any[]>(this.baseUrl+'/VoterAllot/GetAgentAllotedVoterList/'+agentId+'/'+this.electionId, Headers);
}
//Assembly Result

getAssemblyResultdata(assemblyId,id,form,Headers):Observable<any>{ 
  return this._http.get<any[]>(this.baseUrl+'/Assembly/GetAssemblyResultData/'+assemblyId+'/'+id+'/'+form, Headers);
}

getAssemblyResultdataList(Headers):Observable<any>{ 
  return this._http.get<any[]>(this.baseUrl+'/Assembly/GetAssemblyResultList/'+this.electionId, Headers);
}

postAssemblyResultData(data,Headers):Observable<any> 
{   
return this._http.post<assemblyModel[]>(this.baseUrl+'/Assembly/AddAssemblyResult',data,Headers);
}

DeleteAssemblyResultData(assemblyid,Headers):Observable<any> 
{ 
return this._http.get<assemblyModel[]>(this.baseUrl+'/Assembly/DeleteAddAssemblyResult/'+ assemblyid,Headers);
}

//Voter Booth Allotment

getVoterboothallotdataList(villageId,Headers):Observable<any>{ 
   
  return this._http.get<any[]>(this.baseUrl+'/Booth/GetBoothAllotedVoterList/'+villageId+'/'+this.electionId, Headers);
}

postBoothAllotData(data,Headers):Observable<any>
{  
return this._http.post<boothAllotArrayModel[]>(this.baseUrl+'/Booth/AddBoothAllot',data,Headers);
}

// Business type

getBusinessTypedataList(Headers):Observable<any>{ 
  return this._http.get<any[]>(this.baseUrl+'/BusinessType/GetBusinessTypeList', Headers);
}

postBusinessTypeData(data,Headers):Observable<any>
{ 
return this._http.post<BusinessTypeModel[]>(this.baseUrl+'/BusinessType/AddBusinessType',data,Headers);
}

DeleteBusinessTypeData(businessmanid,Headers):Observable<any>
{ 
return this._http.get<BusinessTypeModel[]>(this.baseUrl+'/BusinessType/DeleteBusinessType/'+ businessmanid,Headers);
}

// Agent

getAgentdataList(Headers):Observable<any>{ 
  return this._http.get<any[]>(this.baseUrl+'/Agent/GetAgentList/'+this.electionId, Headers);
}

postAgentData(data,Headers):Observable<any>
{ 
return this._http.post<AgentModel[]>(this.baseUrl+'/Agent/AddAgent',data,Headers);
}

postAgentboothAllotData(data,Headers):Observable<any>
{ 
  data.electionId=this.electionId;
return this._http.post<agentBoothAllotModel[]>(this.baseUrl+'/Agent/AddAgentBoothInfo',data,Headers);
}

DeleteAgentData(agentid,Headers):Observable<any>
{ 
return this._http.get<AgentModel[]>(this.baseUrl+'/Agent/DeleteAgent/'+ agentid,Headers);
}
 

// Election Section -----------------------------------------------------------


getElectionDataList(Headers):Observable<any>{
  return this._http.get<any[]>(this.baseUrl+'/Election/GetElectionList', Headers);
} 

postElectionData(data,Headers):Observable<any>
{ 
return this._http.post<ElectionModel[]>(this.baseUrl+'/Election/AddElection',data,Headers);
}

DeleteElectionData(electionId,Headers):Observable<any>
{ 
return this._http.get<ElectionModel[]>(this.baseUrl+'/Election/DeleteElection/'+ electionId, Headers);
}

PostActiveSelectedElectionName(electionId,Headers):Observable<any>
{ 
return this._http.get<any[]>(this.baseUrl+'/Election/ActiveElection/'+ electionId, Headers);
}

GetActiveElectionName(Headers):Observable<any>
{ 
return this._http.get<any[]>(this.baseUrl+'/Election/GetActiveElectionName/', Headers);
}



// Govt Employee Section -----------------------------------------------------------

getGovtEmployeedataList(Headers):Observable<any>{
  return this._http.get<any[]>(this.baseUrl+'/GovernmentEmployee/GetGovtEmployeeList', Headers);
}

postGovtEmployeeData(data,Headers):Observable<any>
{ 
return this._http.post<GovtEmployeeModel[]>(this.baseUrl+'/GovernmentEmployee/AddGovtEmployee',data,Headers);
}

DeleteGovtEmployeeData(employeeid,Headers):Observable<any>
{ 
return this._http.get<GovtEmployeeModel[]>(this.baseUrl+'/GovernmentEmployee/DeleteGovtEmployee/'+ employeeid, Headers);
}

// Party Leader Section -----------------------------------------------------------

getPartyLeaderdataList(Headers):Observable<any>{
  return this._http.get<any[]>(this.baseUrl+'/Leader/GetPartyLeaderList', Headers);
}

postPartyLeaderData(data,Headers):Observable<any>
{ 
return this._http.post<LeaderModel[]>(this.baseUrl+'/Leader/AddPartyLeader',data,Headers);
}

DeletePartyLeaderData(leaderid,Headers):Observable<any>
{ 
return this._http.get<LeaderModel[]>(this.baseUrl+'/Leader/DeletePartyLeader/'+ leaderid, Headers);
}

// Opposition Leaader Section -----------------------------------------------------------

getOppositionPartyLeaderdataList(Headers):Observable<any>{
  return this._http.get<any[]>(this.baseUrl+'/Leader/GetOppositionPartyLeaderList', Headers);
}

postOppositionLeaderData(data,headers):Observable<any>
{ 
return this._http.post<LeaderModel[]>(this.baseUrl+'/Leader/AddOppositionPartyLeader',data,headers);
}

DeleteOppositionLeaderData(leaderid,Headers):Observable<any>
{    
return this._http.get<LeaderModel[]>(this.baseUrl+'/Leader/DeleteOppositionLeader/'+ leaderid, Headers);
}

// Voter Section -----------------------------------------------------------

GetVillageVoterList(Id,Headers):Observable<any>{
  return this._http.get<any[]>(this.baseUrl+'/Voter/GetVillageVoterList/'+Id+'/'+this.electionId, Headers);
}

postVoterData(data,Headers):Observable<any>
{ 
return this._http.post<VoterModel[]>(this.baseUrl+'/Voter/AddVoter',data,Headers);
}

DeleteVoterData(voterId,Headers):Observable<any>
{ 
return this._http.get<VoterModel[]>(this.baseUrl+'/Voter/DeleteVoter/'+ voterId, Headers);
}

// Population Section -----------------------------------------------------------

getPopulationdataList(Headers):Observable<any>{
  return this._http.get<any[]>(this.baseUrl+'/PopulationInfo/GetPopulationList', Headers);
}

postPopulationData(data,Headers):Observable<any>
{ 
return this._http.post<PopulationModel[]>(this.baseUrl+'/PopulationInfo/AddPopulationInfo',data,Headers);
}

DeletePopulationData(PopulationId,Headers):Observable<any>
{ 
return this._http.get<PopulationModel[]>(this.baseUrl+'/PopulationInfo/DeletePopulation/'+ PopulationId, Headers);
}

//Village Section -----------------------------------------------------------

getVillagedataList(Headers):Observable<any>{
 return this._http.get<any[]>(this.baseUrl+'/Village/GetVillageList',Headers);
}

postVillageData(data,Headers):Observable<any>
{ 
return this._http.post<villageModel[]>(this.baseUrl+'/Village/AddVillage',data,Headers);
}

DeleteVillageData(villageId,Headers):Observable<any>
{ 
return this._http.get<villageModel[]>(this.baseUrl+'/Village/DeleteVillage/'+ villageId, Headers);
}
 
// PagePrabhari Section -----------------------------------------------------------

getpageprabharidataList(Headers):Observable<any>{
  return this._http.get<any[]>(this.baseUrl+'/PagePrabhari/GetPagePrabhariList/'+this.electionId, Headers);
}

postPagePrabhariData(data,Headers):Observable<any>
{ 
return this._http.post<PagePrabhariModel[]>(this.baseUrl+'/PagePrabhari/AddPagePrabhari',data,Headers);
}

postPagePrabhariboothAllotData(data,Headers):Observable<any>
{  
return this._http.post<pagePrabharibootAllotModel[]>(this.baseUrl+'/PagePrabhari/AddPagePrabhariBoothInfo',data,Headers);
}

DeletePagePrabhariData(pageprabhariId,Headers):Observable<any>
{ 
return this._http.get<PagePrabhariModel[]>(this.baseUrl+'/PagePrabhari/DeletePagePrabhari/'+ pageprabhariId, Headers);
}
 
// Parent Section -----------------------------------------------------------

getParentdataList(Headers):Observable<any>{
  return this._http.get<any[]>(this.baseUrl+'/Lookup/GetParentList', Headers);
}

postParentData(data,Headers):Observable<any>
{ 
return this._http.post<ParentModel[]>(this.baseUrl+'/Lookup/AddParent',data,Headers);
}

DeleteParentData(parentId,Headers):Observable<any>
{ 
return this._http.get<ParentModel[]>(this.baseUrl+'/Lookup/DeleteParent/'+ parentId, Headers);
}
 
// department Section -----------------------------------------------------------

getDepartmentdataList(Headers):Observable<any>{
  return this._http.get<any[]>(this.baseUrl+'/Lookup/GetDepartmentList', Headers);
}

postDepartmentData(data,Headers):Observable<any>
{ 
return this._http.post<DepartmentModel[]>(this.baseUrl+'/Lookup/AddDepartment',data,Headers);
}

DeleteDepartmentData(departmentId,Headers):Observable<any>
{ 
return this._http.get<DepartmentModel[]>(this.baseUrl+'/Lookup/DeleteDepartment/'+ departmentId, Headers);
}

// designation Section -----------------------------------------------------------

getDesignationdataList(Headers):Observable<any>{
  return this._http.get<any[]>(this.baseUrl+'/Lookup/GetDesignationList', Headers);
}

postDesignationData(data,Headers):Observable<any>
{ 
return this._http.post<DesignationModel[]>(this.baseUrl+'/Lookup/AddDesignation',data,Headers);
}

DeleteDesignationData(designationId,Headers):Observable<any>
{ 
return this._http.get<DesignationModel[]>(this.baseUrl+'/Lookup/DeleteDesignation/'+ designationId, Headers);
}

// Lookup Section -----------------------------------------------------------
 
getAllparentNameList(Headers):Observable<any>{
 return this._http.get<any[]>(this.baseUrl+'/Lookup/GetAllParentNameList', Headers);
}

getCategoryList(Headers):Observable<any>{
 return this._http.get<any[]>(this.baseUrl+'/Lookup/BindCategoryList',Headers);
}


getReligionList(Headers):Observable<any>{
  return this._http.get<any[]>(this.baseUrl+'/Lookup/BindReligionList', Headers)
}

getJanpadPanchyatList(Headers):Observable<any>{
  return this._http.get<any[]>(this.baseUrl+'/Lookup/GetJanpadPanchyatList', Headers);
}

getDistrictPanchyatList(Headers):Observable<any>{
  return this._http.get<any[]>(this.baseUrl+'/Lookup/GetDistrictPanchyatList',Headers);
}

getBlockList(Headers):Observable<any>{
  return this._http.get<any[]>(this.baseUrl+'/Lookup/GetBlockList',Headers);
}

getMandalList(Headers):Observable<any>{
  return this._http.get<any[]>(this.baseUrl+'/Lookup/GetMandalList',Headers);
}

getSectorList(Headers):Observable<any>{
  return this._http.get<any[]>(this.baseUrl+'/Lookup/GetSectorList',Headers);
}

getBoothNoList(Id,Headers):Observable<any>{
  return this._http.get<any[]>(this.baseUrl+'/Lookup/GetBoothList/'+Id+'/'+this.electionId,Headers);
}


//Import Data

importVoterexcelData(data,Headers):Observable<any>
{  
return this._http.post<importVoterModel[]>(this.baseUrl+'/Voter/ImportVoterExcel',data,Headers);
}

importPopulationexcelData(data,Headers):Observable<any>
{  
return this._http.post<importVoterModel[]>(this.baseUrl+'/PopulationInfo/ImportPopulationExcel',data,Headers);
}

ImportAssemblyresultExcelData(data,Headers):Observable<any>
{  
return this._http.post<importAssemblyModel[]>(this.baseUrl+'/Assembly/ImportAssemblyresultExcel/'+this.electionId,data,Headers);
}

DeleteVillageVoterData(villageId,Headers):Observable<any>
{ 
  this.urlm=this.baseUrl+'/Voter/DeleteVillageVoterData/'+ villageId+'/'+this.electionId;
  return this._http.get<any[]>(this.urlm, Headers);
}


//Votting

AddVoterVote(voterCardNo,voteStatus,Headers):Observable<any>
{  
return this._http.post<any[]>(this.baseUrl+'/Votting/AddVoterVote/'+voterCardNo+'/'+this.electionId+'/'+voteStatus,Headers);
}
GetepoolingVillageVoterList(villageId,Headers):Observable<any>{  
  return this._http.get<any[]>(this.baseUrl+'/ePooling/Get_epooling_VillageVoterList/'+villageId+'/'+this.electionId, Headers);
}

}

 


 
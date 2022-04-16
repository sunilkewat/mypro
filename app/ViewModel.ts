 
export class LoginModel
{
    userName:string;
    password:string;   
}

//Password Generator

export class passwordgenerateModel
{
     userid:number;
     role:string;
     userName:string;
     password:string;
     isActive:boolean;
}

export class passwordgenerateViewModel
{
     userid:number;
     name:string;
     father:string;
     contact:string;
     address:string;
     userName:string;
     password:string; 
     isActive:boolean;
}

//Assembly

export class assemblyModel
{
     electionId:any;
     boothNo:string;
     congress:any;
     bjp:any;
     other:any;
     total:any;
}

 

//Menu

  
 export class MenuModel
 {
    userId:number;
    role:string; 
    menu:string;
 }

  
// Booth
 

export class voterAllotModel
{ 
     electionId:number;
     villageId:number;
     pagePrabhariId:number;
     voterId:number;
}

//Bsusiness Type Master

export class BusinessTypeModel
{
    businessTypeId:number;
    businessTypeName:string;
}
  
export class boothAllotArrayModel
{
    villageId:number; 
    voterId:number;
    boothNo:string;
    boothArea:string;
}
 

//Agent Model
        
export class AgentModel
{
    agentId:number;
    agentName:string;
    agentType:string;
    surname:string;
    father:string;
    category:string;
    caste:string;
    dob:Date;
    voterCardNo:string;
    address:string;
    contactNo:string;
    post:string;
    fileName:string; 
}
 

export class agentBoothAllotModel
{    
    agentId:number;
    villageId:number;
    boothNo:string;
}

//Election Model

export class ElectionModel
{
    electionId:number;
    electionName:string; 
    electionYear:string;   
}
 

//Govt Employee Model

export class GovtEmployeeModel
{
    employeeId:number;
    employeeName:string; 
    father:string 
    departmentId:any; 
    designationId:any; 
    villageId:any; 
    contactNo:string; 
    address:string;  
    status:string;  
    fileName:string;     
}
 
//Leader Model

export class LeaderModel{
    leaderId:number;
    partyName:string;
    leaderName:string;
    father:string;
    gender:string;
    religion:string;
    category:string;
    caste:string;
    dob:Date;
    contactNo:string;
    address:string; 
    fileName:string; 
}
 



//Department Model

export class DepartmentModel
{
    departmentId:number;
    departmentName:string;  
}
 

//Designation Model

export class DesignationModel
{
    designationId:number;
    designationName:string;  
}
 

//Parent Model
  
export class ParentModel
{
    parentId:number;
    parentNameId:string; 
    areaName:string;  
}
 

export class PagePrabhariModel
{
    pagePrabhariId:number;
    pagePrabhariName:string;
    surname:string;
    father:string;
    category:string;
    caste:string;
    dob:Date; 
    contactNo:string;
    villageId:any;  
    fileName:string; 
}
 

export class pagePrabharibootAllotModel
{
    pagePrabhariId:number; 
    areaName:string;   
    boothNo:string; 
    electionId:number;     
}

export class villageModel
{
    villageId:number;
    villageName:string; 
    panchayatName:string; 
    janpatPanchayatId:any;
    districtPanchayatId:any;
    blockId:any;
    mandalId:any;
    sectorId:any;
}
 

export class importVoterModel
{
    voterId:number;
    voterName:string;
    surname:string; 
    father:string; 
    religion:string; 
    category:string; 
    caste:string; 
    gender:string; 
    dob:Date; 
    sssmfamilyId:string;  
    sssmmemberId:string;  
    familyHeadName:string;  
    voterCardNo:string;  
    marritalStatus:string;  
    familyType:string;
    businessTypeId:any;
    businessName:string;
    villageId:any;  
    houseNo:string;  
    wardNo:string;  
    contactNo:string;   
}

export class PopulationModel
{
    Id:number;
    Name:string;
    surname:string; 
    father:string; 
    religion:string; 
    category:string; 
    caste:string; 
    gender:string; 
    dob:Date; 
    sssmfamilyId:string;  
    sssmmemberId:string;  
    familyHeadName:string;  
    voterCardNo:string;  
    marritalStatus:string;  
    familyType:string;
    businessTypeId:any;
    businessName:string;
    villageId:any;  
    houseNo:string;  
    wardNo:string;  
    contactNo:string;   
}

export class VoterModel
{
    Id:number;
    villageId:number;
    AssemblyId:number;
    BoothNo:number;
    WardNo:string;
    WardName:string;
    VoterNo:number;
    houseNo:string;  
    Name:string;
    Relation:string;
    Guardian:string;
    surname:string;  
    caste:string; 
    category:string;
    VoterCardNo:string; 
    gender:string; 
    age:string;    
    contactNo:string;   
}
 
export class importAssemblyModel
{ 
    boothNo:string;
    congress:any;
    bjp:any;
    other:any;
    total:any;
}

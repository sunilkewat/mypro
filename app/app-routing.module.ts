import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {HomeComponent} from './home/home.component';
import {NewAgentComponent} from './new-agent/new-agent.component';
import {GovtEmployeeComponent} from './govt-employee/govt-employee.component';
import{OpositionPartyLeaderComponent}from './oposition-party-leader/oposition-party-leader.component';
import{PartyLeaderComponent}from './party-leader/party-leader.component';
import{VillageMasterComponent}from './village-master/village-master.component';
import{VoterRegistrationComponent}from './voter-registration/voter-registration.component';
import{PagePrabhariComponent}from './page-prabhari/page-prabhari.component';
import{ElectionMasterComponent} from './election-master/election-master.component';
import{ParenMasterComponent} from './paren-master/paren-master.component';
import{DepartmentComponent} from './department/department.component';
import{DesignationComponent} from './designation/designation.component';
import{VoterBoothAllotComponent} from './voter-booth-allot/voter-booth-allot.component';
import{prepareEventListenerParameters } from '@angular/compiler/src/render3/view/template';
import{LoginComponent} from './login/login.component';
import{AuthguardGuard} from './auth/authguard.guard'; 
import { VoterallotComponent } from './voterallot/voterallot.component';
import {BusinessTypeComponent} from './business-type/business-type.component';
import { from } from 'rxjs';
import { MainlayoutComponent } from './mainlayout/mainlayout.component';
import { PermissionformComponent } from './permissionform/permissionform.component';
import { AssemblyResultMasterComponent } from './assembly-result-master/assembly-result-master.component';
import { PasswordGenerationComponent } from './password-generation/password-generation.component';
import { VottingentryComponent } from './vottingentry/vottingentry.component';
import {BoothmasterComponent} from './boothmaster/boothmaster.component'; 
import { PopulationentryComponent } from './populationentry/populationentry.component';
import {VoterlistformComponent} from './voterlistform/voterlistform.component';
import { EPoolingComponent } from './e-pooling/e-pooling.component';
 
const routes: Routes = [
   
  {path:'',redirectTo:'login', pathMatch: 'full' },
  {
    path: '',
    component: MainlayoutComponent,
    children: [ 
        {path:'home', component:HomeComponent, data:{title:'Election'}},
  
        {path:'new-agent', component:NewAgentComponent, data:{title:'New Agent'}},
  
        {path:'govt-employee',component:GovtEmployeeComponent,data:{title:'Govt. Employees'}},
  
        {path:'oposition-party-leader',component:OpositionPartyLeaderComponent,data:{title:'Oposition Party Leader'}},
  
        {path:'party-leader',component:PartyLeaderComponent,data:{title:'Party Leader'}},
  
        {path:'village-master',component:VillageMasterComponent,data:{title:'Village Master'}},
  
        {path:'voter-registration',component:VoterRegistrationComponent,data:{title:'Voter Registration'}},
  
        {path:'page-prabhari',component:PagePrabhariComponent,data:{title:'Page Prabhari'}},
  
        {path:'election-master',component:ElectionMasterComponent,data:{title:'Election Master'}},
  
        {path:'parent-master',component:ParenMasterComponent,data:{title:'Prent Master'}},
  
        {path:'department',component:DepartmentComponent,data:{title:'Department'}},
  
        {path:'designation',component:DesignationComponent,data:{title:'Designation'}}, 
  
        {path:'voter-booth-allot', component:VoterBoothAllotComponent,data:{title:'Voter Booth Allot'}}, 
     
        {path:'voterallot',component:VoterallotComponent,data:{title:'Voter Allot'}},

        {path:'business-type', component:BusinessTypeComponent,data:{title:'Business Type'}},

        {path:'permissionform', component:PermissionformComponent,data:{title:'Permission Form'}},

        {path:'assembly-result-master', component:AssemblyResultMasterComponent,data:{title:'AssemblyResult Form'}},

        {path:'password-generation', component:PasswordGenerationComponent,data:{title:'Password Generation Form'}},

        {path:'vottingentry', component:VottingentryComponent,data:{title:'Votting Entry'}},

        {path:'boothmaster', component:BoothmasterComponent,data:{title:'Booth Master'}},

        {path:'populationentry', component:PopulationentryComponent,data:{title:'Population Info'}},

        {path:'Voterlistform',component:VoterlistformComponent,data:{title:''}},
      //  {import { EPoolingComponent } from './e-pooling/e-pooling.component';}
        {path:'EPooling',component:EPoolingComponent,data:{title:''}}
         
    ]
  },
  {path:'login',component:LoginComponent,data:{title:'Login'}} 
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[]
})

export class AppRoutingModule { } 

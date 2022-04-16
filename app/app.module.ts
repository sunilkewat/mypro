import { BrowserModule, Title } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { NgModule } from '@angular/core';
import{NgxSpinnerModule} from 'ngx-spinner'; 
import {NgxPaginationModule} from 'ngx-pagination'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FotterComponent } from './fotter/fotter.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NewAgentComponent } from './new-agent/new-agent.component';
import { from } from 'rxjs';
import { GovtEmployeeComponent } from './govt-employee/govt-employee.component';
import { OpositionPartyLeaderComponent } from './oposition-party-leader/oposition-party-leader.component';
import { PartyLeaderComponent } from './party-leader/party-leader.component';
import { VillageMasterComponent } from './village-master/village-master.component';
import { VoterRegistrationComponent } from './voter-registration/voter-registration.component';
import { PagePrabhariComponent } from './page-prabhari/page-prabhari.component';
import { ElectionMasterComponent } from './election-master/election-master.component';
import { ParenMasterComponent } from './paren-master/paren-master.component';
import { DepartmentComponent } from './department/department.component';
import { DesignationComponent } from './designation/designation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { VoterBoothAllotComponent } from './voter-booth-allot/voter-booth-allot.component';
import {AuthguardGuard} from './auth/authguard.guard'; 
import { VoterallotComponent } from './voterallot/voterallot.component';
import { BusinessTypeComponent } from './business-type/business-type.component';
import { MainlayoutComponent } from './mainlayout/mainlayout.component';
import { PermissionformComponent } from './permissionform/permissionform.component';
import { AssemblyResultMasterComponent } from './assembly-result-master/assembly-result-master.component';
import { PasswordGenerationComponent } from './password-generation/password-generation.component'; 
import { Ng2SearchPipeModule  } from 'ng2-search-filter';
import { VottingentryComponent } from './vottingentry/vottingentry.component';
import { BoothmasterComponent } from './boothmaster/boothmaster.component';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChartsModule } from 'ng2-charts';
import { PopulationentryComponent } from './populationentry/populationentry.component';
import {VoterlistformComponent} from './voterlistform/voterlistform.component';
import { EPoolingComponent } from './e-pooling/e-pooling.component';

 
  
@NgModule({
  
  imports: [
    
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    Ng2SearchPipeModule, 
    ChartsModule,
    BrowserAnimationsModule
  ],

  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FotterComponent,
    SidebarComponent,
    NewAgentComponent,
    GovtEmployeeComponent,
    OpositionPartyLeaderComponent,
    PartyLeaderComponent,
    VillageMasterComponent,
    VoterRegistrationComponent,
    PagePrabhariComponent,
    ElectionMasterComponent,
    ParenMasterComponent,
    DepartmentComponent,
    DesignationComponent,
    LoginComponent,
    AdminComponent,
    VoterBoothAllotComponent, 
    VoterallotComponent,
     BusinessTypeComponent,
     MainlayoutComponent,
     PermissionformComponent,
     AssemblyResultMasterComponent,
     PasswordGenerationComponent,
     VottingentryComponent,
     BoothmasterComponent,
     DashboardComponent,
     PopulationentryComponent,
     VoterlistformComponent,
     EPoolingComponent
  ], 
  bootstrap: [AppComponent],
  providers: [Title, AuthguardGuard,{provide:LocationStrategy, useClass:HashLocationStrategy}]
  
})
export class AppModule { }

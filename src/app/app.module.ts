import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavegacaoModule } from './navegacao/navegacao.module';
import { TarefaService } from './tarefas/services/tarefa.service';
import { TarefaComponent } from './tarefas/tarefa/tarefa.component';
import { OrderModule } from 'ngx-order-pipe';

@NgModule({
  declarations: [
    AppComponent,
    TarefaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavegacaoModule,
    NgbModule,
    RouterModule,
    HttpClientModule,
    ToastrModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    OrderModule,
    ToastrModule.forRoot()
  ],
  providers: [
    TarefaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

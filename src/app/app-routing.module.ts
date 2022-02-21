import { FinanceiroComponent } from './financeiros/financeiro/financeiro.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './navegacao/home/home.component';
import { NotFoundComponent } from './navegacao/not-found/not-fount.component';
import { TarefaComponent } from './tarefas/tarefa/tarefa.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'todo', component: TarefaComponent},
  {path: 'financeiro', component: FinanceiroComponent},
  {path: 'nao-encontrado', component: NotFoundComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

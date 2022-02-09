import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { Tarefa } from "../models/tarefa";
import { catchError, retry } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class TarefaService {
    url = "http://localhost:3000/tarefas";

    // Injetando o HttpClient
    constructor(private _httpClient: HttpClient) { }

    // Headers
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }

    // Retorna todas as tarefas (Realizando manipulação de errors)
    getTarefas(): Observable<Tarefa[]>{
        return this._httpClient.get<Tarefa[]>(this.url)
            .pipe(
                retry(2), // Reexecuta a chamada
                catchError(this.handleError)
            );
    }

    // Retorna a tarefa pelo id
    getById(id: number): Observable<Tarefa> {
        return this._httpClient.get<Tarefa>(`${this.url}/${id}`)
            .pipe(
                retry(2),
                catchError(this.handleError)
            );
    }

    // Salva uma tarefa
    adicionarTarefa(tarefa: Tarefa): Observable<Tarefa> {
        return this._httpClient.post<Tarefa>(this.url, JSON.stringify(tarefa),this.httpOptions)
            .pipe(
                retry(2),
                catchError(this.handleError)
            );
    }

    // Atualiza uma tarefa
    alterarTarefa(tarefa: Tarefa): Observable<Tarefa> {
        return this._httpClient.put<Tarefa>(`${this.url}/${tarefa.id}`, JSON.stringify(tarefa), this.httpOptions)
            .pipe(
                retry(1),
                catchError(this.handleError)
            );
    }

    // Deleta uma tarefa
    deletarTarefa(tarefa: Tarefa) {
        return this._httpClient.delete<Tarefa>(`${this.url}/${tarefa.id}`, this.httpOptions)
            .pipe(
                retry(1),
                catchError(this.handleError)
            );
    }

    // Manipulação de erros
    handleError(error: HttpErrorResponse) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
        // Erro ocorreu no lado do client
        errorMessage = error.error.message;
        } else {
        // Erro ocorreu no lado do servidor
        errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
        }
        console.log(errorMessage);
        return throwError(errorMessage);
    };
}
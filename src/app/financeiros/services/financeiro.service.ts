import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { Financeiro } from './../models/financeiro';
import { catchError, retry } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class FinanceiroService {
    url = "http://localhost:3000/financeiros";

    // Injetando o HttpClient
    constructor(private _httpClient: HttpClient) { }

    // Headers
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }

    // Retorna todo financeiro
    getFinanceiros(): Observable<Financeiro[]>{
        return this._httpClient.get<Financeiro[]>(this.url)
            .pipe(
                retry(2), // Reexecuta a chamada
                catchError(this.handleError)
            );
    }

    // Retorna o financeiro pelo id
    getById(id: number): Observable<Financeiro> {
        return this._httpClient.get<Financeiro>(`${this.url}/${id}`)
            .pipe(
                retry(2),
                catchError(this.handleError)
            );
    }

    // Salva um financeiro
    adicionarFinanceiro(financeiro: Financeiro): Observable<Financeiro> {
        return this._httpClient.post<Financeiro>(this.url, JSON.stringify(financeiro),this.httpOptions)
            .pipe(
                retry(2),
                catchError(this.handleError)
            );
    }

    // Atualiza um financeiro
    alterarFinanceiro(financeiro: Financeiro): Observable<Financeiro> {
        return this._httpClient.put<Financeiro>(`${this.url}/${financeiro.id}`, JSON.stringify(financeiro), this.httpOptions)
            .pipe(
                retry(1),
                catchError(this.handleError)
            );
    }

    // Deleta um financeiro
    deletarFinanceiro(financeiro: Financeiro) {
        return this._httpClient.delete<Financeiro>(`${this.url}/${financeiro.id}`, this.httpOptions)
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

import { map, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { UnidadeService } from './../services/unidade/unidade.service';
import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { AcessoUnidade } from '../core/acesso-unidade';

@Injectable({
    providedIn: 'root'
  })
@Injectable()
export class UnidadeResolver implements Resolve<AcessoUnidade> {
    constructor(
        private unidadeService: UnidadeService,
        private router:Router,
        private http:HttpClient
        ) {}
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
        ): Observable<any>|Promise<any>|any {

           return this.http.get( 'api/unidade/' + `usuario`).pipe(
               switchMap((info) => {
                   return of(info);
               })
           )
    }
}

// import { CursosService } from './../cursos.service';
import { Curso } from './../curso';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CursoCrudService } from '../cursosCrud.service';

@Injectable({
  providedIn: 'root'
})
export class CursoResolverGuard implements Resolve<Curso> {

  constructor(private service: CursoCrudService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Curso> {
    if(route.params && route.params['id']) {
      return this.service.loadById(route.params['id']);
    }

    return of({
      id: null,
      nome: null,
      modalidade: null,
      qtdHrs: null,
      professor: null,
      descricao: null,
    });
  }

}

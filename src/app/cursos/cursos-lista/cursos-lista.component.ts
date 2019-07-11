import { AlertModalService } from './../../shared/alert-modal.service';
import { AlertModalComponent } from './../../shared/alert-modal/alert-modal.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
// import { CursosService } from './../cursos.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Curso } from '../curso';
import { Observable, empty, Subject, EMPTY } from 'rxjs';
import { catchError, take, switchMap } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { CursoCrudService } from '../cursosCrud.service';


@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styles: ['./cursos-lista.component.scss'],
  preserveWhitespaces: true

})
export class CursosListaComponent implements OnInit {
  deleteModalRef: BsModalRef;
  @ViewChild('deleteModal') deleteModal;

  cursos$: Observable<Curso[]>; // observable, pipe async
  error$ = new Subject<boolean>(); //error pipe async

  courseSelected: Curso;

  constructor(private service: CursoCrudService,
     private alertService: AlertModalService,
     private router: Router,
     private route: ActivatedRoute,
     private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.onRefresh();
  }

  onRefresh() {
    this.cursos$ = this.service.list() // pipe async
      .pipe( //error pipe async
        catchError(error => {
          console.log(error);
          // this.error$.next(true);
          this.handlerError();
          return empty();
        })
      )
  }

  handlerError(){
    this.alertService.showAlertDanger('Erro ao carregar cursos, Tente novamente mais tarde.')
  }

  onEdit(id){
    this.router.navigate(['editar', id], { relativeTo: this.route });//route edit, id course
  }

  onDelete(curso){
    this.courseSelected = curso; //ref course
    // this.deleteModalRef = this.modalService.show(this.deleteModal, { class: 'modal-sm' });
    const result$ = this.alertService.showConfirm('Confirmação', 'Têm Certeza Que Deseja Remover o Curso?');
    result$.asObservable()
      .pipe(
        take(1),
        switchMap(result => result ? this.service.remove(curso.id) : EMPTY)
        )
        .subscribe(
          success => {
            this.onRefresh();
          },
          error => {
            this.alertService.showAlertDanger('Erro ao Remover Curso, Tente Mais Tarde!');
          }
        )
  }

  onConfirmDelete(){
    this.service.remove(this.courseSelected.id)
      .subscribe(
        success => {
          this.onRefresh();
          this.onDeclineDelete();
        },
        error => {
          this.alertService.showAlertDanger('Erro ao Remover Curso, Tente Mais Tarde!');
          this.onDeclineDelete();
        }
      );
  }

  onDeclineDelete(){
    this.deleteModalRef.hide();
  }


}

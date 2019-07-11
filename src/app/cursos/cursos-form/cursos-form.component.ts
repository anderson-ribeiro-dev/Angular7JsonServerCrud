import { ActivatedRoute } from '@angular/router';

import { AlertModalService } from './../../shared/alert-modal.service';
// import { CursosService } from './../cursos.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { map, switchMap } from 'rxjs/operators';
import { CursoCrudService } from '../cursosCrud.service';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styles: ['./cursos-form.component.scss']
})
export class CursosFormComponent implements OnInit {

  form: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder,
              private service: CursoCrudService,
              private modal: AlertModalService,
              private  location: Location,
              private route: ActivatedRoute //get params route
              ){}

  ngOnInit() {
    //resolver router, Photo of the route
    const curso = this.route.snapshot.data['curso'];
    //create form
    this.form = this.fb.group({
      id: [curso.id],
      nome: [curso.nome, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]],
      modalidade: [curso.modalidade, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]],
      qtdHrs: [curso.qtdHrs, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]],
      professor: [curso.professor, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]],
      descricao: [curso.descricao, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]]
    });
  }

  hasError(field: string) {
    return this.form.get(field).errors;
  }

  onSubmit() {
    this.submitted = true;
    if(this.form.valid) {
      // console.log(this.form.value);
      let msgSuccess = 'Curso Criado com Sucesso!';
      let msgError = 'Erro ao Criar curso, Tente Novamente!';

      //update
      if(this.form.value.id) {
        msgSuccess = 'Curso Atualizado com Sucesso!';
        msgError = 'Erro ao Atualizar Curso, Tente Novamente!';
      }

      this.service.save(this.form.value).subscribe(
        success => {
          this.modal.showAlertSuccess(msgSuccess);
          this.location.back(); //previous page
        },
        error => this.modal.showAlertDanger(msgError),
        // () => console.log('Update Completo')
      );
    }
  }

  onCancel() {
    this.submitted = false;
    this.form.reset();
    // console.log('cancelado');
  }

}

import { Router } from '@angular/router';
import { Response } from '@angular/http';
import { Injectable } from '@angular/core';

import { MessageService } from 'primeng/api';

import { NotAuthenticatedErro } from '../seguranca/money-http';

@Injectable()
export class ErrorHandlerService {

  constructor(
    private messageService: MessageService,
    private router: Router
  ) { }

  handler(errorResponse: any) {
    let msg: string;

    if (typeof errorResponse === 'string') {
      msg = errorResponse;
    } else if (errorResponse instanceof NotAuthenticatedErro) {
      msg = 'Sua sessão expirou!';
      this.router.navigate(['/login']);
    } else if (errorResponse instanceof Response &&
      errorResponse.status >= 400 && errorResponse.status < 500) {

      let errors;
      msg = 'Ocorreu um erro ao processar a sua solicitação';

      if (errorResponse.status === 403) {
        msg = 'Você não tem permissão para executar essa ação!';
      }
      try {
        errors = errorResponse.json();
        msg = errors[0].mensagemUsuario;
      } catch (e) { }
      console.error('Ocorreu um erro', errorResponse);
    } else {
      console.log('Ocorreu um erro!', errorResponse);
      msg = 'Erro ao processar serviço remoto. Tente novamente.';
    }
    this.messageService.add({ severity: 'error', summary: msg });

  }

}

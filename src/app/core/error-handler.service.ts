import { Injectable } from '@angular/core';

import { MessageService } from 'primeng/api';

@Injectable()
export class ErrorHandlerService {

  constructor(private messageService: MessageService) { }

  handler(errorResponse: any) {
    let msg: string;

    if (typeof errorResponse === 'string') {
      msg = errorResponse;
      this.messageService.add({ severity: 'error', summary: msg });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Erro ao processar serviço remoto. Tente novamente.' });
      console.log('Ocorreu um erro!', errorResponse);
    }

  }

}

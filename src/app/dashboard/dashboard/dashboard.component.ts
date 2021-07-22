import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import * as moment from 'moment';

import { DashboardService } from '../dashboard.service';
import { ErrorHandlerService } from '../../core/error-handler.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  pieChartData: any;
  lineChartData: any;
  options = {
    tooltips: {
      callbacks: {
        label: (tooltipItem, data) => {
          const dataset = data.datasets[tooltipItem.datasetIndex];
          const valor = dataset.data[tooltipItem.index];
          const label = dataset.label ? (dataset.label + ': ') : '';

          return label + this.decimalPipe.transform(valor, '1.2-2');
        }
      }
    }
  };

  constructor(
    private dashboardService: DashboardService,
    private errorHandler: ErrorHandlerService,
    private decimalPipe: DecimalPipe
  ) { }

  ngOnInit() {
    this.configurarGraficoPizza();
    this.configurarGraficoLinha();
  }

  configurarGraficoPizza() {
    this.dashboardService.lancamentosPorCategoria()
      .then(dados => {
        this.pieChartData = {
          labels: dados.map(dado => dado.categoria.nome),
          datasets: [
            {
              data: dados.map(dado => dado.total),
              backgroundColor: ['#FF9900', '#109618', '#990099', '#3B3EAC', '#0099C6',
                '#DD4477', '#3366CC', '#DC3912']
            }
          ]
        };
      })
      .catch(erro => this.errorHandler.handler(erro));

  }
  configurarGraficoLinha() {
    this.dashboardService.lancamentosPorDia()
      .then(dados => {
        const diasDoMes = this.obterDiasDoMes();
        const totaisReceitas = this.totaisPorCadaDiaMes(dados.filter(dado => dado.tipo === 'RECEITA'), diasDoMes);
        const totaisDespesas = this.totaisPorCadaDiaMes(dados.filter(dado => dado.tipo === 'DESPESA'), diasDoMes);
        this.lineChartData = {
          labels: diasDoMes,
          datasets: [
            {
              label: 'Revenues',
              data: totaisReceitas,
              borderColor: '#3366CC'
            }, {
              label: 'Expenses',
              data: totaisDespesas,
              borderColor: '#D62B00'
            }
          ]
        };
      })
      .catch(erro => this.errorHandler.handler(erro));
  }

  private totaisPorCadaDiaMes(dados, diasDoMes) {
    const totais: number[] = [];
    for (const dia of diasDoMes) {
      let total = 0;
      for (const dado of dados) {
        if (dado.dia.getDate() === dia) {
          total = dado.total;
        }
      }
      totais.push(total);
    }
    return totais;
  }

  private obterDiasDoMes() {
    const mes = new Date();
    const quantidade = moment(mes).daysInMonth();
    const diasDoMes: number[] = [];

    for (let i = 1; i <= quantidade; i++) {
      diasDoMes.push(i);
    }

    return diasDoMes;
  }

}

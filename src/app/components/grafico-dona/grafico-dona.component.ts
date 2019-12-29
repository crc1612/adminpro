import { Component, OnInit, Input } from '@angular/core';
import { Label, SingleDataSet, MultiDataSet } from 'ng2-charts';
import { ChartType, ChartPoint } from 'chart.js';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: []
})
export class GraficoDonaComponent implements OnInit {

  // Doughnut
  @Input('Labels') doughnutChartLabels: Label[];
  @Input('Data') doughnutChartData: SingleDataSet[];

  public doughnutChartType: ChartType = 'doughnut';

  constructor() {
  }

  ngOnInit() {
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

}

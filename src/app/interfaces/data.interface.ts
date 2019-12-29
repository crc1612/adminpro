import { Label, MultiDataSet } from 'ng2-charts';
import { ChartType } from 'chart.js';
export class Data {
    labels: Label;
    data: MultiDataSet[];
    type: ChartType;
    leyenda: string;
}
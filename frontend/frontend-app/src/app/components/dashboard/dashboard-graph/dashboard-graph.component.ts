import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, ChartData, ChartOptions, LineController, LineElement, PointElement, LinearScale, CategoryScale, Filler, Legend } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Filler, Legend);

@Component({
  selector: 'app-dashboard-grafico',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './dashboard-graph.component.html',
  styleUrls: ['./dashboard-graph.component.css']
})
export class DashboardGraph {
  @Input() estadistica6Meses: any[] = [];

  lineChartData: ChartData<'line'> = {
    labels: [],
    datasets: [{ 
      label: 'Turnos por mes',
      data: [],
      fill: true,
      tension: 0.3,
      backgroundColor: 'rgba(75, 192, 192, 0.35)',  // color fallback
      borderColor: 'rgba(75, 192, 192, 1)',
     }
    ]
  };

  lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: { legend: { display: true } }
  };

  ngOnChanges(): void {
    if (this.estadistica6Meses.length) {
      this.lineChartData.labels = this.estadistica6Meses.map(d => d.mes);
      this.lineChartData.datasets[0].data = this.estadistica6Meses.map(d => d.cantidad);
    }
  }
}

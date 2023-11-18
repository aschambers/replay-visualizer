import { Component, Input } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent {
  chart: any;
  @Input() sortedPokemon: Array<Array<string | number>> = [];

  ngOnInit(): void {
    this.createChart();
  }

  /**
   * creates a chart based on data that is passed in
   */
  createChart = () => {
    const labels = [];
    const data = [];
    for (let i = 0; i < this.sortedPokemon.length; i++) {
      const array = this.sortedPokemon[i];
      if (array && i < 6) {
        labels.push(array[0]);
        data.push(array[1]);
      }
    }

    this.chart = new Chart("MyChart", {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Commly Used Pokemon',
          data: data,
          backgroundColor: [
            'red',
            'pink',
            'green',
            'yellow',
            'orange',
            'blue',			
          ],
        }],
      },
      options: {
        aspectRatio: 2.5,
        plugins: {
          legend: {
            labels: {
              color: "white",
              font: {
                size: 16
              }
            }
          }
        },
        scales: {
          y: {
            ticks: {
              color: "white",
              font: {
                size: 14,
              },
              stepSize: 1
            }
          },
          x: {
            ticks: {
              color: "white",
              font: {
                size: 12
              },
              stepSize: 1
            }
          }
        }
      }
    });
  }
}

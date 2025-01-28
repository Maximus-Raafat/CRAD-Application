import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, effect, inject, PLATFORM_ID } from '@angular/core';
import { ReportsServiceService } from '../../../Core/Services/Reports/reports-service.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent {
  completedTasks: number = 223;
  pendingTasks: number = 311;

  data: any;
  options: any;
  platformId = inject(PLATFORM_ID);

  

  constructor(private cd: ChangeDetectorRef,private reportSerivce:ReportsServiceService) {
    
  }


  ngOnInit() {
    this.initReportData();
  }

  initChart() {
      if (isPlatformBrowser(this.platformId)) {
          const documentStyle = getComputedStyle(document.documentElement);
          const textColor = documentStyle.getPropertyValue('--text-color');
          console.log(this.completedTasks, this.pendingTasks)
          this.data = {
              labels: ['Complated', 'Pending'],
              datasets: [
                  {
                      data: [this.completedTasks, this.pendingTasks],
                      backgroundColor: [documentStyle.getPropertyValue('--p-cyan-500'), documentStyle.getPropertyValue('--p-orange-500'), documentStyle.getPropertyValue('--p-gray-500')],
                      hoverBackgroundColor: [documentStyle.getPropertyValue('--p-cyan-400'), documentStyle.getPropertyValue('--p-orange-400'), documentStyle.getPropertyValue('--p-gray-400')]
                  }
              ]
          };

          this.options = {
              plugins: {
                  legend: {
                      labels: {
                          usePointStyle: true,
                          color: textColor
                      }
                  }
              }
          };
          this.cd.markForCheck()
      }

  }

  initReportData(): void{
    this.reportSerivce.getTaskCounts().subscribe(counts => {
      this.completedTasks = counts.completed;
      this.pendingTasks = counts.pending;
      this.initChart();

    });
  }
}

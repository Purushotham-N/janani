import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-jdf-dashboard',
  templateUrl: './jdf-dashboard.component.html',
  styleUrls: ['./jdf-dashboard.component.css']
})
export class JdfDashboardComponent {
  /** Based on the screen size, switch from standard to one column per row */
  // cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
  //   map(({ matches }) => {
  //     if (matches) {
  //       return [
  //         { title: 'Card 1', cols: 1, rows: 1 },
  //         { title: 'Card 2', cols: 1, rows: 1 },
  //         { title: 'Card 3', cols: 1, rows: 1 },
  //         { title: 'Card 4', cols: 1, rows: 1 }
  //       ];
  //     }

  //     return [
  //       { title: 'Card 1', cols: 2, rows: 1 },
  //       { title: 'Card 2', cols: 1, rows: 1 },
  //       { title: 'Card 3', cols: 1, rows: 2 },
  //       { title: 'Card 4', cols: 1, rows: 1 }
  //     ];
  //   })
  // );

  // dashboard.component.js



cardLayout = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
   map(({ matches }) => {
     if (matches) {
       return {
         columns: 1,
         miniCard: { cols: 1, rows: 1 },
         chart: { cols: 1, rows: 2 },
         table: { cols: 1, rows: 4 },
       };
     }

    return {
       columns: 4,
       miniCard: { cols: 1, rows: 1 },
       chart: { cols: 2, rows: 2 },
       table: { cols: 4, rows: 4 },
     };
   })
 );

//  miniCardData: StoreSummary[];

 constructor(private breakpointObserver: BreakpointObserver)
  // , private summaryService: StoreSummaryService)
  {}

 ngOnInit() {
  //  this.summaryService.getStoreSummary().subscribe({
  //    next: summaryData => {
  //      this.miniCardData = summaryData;
  //    }
  //  });
//  }
}

}

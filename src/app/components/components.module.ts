import { NgModule } from "@angular/core";
/* import { IncrementadorComponent } from './incrementador/incrementador.component';
import { DonutComponent } from './donut/donut.component'; */

//(42) importamos para el ngModel 9.26 min
import { FormsModule } from '@angular/forms';



//(54) importacion de ng2 charts
/* import { ChartsModule } from 'ng2-charts'; */

@NgModule({

  declarations:[

  /* IncrementadorComponent */
    /* DonutComponent */

],
  exports:[

    /* IncrementadorComponent */
     /* DonutComponent */

  ],

  imports:[

    FormsModule,
    /* ChartsModule */
  ]


})

export class ComponentsModule {}

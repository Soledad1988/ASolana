import { Component } from "@angular/core";
import { FeaturesectionComponent } from "./features-section.component";
import { HeroSectionComponent } from "./hero-section.component";
import { TransactionssectionComponent } from "./transactions-section.component";


@Component({
    selector: 'my-proyect-home-page',
    standalone: true,
    template: `
    <my-proyect-hero-section></my-proyect-hero-section>
    `,
    imports: [
        HeroSectionComponent, FeaturesectionComponent,
        TransactionssectionComponent
    ]
})

  export class HomePageComponent {
  
  }
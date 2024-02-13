import { Component } from "@angular/core";
import { FeaturesectionComponent } from "./features-section.component";
import { HeroSectionComponent } from "./hero-section.component";


@Component({
    selector: 'my-proyect-home-page',
    standalone: true,
    template: `
    <my-proyect-hero-section></my-proyect-hero-section>
    <my-proyect-features-section></my-proyect-features-section>
    `,
    imports:[
        HeroSectionComponent, FeaturesectionComponent
    ]
  })

  export class HomePageComponent {
  
  }
import { Component } from "@angular/core";


@Component({
    selector: 'my-proyect-hero-section',
    standalone: true,
    template: `
    <section class="bg-gray-300 px-4 py-32 text-center">
        <p class="text-3xl">Este es Hero</p>
    </section>
    `
  })

  export class HeroSectionComponent {
  
  }
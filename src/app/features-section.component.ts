import { Component } from "@angular/core";


@Component({
    selector: 'my-proyect-features-section',
    standalone: true,
    template: `
    <section class="bg-black text-white">
        <ul class="flex justify-center items-center gap-4 py-10">
            <li>Rápido</li>
            <li>Eficiente</li>
            <li>Seguro</li>
        </ul>
    </section>
    `
  })

  export class FeaturesectionComponent {
  
  }
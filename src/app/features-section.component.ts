import { Component } from "@angular/core";


@Component({
    selector: 'my-proyect-features-section',
    standalone: true,
    template: `
    <section class="bg-black text-myGray font-mono" style="font-weight: bold;">
        <ul class="flex justify-center items-center gap-4 py-10">
            <li>Fast</li>
            <li>Efective</li>
            <li>Save</li>
        </ul>
    </section>
    `
  })

  export class FeaturesectionComponent {
  
  }
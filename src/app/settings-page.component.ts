import { Component } from "@angular/core";
import { FeaturesectionComponent } from "./features-section.component";


@Component({
    selector: 'my-proyect-settings-page',
    standalone: true,
    template: `
    <section class="bg-gray-300 px-4 py-32 text-center">
        <p class="text-3xl">Settings</p>
    </section>
    <my-proyect-features-section></my-proyect-features-section>
      `,
    imports: [FeaturesectionComponent]
})

  export class SettingsPageComponent {
  
  }
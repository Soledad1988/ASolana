import { Component } from "@angular/core";
import { FeaturesectionComponent } from "./features-section.component";


@Component({
    selector: 'my-proyect-settings-page',
    standalone: true,
    template: `
    <section class="bg-gray-300 px-4 py-32 text-center">
      <div class="absolute top-1/8 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
            <h2 class="text-2xl font-bold mb-2">Settings</h2>
      </div>
    </section>
      `,
    imports: [FeaturesectionComponent]
})

  export class SettingsPageComponent {
  
  }
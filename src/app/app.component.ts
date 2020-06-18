import { Component } from '@angular/core';

@Component({
selector: "rl-root",
template: `
<div>
  <app-recipe-list></app-recipe-list>
</div>
`
})

export class AppComponent {
  pageTitle: string = "Recipe List";
}
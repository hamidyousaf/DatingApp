import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inline-style-inline-template',
  template: `
    <p>
      inline-style-inline-template works!
    </p>
  `,
  styles: [
  ]
})
export class InlineStyleInlineTemplateComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

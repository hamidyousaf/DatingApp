import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InlineStyleInlineTemplateComponent } from './inline-style-inline-template.component';

describe('InlineStyleInlineTemplateComponent', () => {
  let component: InlineStyleInlineTemplateComponent;
  let fixture: ComponentFixture<InlineStyleInlineTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InlineStyleInlineTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InlineStyleInlineTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

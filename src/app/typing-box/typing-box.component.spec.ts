import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypingBoxComponent } from './typing-box.component';

describe('TypingBoxComponent', () => {
  let component: TypingBoxComponent;
  let fixture: ComponentFixture<TypingBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypingBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypingBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

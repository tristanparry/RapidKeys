import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypingPhraseComponent } from './typing-phrase.component';

describe('TypingPhraseComponent', () => {
  let component: TypingPhraseComponent;
  let fixture: ComponentFixture<TypingPhraseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypingPhraseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypingPhraseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

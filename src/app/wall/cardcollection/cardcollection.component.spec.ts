import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardcollectionComponent } from './cardcollection.component';

describe('CardcollectionComponent', () => {
  let component: CardcollectionComponent;
  let fixture: ComponentFixture<CardcollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardcollectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardcollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

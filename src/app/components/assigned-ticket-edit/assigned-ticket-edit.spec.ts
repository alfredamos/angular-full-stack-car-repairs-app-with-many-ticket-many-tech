import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedTicketEdit } from './assigned-ticket-edit';

describe('AssignedTicketEdit', () => {
  let component: AssignedTicketEdit;
  let fixture: ComponentFixture<AssignedTicketEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignedTicketEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignedTicketEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

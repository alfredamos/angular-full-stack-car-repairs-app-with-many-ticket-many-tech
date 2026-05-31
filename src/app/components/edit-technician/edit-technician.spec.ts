import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTechnician } from './edit-technician';

describe('EditTechnician', () => {
  let component: EditTechnician;
  let fixture: ComponentFixture<EditTechnician>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditTechnician]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTechnician);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

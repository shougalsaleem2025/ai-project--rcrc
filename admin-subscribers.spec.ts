import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSubscribers } from './admin-subscribers';

describe('AdminSubscribers', () => {
  let component: AdminSubscribers;
  let fixture: ComponentFixture<AdminSubscribers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminSubscribers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSubscribers);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

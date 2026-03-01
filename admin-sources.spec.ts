import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSources } from './admin-sources';

describe('AdminSources', () => {
  let component: AdminSources;
  let fixture: ComponentFixture<AdminSources>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminSources]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSources);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

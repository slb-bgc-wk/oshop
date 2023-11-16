import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialDatatableTestComponent } from './material-datatable-test.component';

describe('MaterialDatatableTestComponent', () => {
  let component: MaterialDatatableTestComponent;
  let fixture: ComponentFixture<MaterialDatatableTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialDatatableTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialDatatableTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

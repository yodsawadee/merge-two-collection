import { TestBed, ComponentFixture } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
      ]
    }).compileComponents();

    // create component and test fixture
    fixture = TestBed.createComponent(AppComponent);

    // get test component from the fixture
    component = fixture.componentInstance;
    component.ngOnInit();
    // debugElement: DebugElement;
    debugElement = fixture.debugElement;
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.form.valid).toBeFalsy();
  });

  it('collection 1 field validity', () => {
    let collection1 = component.form.controls['collection1'];
    expect(collection1.valid).toBeFalsy();
  
    // collection1 field is required
    let errors = collection1.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('collection 2 field validity', () => {
    let collection2 = component.form.controls['collection2'];
    expect(collection2.valid).toBeFalsy();
  
    // collection2 field is required
    let errors = collection2.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('submitting a form', () => {
    expect(component.form.valid).toBeFalsy();
    component.form.controls['collection1'].setValue("1, 2, 3");
    component.form.controls['collection2'].setValue("1, 2, 3");
    expect(component.form.valid).toBeTruthy();
  
    // Trigger the submit function
    component.submit();

    expect(component.displayMergedCollection).toEqual(true);
    expect(component.mergedCollection).toEqual([1,1,2,2,3,3]);

    fixture.detectChanges();
    const fnc = spyOn(window, 'alert');
    expect(fnc).not.toHaveBeenCalled();
    // expect(fnc).toHaveBeenCalledWith('Merged Collection is '+component.mergedCollection);
  });
  
  it('should merge two empty arrays into an empty array', () => {
    expect(component.merge([], [])).toEqual([]);
  });

  it('should merge an empty array with a non-empty array', () => {
    expect(component.merge([], [1, 2, 3])).toEqual([1, 2, 3]);
  });

  it('should merge two non-empty arrays of the same length', () => {
    expect(component.merge([1, 3, 5], [2, 4, 6])).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it('should merge two non-empty arrays of different lengths', () => {
    expect(component.merge([1, 3, 5, 7], [2, 4, 6])).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it('should merge two non-empty arrays with duplicate elements', () => {
    expect(component.merge([1, 2, 2, 3, 5], [2, 4, 4, 5, 6])).toEqual([1, 2, 2, 2, 3, 4, 4, 5, 5, 6]);
  });

});

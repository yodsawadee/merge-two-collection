import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  form: FormGroup;
  collection1: number[];
  collection2: number[];
  displayMergedCollection: boolean = false;
  mergedCollection: number[];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      collection1: new FormControl('', [Validators.required]),
      collection2: new FormControl('', [Validators.required]),
    });
  }
  
  ngOnInit() { 
    this.form.valueChanges.subscribe(it => {
      this.collection1 = this.form.controls['collection1'].getRawValue().trim().split(/[ \,]+/).map((item:any) => Number(item));
      this.collection2 = this.form.controls['collection2'].getRawValue().trim().split(/[ \,]+/).map((item:any) => Number(item));
      if(this.collection1.length > 0 && this.collection2.length > 0) {
        this.displayMergedCollection = true;
      }
      this.mergedCollection = this.merge(this.collection1, this.collection2);
    });
  }

  merge(collection1: number[], collection2: number[]): number[] {
    const merged: number[] = [];
  
    let i = 0;
    let j = 0;
  
    while (i < collection1.length && j < collection2.length) {
      if (collection1[i] < collection2[j]) {
        merged.push(collection1[i]);
        i++;
      } else {
        merged.push(collection2[j]);
        j++;
      }
    }
  
    while (i < collection1.length) {
      merged.push(collection1[i]);
      i++;
    }
  
    while (j < collection2.length) {
      merged.push(collection2[j]);
      j++;
    }
  
    return merged;
  }

  submit() {
    alert('Merged Collection is '+ this.mergedCollection);
  }

}

import { Component, OnInit } from '@angular/core';
import { AnalysisService } from '../../analysis.service';
import { ActivatedRoute } from '@angular/router';
import { Item } from 'src/app/shared/models/Item';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})


export class ItemComponent implements OnInit {

  id: string ='';
  item?: Item;
  itemForm!: FormGroup

  constructor(private analysisService: AnalysisService, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder) {
    this.itemForm = new FormGroup({
      name: new FormControl('', Validators.required),
      cookTime: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      tags: this.formBuilder.array([])
    })
  }
  

  tagFrom(): FormGroup {
    return this.formBuilder.group({
      tag: ['', Validators.required]
    });
  }
  
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      this.id = paramMap.get('id') as string
      this.analysisService.getItemById(+this.id).subscribe(item => this.item = item )
    })

    
  }

  get tags(): FormArray {
    return this.itemForm.get('tags') as FormArray;
  }

  getTagsControls(): AbstractControl[] {
    return (this.itemForm.get('tags') as FormArray).controls;
  }


  addTag(): void {
    this.tags.push(this.formBuilder.control(''));
  }
  

  removeTag(index: number): void {
    this.tags.removeAt(index);
  }

  
  saveItem(): void {
    if (this.itemForm.valid) {
      // Perform save operation or update API with this.itemForm.value
      console.log(this.itemForm.value);
    }
  }
}

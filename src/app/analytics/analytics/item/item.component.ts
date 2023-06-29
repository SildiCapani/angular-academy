import { Component, OnInit } from '@angular/core';
import { AnalysisService } from '../../analysis.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from 'src/app/shared/models/Item';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})


export class ItemComponent implements OnInit {

  id: string ='';
  item!: Item;
  itemForm!: FormGroup;

  constructor(
    private analysisService: AnalysisService,
    private activatedRoute: ActivatedRoute, 
    private formBuilder: FormBuilder,
    private router: Router) {
    this.itemForm = this.formBuilder.group({
      name: ['', Validators.required],
      cookTime: ['', Validators.required],
      price: ['', Validators.required],
      origins: this.formBuilder.array([]),
      tags: this.formBuilder.array([])
    });
  }
  
  getTagsArray(): FormArray {
    return this.itemForm.get('tags') as FormArray
  }

  getOriginsArray(): FormArray {
    return this.itemForm.get('origins') as FormArray
  }

  addTag() {
    const origins = this.itemForm.get('tags') as FormArray;
    origins.push(new FormControl('', Validators.required));
  }

  addOrigin() {
    const origins = this.itemForm.get('origins') as FormArray;
    origins.push(new FormControl('', Validators.required));
  }

  removeTag(index: number) {
    const origins = this.itemForm.get('tags') as FormArray;
    origins.removeAt(index);
  }

  removeOrigin(index: number) {
    const origins = this.itemForm.get('origins') as FormArray;
    origins.removeAt(index);
  }

  setTags(tags: string[]) {
    const tagsArray = this.itemForm.get('tags') as FormArray;
    tags.forEach(tag => tagsArray.push(this.formBuilder.control(tag)));
  }

  setOrigins(origins: string[]) {
    const originsArray = this.itemForm.get('origins') as FormArray;
    origins.forEach(origin => originsArray.push(this.formBuilder.control(origin)));
  }

  setFormValues() {
    if (this.item) {
      this.itemForm.patchValue({
        name: this.item.name,
        cookTime: this.item.cookTime,
        price: this.item.price,
      });

      this.setOrigins(this.item.origins);
      this.setTags(this.item.tags);
    }
  }

  
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      this.id = paramMap.get('id') as string
      this.analysisService.getItemById(+this.id).subscribe(item => { this.item = item; this.setFormValues();})
    });
    
  }
  
  saveItem(): void {
    this.analysisService.updateItem(this.item.id,this.itemForm.value).subscribe(() => {
    this.router.navigateByUrl('/analytics');
  })
 

  }
}

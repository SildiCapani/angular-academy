import { Component, OnInit } from '@angular/core';
import { ItemService } from '../services/Item/item.service';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})


export class TagsComponent implements OnInit {

  uniqueTags: string[] = [];

  constructor(private itemService: ItemService ) {

  }

  ngOnInit(): void {
    this.getUniqeTags()
  }

  reloadPage(): void {
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }

  getUniqeTags(): void {
    this.itemService.getItems().subscribe(items => {
      const tagsSet = new Set<string>();
      items.forEach(item => {
        item.tags.forEach(tag => {
          tagsSet.add(tag);
        });
      });
    this.uniqueTags = Array.from(tagsSet)
    })
  }

}

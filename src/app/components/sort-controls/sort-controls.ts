import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

export type SortBy = 'price-asc' | 'price-desc' | 'rating-asc' | 'rating-desc' | 'none';

@Component({
  selector: 'app-sort-controls',
  imports: [CommonModule],
  template: `
    <div class="flex flex-col gap-2">
      <label class="form-control w-full">
        <div class="label">
          <span class="label-text">Sort by:</span>
        </div>
        <select class="select select-bordered" (change)="onSortChange($event)">
          <option value="none">No sorting</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating-asc">Rating: Low to High</option>
          <option value="rating-desc">Rating: High to Low</option>
        </select>
      </label>
    </div>
  `,
  styleUrl: './sort-controls.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SortControls {
  @Output() sortChanged = new EventEmitter<SortBy>();

  onSortChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.sortChanged.emit(target.value as SortBy);
  }
}


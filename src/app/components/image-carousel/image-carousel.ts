import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-carousel',
  imports: [CommonModule],
  templateUrl: './image-carousel.html',
  styleUrl: './image-carousel.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageCarousel {
  @Input() images: string[] = [];
  currentIndex = signal(0);

  nextImage() {
    if (this.images.length > 0) {
      this.currentIndex.update(i => (i + 1) % this.images.length);
    }
  }

  previousImage() {
    if (this.images.length > 0) {
      this.currentIndex.update(i => (i - 1 + this.images.length) % this.images.length);
    }
  }

  goToImage(index: number) {
    this.currentIndex.set(index);
  }
}


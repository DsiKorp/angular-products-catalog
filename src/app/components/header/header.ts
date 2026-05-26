import { ChangeDetectionStrategy, Component, inject, ViewChild, ElementRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/CartService';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  cartService = inject(CartService);
  @ViewChild('dropdownButton') dropdownButton?: ElementRef;

  closeDropdown() {
    if (this.dropdownButton) {
      this.dropdownButton.nativeElement.blur();
    }
  }
}


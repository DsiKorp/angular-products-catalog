import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImageCarousel } from './image-carousel';

describe('ImageCarousel', () => {
  let component: ImageCarousel;
  let fixture: ComponentFixture<ImageCarousel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageCarousel]
    }).compileComponents();

    fixture = TestBed.createComponent(ImageCarousel);
    component = fixture.componentInstance;
  });

  it('debería ser creado', () => {
    expect(component).toBeTruthy();
  });

  it('debería iniciar con índice 0', () => {
    expect(component.currentIndex()).toBe(0);
  });

  it('debería avanzar a la siguiente imagen', () => {
    component.images = ['img1.jpg', 'img2.jpg', 'img3.jpg'];
    fixture.detectChanges();

    component.nextImage();

    expect(component.currentIndex()).toBe(1);
  });

  it('debería ir a la primera imagen cuando se está en la última', () => {
    component.images = ['img1.jpg', 'img2.jpg', 'img3.jpg'];
    component.currentIndex.set(2);
    fixture.detectChanges();

    component.nextImage();

    expect(component.currentIndex()).toBe(0);
  });

  it('debería retroceder a la imagen anterior', () => {
    component.images = ['img1.jpg', 'img2.jpg', 'img3.jpg'];
    component.currentIndex.set(1);
    fixture.detectChanges();

    component.previousImage();

    expect(component.currentIndex()).toBe(0);
  });

  it('debería ir a la última imagen cuando se retrocede desde la primera', () => {
    component.images = ['img1.jpg', 'img2.jpg', 'img3.jpg'];
    component.currentIndex.set(0);
    fixture.detectChanges();

    component.previousImage();

    expect(component.currentIndex()).toBe(2);
  });

  it('debería ir a una imagen específica con goToImage', () => {
    component.images = ['img1.jpg', 'img2.jpg', 'img3.jpg'];
    fixture.detectChanges();

    component.goToImage(2);

    expect(component.currentIndex()).toBe(2);
  });

  it('no debería cambiar índice si no hay imágenes en nextImage', () => {
    component.images = [];
    component.nextImage();

    expect(component.currentIndex()).toBe(0);
  });

  it('no debería cambiar índice si no hay imágenes en previousImage', () => {
    component.images = [];
    component.previousImage();

    expect(component.currentIndex()).toBe(0);
  });

  it('debería manejar correctamente una sola imagen', () => {
    component.images = ['img1.jpg'];
    fixture.detectChanges();

    component.nextImage();

    expect(component.currentIndex()).toBe(0);
  });

  it('debería ciclar correctamente a través de múltiples imágenes', () => {
    component.images = ['img1.jpg', 'img2.jpg', 'img3.jpg', 'img4.jpg'];
    fixture.detectChanges();

    component.nextImage();
    expect(component.currentIndex()).toBe(1);

    component.nextImage();
    expect(component.currentIndex()).toBe(2);

    component.nextImage();
    expect(component.currentIndex()).toBe(3);

    component.nextImage();
    expect(component.currentIndex()).toBe(0);
  });
});

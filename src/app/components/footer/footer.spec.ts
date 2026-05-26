import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Footer } from './footer';

describe('Footer', () => {
  let component: Footer;
  let fixture: ComponentFixture<Footer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Footer]
    }).compileComponents();

    fixture = TestBed.createComponent(Footer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería ser creado', () => {
    expect(component).toBeTruthy();
  });

  it('debería tener el selector correcto', () => {
    expect(component).toBeInstanceOf(Footer);
  });

  it('debería renderizarse sin errores', () => {
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('debería cargar el template correctamente', () => {
    const compiled = fixture.nativeElement;
    expect(compiled).toBeTruthy();
  });
});

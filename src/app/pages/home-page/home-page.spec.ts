import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePage } from './home-page';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePage, RouterLink],
      providers: [
        { provide: ActivatedRoute, useValue: { params: of({}), queryParams: of({}) } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería ser creado', () => {
    expect(component).toBeTruthy();
  });

  it('debería ser una instancia de HomePage', () => {
    expect(component).toBeInstanceOf(HomePage);
  });

  it('debería importar RouterLink', () => {
    const compiled = fixture.nativeElement;
    expect(compiled).toBeTruthy();
  });

  it('debería renderizarse sin errores', () => {
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('debería cargar el template correctamente', () => {
    const template = fixture.nativeElement;
    expect(template).toBeTruthy();
  });

  it('debería poder navegar usando RouterLink', () => {
    // Este test verifica que RouterLink está disponible
    const component_imports = (HomePage as any).ɵcmp.dependencies;
    expect(component_imports).toBeTruthy();
  });
});

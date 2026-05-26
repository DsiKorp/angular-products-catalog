# Product Catalog

Este proyecto es un catálogo de productos desarrollado con Angular. Permite visualizar una lista de productos, ver detalles de cada producto, agregar productos al carrito y navegar entre distintas páginas.

## Tecnologías

- **Angular** (versión 21.2.0): Framework principal para construir la aplicación.
- **TypeScript** (versión ~5.9.2): Lenguaje de programación utilizado.
- **TailwindCSS** (versión 4.3.0): Framework de CSS utilitario para estilos.
- **DaisyUI** (versión 5.5.20): Biblioteca de componentes basada en TailwindCSS.
- **RxJS** (versión ~7.8.0): Para manejo de flujos reactivos.
- **Jasmine & Karma**: Framework de pruebas unitarias y de integración (configurado por defecto en Angular CLI).
- **Vitest**: Framework de pruebas adicionales (configurado en devDependencies).

## Requisitos

- **Node.js** (versión 18.x o superior recomendada)
- **npm** (versión 9.x o superior)
- **Angular CLI** (se instala automáticamente como dependencia de desarrollo)

## Instalación

1. Clona este repositorio:
   ```bash
   git clone <url-del-repositorio>
   ```
2. Accede al directorio del proyecto:
   ```bash
   cd product-catalog
   ```
3. Instala las dependencias:
   ```bash
   npm install
   ```

## Uso

Para iniciar el servidor de desarrollo y ver la aplicación en tu navegador:

```bash
ng serve
```
O alternativamente:
```bash
npm start
```

La aplicación estará disponible en `http://localhost:4200`. El servidor se recargará automáticamente cuando realices cambios en el código.

## Construir para producción

Para generar una versión optimizada de la aplicación para producción:

```bash
ng build
```
O:
```bash
npm run build
```

Los archivos compilados se colocarán en el directorio `dist/`.

## Ejecutar pruebas

Este proyecto incluye pruebas unitarias y de integración. Para ejecutarlas:

```bash
ng test
```
O:
```bash
npm test
```

Esto lanzará Karma y abrirá un navegador para ejecutar las pruebas. También puedes ejecutar las pruebas en modo watch:
```bash
ng test --watch
```

## Estructura del proyecto

```
src/
├── app/
│   ├── components/     # Componentes reutilizables (header, footer, product-card, etc.)
│   ├── pages/          # Páginas principales (home, catalog)
│   ├── services/       # Servicios para lógica de negocio (productos, carrito)
│   ├── models/         # Interfaces y tipos de datos
│   ├── mappers/        # Mapeadores de datos
│   ├── app.routes.ts   # Definición de rutas
│   └── app.config.ts   # Configuración de la aplicación
├── environments/       # Configuración de entorno (development, production)
├── styles.css          # Estilos globales
└── index.html          # Archivo HTML principal
```

## Notas adicionales

- El proyecto utiliza **TailwindCSS** para estilizado, configurado en `styles.css` y mediante el archivo `tailwind.config.js` (implícito en la configuración de Angular).
- **DaisyUI** se incluye como plugin de Tailwind para acceder a componentes preconstruidos.
- Los servicios de producto y carrito utilizan inyección de dependencias de Angular y pueden ser extendidos para conectarse con APIs reales.
- Las pruebas se encuentran junto a cada componente/servicio/service con el extensión `.spec.ts`.
- Para modificar la configuración de Tailwind, revisa el archivo `tailwind.config.js` (si no existe, se genera automáticamente por la configuración de Angular con PostCSS).

## Comandos útiles

| Comando | Descripción |
|---------|-------------|
| `ng serve` | Inicia el servidor de desarrollo |
| `ng build` | Compila la aplicación para producción |
| `ng test` | Ejecuta las pruebas unitarias |
| `ng lint` | Ejecuta el linter (si está configurado) |
| `ng e2e` | Ejecuta pruebas end-to-end (si están configuradas) |

---

Desarrollado con Angular CLI.
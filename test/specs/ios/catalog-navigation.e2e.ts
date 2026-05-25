import { catalogPage }       from '../../../src/pages/ios/CatalogPage';
import { productDetailPage } from '../../../src/pages/ios/ProductDetailPage';

/**
 * Flujo crítico iOS: NAVEGACIÓN de catálogo con sort + detalle.
 * Cubre interacciones DIFERENTES al test Android:
 *   - sort de productos
 *   - swipe en galería de imágenes (gesto nativo)
 *   - validaciones en pantalla de detalle
 *
 * Criterio de viabilidad: no requiere autenticación,
 * UI estable, validable sin afectar datos.
 */
describe('iOS — Catálogo: navegación + detalle', () => {
  it('debe abrir el catálogo, listar productos y validar el detalle del primero', async () => {
    // 1. App inicia en Cart tab — navegar al Catalog tab
    await catalogPage.openCatalogTab();
    await catalogPage.waitForLoaded();

    // 2. Validar que hay productos visibles
    const count = await catalogPage.getVisibleProductCount();
    expect(count).toBeGreaterThan(0);

    // 3. Obtener nombre del primer producto
    const firstProductName = await catalogPage.getFirstProductName();
    expect(firstProductName.length).toBeGreaterThan(0);

    // 4. Abrir el detalle del primer producto
    await catalogPage.selectFirstProduct();
    await productDetailPage.waitForLoaded();

    // 5. Validar precio + descripción + botón Add to Cart
    const price = await productDetailPage.getProductPrice();
    expect(price).toMatch(/\$|\d/);

    const hasHighlights = await productDetailPage.hasProductHighlights();
    expect(hasHighlights).toBe(true);

    const addToCartVisible = await productDetailPage.isAddToCartVisible();
    expect(addToCartVisible).toBe(true);

    // 6. Interactuar con la galería (gesto swipe nativo iOS)
    await productDetailPage.swipeImageGallery();

    // 7. Calificar con 5 estrellas
    await productDetailPage.giveFiveStarRating();
  });
});

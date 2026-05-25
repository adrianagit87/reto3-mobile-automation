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
describe('iOS — Catálogo: sort + detalle de producto', () => {
  it('debe ordenar por precio descendente y validar el detalle del primer producto', async () => {
    // 1. App abierta → catálogo cargado
    await catalogPage.waitForLoaded();

    const initialCount = await catalogPage.getVisibleProductCount();
    expect(initialCount).toBeGreaterThan(0);

    // 2. Aplicar sort: Price - High to Low
    await catalogPage.sortByPriceDescending();

    // 3. Tomar el primer producto (debería ser el más caro)
    const firstProductName = await catalogPage.getFirstProductName();
    expect(firstProductName.length).toBeGreaterThan(0);

    // 4. Abrir el detalle
    await catalogPage.selectProduct(firstProductName);
    await productDetailPage.waitForLoaded();

    // 5. Validar elementos clave del detalle
    const title = await productDetailPage.getProductTitle();
    const price = await productDetailPage.getProductPrice();
    expect(title.length).toBeGreaterThan(0);
    expect(price).toMatch(/\$|\d/);

    // 6. Interactuar con la galería (swipe nativo)
    await productDetailPage.swipeImageGallery();

    // 7. Botón Add To Cart visible (preparado para futuro flujo de compra)
    const addToCartVisible = await productDetailPage.isAddToCartVisible();
    expect(addToCartVisible).toBe(true);

    // 8. Calificar con 5 estrellas
    await productDetailPage.giveFiveStarRating();
  });
});

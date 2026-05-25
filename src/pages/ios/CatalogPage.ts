import { BasePage } from '../BasePage';

/**
 * Catálogo iOS de My Demo App v2.2.2.
 * La app abre en Cart tab — hay que tapear `~Catalog-tab-item` para llegar al catálogo.
 * Locators usan `~` = accessibilityIdentifier (iOS XCUITest).
 */
export class CatalogPage extends BasePage {
  get loadedIndicator() { return $('~Catalog-screen'); }

  // Tab bar
  private get catalogTab() { return $('~Catalog-tab-item'); }

  // Productos — los ProductItem (XCUIElementTypeOther) tienen accessible=false.
  // Contamos los "Product Name" StaticText que sí son accesibles (uno por card).
  private get productItems() { return $$('~Product Name'); }

  // Para seleccionar el primer producto tapeamos su Product Image
  // (es accesible y siempre hay uno por ProductItem)
  private get firstProductImage() { return $('~Product Image'); }

  /** Abre la tab Catalog (necesario porque la app inicia en Cart). */
  async openCatalogTab(): Promise<void> {
    await this.tap(this.catalogTab);
  }

  async getFirstProductName(): Promise<string> {
    const items = await this.productItems;
    const count = await items.length;
    if (count === 0) throw new Error('No products visible on catalog');
    // Cada Product Name StaticText tiene su nombre en `label` (= value)
    const first = items[0];
    await first.waitForDisplayed({ timeout: 5_000 });
    return (await first.getAttribute('label')) ?? '';
  }

  async selectFirstProduct(): Promise<void> {
    await this.tap(this.firstProductImage);
  }

  async getVisibleProductCount(): Promise<number> {
    const products = await this.productItems;
    return await products.length;
  }
}

export const catalogPage = new CatalogPage();

import { BasePage } from '../BasePage';

/**
 * Pantalla inicial: catálogo de productos.
 * Locators usan `~` = accessibility id (content-desc en Android).
 */
export class CatalogPage extends BasePage {
  get loadedIndicator() { return $('~Displays all products of catalog'); }

  private get menuButton() { return $('~View menu'); }
  private get cartButton() { return $('~View cart'); }

  /**
   * Producto por nombre. El TextView del título NO es clickable
   * (`clickable="false"`); solo el productIV (imagen) lo es.
   * XPath: encontrar el card (parent) que contiene el TextView con el
   * texto, luego seleccionar su ImageView "Product Image".
   */
  private productByName(name: string) {
    return $(
      `//*[android.widget.TextView[@text="${name}"]]//android.widget.ImageView[@content-desc="Product Image"]`
    );
  }

  async openMenu(): Promise<void> {
    await this.tap(this.menuButton);
  }

  async openCart(): Promise<void> {
    await this.tap(this.cartButton);
  }

  async selectProduct(name: string): Promise<void> {
    await this.tap(this.productByName(name));
  }
}

export const catalogPage = new CatalogPage();

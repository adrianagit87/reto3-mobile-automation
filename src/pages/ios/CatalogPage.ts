import { BasePage } from '../BasePage';

/**
 * Catálogo iOS.
 * Locators usan `~` = accessibilityIdentifier (iOS XCUITest).
 */
export class CatalogPage extends BasePage {
  get loadedIndicator() { return $('~Products'); }

  private get sortButton() { return $('~sort button'); }
  private productByName(name: string) { return $(`~${name}`); }

  // Opciones de sort
  private get sortOptionPriceDesc() {
    return $('-ios predicate string:label == "Price - High to Low"');
  }
  private get sortOptionPriceAsc() {
    return $('-ios predicate string:label == "Price - Low to High"');
  }
  private get sortOptionNameAsc() {
    return $('-ios predicate string:label == "Name - Ascending"');
  }

  async openSortMenu(): Promise<void> {
    await this.tap(this.sortButton);
  }

  async sortByPriceDescending(): Promise<void> {
    await this.openSortMenu();
    await this.tap(this.sortOptionPriceDesc);
  }

  async sortByPriceAscending(): Promise<void> {
    await this.openSortMenu();
    await this.tap(this.sortOptionPriceAsc);
  }

  async getFirstProductName(): Promise<string> {
    const count = await this.getVisibleProductCount();
    if (count === 0) throw new Error('No products visible on catalog');
    // `$` con el mismo selector devuelve el PRIMERO que matchea
    return this.readText($('~product label'));
  }

  async selectProduct(name: string): Promise<void> {
    await this.tap(this.productByName(name));
  }

  async getVisibleProductCount(): Promise<number> {
    const products = await $$('~product label');
    return await products.length;
  }
}

export const catalogPage = new CatalogPage();

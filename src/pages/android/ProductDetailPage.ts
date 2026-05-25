import { BasePage } from '../BasePage';

export class ProductDetailPage extends BasePage {
  get loadedIndicator() { return $('~Tap to add product to cart'); }

  // Título y precio en detail comparten resource-id con el catálogo,
  // pero acá hay solo uno en pantalla — el del producto seleccionado.
  private get productTitle() {
    return $('android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/productTV")');
  }
  private get productPrice() {
    return $('android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/priceTV")');
  }
  private get addToCartButton() { return $('~Tap to add product to cart'); }
  private get cartIcon()        { return $('~View cart'); }

  async getProductTitle(): Promise<string> {
    return this.readText(this.productTitle);
  }

  async getProductPrice(): Promise<string> {
    return this.readText(this.productPrice);
  }

  async addToCart(): Promise<void> {
    await this.tap(this.addToCartButton);
  }

  async openCart(): Promise<void> {
    await this.tap(this.cartIcon);
  }
}

export const productDetailPage = new ProductDetailPage();

import { BasePage } from '../BasePage';
import { swipeLeft } from '../../helpers/gestures';

export class ProductDetailPage extends BasePage {
  get loadedIndicator() { return $('~ProductDetails-screen'); }

  private get priceText()        { return $('~Price'); }
  private get addToCartButton()  { return $('~Add To Cart'); }
  private get productHighlights(){ return $('~Product Highlights'); }
  private get fiveStarRating()   { return $('~StarSelected Icons'); }

  async getProductPrice(): Promise<string> {
    await this.priceText.waitForDisplayed({ timeout: 10_000 });
    return (await this.priceText.getAttribute('label')) ?? '';
  }

  async hasProductHighlights(): Promise<boolean> {
    return this.productHighlights.isDisplayed();
  }

  /** Swipe horizontal en la galería de imágenes del producto. */
  async swipeImageGallery(): Promise<void> {
    await swipeLeft();
  }

  async giveFiveStarRating(): Promise<void> {
    await this.tap(this.fiveStarRating);
  }

  async isAddToCartVisible(): Promise<boolean> {
    return this.addToCartButton.isDisplayed();
  }
}

export const productDetailPage = new ProductDetailPage();

import { BasePage } from '../BasePage';
import { swipeLeft } from '../../helpers/gestures';

export class ProductDetailPage extends BasePage {
  get loadedIndicator() { return $('~Add To Cart button'); }

  private get productTitle()    { return $('~product label'); }
  private get productPrice()    { return $('~product price'); }
  private get addToCartButton() { return $('~Add To Cart button'); }
  private get productImage()    { return $('~product image'); }
  private get fiveStarRating()  { return $('~5 stars'); }

  async getProductTitle(): Promise<string> {
    return this.readText(this.productTitle);
  }

  async getProductPrice(): Promise<string> {
    return this.readText(this.productPrice);
  }

  async swipeImageGallery(): Promise<void> {
    await this.productImage.waitForDisplayed({ timeout: 10_000 });
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

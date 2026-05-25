import { BasePage } from '../BasePage';

export class CheckoutCompletePage extends BasePage {
  // El título "Checkout Complete" se identifica por texto exacto
  get loadedIndicator() {
    return $('android=new UiSelector().text("Checkout Complete")');
  }

  private get confirmationTitle() { return this.loadedIndicator; }
  private get continueShoppingButton() { return $('~Tap to open catalog'); }

  async isDisplayed(): Promise<boolean> {
    return this.confirmationTitle.isDisplayed();
  }

  async continueShopping(): Promise<void> {
    await this.tap(this.continueShoppingButton);
  }
}

export const checkoutCompletePage = new CheckoutCompletePage();

import { BasePage } from '../BasePage';

export class CartPage extends BasePage {
  get loadedIndicator() { return $('~Confirms products for checkout'); }

  private get proceedToCheckoutButton() { return $('~Confirms products for checkout'); }
  // Cada item del carrito tiene un botón "Remove Item" — los contamos para saber cuántos hay
  private get removeButtons() { return $$('~Removes product from cart'); }

  async getItemCount(): Promise<number> {
    const items = await this.removeButtons;
    return await items.length;
  }

  async proceedToCheckout(): Promise<void> {
    await this.tap(this.proceedToCheckoutButton);
  }
}

export const cartPage = new CartPage();

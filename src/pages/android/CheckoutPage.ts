import { BasePage } from '../BasePage';

export interface ShippingAddress {
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  stateRegion: string;
  zipCode: string;
  country: string;
}

export interface PaymentInfo {
  fullName: string;
  cardNumber: string;
  expirationDate: string;
  securityCode: string;
}

/**
 * CheckoutPage cubre los 3 sub-steps del flujo:
 *   1) Shipping address  →  To Payment
 *   2) Payment info      →  Review Order
 *   3) Review Order      →  Place Order
 * Mantengo un solo PO por simplicidad: las pantallas son secuenciales
 * y los locators no se solapan.
 */
// Helper para selectores por resource-id en la app demo
const byId = (id: string) =>
  `android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/${id}")`;

export class CheckoutPage extends BasePage {
  get loadedIndicator() { return $('~Saves user info for checkout'); }

  // ----- Shipping (todos con resource-id, sin content-desc) -----
  private get fullNameInput()     { return $(byId('fullNameET')); }
  private get addressLine1Input() { return $(byId('address1ET')); }
  private get addressLine2Input() { return $(byId('address2ET')); }
  private get cityInput()         { return $(byId('cityET')); }
  private get stateInput()        { return $(byId('stateET')); }
  private get zipCodeInput()      { return $(byId('zipET')); }
  private get countryInput()      { return $(byId('countryET')); }
  private get toPaymentButton()   { return $('~Saves user info for checkout'); }

  // ----- Payment (locators reales por confirmar en próximo dump) -----
  private get cardholderInput()  { return $(byId('nameET')); }
  private get cardNumberInput()  { return $(byId('cardNumberET')); }
  private get expirationInput()  { return $(byId('expirationDateET')); }
  private get securityCodeInput(){ return $(byId('securityCodeET')); }
  private get reviewOrderButton(){ return $('~Saves payment info and launches screen to review checkout data'); }

  // ----- Review -----
  private get placeOrderButton() { return $('~Completes the process of checkout'); }

  async fillShipping(addr: ShippingAddress): Promise<void> {
    await this.setValue(this.fullNameInput, addr.fullName);
    await this.setValue(this.addressLine1Input, addr.addressLine1);
    if (addr.addressLine2) await this.setValue(this.addressLine2Input, addr.addressLine2);
    await this.setValue(this.cityInput, addr.city);
    await this.setValue(this.stateInput, addr.stateRegion);
    await this.setValue(this.zipCodeInput, addr.zipCode);
    await this.setValue(this.countryInput, addr.country);
    await this.tap(this.toPaymentButton);
  }

  async fillPayment(payment: PaymentInfo): Promise<void> {
    await this.setValue(this.cardholderInput, payment.fullName);
    await this.setValue(this.cardNumberInput, payment.cardNumber);
    await this.setValue(this.expirationInput, payment.expirationDate);
    await this.setValue(this.securityCodeInput, payment.securityCode);
    await this.tap(this.reviewOrderButton);
  }

  async placeOrder(): Promise<void> {
    await this.tap(this.placeOrderButton);
  }
}

export const checkoutPage = new CheckoutPage();

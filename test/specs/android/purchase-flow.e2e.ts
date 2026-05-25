import { catalogPage }         from '../../../src/pages/android/CatalogPage';
import { menuPage }            from '../../../src/pages/android/MenuPage';
import { loginPage }           from '../../../src/pages/android/LoginPage';
import { productDetailPage }   from '../../../src/pages/android/ProductDetailPage';
import { cartPage }            from '../../../src/pages/android/CartPage';
import { checkoutPage }        from '../../../src/pages/android/CheckoutPage';
import { checkoutCompletePage } from '../../../src/pages/android/CheckoutCompletePage';

/**
 * Flujo crítico de negocio: COMPRA completa.
 * Cubre: login → catálogo → detalle → carrito → checkout → confirmación.
 *
 * Criterio de viabilidad: máxima criticidad (sin checkout no hay revenue),
 * flujo determinista, datos estables, Appium accede a todos los elementos.
 */
describe('Android — Flujo crítico de compra E2E', () => {
  const VALID_USER = 'bod@example.com';
  const VALID_PASS = '10203040';
  const PRODUCT_NAME = 'Sauce Labs Backpack';

  const shipping = {
    fullName: 'Adriana Troche',
    addressLine1: 'Av. Siempre Viva 742',
    city: 'Asunción',
    stateRegion: 'Central',
    zipCode: '1209',
    country: 'Paraguay',
  };

  const payment = {
    fullName: 'Adriana Troche',
    cardNumber: '4242424242424242',
    expirationDate: '12/30',
    securityCode: '123',
  };

  it('debe completar el flujo de compra con un usuario válido', async () => {
    // 1. App abierta → catálogo cargado
    await catalogPage.waitForLoaded();

    // 2. Ir a Login vía menú
    await catalogPage.openMenu();
    await menuPage.waitForLoaded();
    await menuPage.goToLogin();

    // 3. Login
    await loginPage.waitForLoaded();
    await loginPage.login(VALID_USER, VALID_PASS);

    // 4. Catálogo y selección de producto
    await catalogPage.waitForLoaded();
    await catalogPage.selectProduct(PRODUCT_NAME);

    // 5. Detalle del producto y add to cart
    await productDetailPage.waitForLoaded();
    const title = await productDetailPage.getProductTitle();
    expect(title.toLowerCase()).toContain('backpack');
    await productDetailPage.addToCart();

    // 6. Ir al carrito y validar item
    await productDetailPage.openCart();
    await cartPage.waitForLoaded();
    const count = await cartPage.getItemCount();
    expect(count).toBeGreaterThan(0);

    // 7. Checkout: shipping → payment → review → place order
    await cartPage.proceedToCheckout();
    await checkoutPage.waitForLoaded();
    await checkoutPage.fillShipping(shipping);
    await checkoutPage.fillPayment(payment);
    await checkoutPage.placeOrder();

    // 8. Confirmación
    await checkoutCompletePage.waitForLoaded();
    const isComplete = await checkoutCompletePage.isDisplayed();
    expect(isComplete).toBe(true);
  });
});

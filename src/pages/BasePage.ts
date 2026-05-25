import type { ChainablePromiseElement } from 'webdriverio';

/**
 * BasePage: clase abstracta con utilidades comunes a TODOS los Page Objects.
 * - Centraliza esperas y validaciones
 * - Tests JAMÁS deben tocar `browser.$(...)` directo: usan los POs
 */
export abstract class BasePage {
  /** Selector que indica que la pantalla cargó. Cada PO lo define. */
  abstract get loadedIndicator(): ChainablePromiseElement;

  /** Espera a que la pantalla esté visible. */
  async waitForLoaded(timeout = 15_000): Promise<void> {
    await this.loadedIndicator.waitForDisplayed({ timeout });
  }

  /** Tap robusto: espera + click. */
  protected async tap(element: ChainablePromiseElement): Promise<void> {
    await element.waitForDisplayed({ timeout: 10_000 });
    await element.click();
  }

  /** Set value robusto: limpia + tipea. */
  protected async setValue(element: ChainablePromiseElement, value: string): Promise<void> {
    await element.waitForDisplayed({ timeout: 10_000 });
    await element.clearValue();
    await element.setValue(value);
  }

  /** Lee el texto visible o el content-desc (Android) / label (iOS). */
  protected async readText(element: ChainablePromiseElement): Promise<string> {
    await element.waitForDisplayed({ timeout: 10_000 });
    const txt = await element.getText();
    return txt?.trim() ?? '';
  }
}

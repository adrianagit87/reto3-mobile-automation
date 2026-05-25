import { BasePage } from '../BasePage';

/** Drawer / menú lateral con opciones de navegación. */
export class MenuPage extends BasePage {
  get loadedIndicator() { return $('~Login Menu Item'); }

  private get loginItem()   { return $('~Login Menu Item'); }
  private get logoutItem()  { return $('~Logout Menu Item'); }
  private itemByText(text: string) {
    return $(`android=new UiSelector().text("${text}")`);
  }

  async goToLogin():   Promise<void> { await this.tap(this.loginItem); }
  async goToCatalog(): Promise<void> { await this.tap(this.itemByText('Catalog')); }
  async logout():      Promise<void> { await this.tap(this.logoutItem); }
}

export const menuPage = new MenuPage();

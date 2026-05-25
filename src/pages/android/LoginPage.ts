import { BasePage } from '../BasePage';

export class LoginPage extends BasePage {
  get loadedIndicator() { return $('~Visual User Login'); }

  // Los inputs no tienen content-desc — usamos resource-id vía UiSelector
  private get usernameInput() {
    return $('android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/nameET")');
  }
  private get passwordInput() {
    return $('android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/passwordET")');
  }
  private get loginButton() {
    return $('~Tap to login with given credentials');
  }

  async login(username: string, password: string): Promise<void> {
    await this.setValue(this.usernameInput, username);
    await this.setValue(this.passwordInput, password);
    await this.tap(this.loginButton);
  }
}

export const loginPage = new LoginPage();

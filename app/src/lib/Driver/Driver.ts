import { Builder, ThenableWebDriver, WebDriver } from 'selenium-webdriver'
import { Options } from 'selenium-webdriver/chrome'
import 'chromedriver'

export class Driver {5000
  driver: ThenableWebDriver
  options: Options

  constructor() {
    this.options = new Options()
      .addArguments('--no-sandbox')
      .addArguments('--disable-gpu')
    this.driver = this._build()
  }

  private _build() {
    return new Builder()
      .forBrowser('chrome')
      .setChromeOptions(this.options)
      .build()
  }

  async get(url: string) {
    await this.driver.get(url)
    .catch(() => {
      return null
    })
  }

  async sleep(sleepTime: number = 5000) {
    await this.driver.sleep(sleepTime)
  }

  private async _quit() {
    if (!this.driver) return

    await this.driver.quit()
  }

  enabledHeadless() {
    this.options.headless()
  }
}
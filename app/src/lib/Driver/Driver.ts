import { Builder, ThenableWebDriver } from 'selenium-webdriver'
import { Options } from 'selenium-webdriver/chrome'
import 'chromedriver'

export class Driver {
  driver: ThenableWebDriver

  options: Options

  constructor() {
    this.options = new Options()
      .addArguments('--no-sandbox')
      .addArguments('--disable-gpu')
    this.driver = this.build()
  }

  private build(): ThenableWebDriver {
    return new Builder()
      .forBrowser('chrome')
      .setChromeOptions(this.options)
      .build()
  }

  async get(url: string): Promise<void> {
    await this.driver.get(url)
      .catch((e) => {
        throw new Error(e)
      })
  }

  async sleep(sleepTime: number = 5000): Promise<void> {
    await this.driver.sleep(sleepTime)
  }

  private async quit(): Promise<void> {
    if (!this.driver) return

    await this.driver.quit()
  }

  enabledHeadless(): void {
    this.options.headless()
  }
}

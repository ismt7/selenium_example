import 'chromedriver'
import { Builder, ThenableWebDriver } from 'selenium-webdriver'
import { Options } from 'selenium-webdriver/chrome'
import { execSync } from "child_process"

export class DriverWrapper {
  private driver!: ThenableWebDriver
  private options: Options
  private exceptionDriverQuit: boolean = false

  constructor() {
    this.options = new Options()
      .addArguments('--no-sandbox')
      .addArguments('--disable-gpu')
  }

  build(): DriverWrapper {
    this.driver = new Builder()
      .forBrowser('chrome')
      .setChromeOptions(this.options)
      .build()
    
    this.checkGoogleChromeVersion()
    
    return this
  }

  async get(url: string): Promise<void> {
    await this.driver.get(url)
      .catch((e: string | undefined) => {
        if (this.exceptionDriverQuit) this.quit()
        throw new Error(e)
      })
  }

  async sleep(sleepTime: number = 5000): Promise<void> {
    await this.driver.sleep(sleepTime)
  }

  async quit(): Promise<void> {
    if (!this.driver) return
    await this.driver.quit().catch((e) => {
      throw new Error(e)
    })
  }

  enabledHeadless(): DriverWrapper {
    this.options.headless()
    return this
  }

  setDownloadPath(downloadPath: string): DriverWrapper {
    this.options.setUserPreferences({"download.default_directory": downloadPath})
    return this
  }

  setExceptionDriverQuit(): DriverWrapper {
    this.exceptionDriverQuit = true
    return this
  }

  private getGoogleChromeVersion(): Number[] {
    const versions: string[] = execSync("'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' --version | awk '{print $3}'").toString().replace("\n", "").split(".")

    return versions.map((version) => Number(version))
  }

  private getNpmPackageChromeDriverVersion(): Number[] {
    const versions: string[] = execSync("npm view chromedriver version").toString().replace("\n", "").split(".")

    return versions.map((version) => Number(version))
  }

  private checkGoogleChromeVersion(): void {
    const browserVersion: Number[] = this.getGoogleChromeVersion()
    const npmPackageVersion: Number[] = this.getNpmPackageChromeDriverVersion()
    
    if (browserVersion[0] === npmPackageVersion[0]) {
      return
    }

    throw new Error(`ブラウザーとnpmパッケージのメジャーバージョンが一致しません(browserVersion: ${browserVersion.join(".")}, npmPackageVersion: ${npmPackageVersion.join(".")})`);
  }
}

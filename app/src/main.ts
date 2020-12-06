import { By } from 'selenium-webdriver';
import { DriverWrapper } from './lib/Driver/DriverWrapper'

;(async () => {
  const driver: DriverWrapper = await new DriverWrapper().build()
  await driver.get('https://getpocket.com/login?route=https://app.getpocket.com/')
  await driver.click(By.css("body > header > div > div.small-12.large-9.columns.header-menu > nav > ul > li:nth-child(1) > a"))
  await driver.sendKeys(By.css("#name"), "テスト")
  console.log(await driver.getInputValue(By.css("#name")))
})()

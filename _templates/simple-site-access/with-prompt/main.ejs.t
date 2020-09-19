---
to: src/<%= file_name %>.ts
---
import { Builder, ThenableWebDriver } from 'selenium-webdriver'
import { Options } from 'selenium-webdriver/chrome'
import 'chromedriver'

let driver: ThenableWebDriver
(async () => {
  driver = getDriver()
  try {
    toAccessByUrl(driver, 'https://app.getpocket.com/')
    console.log(await driver.getCurrentUrl())
    await driver.sleep(10000);
  }
  catch(error) {
    console.error(error);
  }
  finally {
    if(driver) {
      await driver.quit();
    }
  }
})()

function getDriver(): ThenableWebDriver {
  return new Builder()
    .forBrowser('chrome')
    .setChromeOptions(new Options()
        .headless()
        .addArguments('--no-sandbox')
        .addArguments('--disable-gpu')
  )
  .build() 
}

async function toAccessByUrl(driver: ThenableWebDriver, url: string) {
  await driver.get(url)
    .catch(() => {
      return null
    })
}
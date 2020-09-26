import { Driver } from './lib/Driver/Driver'

(async () => {
  try {
    const driver: Driver =  new Driver()
    await driver.get('https://app.getpocket.com/')
    await driver.sleep()
  }
  catch(error) {
    console.error(error)
  }
})()
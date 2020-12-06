import { DriverWrapper } from './lib/Driver/DriverWrapper'

;(async () => {
  const driver: DriverWrapper = new DriverWrapper().build()
  await driver.get('https://app.getpocket.com/')
  await driver.sleep()
})()

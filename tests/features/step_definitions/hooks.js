"use strict";
var { After, Before, Status, setDefaultTimeout } = require('cucumber');
setDefaultTimeout(3 * 60 * 1000);

Before(async function () {
  await this.getPage('sign_in');
  await this.page.open();
  return this.page.fillCredentials();
});

After(async function (testCase) {
  if (testCase.result.status === Status.FAILED) {
    const screenShotFail = await browser.takeScreenshot();
    let decodedImage = new Buffer.from(screenShotFail,'base64');
    this.attach(decodedImage, 'image/png');
  }
  return this.page.signOut();
});
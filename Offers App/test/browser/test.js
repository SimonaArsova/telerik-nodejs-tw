/* eslint-disable no-unused-expressions */
const { expect } = require('chai');
const { setupDriver } = require('./utils/setup-driver');
const webdriver = require('selenium-webdriver');


describe('Offers routes', () => {
    let driver = null;

    // let driver =
    //     new webdriver.Builder()
    //         .build();

    const appUrl = 'http://localhost:3001';

    beforeEach(() => {
        driver = setupDriver('chrome');
    });

    it('expect h1 with text "vsited"', (done) => {
        driver.get(appUrl)
            .then(() => {
                return driver.findElement(
                    webdriver.By.css('h1')
                );
            })
            .then((el) => {
                return el.getText();
            })
            .then((text) => {
                expect(text).to.contain('visited');
                done();
            });
    });
});

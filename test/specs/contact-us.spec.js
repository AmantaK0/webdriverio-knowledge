// import allureReporter from "@wdio/allure-reporter"
describe('webdriveruniversity - contact us page', () => {
    beforeEach(async() => {
        await browser.maximizeWindow()
        await browser.url("/Contact-Us/contactus.html")
        console.log(`>>Browser Object: +${JSON.stringify(browser)}`)
    })
    it('valid submition - submit all information', async() => {
        // allureReporter.addFeature("Contact-us page - valid submission")
        // allureReporter.addDescription("Validate contact us page by submitting all data")
        // allureReporter.addSeverity("critical")
        const firstName = await $('//*[@name="first_name"]')
        const lastName = await $('//*[@name="last_name"]')
        const emailAddress = await $('//*[@name="email"]')
        const message = await $('//*[@name="message"]')
        const submitButton = await $('//input[@value="SUBMIT"]')

        await firstName.setValue("Joe")
        await lastName.setValue("Rogan")
        await emailAddress.setValue("random@mail.com")
        await message.setValue("random message here")

        
        await submitButton.click()

        const successfulSubmissionHeader = $('#contact_reply > h1')
        // await browser.debug()
        console.log(`successfulSubmissionHeader Element: ` + JSON.stringify(await successfulSubmissionHeader))
        await expect(successfulSubmissionHeader).toHaveText('Thank You for your Message!')

        //Jest
        // const successfulSubmissionHeader2 = await $('#contact_reply > h1').getText()
        // expect(successfulSubmissionHeader2).toEqual('Thank You for your Messagee!')
    })
    it('invalid submission - dont submit all information', async() => {
        const firstName = await $('//*[@name="first_name"]')
        const lastName = await $('//*[@name="last_name"]')
        const message = await $('//*[@name="message"]')
        const submitButton = await $('//input[@value="SUBMIT"]')

        await firstName.setValue("Joe")
        await lastName.setValue("Rogan")
        await message.setValue("random message here")
        await submitButton.click()

        const errorMessage = $('body')
        await expect(errorMessage).toHaveText(['Error: all fields are required','Error: Invalid email address'])
    })
})
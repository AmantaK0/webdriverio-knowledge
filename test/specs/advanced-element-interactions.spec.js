describe('advanced element interactions - examples', () =>{
    beforeEach(async function(){
        await browser.maximizeWindow()
    })
    it('inputs', async()=>{
        await browser.url("/Contact-Us/contactus.html")
        const firstNameTextField = $('//*[@name="first_name"]')

        await firstNameTextField.addValue("Add your text here ")
        await firstNameTextField.addValue("My added text ")
        // await browser.pause(2000)

        await firstNameTextField.setValue("Hello how r u ")
        // await browser.pause(2000)

        await firstNameTextField.clearValue()
        // await browser.pause(2000)
    })

    it('dropdowns', async() => {
        await browser.url("Dropdown-Checkboxes-RadioButtons/index.html")
        const programmingLanguage_DropdownList = await $("#dropdowm-menu-1")
        await programmingLanguage_DropdownList.selectByAttribute('value', 'python')
        await expect(programmingLanguage_DropdownList).toHaveValueContaining('python')
        // await browser.pause(2000)

        const tech_DropdownList = await $("#dropdowm-menu-2")
        await tech_DropdownList.selectByIndex(2)
        await expect(tech_DropdownList).toHaveValueContaining('TestNG', {ignoreCase: true})
        // await browser.pause(2000)

        const frontendLanguage_DropdownList = await $("#dropdowm-menu-3")
        await frontendLanguage_DropdownList.selectByVisibleText('CSS')
        await expect(frontendLanguage_DropdownList).toHaveValueContaining('CSS', {ignoreCase: true})
        // await browser.pause(2000)
    })

    it('state commands', async() => {
        await browser.url("Dropdown-Checkboxes-RadioButtons/index.html")
        const lettuceRadioButton = await $('[value="lettuce"]')
        const lettuceRadioButton_isDisplayed = await lettuceRadioButton.isDisplayed()
        await expect(lettuceRadioButton_isDisplayed).toEqual(true)
        await expect(lettuceRadioButton).toBeEnabled()

        const lettuceRadioButton_isClickable = await lettuceRadioButton.isClickable()
        await expect(lettuceRadioButton_isClickable).toEqual(true)

        const cabbageRadioButton = await $('[value="cabbage"]')
        const cabbageRadioButton_isEnabled = await cabbageRadioButton.isEnabled()
        const cabbageRadioButton_isClickable = await cabbageRadioButton.isClickable()
        await expect(cabbageRadioButton_isEnabled).toEqual(false)
        await expect(cabbageRadioButton).toBeDisabled()
        await expect(cabbageRadioButton_isClickable).toEqual(false)
    })

    it('actions', async()=>{
        await browser.url('/Actions/index.html')

        // dreag and drop
        const elem = await $('#draggable')
        const target = await $('#droppable')
        await elem.dragAndDrop(target)
        // await browser.pause(3000)

        // double click
        const doubleClick_Button = await $('#double-click')
        await doubleClick_Button.doubleClick();
        // await browser.pause(3000)

        // mouse over
        await $("//button[text()='Hover Over Me First!']").moveTo()
        const firstLink = (await $("(//*[text()='Link 1'])[1]"))
        await firstLink.waitForClickable()
        await firstLink.click()
        // await browser.pause(3000)
    })

    it('handling windows', async()=>{
        await browser.url('https://webdriveruniversity.com/')
        await browser.newWindow('https://www.automationteststore.com/')

        let currentWindow_Title = await browser.getTitle()
        console.log(`>>Current window title ${currentWindow_Title}`)
        await expect(browser).toHaveUrlContaining('automationteststore')
        

        await browser.switchWindow('webdriveruniversity.com')
        let parentWindow_Title = await browser.getTitle()
        console.log(`>>Parent window title ${parentWindow_Title}`)
        await expect(browser).toHaveUrlContaining('webdriveruniversity')
        
        await $('#contact-us').click()
        await browser.switchWindow('automationteststore')
        await browser.closeWindow()

        await browser.switchWindow('contactus')
        await browser.closeWindow()

        await browser.switchWindow('webdriveruniversity')
        console.log(await browser.getTitle())
        // await browser.pause(3000)
    })
    it('iframes', async()=>{
        await browser.url('/IFrame/index.html')
        const iframe = await $("#frame")
        // await browser.switchToFrame(iframe)
        await browser.pause(3000)
        await $("//a[text()='Our Products']").click()
        await browser.switchToParentFrame()
        await browser.pause(3000)
    })
    it('alerts', async()=>{
        await browser.url('/Popup-Alerts/index.html')
        await $('#button1').click()
        await browser.acceptAlert()

        await $('#button4').click()
        const alertText = await browser.getAlertText()
        expect(alertText).toEqual('Press a button!')

        await browser.acceptAlert()
        await expect($('#confirm-alert-text')).toHaveText('You pressed OK!')
        await browser.pause(2000)

        await $('#button4').click()
        await browser.dismissAlert()
        await expect($('#confirm-alert-text')).toHaveText('You pressed Cancel!')
        await browser.pause(2000)

    })
    it('file upload', async()=>{
        await browser.url('/File-Upload/index.html')
        await $('#myFile').addValue(`${process.cwd()}\\data\\dummy_file.txt`)
        await browser.pause(2000)
        await $('#submit-button').click()
        await browser.pause(2000)
    })
    it.only('js execute', async()=>{
        await browser.url('/Hidden-Elements/index.html')
        await browser.execute(() => {
            return document.getElementById("not-displayed").setAttribute("id", "")
        })
        await browser.execute(() => {
            return document.body.style.backgroundColor = "tomato"
        })
        await browser.pause(3000)
    })
})
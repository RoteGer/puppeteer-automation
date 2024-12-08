const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: false }); // Launch browser in non-headless mode
    const [page] = await browser.pages(); 

    try {
        // Navigate to the Example Form page
        await page.goto('https://testsite.getjones.com/ExampleForm/', { waitUntil: 'networkidle2' });

        // Task 1: Fill out the form fields: Name, Email, Phone and Company
        const name = 'Rotem Gershenzon';
        const email = 'Rotem@example.com';
        const phone = '0525381648';
        const company = 'Example Company ltd';
        const numberOfEmployees = '11-50';

        await page.type('input[name="name"]', name);
        await page.type('input[name="email"]', email);
        await page.type('input[name="phone"]', phone);
        await page.type('input[name="company"]', company); 

        // Task 3: Bonus- Change the Number of Employees to 51-500
        await page.select('select[name="number_of_employees"]', numberOfEmployees);

        // Task 2: Take a screenshot before clicking the “Request a call back” button
        await page.screenshot({ path: 'form_before_submit.png' });

        // Task 4: Click the “Request a call back” button
        await page.click('button.primary.button', { text: 'Request a call back' }); 

      
        // Task 5: Wait for the thank-you page to load and write to console
        try {
            await page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 10000 }); // Wait for navigation (10 seconds timeout)
            console.log('Thank-you page has loaded successfully!');
        } catch (navigationError) {
            console.error('Failed to load the Thank-you page in less than 10 seconds', navigationError.message);
        }


    } catch (error) {
        console.error('An error occurred:', error); // Handle any errors during execution
    }
})();

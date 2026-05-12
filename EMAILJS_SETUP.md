# EmailJS Setup Guide for Vrinda Boutique

This guide will help you set up EmailJS to receive contact form submissions directly in your Gmail account.

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

## Step 2: Create Email Service

1. After logging in, go to "Email Services" in the dashboard
2. Click "Add New Service"
3. Select "Gmail" (or your preferred email service)
4. Connect your Gmail account and grant permissions
5. Give your service a name (e.g., "Gmail Service")
6. Click "Create Service"

## Step 3: Create Email Template

1. Go to "Email Templates" in the dashboard
2. Click "Create New Template"
3. Configure your template:

**Template Name:** Vrinda Boutique Contact Form

**Subject:** New Contact Form Submission from {{from_name}} - {{subject}}

**Email Content:**
```
You have received a new contact form submission from Vrinda Boutique website.

Name: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
This message was sent from the Vrinda Boutique contact form.
```

4. Click "Save Template"

## Step 4: Get Your Configuration Details

From your EmailJS dashboard, you'll need:

1. **Public Key** (found in Account > API Keys)
2. **Service ID** (found in Email Services > click on your service)
3. **Template ID** (found in Email Templates > click on your template)

## Step 5: Update Your Website Code

Open `index.html` and replace these placeholder values:

1. **Line 485:** Replace `YOUR_PUBLIC_KEY` with your actual Public Key
2. **Line 650:** Replace `YOUR_SERVICE_ID` with your Service ID  
3. **Line 650:** Replace `YOUR_TEMPLATE_ID` with your Template ID

Example:
```javascript
// Line 485
emailjs.init("abc123def456ghi789"); // Your actual Public Key

// Line 650  
emailjs.sendForm('service_abc123', 'template_def456', event.target)
```

## Step 6: Test Your Contact Form

1. Open your website in a browser
2. Go to the Contact section
3. Fill out the form with test information
4. Click "Send Message"
5. Check your Gmail inbox for the test email

## Important Notes

- **Free Plan Limitations:** EmailJS free plan includes 200 emails per month
- **Security:** Your Public Key is safe to expose in frontend code
- **Customization:** You can customize the email template design and content
- **Multiple Recipients:** You can add multiple email addresses in the template

## Troubleshooting

**If emails aren't sending:**
1. Check that all IDs are correctly replaced
2. Verify your EmailJS service is connected to Gmail
3. Check browser console for error messages
4. Ensure your template variables match form field names

**If you get authentication errors:**
1. Reconnect your Gmail service in EmailJS dashboard
2. Check that Gmail permissions are granted

## Alternative: Use Formspree

If you prefer an alternative to EmailJS, you can use Formspree:

1. Sign up at [https://formspree.io/](https://formspree.io/)
2. Create a new form
3. Get your form endpoint URL
4. Replace the EmailJS code with a simple fetch request to the Formspree endpoint

## Need Help?

If you encounter any issues during setup:
- Check EmailJS documentation: https://www.emailjs.com/docs/
- Verify all configuration values are correctly copied
- Test with different browsers if needed

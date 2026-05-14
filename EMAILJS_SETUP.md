# EmailJS Setup Guide for Vrinda Boutique

This guide will help you set up EmailJS for both contact form submissions and newsletter subscriptions.

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

## Step 3: Create Email Templates

You'll need two templates: one for contact forms and one for newsletter subscriptions.

### Template 1: Contact Form

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

### Template 2: Newsletter Subscription

1. Click "Create New Template" again
2. Configure your newsletter template:

**Template Name:** Vrinda Boutique Newsletter Subscription

**Subject:** Welcome to Vrinda Boutique Newsletter! 🌟

**Email Content:**
```
Dear Subscriber,

Thank you for subscribing to the Vrinda Boutique newsletter!

We're thrilled to have you join our community of fashion enthusiasts. You'll now receive:

✨ Exclusive offers and discounts
👗 First access to new arrivals
🎁 Special birthday surprises
📰 Fashion tips and trends

Your subscribed email: {{to_email}}

If you didn't subscribe to our newsletter, please ignore this email.

Best regards,
The Vrinda Boutique Team

---
📍 Visit us at: 197, Sector 51, Gurugram, 122018
📞 Call us: +91 7014854660
📧 Email: vrindaboutique04@gmail.com
```

3. Click "Save Template"

## Step 4: Get Your Configuration Details

From your EmailJS dashboard, you'll need:

1. **Public Key** (found in Account > API Keys)
2. **Service ID** (found in Email Services > click on your service)
3. **Contact Form Template ID** (found in Email Templates > click on your contact form template)
4. **Newsletter Template ID** (found in Email Templates > click on your newsletter template)

## Step 5: Update Your Website Code

### For Newsletter Subscription (Footer Component)

Open `src/components/Footer.js` and replace these placeholder values (lines 33-37):

```javascript
await emailjs.send(
  'YOUR_SERVICE_ID', // Replace with your EmailJS Service ID
  'YOUR_TEMPLATE_ID', // Replace with your Newsletter Template ID
  templateParams,
  'YOUR_PUBLIC_KEY' // Replace with your EmailJS Public Key
);
```

Example:
```javascript
await emailjs.send(
  'service_abc123', // Your actual Service ID
  'template_newsletter_xyz', // Your Newsletter Template ID
  templateParams,
  'abc123def456ghi789' // Your actual Public Key
);
```

### For Contact Form (if applicable)

Open `index.html` and replace these placeholder values:

1. **Line 485:** Replace `YOUR_PUBLIC_KEY` with your actual Public Key
2. **Line 650:** Replace `YOUR_SERVICE_ID` with your Service ID  
3. **Line 650:** Replace `YOUR_TEMPLATE_ID` with your Contact Form Template ID

Example:
```javascript
// Line 485
emailjs.init("abc123def456ghi789"); // Your actual Public Key

// Line 650  
emailjs.sendForm('service_abc123', 'template_contact_def456', event.target)
```

## Step 6: Test Your Forms

### Test Newsletter Subscription

1. Open your website in a browser
2. Scroll to the footer section
3. Enter a test email address in the newsletter subscription field
4. Click "Subscribe"
5. You should see a success message: "Successfully subscribed! Check your email for confirmation."
6. Check the test email inbox for the welcome newsletter email

### Test Contact Form (if applicable)

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

# EmailJS Setup Guide

This guide will help you set up EmailJS to enable the contact form email functionality.

## Step 1: Create an EmailJS Account

1. Go to [EmailJS](https://www.emailjs.com/)
2. Sign up for a free account (Free tier includes 200 emails/month)
3. Verify your email address

## Step 2: Add Email Service

1. Go to the **Email Services** section in your EmailJS dashboard
2. Click **Add New Service**
3. Choose **Gmail** as your email service
4. Connect your Gmail account: `abc@gmail.com`
5. Copy the **Service ID** (you'll need this later)

## Step 3: Create Email Template

1. Go to the **Email Templates** section
2. Click **Create New Template**
3. Use the following template configuration:

**Template Content (HTML Format):**
```html
Subject: New Contact Form Message from {{from_name}}

<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      padding: 20px;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
    }
    h2 {
      color: #667eea;
      border-bottom: 2px solid #667eea;
      padding-bottom: 10px;
    }
    .field {
      margin: 20px 0;
    }
    .label {
      font-weight: bold;
      color: #555;
    }
    .message {
      background: #f5f5f5;
      padding: 15px;
      border-radius: 5px;
      margin-top: 10px;
    }
    .footer {
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #ddd;
      font-size: 14px;
      color: #666;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>New Contact Form Message</h2>

    <div class="field">
      <div class="label">From:</div>
      <div>{{from_name}}</div>
    </div>

    <div class="field">
      <div class="label">Email:</div>
      <div><a href="mailto:{{from_email}}">{{from_email}}</a></div>
    </div>

    <div class="field">
      <div class="label">Message:</div>
      <div class="message">{{message}}</div>
    </div>

    <div class="footer">
      This message was sent via your portfolio contact form.
    </div>
  </div>
</body>
</html>
```

**Template Settings:**
- **To Email**: abc@gmail.com
- **From Name**: Portfolio Contact Form
- **Reply To**: {{reply_to}}

4. Save the template and copy the **Template ID**

## Step 4: Get Your Public Key

1. Go to **Account** section
2. Find your **Public Key** (also called User ID)
3. Copy this key

## Step 5: Configure Environment Variables

1. Create a `.env` file in the project root (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```

2. Add your EmailJS credentials:
   ```
   VITE_EMAILJS_SERVICE_ID=your_service_id_here
   VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
   VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
   ```

3. Replace the placeholder values with your actual EmailJS credentials

## Step 6: Update Contact Component

The Contact component is already configured to use environment variables.
Just make sure to update the credentials in `src/components/Contact.tsx`:

Replace:
```typescript
const serviceId = "YOUR_SERVICE_ID";
const templateId = "YOUR_TEMPLATE_ID";
const publicKey = "YOUR_PUBLIC_KEY";
```

With:
```typescript
const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
```

## Step 7: Test the Form

1. Start your development server:
   ```bash
   yarn dev
   ```

2. Navigate to the contact form
3. Fill out the form with test data
4. Submit and check your email at `abc123@gmail.com`

## Email Flow

When someone submits the contact form:
1. Form data is validated using Zod
2. Email is sent via EmailJS from `hamidelmamouncom@gmail.com`
3. Email is delivered to `abc123@gmail.com`
4. You can reply directly to the sender's email (set as reply-to)

## Troubleshooting

### Emails not sending
- Check that all environment variables are set correctly
- Verify your EmailJS service is connected and active
- Check browser console for errors
- Ensure you haven't exceeded the free tier limit (200 emails/month)

### Gmail authentication issues
- Make sure you've authorized EmailJS to access your Gmail account
- Check if 2FA is enabled (you may need an app-specific password)

### Template errors
- Verify all template variables match: `{{from_name}}`, `{{from_email}}`, `{{message}}`, `{{reply_to}}`
- Ensure template is published and active

## Security Notes

- Never commit `.env` file to git (it's in `.gitignore`)
- Public key is safe to expose (it's client-side)
- EmailJS handles authentication securely
- Consider adding rate limiting for production use

# WonderEngine Form Integration Guide

This guide explains how to configure your WonderEngine form to work with the registration system.

## 🎯 Overview

The WonderEngine form needs to communicate with the parent page (your website) when a user successfully submits the registration form. This is done using the browser's `postMessage` API.

## 📝 Configuration Steps

### Method 1: Custom Script in WonderEngine Dashboard

1. Log into your WonderEngine dashboard
2. Navigate to your form settings
3. Look for "Custom JavaScript" or "After Submit Script" section
4. Add the following script:

```javascript
// After successful form submission
(function() {
  // Get form data
  const formData = {
    email: '', // Get from form
    first_name: '', // Get from form
    last_name: '', // Get from form
    phone: '' // Get from form
  };

  // Try to get form values (adjust selectors based on your form)
  try {
    formData.email = document.querySelector('input[name="email"]')?.value || '';
    formData.first_name = document.querySelector('input[name="first_name"]')?.value || 
                          document.querySelector('input[name="firstName"]')?.value || '';
    formData.last_name = document.querySelector('input[name="last_name"]')?.value || 
                         document.querySelector('input[name="lastName"]')?.value || '';
    formData.phone = document.querySelector('input[name="phone"]')?.value || '';
  } catch (e) {
    console.error('Error getting form data:', e);
  }

  // Send message to parent window
  if (window.parent) {
    window.parent.postMessage({
      type: 'wonderengine_form_submit',
      success: true,
      data: formData
    }, '*');
  }
})();
```

### Method 2: WonderEngine Webhook Integration

If WonderEngine supports webhooks, you can:

1. Configure webhook to point to your backend
2. Backend processes registration and stores data
3. Return success response

Then modify the Event component to poll for registration status instead of listening to postMessage.

### Method 3: Custom Form (Alternative)

If WonderEngine doesn't support custom scripts, you can create your own form:

```typescript
// Create: package/src/app/components/RegistrationForm.tsx

"use client";

import { useState } from 'react';
import { registerForWebinar } from '@/lib/api';
import { DEFAULT_WEBINAR_ID } from '@/config/api';
import { useRouter } from 'next/navigation';

export default function RegistrationForm({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    first_name: '',
    last_name: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await registerForWebinar(DEFAULT_WEBINAR_ID, formData);

    if (result.success && result.data) {
      const params = new URLSearchParams({
        name: `${formData.first_name} ${formData.last_name}`,
        join_url: result.data.join_url,
        session_date: result.data.start_time,
        registrant_id: result.data.registrant_id,
      });
      router.push(`/event-registration?${params.toString()}`);
    } else {
      setError(result.error || 'Registration failed');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="registration-form">
      <h2>Register for the Session</h2>
      
      <div className="form-group">
        <label htmlFor="first_name">First Name *</label>
        <input
          type="text"
          id="first_name"
          required
          value={formData.first_name}
          onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label htmlFor="last_name">Last Name *</label>
        <input
          type="text"
          id="last_name"
          required
          value={formData.last_name}
          onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email *</label>
        <input
          type="email"
          id="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label htmlFor="phone">Phone</label>
        <input
          type="tel"
          id="phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="form-actions">
        <button type="button" onClick={onClose} disabled={loading}>
          Cancel
        </button>
        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register Now'}
        </button>
      </div>

      <style jsx>{`
        .registration-form {
          padding: 24px;
          max-width: 500px;
          margin: 0 auto;
        }

        h2 {
          margin: 0 0 24px;
          color: white;
          font-size: 24px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        label {
          display: block;
          margin-bottom: 8px;
          color: rgba(255, 255, 255, 0.9);
          font-weight: 600;
        }

        input {
          width: 100%;
          padding: 12px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.05);
          color: white;
          font-size: 16px;
        }

        input:focus {
          outline: none;
          border-color: #66d0ff;
        }

        .error-message {
          padding: 12px;
          background: rgba(255, 0, 0, 0.1);
          border: 1px solid rgba(255, 0, 0, 0.3);
          border-radius: 8px;
          color: #ff6b6b;
          margin-bottom: 20px;
        }

        .form-actions {
          display: flex;
          gap: 12px;
          justify-content: flex-end;
        }

        button {
          padding: 12px 24px;
          border: none;
          border-radius: 8px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
        }

        button[type="button"] {
          background: rgba(255, 255, 255, 0.1);
          color: white;
        }

        button[type="submit"] {
          background: linear-gradient(135deg, #00ff88, #00cc66);
          color: #001428;
        }

        button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>
    </form>
  );
}
```

Then replace the WonderEngine iframe in the Event component with this custom form.

## 🔍 Testing the Integration

### 1. Test postMessage

Add this to your browser console while on the event page:

```javascript
// Simulate form submission
window.postMessage({
  type: 'wonderengine_form_submit',
  success: true,
  data: {
    email: 'test@example.com',
    first_name: 'John',
    last_name: 'Doe',
    phone: '+1234567890'
  }
}, '*');
```

If working correctly, you should see:
1. "Completing your registration..." spinner
2. API call to your backend
3. Redirect to success page

### 2. Test from iframe

If using WonderEngine iframe, add this script to test:

```javascript
// In WonderEngine form custom script
console.log('Attempting to send postMessage...');
window.parent.postMessage({
  type: 'wonderengine_form_submit',
  success: true,
  data: {
    email: 'test@example.com',
    first_name: 'Test',
    last_name: 'User',
    phone: ''
  }
}, '*');
console.log('postMessage sent!');
```

Check parent window console for message receipt.

## 🔒 Security Considerations

### Origin Verification

For production, verify the message origin:

```typescript
// In Event component
useEffect(() => {
  const handleMessage = async (event: MessageEvent) => {
    // Verify origin
    const allowedOrigins = [
      'https://api.wonderengine.ai',
      'https://wonderengine.ai',
      window.location.origin // Allow same origin
    ];

    if (!allowedOrigins.includes(event.origin)) {
      console.warn('Message from unauthorized origin:', event.origin);
      return;
    }

    // Rest of the code...
  };

  window.addEventListener('message', handleMessage);
  return () => window.removeEventListener('message', handleMessage);
}, []);
```

### Data Validation

Always validate form data:

```typescript
const validateFormData = (data: any): boolean => {
  // Check required fields
  if (!data.email || !data.first_name || !data.last_name) {
    console.error('Missing required fields');
    return false;
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    console.error('Invalid email format');
    return false;
  }

  return true;
};

// In message handler
if (event.data && event.data.type === 'wonderengine_form_submit') {
  if (!validateFormData(event.data.data)) {
    setRegistrationError('Invalid form data');
    return;
  }
  // Continue with registration...
}
```

## 📋 Form Field Mapping

WonderEngine may use different field names. Map them accordingly:

```javascript
// In WonderEngine custom script
const getFormData = () => {
  // Try multiple possible field names
  const getFieldValue = (possibleNames) => {
    for (const name of possibleNames) {
      const field = document.querySelector(`input[name="${name}"]`) ||
                   document.querySelector(`#${name}`);
      if (field) return field.value;
    }
    return '';
  };

  return {
    email: getFieldValue(['email', 'Email', 'user_email']),
    first_name: getFieldValue(['first_name', 'firstName', 'fname', 'First Name']),
    last_name: getFieldValue(['last_name', 'lastName', 'lname', 'Last Name']),
    phone: getFieldValue(['phone', 'Phone', 'telephone', 'mobile'])
  };
};

// Send the data
window.parent.postMessage({
  type: 'wonderengine_form_submit',
  success: true,
  data: getFormData()
}, '*');
```

## 🐛 Troubleshooting

### postMessage not received

**Check:**
1. Form is loaded in an iframe
2. Script executes after form submission
3. `window.parent` exists
4. No console errors

**Debug:**
```javascript
// In form script
console.log('Window parent exists:', !!window.parent);
console.log('Sending message from:', window.location.href);

// In parent page
window.addEventListener('message', (e) => {
  console.log('Received message:', e);
});
```

### Wrong data in message

**Check:**
1. Form field selectors are correct
2. Field names match your form
3. Values are captured after submission

**Debug:**
```javascript
// Log all form inputs
document.querySelectorAll('input').forEach(input => {
  console.log(`${input.name || input.id}: ${input.value}`);
});
```

## 📞 Support

If you need help integrating WonderEngine:

1. Contact WonderEngine support for custom script capabilities
2. Request webhook integration options
3. Consider using custom form alternative

---

**Last Updated**: November 2025


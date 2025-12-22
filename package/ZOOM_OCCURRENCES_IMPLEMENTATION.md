# Zoom Occurrences & Token Refresh Implementation

## Overview
This document outlines the implementation of webinar occurrence selection and token refresh functionality for the registration system.

## Changes Made

### 1. New API Routes

#### `/api/zoom/refresh-token` (GET)
- **Purpose**: Refreshes the Zoom access token when it expires
- **Backend Endpoint**: `GET {BASE_URL}/zoom/refresh-token`
- **Response** (supports both snake_case and camelCase):
  ```json
  {
    "accessToken": "new_access_token",
    "refreshToken": "new_refresh_token",
    "message": "Zoom access token refreshed successfully!"
  }
  ```
  Or:
  ```json
  {
    "access_token": "new_access_token",
    "refresh_token": "new_refresh_token",
    "expires_in": 3600
  }
  ```
- **File**: `package/src/app/api/zoom/refresh-token/route.ts`

#### `/api/zoom/occurrences` (GET)
- **Purpose**: Fetches all occurrences for a webinar
- **Query Parameters**: `webinar_id` (required)
- **Backend Endpoint**: `{BASE_URL}/zoom/occurrences?webinar_id={id}`
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "webinarId": "85345478550",
      "occurrences": [
        {
          "occurrence_id": "1765216800000",
          "date": "2025-12-08",
          "time": "06:00 PM",
          "start_time": "2025-12-08T18:00:00Z"
        },
        ...
      ]
    }
  }
  ```
- **File**: `package/src/app/api/zoom/occurrences/route.ts`

### 2. Service Layer Updates (`package/src/services/zoom.ts`)

#### New Interfaces
```typescript
export interface OccurrenceItem {
  occurrence_id: string;
  date: string;
  time: string;
  start_time: string;
}

export interface OccurrencesResponse {
  webinarId: string;
  occurrences: OccurrenceItem[];
}

export interface RefreshTokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in?: number;
}
```

#### Updated Interface
```typescript
export interface ZoomWebinarRegistrationPayload {
  email: string;
  first_name: string;
  last_name: string;
  phone_number?: string;
  webinarId: string;
  occurrence_id?: string; // NEW FIELD
}
```

#### New Service Functions
- `fetchOccurrences(webinarId: string)`: Fetches all webinar occurrences
- `refreshZoomToken()`: Refreshes the Zoom access token

### 3. Register Page Updates (`package/src/app/(site)/register/page.tsx`)

#### New Features
1. **Occurrence Fetching on Page Load**
   - Automatically fetches occurrences from THREE different webinar IDs in parallel:
     * Morning webinar (NEXT_PUBLIC_WEBINAR_ID_MORNING: 85345478550)
     * Afternoon webinar (NEXT_PUBLIC_WEBINAR_ID_AFTERNOON: 85009970371)
     * Evening webinar (NEXT_PUBLIC_WEBINAR_ID_EVENING: 84323907773)
   - Combines all occurrences and filters to show only future sessions
   - Sorts by start time and displays the next 3 upcoming sessions across all webinars
   - Tracks which webinar ID each occurrence belongs to

2. **Session Selection Dropdown**
   - Required field for selecting a webinar session
   - Auto-selects the first available occurrence
   - **Displays sessions in PST timezone** converted from UTC `start_time`
   - Format: "Monday, Dec 8 at 6:00 PM PST" (shows PST or PDT based on daylight saving)
   - Shows loading state while fetching occurrences from all three webinars
   - Displays warning if no sessions are available
   - Automatically selects the correct webinar ID based on chosen occurrence

3. **Form Validation**
   - Added validation for occurrence_id selection
   - User must select a session before submitting

4. **Registration Payload**
   - Now includes `occurrence_id` when submitting registration
   - Dynamically sends the correct `webinarId` based on selected occurrence
   - Supports multiple webinar IDs (morning, afternoon, evening sessions)

### 4. Backend API Route Updates

Both registration routes have been updated to include `occurrence_id`:
- `package/src/app/api/webx/register-webinar/route.ts`
- `package/src/app/api/webx/registar-webinar/route.ts`

#### Updated Backend Request Body
```json
{
  "email": "user@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "phone_number": "1234567890",
  "webinar_id": "85345478550",
  "occurrence_id": "1765303200000"
}
```

## User Flow

1. **User Visits Registration Page**
   - Page loads and automatically fetches occurrences from all three webinar IDs (morning, afternoon, evening)
   - Next 3 upcoming sessions across all webinars are displayed in a dropdown in PST timezone
   - Sessions are sorted by start time, so earliest sessions appear first

2. **User Fills Registration Form**
   - Selects a preferred webinar session from the dropdown
   - Sees the time in PST timezone (e.g., "Monday, Dec 8 at 6:00 PM PST")
   - Enters personal information (name, email, phone)

3. **User Submits Registration**
   - Form validates all required fields including occurrence selection
   - Registration payload includes:
     * The selected `occurrence_id`
     * The correct `webinarId` (automatically determined based on selected occurrence)
   - Backend registers user for the specific occurrence of the correct webinar

4. **Token Refresh (When Needed)**
   - Token refresh endpoint is available at `/api/zoom/refresh-token`
   - Can be called when the access token expires (401 response)
   - Returns new access and refresh tokens

## Token Management Strategy

The system now implements automatic token management with localStorage:

### Token Flow
1. **On Page Load**: 
   - System calls `initializeToken()` which fetches a fresh token directly from backend via GET request: `GET {BASE_URL}/zoom/refresh-token`
   - Token is stored in localStorage with expiry time

2. **Token Storage** (in localStorage):
   - `zoom_access_token`: The access token
   - `zoom_refresh_token`: The refresh token (if provided)
   - `zoom_token_expiry`: Expiry timestamp

3. **Token Usage**:
   - Before any API call (occurrences, register), system calls `getValidToken()`
   - If token exists and is not expired → uses cached token
   - If token is missing or expired → fetches new token automatically
   - Token is passed in `Authorization: Bearer {token}` header

4. **Automatic Refresh**:
   - Tokens are considered expired 5 minutes before actual expiry (buffer time)
   - System automatically fetches new token when needed
   - No manual token management required

5. **Fallback**: API routes still support static token as fallback if client token fails

## Example Implementation for Token Refresh

```typescript
async function makeAuthenticatedRequest(url: string, options: RequestInit) {
  let response = await fetch(url, options);
  
  // If token expired, refresh and retry
  if (response.status === 401) {
    const refreshResult = await refreshZoomToken();
    if (refreshResult.success && refreshResult.data) {
      // Update token and retry request
      const newToken = refreshResult.data.access_token;
      // Store token in state/context/storage
      // Retry the original request with new token
    }
  }
  
  return response;
}
```

## Testing

### Test Occurrence Fetching
1. Navigate to `/register` page
2. Verify that the dropdown shows "Loading available sessions..." initially
3. Verify that next 3 upcoming sessions appear in the dropdown from all three webinars
4. Verify that times are displayed in PST timezone (e.g., "Monday, Dec 8 at 6:00 PM PST")
5. Verify that the first session is auto-selected
6. Check browser console to confirm three parallel API calls to fetch occurrences

### Test Registration with Occurrence
1. Select a specific webinar session from the dropdown
2. Fill in registration details
3. Submit the form
4. Verify that the backend receives both:
   - The `occurrence_id` for the selected session
   - The correct `webinar_id` (morning/afternoon/evening) based on the selected occurrence
5. Confirm in network tab that the correct webinar ID is sent

### Test Token Refresh
1. Call `/api/zoom/refresh-token`
2. Verify response contains `access_token` and `refresh_token`

## Notes

- **Multiple Webinar Support**: System fetches from three different webinar IDs simultaneously
  - Morning: `85345478550`
  - Afternoon: `85009970371`
  - Evening: `84323907773`
- **Timezone Conversion**: All times are converted from UTC to PST/PDT using browser's Intl API
  - `start_time` comes from backend in UTC (e.g., "2025-12-08T18:00:00Z")
  - Frontend converts to PST using `timeZone: 'America/Los_Angeles'`
  - Automatically handles daylight saving time (PST vs PDT)
- Occurrences are filtered on the frontend to show only future sessions
- The dropdown auto-selects the first available occurrence for better UX
- If no occurrences are available, a warning message is displayed
- The occurrence_id field is optional in the TypeScript interface but required by form validation
- Token refresh is available but not automatically triggered yet (implementation can be added when needed)
- The correct webinar ID is automatically sent based on which occurrence the user selects


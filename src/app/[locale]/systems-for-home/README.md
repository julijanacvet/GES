# Image Path Resolution

This document outlines the solution for an issue where images were not displaying correctly on the "Systems for Home" page.

## Problem

The images, located in a subdirectory with spaces in its name (e.g., `/residential solar/`), were not loading in the browser. This was because the URLs used in the `src` prop of the Next.js `Image` component contained unencoded spaces.

## Solution

The issue was resolved by properly URL-encoding the image paths. In a URL, a space character (` `) must be replaced with the `%20` encoding.

### Example:

**Incorrect Path:**
```jsx
<Image src="/locales/images/pages/residential solar/A beautiful family home with solar panels on the roof.jpg" ... />
```

**Correct, URL-Encoded Path:**
```jsx
<Image src="/locales/images/pages/residential%20solar/A%20beautiful%20family%20home%20with%20solar%20panels%20on%20the%20roof.jpg" ... />
```

By making this change to all image `src` paths within the component, the browser is now able to correctly locate and render the images. This approach ensures that file and folder names with spaces are handled correctly on the web.

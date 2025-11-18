# Documentation: Resolving Image Display Issues

This document outlines the troubleshooting steps taken to resolve a persistent issue where images were not displaying correctly in the Next.js application.

## Problem Summary

Across multiple components, including the header logo, hero section, and other content areas, images failed to load. The browser console showed 404 (Not Found) errors for these image assets. The root cause was a misconfiguration in how static assets (images) were being referenced and served, complicated by the internationalization (i18n) routing setup.

## Key Issues and Solutions

The resolution involved a multi-step process to correct the underlying problems:

### 1. Issue: Incorrect Static Asset Pathing

Initially, image paths were being treated as relative paths within the `src` directory or were missing the necessary leading slash to be correctly resolved from the `public` folder. In a Next.js application, static assets like images should be placed in the `public` directory and referenced with an absolute path starting from the root (`/`).

- **Solution**: All image `src` paths in the components were corrected to be absolute paths pointing to their location within the `public` directory.

  - **Example (Incorrect)**: `src="images/logo.png"`
  - **Example (Correct)**: `src="/images/logo.png"`

### 2. Issue: i18n Middleware Interference

The internationalization middleware, responsible for handling language-based routing (e.g., `/en/` or `/mk/`), was incorrectly intercepting requests for static assets like images. This prevented the Next.js server from finding and serving the image files, resulting in 404 errors.

- **Solution**: The middleware (`src/middleware.ts`) was updated with a more robust regular expression (`matcher`) to explicitly exclude asset paths, including `/images/`, `/_next/`, and any files with extensions. This ensures that the middleware only runs on actual page routes and ignores requests for static files.

### 3. Issue: Overly Complex Image Referencing

An attempt to centralize image paths in a separate JSON file (`placeholder-images.json`) added an unnecessary layer of abstraction that complicated debugging and path resolution.

- **Solution**: The centralized JSON file was removed. Image paths were hardcoded directly into the `src` prop of the `next/image` component within each respective component file. This simplifies the code, makes the path for each image explicit, and eliminates a potential point of failure.

By addressing these core issues, particularly the middleware's interference with static asset requests, all images across the application are now loading correctly as intended.
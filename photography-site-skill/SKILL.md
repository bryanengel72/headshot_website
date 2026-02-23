---
name: photography-site
description: Creates a professional headshot photography portfolio website with sections for Approach, Process, and Pricing based on a dark-themed/high-end editorial aesthetic. Use when the user wants to build a photography portfolio or web app with a premium feel, specifically for headshots or portraits.
---
# Photography Site Skill

This skill provides a complete template for generating a premium headshot photography portfolio website, including setup instructions and customization guidelines.

## Quick Start

1.  **Initialize Project**
    The user can either use an existing Vite + React + Tailwind + GSAP project, or you can scaffold it using the provided assets. The bundled assets (`assets/template/`) include everything needed for the frontend application.
    
    Copy all files from `assets/template/` to the root of the user's project directory. Do not write the code line-by-line; use appropriate recursive folder copy commands if available, or recreate the files using your internal tools.

2.  **Dependencies**
    The template requires the following dependencies. Instruct the user to install them if they haven't already:
    *   `react`, `react-dom`
    *   `lucide-react`
    *   `gsap`
    *   `tailwindcss` (and related PostCSS and Vite plugins)

## Customization

After copying the template files, you must customize the content in `src/App.jsx` based on the user's specific photography business.

### Content to Customize

*   **Brand Name:** Search for "101 Headshots" or "101" and replace it with the user's brand name.
*   **Hero Section:** Update the main headline ("Your first impression, unforgettable.") and the subtext to match the user's unique value proposition. Provide instructions to replace the background image URL (`https://images.unsplash.com/...`) with one provided by the user.
*   **Pricing:** Locate the packages array in the `Pricing` component. Update the package names, prices, descriptions, and feature lists according to the user's rates. Defaults are 3 tiers ($250, $450, $850).
*   **Contact Information:** Update the footer contact details (email, location) to match the user's actual contact information.
*   **Aesthetics:** The template uses `coral` (`#E8553D`), `ink` (`#111111`), `warmwhite` (`#F4F1EA`), `softgray` (`#E8E6E1`), and `muted` (`#737373`). These can be customized in `tailwind.config.js` if the user requests a different color palette.

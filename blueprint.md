
# Lotto Number Generator

## Overview

This project is a web application that generates random lottery numbers. It is built using modern web technologies, including Web Components, to create a reusable and encapsulated UI element.

## Current State

### Style and Design

*   **Layout:** Centered, single-column layout.
*   **Color Scheme:** Dark theme with a gradient background, white text, and accent colors for interactive elements.
*   **Typography:** Clean, sans-serif font (Inter).
*   **Effects:** Subtle shadows and glow effects on interactive elements.

### Features

*   **Lotto Number Generation:** Generates 6 unique random numbers between 1 and 45.
*   **Web Component:** The entire application is encapsulated within a `<lotto-generator>` custom element.

## Plan for Current Change

1.  **`index.html`:**
    *   Update the title to "Lotto Number Generator".
    *   Add a `<lotto-generator>` element to the body.

2.  **`style.css`:**
    *   Add a modern, dark-themed design with a gradient background.
    *   Style the overall page and interactive elements.

3.  **`main.js`:**
    *   Create a `LottoGenerator` class that extends `HTMLElement`.
    *   Implement the logic for generating and displaying lottery numbers within the custom element.
    *   Define the `<lotto-generator>` custom element.

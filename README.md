# Replete

**Your recipe collection, full and flavourful.**

Replete is a minimalist web app that lets you paste a recipe URL from sites like **BBC Good Food** or **Jamie Oliver**, automatically scrapes the title, ingredients, and method, and formats the recipe beautifully for printing, saving as a PDF, or adding to your personal cookbook.

---

## Features

- **Smart Web Scraping**  
  Paste a recipe URL — Replete fetches and formats it for you.

- **Print-Friendly Layout**  
  Recipes are cleanly styled for physical copies, with a single click.

-  **PDF Export**  
  Export your recipe to PDF with one tap for offline access.

- **One-Click Reset**  
  Quickly clear the current recipe and add a new one.

- *Optimized UI/UX* 
  Built with performance and simplicity in mind using **Next.js**, **Material UI**, and **TypeScript**.

---

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org)
- **Scraping**: [Cheerio](https://cheerio.js.org/)
- **Styling**: [Material UI](https://mui.com/)
- **Language**: TypeScript
- **PDF Generation**: jsPDF
- **Hosting**: [Vercel](https://vercel.com)
- **Data Storage (planned)**: MongoDB

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/aejmcclelland/replete.git
cd replete

2. Install dependencies

Using your preferred package manager:
pnpm install
# or
npm install

3. Run the app locally

pnpm dev
# or
npm run dev

Development Notes
	•	Scraper logic is modular, located in src/library/scrapers/. Easily expand support for more sites like AllRecipes, NYT Cooking, etc.
	•	Action-based form submission uses the new Next.js App Router and server actions.
	•	Environment variables (e.g., MONGODB_URI) should be stored in a .env file (excluded from Git).

    - *Coming Soon*
	•User accounts and recipe saving (MongoDB)
	•Custom cookbook builder
	• Manual recipe entry and editing
	• Mobile-first enhancements
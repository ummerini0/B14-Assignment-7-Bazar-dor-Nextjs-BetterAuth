# 🛒 বাজার দর (BazarDor)

> প্রয়োজনীয় পণ্যের দাম এক নজরে — a Bangla web app to track daily prices of everyday grocery items.



## 📖 About

**বাজার দর (BazarDor)** helps people in Bangladesh check today's market prices of daily essentials such as rice, lentils, oil, vegetables, fish, meat, eggs, milk and spices. The whole interface is in Bangla, with Bangla numerals and dates, and shows at a glance whether a price went up or down compared with the previous day.

## ✨ Key Features

1. **Live price ticker** — an infinite scrolling strip under the navbar shows each item's name, price per unit (টাকা/কেজি, লিটার, ডজন…) and a ▲ / ▼ percentage change.
2. **Category browsing** — eight categories (চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম-দুধ, মসলা) with product cards showing today's price, unit and price change, plus loading skeletons while data is fetched.
3. **Price sorting** — a "সাজান" dropdown sorts products by default order, price low to high, or price high to low. Prices are compared by numeric value, so Bangla numerals are sorted correctly.
4. **Secure authentication** — sign up and sign in with email and password or with Google, built with Better Auth and stored in MongoDB. Success and error messages appear as toast notifications.
5. **Profile management** — logged-in users can view their profile, update their name on a separate page and see a success pop-up. Profile pages are protected, so visitors who are not signed in are redirected to the sign in page.

## 🛠️ Technologies Used

| Area | Technology |
|---|---|
| Framework | [Next.js] (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS, daisyUI |
| Authentication | [Better Auth] (email/password, Google) |
| Database | MongoDB |
| Notifications | React toast |
| Data source | Bazar price API |
| Deployment 

## 🚀 Getting Started

### 1. Clone and install

```bash
git clone 
npm install
```

### 2. Set up environment variables

Create a `.env` file in the project root:


- Generate a secret 
- In Google Cloud Console, add `http://localhost:3000/api/auth/callback/google` as an authorized redirect URI.


### 3. Run the app

bash
npm run dev


Open [http://localhost:3000](http://localhost:3000).

## 📁 Project Structure


src/
├── app/
│   ├── api/auth/[...all]/   # Better Auth route
│   ├── category/[slug]/     # Category pages (with loading skeleton)
│   ├── product/[slug]/      # Product detail pages
│   ├── profile/             # Profile and update pages
│   ├── signin/  signup/     # Authentication pages
│   └── layout.tsx
├── components/              # Navbar, PriceTicker, Footer, AuthCard
└── lib/                     # auth.ts, auth-client.ts, helpers
```

## 🌐 Deployment




# Payments Document — ashique.digital

> **Version:** 1.0.0
> **Status:** Future — Post-Launch Phase
> **Last Updated:** 2026-03-09

---

## 1. Overview

This document details the future payment integration plan for ashique.digital. Payment features are **not required for MVP launch** but planned for Phase 2 when Ashique offers paid digital products, audits, or online consulting packages.

---

## 2. Payment Options Analysis

### 2.1 Recommended: Razorpay (Primary for India)

| Factor            | Detail                                         |
| ----------------- | ---------------------------------------------- |
| Best for          | Indian clients paying in INR                   |
| Supported methods | UPI, Cards, Net Banking, Wallets, EMI          |
| Razorpay fees     | 2% per transaction (domestic)                  |
| Setup             | Free — no monthly charges                      |
| Documentation     | [razorpay.com/docs](https://razorpay.com/docs) |
| Free tier         | No — transaction-fee based                     |

### 2.2 Alternative: Stripe (For International Clients)

| Factor            | Detail                                      |
| ----------------- | ------------------------------------------- |
| Best for          | International clients (USD, EUR, GBP, etc.) |
| Supported methods | Cards, Apple Pay, Google Pay                |
| Stripe fees       | 2.9% + $0.30 per successful charge          |
| Setup             | Free — transaction-fee based                |
| Documentation     | [stripe.com/docs](https://stripe.com/docs)  |

### 2.3 Recommended Strategy

- **Indian clients (INR):** Razorpay
- **International clients (USD+):** Stripe
- Implement both via a unified checkout experience

---

## 3. Use Cases for Payments

### 3.1 Phase 2 Products (Paid)

| Product                          | Price (INR)    | Type            |
| -------------------------------- | -------------- | --------------- |
| Full Website Audit (async)       | ₹4,999         | One-time        |
| Lead Gen Audit Report            | ₹9,999         | One-time        |
| "Growth System Blueprint" Course | ₹2,999         | Digital product |
| Strategy Session (60 min, paid)  | ₹7,999         | Booking         |
| Monthly Growth Retainer          | ₹25,000+/month | Subscription    |

### 3.2 What Stays Free Forever

- 30-min discovery call (lead gen mechanism)
- Free audit PDF (lead magnet)
- Blog content and insights

---

## 4. Razorpay Integration Plan

### 4.1 Prerequisites

- [ ] Razorpay business account created
- [ ] KYC documents submitted and verified
- [ ] Bank account linked to Razorpay
- [ ] Test keys obtained from Razorpay dashboard

### 4.2 Environment Variables

```env
# Add to .env.local when implementing
RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxx
RAZORPAY_KEY_SECRET=your_secret_key
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxx  # Only Key ID is public-safe
```

### 4.3 Installation

```bash
npm install razorpay
```

### 4.4 API Route — Create Order

```typescript
// app/api/payment/create-order/route.ts
import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: NextRequest) {
  const { amount, currency = "INR", productId, productName } = await req.json();

  const order = await razorpay.orders.create({
    amount: amount * 100, // Razorpay expects paise (1 INR = 100 paise)
    currency,
    receipt: `receipt_${Date.now()}`,
    notes: { productId, productName },
  });

  return NextResponse.json({ orderId: order.id, amount, currency });
}
```

### 4.5 API Route — Verify Payment

```typescript
// app/api/payment/verify/route.ts
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    await req.json();

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    return NextResponse.json(
      { success: false, error: "Invalid signature" },
      { status: 400 },
    );
  }

  // Payment verified — fulfill order (send email, unlock access, etc.)
  // await fulfillOrder(razorpay_order_id, razorpay_payment_id)

  return NextResponse.json({ success: true, paymentId: razorpay_payment_id });
}
```

### 4.6 Client-Side Checkout Component

```tsx
// components/PaymentButton.tsx
"use client";

import { useState } from "react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface PaymentButtonProps {
  productId: string;
  productName: string;
  amount: number; // in INR
}

export function PaymentButton({
  productId,
  productName,
  amount,
}: PaymentButtonProps) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);

    // 1. Create order on server
    const orderRes = await fetch("/api/payment/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, productId, productName }),
    });
    const { orderId } = await orderRes.json();

    // 2. Open Razorpay checkout
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: amount * 100,
      currency: "INR",
      name: "Ashique Digital",
      description: productName,
      order_id: orderId,
      handler: async (response: any) => {
        // 3. Verify payment on server
        const verifyRes = await fetch("/api/payment/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(response),
        });
        const result = await verifyRes.json();
        if (result.success) {
          // Show success message / redirect
          alert("Payment successful! Check your email for details.");
        }
      },
      prefill: { name: "", email: "" },
      theme: { color: "#00C2CB" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
    setLoading(false);
  };

  return (
    <button onClick={handlePayment} disabled={loading}>
      {loading ? "Processing..." : `Pay ₹${amount.toLocaleString("en-IN")}`}
    </button>
  );
}
```

### 4.7 Load Razorpay Script

Add to `app/layout.tsx`:

```tsx
<Script
  src="https://checkout.razorpay.com/v1/checkout.js"
  strategy="lazyOnload"
/>
```

---

## 5. Stripe Integration Plan (International)

### 5.1 Installation

```bash
npm install stripe @stripe/stripe-js @stripe/react-stripe-js
```

### 5.2 Environment Variables

```env
STRIPE_SECRET_KEY=sk_live_xxxxxxxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxx
```

### 5.3 API Route — Create Payment Intent

```typescript
// app/api/payment/stripe/create-intent/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const { amount, currency = "usd" } = await req.json();

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100, // cents
    currency,
    automatic_payment_methods: { enabled: true },
  });

  return NextResponse.json({ clientSecret: paymentIntent.client_secret });
}
```

---

## 6. Webhook Setup

Webhooks allow payment confirmations even if the user closes the browser.

### 6.1 Razorpay Webhooks

```typescript
// app/api/webhooks/razorpay/route.ts
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("x-razorpay-signature");

  const expectedSig = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    .update(body)
    .digest("hex");

  if (signature !== expectedSig) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const event = JSON.parse(body);

  if (event.event === "payment.captured") {
    const payment = event.payload.payment.entity;
    // Fulfill: send receipt, unlock course access, etc.
    await handleSuccessfulPayment(payment);
  }

  return NextResponse.json({ received: true });
}
```

---

## 7. Product Pages Required (Phase 2)

| URL                        | Product                   | Payment Gateway |
| -------------------------- | ------------------------- | --------------- |
| `/products/website-audit`  | Website Audit (₹4,999)    | Razorpay        |
| `/products/lead-gen-audit` | Lead Gen Audit (₹9,999)   | Razorpay        |
| `/products/growth-course`  | Growth Blueprint (₹2,999) | Razorpay/Stripe |
| `/book/paid-session`       | Paid Strategy Session     | Razorpay        |

---

## 8. Tax Compliance (India)

| Requirement          | Detail                                 |
| -------------------- | -------------------------------------- |
| GST Registration     | Required if annual turnover > ₹20 lakh |
| GST Rate on Services | 18% (digital services)                 |
| Invoice Requirement  | GST invoice with GSTIN for B2B clients |
| TDS                  | Applicable on some B2B transactions    |

> **Action:** Consult a CA for GST registration and invoicing setup before launching paid products.

---

## 9. Implementation Timeline

| Phase   | What                          | When                   |
| ------- | ----------------------------- | ---------------------- |
| Phase 1 | MVP — No payments             | Launch                 |
| Phase 2 | Razorpay for ₹ products       | Month 3–4              |
| Phase 3 | Stripe for international      | Month 6+               |
| Phase 4 | Subscription retainer billing | When client base grows |

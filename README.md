# Order Bridge

Minimalist, modular integration system built with Node.js, Express, and TypeScript, designed as an MVP for the central aggregation of orders from multiple sales channels.

## Architectural Principles:

The project focuses exclusively on the secure import and aggregation of orders. In this current version, it does not include stock or price synchronization, but its decoupled architecture has been explicitly structured for easy expansion with these features in the future.

## Features

- WooCommerce: Real-time order ingestion via Webhooks
- Allegro: Periodic order retrieval via Polling
- Order API: A unified ingestion point that standardizes incoming data from disparate platforms

## Features (MVP)

- WooCommerce: inbound webhooks
- Allegro: order polling
- SKU → Toya material mapping
- Idempotent order forwarding
- Out of scope: stock/price sync

## Tech stack:

- Node
- Express.js
- strict TypeScript
- Zod

## Requirements

- Node 20+
- B2B account order api
- WooCommerce
- Allegro Developer

## Setup

1. Clone repo
2. Copy `.env.example` → `.env`
3. `npm install`
4. `npm run dev`

## Important URLs (public):

- B2B portal: [B2B portal](https://b2b.toya.pl/app/order-api)
- Swagger: [Swagger](https://b2b.toya.pl/api/swagger/order-v1/index.html)
- Local health check [Local health check](http://localhost:3000/health)
- Webhook Woo: POST /webhooks/woocommerce

## Environment variables

env.example

## Commit style - Conventional Commits

feat:, fix:, docs:, chore:
e.g. feat: add WooCommerce webhook endpoint

## Status: MVP in progress

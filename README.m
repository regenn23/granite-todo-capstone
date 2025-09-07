# Granite To-Do — Capstone Project

## Deskripsi singkat
A Capstone To-Do web app with CRUD, categories, priorities, due date, search/filter, dark mode, export/import, and an **AI Helper** powered by **IBM Granite** (via Replicate).

## Cara jalankan (Replit)
1. Paste semua file ke Replit.
2. Tambahkan Secrets:
   - `REPLICATE_API_TOKEN` — dari Replicate account.
   - `REPLICATE_MODEL_VERSION` — model version id untuk Granite (lihat halaman model di Replicate).
3. Klik **Run**. Aplikasi akan tersedia di URL Replit.

## Fitur
- Create / Read / Update / Delete tasks
- Category, Priority, Due date, Overdue highlight
- Search, Filter, Sort
- Dark mode / Light mode
- Export / Import JSON
- AI Helper (ask Gran ite, or generate todo lists) — optional (requires Replicate token)
- `ai_log.md` contains AI prompts & summaries used (transparency)

## AI usage
See `ai_log.md` for all prompts and results from IBM Granite used during development.

## Deploy
- You can deploy static part to Netlify/Vercel if you remove backend AI, or keep backend and deploy to platforms that support serverless functions.

## Author
Your Name — Capstone participant

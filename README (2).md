# UzBozor.shop

Statik sayt: Temu, Shein va Alibaba mahsulotlarini bitta jo'natmada Toshkentga
yetkazib beruvchi xizmat sahifasi.

## Fayllar

- `index.html` — sahifa tuzilishi
- `style.css` — dizayn (ranglar, shriftlar, responsive)
- `script.js` — kategoriya/mahsulot ro'yxatlarini chizish, filtrlar, kirish
  oynalari, mobil menyu

Build qadami yo'q — hech qanday `npm install` shart emas. Uch faylni birga
saqlasangiz, sayt ishlayveradi.

## Joylashtirish (deploy)

Avvalgi ishlatgan usullaringiz bilan bir xil ishlaydi:

- **GitHub Pages**: repo → Settings → Pages → branch `main`, root `/`
- **Vercel**: "Add New Project" → repo tanlang → Framework: *Other* → Deploy
- **Netlify**: "Import an existing project" → repo tanlang → Deploy
- **Railway**: static folder sifatida deploy qiling, so'ng Settings →
  Networking → *Generate Domain*

## Kirish/ro'yxatdan o'tish haqida

`script.js` ichidagi login/register formalar hozircha faqat interfeys —
haqiqiy hisob yaratmaydi. Haqiqiy autentifikatsiya uchun (Firebase, Supabase
yoki o'z backendingiz) `wireAuthModals()` funksiyasidagi `TODO` belgilangan
joylarga ulang. API kalitlarini hech qachon to'g'ridan-to'g'ri kodga
yozmang — ular alohida `.env` faylida yoki hosting platformangizning
"Environment Variables" bo'limida saqlanishi kerak.

## Mahsulotlar va kategoriyalar

`script.js` boshidagi `PRODUCTS` va `CATEGORIES` massivlariga yangi
elementlar qo'shib, saytni to'ldirishingiz mumkin — HTML ni qo'lda
o'zgartirish shart emas.

# Brown Pixels — Vue website

A one-page Brown Pixels studio site built with **Vue 3 + Vite**, using the supplied Brown Pixels logo direction and the interaction language from the provided HTML reference.

## What is included
- Responsive single-page Vue site
- Dark / bronze visual system, grid borders, monospace utility labels, hover panels and scroll reveals
- Sections: Hero, services, selected work, approach, about, contact, footer
- Client section includes:
  - Leafy → https://leafy-demo.vercel.app
  - Upliftidea → https://upliftidea.digital
  - Two clearly-labelled concept/demo cards so they are not presented as real clients
- Contact form posts to `public/api/contact.php` and sends enquiries to **brownpixels.co@gmail.com**
- Honeypot spam field + server-side validation
- Supplied icon and logo sheet assets

## Run locally
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```

The production files are generated in `dist/`.

## Basic mail setup (shared hosting)
1. Upload the built site to the public web root.
2. Keep `api/contact.php` reachable at `/api/contact.php`.
3. The script already targets `brownpixels.co@gmail.com`.
4. On the hosting provider, configure a real mailbox on your domain (for example `website@yourdomain.com`) and your domain's SPF/DKIM/DMARC records. This improves deliverability and reduces spoofing/spam issues.
5. The script uses PHP `mail()`. If your host disables `mail()`, swap the internals of `contact.php` to SMTP/PHPMailer using the host's SMTP credentials.

## Logo usage
- `public/assets/brown-pixels-horizontal.png` — horizontal brand lockup
- `public/assets/brown-pixels-icon.png` — supplied standalone 3D icon
- `public/assets/logo-system-master.png` — supplied master logo sheet/reference

The site itself uses the icon in the bronze hero panel and a CSS BP wordmark in the header for crisp small-size rendering.

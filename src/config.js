/* ============================================================
   Brown Pixels — business contact details.
   These drive the nav, contact section, footer, form handoff
   and the structured data in index.html.
   ============================================================ */
export const CONFIG = {
  // digits only, country code first
  whatsapp: '917502263833',
  phone: '917502263833',
  email: 'brownpixels.co@gmail.com',
  social: {
    instagram: 'https://www.instagram.com/brownpixels.in/',
    linkedin: '',
    github: '',
    whatsapp: 'https://wa.me/917502263833?text=Can%20i%20get%20more%20info%20about%20Building%20my%20own%20Website?'
  }
}

export const PLACEHOLDER_EMAIL = 'brownpixels.co@gmail.com'

export function digits(v) {
  return String(v || '').replace(/\D/g, '')
}

export function isConfigured(v) {
  const d = digits(v)
  return d.length >= 8 && d.length <= 15 && !/[xX*]/.test(String(v))
}

export function validEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(String(v).trim())
}

export function formatPhone(raw) {
  const d = digits(raw)
  if (d.length === 12 && d.startsWith('91')) return '+91 ' + d.slice(2, 7) + ' ' + d.slice(7)
  if (d.length === 10) return '+91 ' + d.slice(0, 5) + ' ' + d.slice(5)
  return '+' + d
}

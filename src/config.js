// Central place for contact details and the form endpoint.
// See README.md for how to finish the email setup.
export const siteConfig = {
  email: 'brownpixels.co@gmail.com',
  whatsappNumber: '910000000000', // TODO: replace with the real WhatsApp number, digits only, country code first
  instagramUrl: 'https://instagram.com/brownpixels.co', // TODO: replace with the real handle
  linkedinUrl: 'https://linkedin.com/company/brownpixels', // TODO: replace with the real handle
  githubUrl: 'https://github.com/brownpixels',
  location: 'Remote-first · Working worldwide',

  // Formspree endpoint for the contact form. Every submission is emailed
  // to whatever address is registered on the Formspree form — point that
  // at brownpixels.co@gmail.com when you create it. See README.md.
  formEndpoint: 'https://formspree.io/f/REPLACE_WITH_YOUR_FORM_ID'
}

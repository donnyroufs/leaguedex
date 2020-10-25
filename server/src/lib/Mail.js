const sgMail = require('@sendgrid/mail');
const inProduction = process.env.NODE_ENV === 'production';
const mjml2html = require('mjml');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const emailConfirmation = (content, link) =>
  mjml2html(`
<mjml>
  <mj-body>
    <mj-section>
      <mj-column>
        <mj-image width="1200px" height="150px" src="https://res.cloudinary.com/dkyytvlwi/image/upload/v1603635572/banner_okgj0j.png"></mj-image>
        <mj-text font-size="16px" font-family="helvetica">
          ${content}
        </mj-text>
        <mj-button 
          href="${link}" 
          background-color="#2262a9" 
          height="75px" 
          width="250px" 
          cursor="pointer"
          font-weight="bold" 
          text-transform="uppercase" 
          font-size="14px">
            Validate Email Address
        </mj-button>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
`).html;

const msg = {
  to: 'iamchets@yahoo.com',
  from: process.env.SENDGRID_EMAIL,
  subject: 'Email verification',
  html: emailConfirmation(
    'You are one step away from using Leaguedex! Click on the button below in order to validate your email address',
    'https://localhost'
  ),
  mail_settings: {
    sandbox_mode: {
      enable: !inProduction,
    },
  },
};

async function sendMessage() {
  await sgMail.send(msg).catch((err) => console.log(err));
}

module.exports = { sendMessage };

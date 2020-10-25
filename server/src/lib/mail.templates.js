const mjml2html = require('mjml');

const emailConfirmation = (link) =>
  mjml2html(`
<mjml>
  <mj-body>
    <mj-section>
      <mj-column>
        <mj-image width="1200px" height="150px" src="https://res.cloudinary.com/dkyytvlwi/image/upload/v1603635572/banner_okgj0j.png"></mj-image>
        <mj-text font-size="16px" font-family="helvetica">
          You are one step away from using Leaguedex! Click on the button below in order to validate your email address.
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

module.exports = { emailConfirmation };

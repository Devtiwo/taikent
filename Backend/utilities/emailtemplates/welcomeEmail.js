const welcomeEmail =  (fname) => {
  return `
  <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #d3d3d3;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background: white;
              padding: 20px;
              border-radius: 5px;
              box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            }
            p {
              color: #000000;
              line-height: 1.6;
              font-size: 16px;
            }
            @media (max-width: 600px) {
             .container {
                padding: 10px;
              }
            } 
          </style>
        </head>
        <body>
          <div class="container">
            <img src="https://taikentinvestments.com/images/taikent.png" alt="logo" />
            <p>Welcome ${fname},</p>
            <p>We are thrilled to have you join us. Start your investment journey by exploring the plans on your dashboard</p>
            <p>We are here to help if you need assistance.</p>
            <p>Regards,<br>Taikent Investment Team</p>
          </div>
        </body>
    </html>`;
}
module.exports = {welcomeEmail};
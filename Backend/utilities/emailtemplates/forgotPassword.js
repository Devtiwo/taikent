const forgotPasswordEmail = (fname, resetLink) => {
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
           img {
             margin: 10px auto;
            }
           h1 {
             color: #000000;
            }
           p {
             color: #000000;
             line-height: 1.6;
             font-size: 16px;
            }
           .button {
             display: inline-block;
             padding: 15px 30px;
             font-size: 16px;
             color: white;
             background-color: #000000;
             text-decoration: none;
             border-radius: 5px;
             transition: background-color 0.7s;
            }
           .button:hover {
             background-color: fuchsia;
             color: white;
            }
           @media (max-width: 600px) {
             .container {
                padding: 10px;
              }
             .button {
                width: 100%;
                text-align: center;
              }
            }
          </style>
       </head>
       <body>
       <div class="container">
          <img src="https://taikentinvestments.netlify.app/images/taikent.png" alt="logo" />
          <h1>Password Reset Request</h1>
          <p>Hi ${fname},</p>
          <p>This email is to confirm that you requested a password reset. To complete the password reset process, click the button below</p>
          <a href="${resetLink}" class="button">Reset Password</a>
          <p>If you didn't request a password reset, please ignore this email.</p>
          <p>Thank you!</p>
       </div>
       </body>
    </html>
  `
}
module.exports = { forgotPasswordEmail }
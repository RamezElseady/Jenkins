const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(`
    <!DOCTYPE html>
    <html lang="ar">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>CI/CD App Deployment</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
          background-size: 400% 400%;
          animation: gradientBG 10s ease infinite;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #ffffff;
          text-align: center;
        }
        @keyframes gradientBG {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .card {
          background: rgba(0, 0, 0, 0.35);
          padding: 50px 40px;
          border-radius: 20px;
          backdrop-filter: blur(10px);
          box-shadow: 0 15px 35px rgba(0,0,0,0.4);
          border: 1px solid rgba(255, 255, 255, 0.2);
          animation: pulse 2s infinite ease-in-out;
        }
        h1 {
          font-size: 3rem;
          margin-bottom: 15px;
          text-shadow: 2px 4px 10px rgba(0,0,0,0.5);
        }
        p {
          font-size: 1.2rem;
          opacity: 0.9;
        }
      </style>
    </head>
    <body>
      <div class="card">
        <h1>🚀 The application was successfully built and deployed</h1>
        <p>Jenkins + Docker + GitHub Webhook Pipeline is Live ⚡</p>
      </div>
    </body>
    </html>
  `);
});

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 
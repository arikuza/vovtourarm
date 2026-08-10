<?php
http_response_code(503);
header('Retry-After: 3600');
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex">
  <title>VOVTOURARM — Temporarily unavailable</title>
  <style>
    body {
      margin: 0;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: Georgia, "Times New Roman", serif;
      background: #1c1b19;
      color: #f0ead9;
      text-align: center;
    }
    main { padding: 2rem; }
    h1 { font-size: 2rem; letter-spacing: 0.2em; margin-bottom: 0.5rem; }
    p { font-size: 1.1rem; color: #c9c2ad; margin: 0.3rem 0; }
  </style>
</head>
<body>
  <main>
    <h1>VOVTOURARM</h1>
    <p>The site is temporarily unavailable.</p>
    <p>Сайт временно недоступен.</p>
  </main>
</body>
</html>

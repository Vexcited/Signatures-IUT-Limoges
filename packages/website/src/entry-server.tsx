// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server";

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="fr">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />

          <meta name="color-scheme" content="dark light" />
          <meta name="theme-color" content="#FFFFFF" />

          <title>Signatures - IUT de Limoges</title>
          <link rel="icon" href="/favicon.ico" />
          {assets}
        </head>
        <body class="bg-[rgb(18,18,18)] text-[rgb(250,250,250)]" style={{ "font-family": "'Poppins', sans-serif" }}>
          <div id="app">{children}</div>
          {scripts}
        </body>
      </html>
    )}
  />
));

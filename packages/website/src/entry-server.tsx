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
          <meta name="msapplication-TileColor" content="#FFFFFF" />
          <meta name="theme-color" content="#FFFFFF" />

          <title>Signatures - IUT de Limoges</title>
          <link rel="manifest" href="/manifest.webmanifest" />
          <meta name="title" content="Signatures - IUT de Limoges" />
          <meta name="description"
            content="Une PWA simple et fonctionnelle hors-ligne à utiliser pour visualiser ses notes n'importe quand de façon instantané." />
          <link rel="canonical" href="https://signatures-iut-limoges.vercel.app" />

          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://signatures-iut-limoges.vercel.app" />
          <meta property="og:title" content="Signatures - IUT de Limoges" />
          <meta property="og:description"
            content="Une PWA simple et fonctionnelle hors-ligne à utiliser pour visualiser ses notes n'importe quand de façon instantané." />

          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="https://signatures-iut-limoges.vercel.app" />
          <meta property="twitter:title" content="Signatures - IUT de Limoges" />
          <meta property="twitter:description"
            content="Une PWA simple et fonctionnelle hors-ligne à utiliser pour visualiser ses notes n'importe quand de façon instantané." />

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

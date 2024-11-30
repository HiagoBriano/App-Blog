import { headers } from "next/headers";
import type { Metadata } from "next";
import React from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ionik - Blog",
  description: "Blog de programação",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

const getDomain = async () => {
  const headersList = await headers();
  const domain = headersList.get("host") || "localhost";

  // caso eu quera pegar o protocolo
  // const protocol = headersList.get("x-forwarded-proto") || "http";
  // const fullUrl = `${protocol}://${domain}`;

  return domain;
};

async function getRandomIcon() {
  const response = await fetch("https://randomuser.me/api/", {
    method: "GET",
    headers: {
      "Cache-Control": "public, max-age=3600", // Cache por 1 hora
    },
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar ícone");
  }

  const data = await response.json();

  return data.results[0].picture.thumbnail as string;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const domain = await getDomain();
  const icon = await getRandomIcon();

  return (
    <html lang="pt-br">
      <head>
        <link rel="icon" href={icon} type="image/x-icon" />
        <link
          rel="stylesheet"
          href="https://unicons.iconscout.com/release/v4.0.0/css/line.css"
        />
      </head>
      <body>
        {children}

        <p>Domínio: {domain}</p>
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import React from 'react';

import './globals.css';
import '../../styles/tailwind.css';

export const metadata: Metadata = {
  title: 'Hiago Online - Blog',
  description: 'Blog de programação',
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-br">
      <head>
        <link rel="icon" href="/icon.png" type="image/x-icon" />
      </head>

      <body>{children}</body>
    </html>
  );
}

// const getDomain = async () => {
//   const headersList = await headers();
//   const domain = headersList.get("host") || "localhost";

//   return domain;
// };

// Exemplo de busca pelo lado do servidor

// async function getRandomIcon() {
//   const response = await fetch("https://randomuser.me/api/", {
//     method: "GET",
//     headers: {
//       "Cache-Control": "public, max-age=3600", // Cache por 1 hora
//     },
//   });

//   if (!response.ok) {
//     throw new Error("Erro ao buscar ícone");
//   }

//   const data = await response.json();

//   return data.results[0].picture.thumbnail as string;
// }

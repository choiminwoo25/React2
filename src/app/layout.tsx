import { Children } from "react";

export default function RootLayout({
  children,
} : {
  children: React.ReactNode;
}) {
  return(
    <html lang="en">
      <body>
        <header>Root Layout Heaer</header>
        {children}
        <footer>Root Layout Footer</footer>
      </body>
    </html>
  )
}
import Link from "next/link";
import ThemeProvider from "../components/ThemeProvider";
import ThemeStatus from "../components/ThemeStatus";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <ThemeProvider>
          <header>
            <p>ROOT layout header</p>
            <nav>
              <Link href="/">Home</Link> | <Link href="/counter">Counter</Link>
              <br />
              <Link href="/interleaved">Inter leaved</Link>|
              <br />
              <br />
              Slug page Menu: &nbsp;
              <Link href="/next.js">nextjs</Link>&nbsp;|&nbsp;
              <Link href="/routing">routing</Link>&nbsp;|&nbsp;
              <Link href="/ssr-ssg">ssr-ssg</Link>&nbsp;|&nbsp;
              <Link href="/dynamic-routes">dynamic-routes</Link>&nbsp;|&nbsp;
              <br />
            </nav>
            <ThemeStatus />
            <br />
            <br />
          </header>
          <main>{children}</main>
          <footer>===Root Layout Footer ===</footer>
        </ThemeProvider>
      </body>
    </html>
  );
}

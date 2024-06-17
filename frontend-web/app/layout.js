
import { Inter } from "next/font/google";
import "./globals.css";
import { Header, Footer } from "@/components";
import { UserProvider } from "@/components/UserContext";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Food website",
  description: "Food website",
};

export default function RootLayout({ children }) {


  return (
    <html lang="en">
      
      <body className={inter.className}>
        <UserProvider>
          <Header />
          {children}
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}

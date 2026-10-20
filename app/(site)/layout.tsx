import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SplashScreen } from "@/components/ui/SplashScreen";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  
    return (
  <>
    <SplashScreen />
    {/* existing header, children, footer etc. */}
  </>
);
    <div className="flex min-h-screen flex-col">
      <Header />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}

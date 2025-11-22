import { Suspense } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { DashboardContent } from "./dashboard-content";

export default function DashboardPage() {
  return (
    <>
      <Navigation />
      <main className="flex-1 bg-background pt-16">
        <section className="container mx-auto px-4 md:px-6 lg:px-8 py-24 max-w-7xl">
          <div className="mb-12">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-4">
              Dashboard
            </h1>
            <p className="text-xl text-muted-foreground">
              Manage your API integrations and access your license key
            </p>
          </div>
          
          <Suspense fallback={
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading...</p>
              </div>
            </div>
          }>
            <DashboardContent />
          </Suspense>
        </section>
      </main>
      <Footer />
    </>
  );
}

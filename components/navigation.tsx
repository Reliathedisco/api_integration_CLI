import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";

export function Navigation() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-8">
          <Link href="/" className="flex items-center gap-3">
            <Image src="https://cdn.builder.io/api/v1/image/assets%2F0d8838e12c184fe685bce12306502cf6%2F71c8e2526e414105a556fd077752636c" alt="Integrate API" width={100} height={40} className="h-10" />
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link
              href="/integrations"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Integrations
            </Link>
            <Link
              href="/docs"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Documentation
            </Link>
            <Link
              href="/pricing"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Pricing
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/dashboard">Dashboard</Link>
          </Button>
          <Button asChild>
            <Link href="/pricing">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

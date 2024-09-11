'use client'

import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

export default function NotFound() {
  return (
    (<div className="flex items-center justify-center min-h-screen bg-background">
      <div className="text-center space-y-6 p-8">
        <div className="flex justify-center">
          <AlertCircle className="h-24 w-24 text-primary" />
        </div>
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">404</h1>
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">Page Not Found</h2>
        <p
          className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <div className="flex justify-center">
          <Button asChild size="lg">
            <a href="/" style={{ textDecoration: 'none', color: 'white' }}>
              Back to Home
            </a>
          </Button>
        </div>
      </div>
    </div>)
  );
}
import Link from "next/link"
import { ArrowRight, Brush, Share2, Sparkles, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold">
            <Brush className="h-5 w-5 text-primary" />
            <span>CollabCanvas</span>
          </div>
          <nav className="hidden gap-6 md:flex">
            <Link href="#features" className="text-sm font-medium transition-colors hover:text-primary">
              Features
            </Link>
            <Link href="#testimonials" className="text-sm font-medium transition-colors hover:text-primary">
              Testimonials
            </Link>
            <Link href="#pricing" className="text-sm font-medium transition-colors hover:text-primary">
              Pricing
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/whiteboard">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="container space-y-6 py-12 md:py-24 lg:py-32">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h1 className="font-heading text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
              Collaborate in Real-Time with{" "}
              <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                CollabCanvas
              </span>
            </h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              The intelligent whiteboard that brings your team together. Draw, plan, and create with the power of AI and
              real-time collaboration.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/whiteboard">
                <Button size="lg" className="gap-2">
                  Start Drawing <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="#features">
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="container py-12 md:py-24 lg:py-32">
          <div className="mx-auto flex max-w-6xl justify-center overflow-hidden rounded-lg border shadow-xl">
            <div className="relative aspect-video w-full">
              <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-background/20 p-8">
                <div className="absolute bottom-8 left-8 max-w-md">
                  <h2 className="mb-4 text-3xl font-bold">Powerful Collaboration Tools</h2>
                  <p className="text-muted-foreground">
                    See your team's ideas come to life in real-time with our advanced whiteboard technology.
                  </p>
                </div>
              </div>
              <div className="h-full w-full bg-muted/30 bg-[url('/placeholder.svg?height=720&width=1280')] bg-cover bg-center"></div>
            </div>
          </div>
        </section>

        <section id="features" className="container space-y-12 py-12 md:py-24 lg:py-32">
          <div className="mx-auto max-w-[58rem] space-y-4 text-center">
            <h2 className="font-heading text-3xl font-bold sm:text-4xl md:text-5xl">Powerful Features</h2>
            <p className="text-muted-foreground sm:text-xl">
              Everything you need to collaborate effectively with your team.
            </p>
          </div>
          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
              <div className="rounded-full bg-primary/10 p-3">
                <Share2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Real-Time Collaboration</h3>
              <p className="text-center text-muted-foreground">
                Work together with your team in real-time, seeing changes instantly as they happen.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
              <div className="rounded-full bg-primary/10 p-3">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">AI-Powered Tools</h3>
              <p className="text-center text-muted-foreground">
                Let our AI assist with shape recognition, handwriting improvement, and smart suggestions.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
              <div className="rounded-full bg-primary/10 p-3">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Team Management</h3>
              <p className="text-center text-muted-foreground">
                Organize your team, manage permissions, and keep track of all your collaborative projects.
              </p>
            </div>
          </div>
        </section>

        <section id="testimonials" className="bg-muted/50 py-12 md:py-24 lg:py-32">
          <div className="container space-y-12">
            <div className="mx-auto max-w-[58rem] space-y-4 text-center">
              <h2 className="font-heading text-3xl font-bold sm:text-4xl md:text-5xl">Loved by Teams Worldwide</h2>
              <p className="text-muted-foreground sm:text-xl">See what our users have to say about CollabCanvas.</p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-lg border bg-background p-6 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10" />
                    <div>
                      <p className="font-medium">Jane Smith</p>
                      <p className="text-sm text-muted-foreground">Product Manager</p>
                    </div>
                  </div>
                  <p className="mt-4 text-muted-foreground">
                    "CollabCanvas has transformed how our team brainstorms and plans projects. The real-time
                    collaboration is seamless, and the AI features save us so much time."
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="container space-y-12 py-12 md:py-24 lg:py-32">
          <div className="mx-auto max-w-[58rem] space-y-4 text-center">
            <h2 className="font-heading text-3xl font-bold sm:text-4xl md:text-5xl">Simple Pricing</h2>
            <p className="text-muted-foreground sm:text-xl">Start for free, upgrade when you need more features.</p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
              <h3 className="text-2xl font-bold">Free</h3>
              <p className="mt-2 text-muted-foreground">Perfect for individuals and small teams.</p>
              <div className="my-6">
                <span className="text-4xl font-bold">$0</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <ul className="mb-6 space-y-2">
                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 text-primary"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>Up to 3 whiteboards</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 text-primary"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>Basic collaboration</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 text-primary"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>7-day history</span>
                </li>
              </ul>
              <Link href="/whiteboard" className="mt-auto">
                <Button className="w-full">Get Started</Button>
              </Link>
            </div>
            <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
              <h3 className="text-2xl font-bold">Pro</h3>
              <p className="mt-2 text-muted-foreground">For growing teams and professionals.</p>
              <div className="my-6">
                <span className="text-4xl font-bold">$12</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <ul className="mb-6 space-y-2">
                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 text-primary"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>Unlimited whiteboards</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 text-primary"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>Advanced AI features</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 text-primary"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>30-day history</span>
                </li>
              </ul>
              <Button className="mt-auto w-full" variant="outline">
                Upgrade
              </Button>
            </div>
            <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
              <h3 className="text-2xl font-bold">Enterprise</h3>
              <p className="mt-2 text-muted-foreground">For organizations with advanced needs.</p>
              <div className="my-6">
                <span className="text-4xl font-bold">Custom</span>
              </div>
              <ul className="mb-6 space-y-2">
                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 text-primary"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>Unlimited everything</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 text-primary"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>Custom integrations</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 text-primary"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>Dedicated support</span>
                </li>
              </ul>
              <Button className="mt-auto w-full" variant="outline">
                Contact Sales
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-8">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2 font-bold">
            <Brush className="h-5 w-5 text-primary" />
            <span>CollabCanvas</span>
          </div>
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} CollabCanvas. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
              Terms
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}


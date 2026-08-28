import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart, MapPin, PawPrint } from "lucide-react";

const adoptionHeroes = [
  {
    age: "3 Years Old",
    description:
      "Barnaby is a gentle giant who loves leaning against you for pats. He is very food motivated and is adjusting wonderfully to pet life.",
    image: "/images/stitch-barnaby.jpg",
    location: "Melbourne",
    name: "Barnaby",
    sex: "Male",
  },
  {
    age: "2 Years Old",
    description:
      "Luna is a slightly shy but incredibly sweet girl looking for a quiet home to build her confidence.",
    image: "/images/stitch-luna.jpg",
    location: "Sydney",
    name: "Luna",
    sex: "Female",
  },
  {
    age: "4 Years Old",
    description:
      "True to his name, Dash loves a quick zoomie but is mostly a professional couch potato. Very affectionate.",
    image: "/images/stitch-dash.jpg",
    location: "Brisbane",
    name: "Dash",
    sex: "Male",
  },
] as const;

export function LandingHero() {
  return (
    <main className="min-h-screen bg-background">
      <header className="bg-primary text-white">
        <div className="mx-auto flex h-20 max-w-360 items-center justify-between px-6 sm:px-10 lg:px-12">
          <Link className="flex items-center gap-3 font-extrabold" href="/">
            <PawPrint aria-hidden="true" className="size-8 text-accent" strokeWidth={2.5} />
            <span className="text-lg tracking-tight sm:text-xl">
              Greyhound Racing NSW
            </span>
          </Link>
          <Link
            className="rounded-md px-4 py-2 text-sm font-bold text-white transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            href="/login"
          >
            Login
          </Link>
        </div>
      </header>

      <section className="mx-auto flex max-w-360 flex-col items-center bg-white lg:flex-row">
        <div className="order-2 flex w-full justify-center px-6 py-14 sm:px-10 lg:order-1 lg:w-1/2 lg:px-12 lg:py-24">
          <div className="max-w-xl">
            <h1 className="text-5xl font-extrabold leading-[1.04] tracking-tight text-primary sm:text-6xl">
              Find Your Best Friend.
            </h1>
            <p className="mt-6 max-w-md text-base leading-7 text-foreground/75">
              Give a retired racing greyhound a loving home. Our program matches
              these incredible greyhounds with perfect families.
            </p>
            <Link
              className="mt-8 inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
              href="/register"
            >
              Apply to Adopt
              <ArrowRight aria-hidden="true" className="size-4" strokeWidth={2.5} />
            </Link>
          </div>
        </div>

        <div className="relative order-1 aspect-video w-full overflow-hidden rounded-bl-3xl lg:order-2 lg:w-1/2 lg:rounded-bl-[3.75rem] lg:rounded-tl-[3.75rem]">
          <Image
            alt="A retired greyhound relaxing on a couch in a warm living room"
            className="object-cover object-center"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            src="/images/stitch-hero.jpg"
          />
        </div>
      </section>

      <section className="border-y border-primary/10 bg-surface-subtle px-6 py-16 sm:px-10 lg:py-24">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 text-center md:flex-row md:gap-16 md:text-left">
          <div className="grid size-28 shrink-0 place-items-center rounded-full bg-white text-primary shadow-sm">
            <Heart aria-hidden="true" className="size-12 fill-current" strokeWidth={2.25} />
          </div>
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
              Every Greyhound Deserves a Couch
            </h2>
            <p className="mt-4 text-base leading-7 text-foreground/75">
              Our adoption program carefully matches retired greyhounds with the
              perfect families. Every greyhound is vet-checked, desexed, and
              comprehensively assessed to ensure they are ready for a comfortable
              new life off the track. We are committed to finding forever homes
              where they can thrive as beloved companions.
            </p>
          </div>
        </div>
      </section>

      <section
        className="mx-auto max-w-360 px-6 py-16 sm:px-10 lg:px-12 lg:py-24"
        id="adoption-heroes"
      >
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
              Today&apos;s Adoption Heroes
            </h2>
            <p className="mt-3 text-base text-foreground/75">
              Meet our latest greyhounds ready for their forever homes.
            </p>
          </div>
          <a
            className="hidden items-center gap-2 self-start text-sm font-bold text-primary transition hover:text-secondary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary md:inline-flex md:self-auto"
            href="#adoption-heroes"
          >
            View All Heroes
            <ArrowRight aria-hidden="true" className="size-4" strokeWidth={2.5} />
          </a>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {adoptionHeroes.map((hound) => (
            <article
              className="overflow-hidden rounded-2xl border border-primary/10 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)] transition hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(0,0,0,0.1)]"
              key={hound.name}
            >
              <div className="relative aspect-4/3 overflow-hidden">
                <Image
                  alt={`${hound.name}, an available retired greyhound`}
                  className="object-cover transition duration-500 hover:scale-105"
                  fill
                  sizes="(max-width: 768px) calc(100vw - 3rem), (max-width: 1280px) calc(50vw - 3rem), 25vw"
                  src={hound.image}
                />
                <span className="absolute left-4 top-4 rounded-full bg-accent px-4 py-1.5 text-xs font-extrabold uppercase tracking-wide text-primary shadow-sm">
                  Available
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-extrabold tracking-tight text-primary">
                  {hound.name}
                </h3>
                <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold text-foreground/75">
                  <span className="rounded-md bg-surface-muted px-3 py-1.5">{hound.age}</span>
                  <span className="rounded-md bg-surface-muted px-3 py-1.5">{hound.sex}</span>
                  <span className="inline-flex items-center gap-1 rounded-md bg-surface-muted px-3 py-1.5">
                    <MapPin aria-hidden="true" className="size-3.5" />
                    {hound.location}
                  </span>
                </div>
                <p className="mt-4 text-sm leading-6 text-foreground/75">
                  {hound.description}
                </p>
              </div>
            </article>
          ))}

          <article className="hidden overflow-hidden rounded-2xl border border-primary/10 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)] xl:block">
            <div className="relative grid aspect-4/3 place-items-center bg-surface-muted text-primary/25">
              <PawPrint aria-hidden="true" className="size-14" />
              <span className="absolute left-4 top-4 rounded-full bg-primary px-4 py-1.5 text-xs font-extrabold uppercase tracking-wide text-white shadow-sm">
                Coming soon
              </span>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-extrabold tracking-tight text-primary">
                More Hounds
              </h3>
              <p className="mt-4 text-sm leading-6 text-foreground/75">
                Check back soon for more wonderful greyhounds looking for their
                forever couches. New dogs are added weekly.
              </p>
            </div>
          </article>
        </div>
      </section>

      <footer className="border-t border-white/15 bg-primary text-white">
        <div className="mx-auto flex max-w-360 flex-col items-center justify-between gap-10 px-6 py-12 text-center sm:px-10 md:flex-row md:items-start md:text-left lg:px-12">
          <div className="max-w-xs">
            <Link className="inline-flex items-center gap-3 text-lg font-extrabold" href="/">
              <PawPrint aria-hidden="true" className="size-7 text-accent" strokeWidth={2.5} />
              Greyhound Racing NSW
            </Link>
            <p className="mt-3 text-sm leading-6 text-white/85">
              Connecting retired racers with loving families across Australia.
            </p>
          </div>

          <div className="flex flex-col gap-3" id="footer-contact">
            <address className="flex flex-col gap-3 not-italic">
              <h2 className="text-sm font-extrabold uppercase tracking-[0.14em] text-accent">
                Contact
              </h2>
              <a className="text-sm text-white/90 transition hover:text-accent" href="mailto:adoption-demo@example.com">
                adoption-demo@example.com
              </a>
              <a className="text-sm text-white/90 transition hover:text-accent" href="tel:+61200000000">
                (02) 0000 0000
              </a>
            </address>
            <Link className="text-sm text-white/90 transition hover:text-accent" href="/staff-login">
              Staff Login
            </Link>
          </div>
        </div>
        <div className="border-t border-white/15 px-6 py-6 text-center text-sm text-white/75 sm:px-10 lg:px-12">
          Student capstone prototype. Not an official Greyhound Racing NSW service.
          <span className="mt-2 block">Copyright 2026 Greyhound Racing NSW. All rights reserved.</span>
        </div>
      </footer>
    </main>
  );
}


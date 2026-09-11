"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

const slides = [
  {
    eyebrow: "THE 2026 EDITION",
    title: "Move different.",
    description: "Thoughtfully selected products for every routine, every space, and every personal style.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1600&q=85",
    accent: "from-orange-500/80 to-rose-600/80",
    href: "/shop?sort=newest",
  },
  {
    eyebrow: "BUILT FOR THE DAILY GRIND",
    title: "Everyday meets exceptional.",
    description: "Fresh arrivals, dependable quality, and useful details chosen to make life easier.",
    image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=1600&q=85",
    accent: "from-indigo-600/80 to-violet-700/80",
    href: "/shop",
  },
  {
    eyebrow: "FIND YOUR NEXT FAVORITE",
    title: "Make it yours.",
    description: "Explore standout colors, practical details, and signature pieces curated for your collection.",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=1600&q=85",
    accent: "from-emerald-600/80 to-cyan-700/80",
    href: "/shop?category=casual",
  },
];

export function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const slide = slides[activeIndex];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 3000);
    return () => window.clearInterval(timer);
  }, []);

  const goTo = (index: number) => setActiveIndex((index + slides.length) % slides.length);

  return (
    <section
      className="relative isolate overflow-hidden bg-neutral-950 text-white"
      aria-label="Featured collections"
    >
      <div className="absolute inset-0">
        {slides.map((item, index) => (
          <div
            key={item.title}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
              index === activeIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: `url("${item.image}")` }}
            aria-hidden={index !== activeIndex}
          />
        ))}
        <div className={`absolute inset-0 bg-gradient-to-r ${slide.accent} mix-blend-multiply transition-colors duration-700`} />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/85 via-neutral-950/50 to-neutral-950/10" />
      </div>

      <div className="container-site relative flex min-h-[480px] items-center py-16 md:min-h-[560px] mt-15 md:py-28">
        <div className="max-w-2xl">
          <p className="mb-5 text-xs font-black uppercase tracking-[0.28em] text-orange-300">
            {slide.eyebrow}
          </p>
          <h1 className="max-w-xl text-5xl font-black tracking-tight sm:text-7xl">
            {slide.title}
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-white/75 sm:text-lg">
            {slide.description}
          </p>
          <Link
            href={slide.href}
            className="mt-8 inline-flex items-center gap-3 rounded-xl bg-white px-6 py-3.5 text-sm font-black uppercase tracking-wider text-neutral-950 transition hover:-translate-y-0.5 hover:bg-orange-50"
          >
            Explore the collection
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="absolute bottom-8 right-4 flex items-center gap-3 sm:right-8">
          <button
            type="button"
            onClick={() => goTo(activeIndex - 1)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-black/20 transition hover:bg-white hover:text-neutral-950"
            aria-label="Previous slide"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="h-3.5 w-3.5" />
          </button>
          <div className="flex items-center gap-2" aria-label="Carousel slides">
            {slides.map((item, index) => (
              <button
                key={item.title}
                type="button"
                onClick={() => goTo(index)}
                className={`h-2 rounded-full transition-all ${
                  index === activeIndex ? "w-8 bg-white" : "w-2 bg-white/45 hover:bg-white/80"
                }`}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === activeIndex ? "true" : undefined}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => goTo(activeIndex + 1)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-black/20 transition hover:bg-white hover:text-neutral-950"
            aria-label="Next slide"
          >
            <FontAwesomeIcon icon={faArrowRight} className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}

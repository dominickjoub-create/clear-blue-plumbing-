"use client";

import { useState } from "react";
import { TestimonialCard, type CardPosition } from "@/components/ui/testimonial-cards";
import { site } from "@/lib/site";
import { Reveal } from "./Reveal";

/**
 * Real customer testimonials from the Clear Blue Plumbing Google Business profile.
 * Keep the shape: { id, testimonial, author }.
 */
const testimonials = [
  {
    id: 1,
    testimonial:
      "Clear Blue Plumbing gave excellent service with a leaking pipe in the wall, friendly and honest. The guy really takes pride in his work. I was most impressed with the finishing of his job. Great work Brandon!",
    author: "Bashier Eland",
  },
  {
    id: 2,
    testimonial:
      "Brandon replaced my 150L burst geyser. The service is fantastic, brilliant pricing, friendly and very helpful. I would recommend them to anyone. I am definitely saving this plumbing service to my speed dial, a 10/10 rating.",
    author: "moonbot 902",
  },
  {
    id: 3,
    testimonial:
      "Clear Blue Plumbing came to my rescue and solved some plumbing issues I had. Very friendly and professional, will definitely use your service in the future and forward your details to relatives and friends.",
    author: "Jack Chapman",
  },
  {
    id: 4,
    testimonial:
      "I am truly satisfied with the service I received from Brandon. He was very fast at my premises, listened to my plumbing issues and jumped right in. Highly recommended.",
    author: "Dion Joubert",
  },
  {
    id: 5,
    testimonial:
      "Such great service! I reached out on a Saturday afternoon with a faulty geyser and got assisted first thing the next morning. They were fast, friendly and sorted it out properly.",
    author: "Routlon Ballack",
  },
];

export function Testimonials() {
  const [positions, setPositions] = useState<CardPosition[]>(["front", "middle", "back"]);

  const handleShuffle = () => {
    setPositions((prev) => {
      const next = [...prev];
      const last = next.pop()!;
      next.unshift(last);
      return next;
    });
  };

  // Show three cards in the shuffle stack at a time.
  const visible = testimonials.slice(0, 3);

  return (
    <section id="reviews" className="relative scroll-mt-20 overflow-hidden py-12 sm:py-20">
      <div className="shell grid items-center gap-14 lg:grid-cols-2">
        {/* Left: heading */}
        <div>
          <Reveal>
            <p className="eyebrow">Reviews</p>
            <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight tracking-tight text-chalk sm:text-4xl">
              Rated <span className="text-aqua">{site.rating.value} on Google</span> by
              homes &amp; businesses.
            </h2>
            <p className="mt-5 max-w-md text-chalk-dim">
              A perfect {site.rating.value}-star rating from happy customers. Real, honest
              work, brilliant pricing, and clients who save us to their speed dial.
            </p>
            <p
              className="mt-5 inline-flex items-center gap-1.5 text-aqua"
              aria-label={`${site.rating.value} out of 5 stars`}
            >
              {[0, 1, 2, 3, 4].map((i) => (
                <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="m12 2 3 6.6 7 .8-5.2 4.8L18.3 21 12 17.4 5.7 21l1.5-6.8L2 9.4l7-.8L12 2Z" />
                </svg>
              ))}
              <span className="ml-2 font-mono text-[0.72rem] uppercase tracking-wider text-chalk-faint">
                {site.rating.value} · Google reviews
              </span>
            </p>
            <p className="mt-6 inline-flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-wider text-chalk-faint">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M8 12h8M8 12l3-3M8 12l3 3"
                  stroke="#1E86E8"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Drag the top card to shuffle
            </p>
          </Reveal>
        </div>

        {/* Right: shuffle stack */}
        <div className="relative flex justify-center py-6 lg:justify-start">
          <div className="relative h-[450px] w-[350px] max-w-full scale-[0.82] sm:scale-100">
            {visible.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.id}
                {...testimonial}
                handleShuffle={handleShuffle}
                position={positions[index]}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import Link from 'next/link';
import { Moon } from 'lucide-react';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { StoriesSection } from '@/components/home/StoriesSection';
import { FaqSection } from '@/components/home/FaqSection';

export default function Home() {
  return (
    <div className="min-h-screen text-center scroll-mt-20">
      {/* Hero Section */}
      <section className="relative py-32 md:py-48 px-4 flex flex-col items-center justify-center overflow-hidden">
        {/* Background Effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/90 via-emerald-900/80 to-emerald-950 z-0" />
        <div className="absolute inset-0 z-[-1]">
          <img
            src="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=2070&auto=format&fit=crop"
            alt="Wedding Background"
            className="w-full h-full object-cover opacity-30"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto space-y-8">
          <Moon className="w-24 h-24 text-gold mx-auto animate-pulse drop-shadow-[0_0_15px_rgba(212,175,55,0.5)]" />
          <h1 className="text-5xl md:text-7xl font-serif text-gold leading-tight">
            Ansari Matrimonials
          </h1>
          <p className="text-xl md:text-2xl text-emerald-200/90 max-w-2xl mx-auto font-light">
            Halal matchmaking with privacy at its core. Verified profiles, lunar compatibility, and the blessings of tradition.
          </p>

          <div className="flex flex-col md:flex-row gap-6 justify-center pt-8">
            <Link href="/discover">
              <button className="px-8 py-4 bg-gold text-emerald-950 text-xl font-bold rounded-full hover:bg-white transition-all shadow-lg hover:shadow-gold/50 min-w-[200px]">
                Browse Profiles
              </button>
            </Link>
            <Link href="/signup">
              <button className="px-8 py-4 border-2 border-gold text-gold text-xl font-bold rounded-full hover:bg-gold hover:text-emerald-950 transition-all min-w-[200px]">
                Join Now
              </button>
            </Link>
          </div>
        </div>
      </section>

      <FeaturesSection />
      <StoriesSection />
      <FaqSection />

      {/* CTA Section */}
      <section className="py-20 bg-gold text-emerald-950">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-serif font-bold mb-6">Ready to find your soulmate?</h2>
          <p className="text-xl mb-8 opacity-90">Join thousands of happy couples who trusted Ansari.</p>
          <Link href="/signup">
            <button className="px-10 py-4 bg-emerald-950 text-gold text-xl font-bold rounded-full hover:bg-emerald-900 transition-all shadow-xl">
              Get Started Today
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}

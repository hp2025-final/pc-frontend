import Link from 'next/link';

export const metadata = {
  title: 'About Us | PC Wala Online',
  description: 'Pakistan\'s retro-cool PC parts store. Genuine hardware, WhatsApp ordering, real humans.',
};

export default function AboutPage() {
  return (
    <main className="container-retro" style={{ paddingTop: '48px', paddingBottom: '64px' }}>
      <div className="breadcrumb">
        <Link href="/">Home</Link>
        <span className="breadcrumb-sep">/</span>
        <span>About Us</span>
      </div>

      <h1 className="section-title">{"// About PC Wala"}</h1>

      <div className="pixel-box animate-fade-up" style={{ padding: '32px' }}>
        <div className="prose-retro max-w-3xl">
          <p className="text-lg mb-6">
            <strong>PC Wala Online</strong> isn&apos;t your average parts store. We&apos;re the spot where hardware nerds, competitive gamers, and first-time builders come to gear up — without the usual headaches.
          </p>
          <p>
            Based out of Saddar, Karachi, we&apos;ve been helping people build everything from budget sleeper rigs to insane RGB battlestations. Whether you know exactly what chipset you need or you&apos;re still figuring out what a motherboard does — we&apos;ve got you.
          </p>

          <h2>{"// The Pixel Aesthetic"}</h2>
          <p>
            You probably noticed the retro-arcade look. That&apos;s not just decoration — that&apos;s who we are. We grew up on LAN parties, pixelated sprites, and midnight overclocking sessions. Building PCs is our version of playing the game, and this store is our home screen.
          </p>

          <h2>{"// WhatsApp = Our Checkout"}</h2>
          <p>
            No cart. No checkout page. No payment gateway drama. Here&apos;s how we roll:
          </p>
          <ul>
            <li><strong>Dynamic Pricing:</strong> PC parts prices change daily. Instead of showing you a stale number, we show a range and lock in the real price when you message us. You always get the current market rate — not last week&apos;s.</li>
            <li><strong>Real Humans, Real Advice:</strong> Click &quot;Order on WhatsApp&quot; and you&apos;re talking to someone who actually builds PCs. We&apos;ll check compatibility, suggest better options if they exist, and finalize everything in chat.</li>
            <li><strong>No Surprises:</strong> Price, delivery, payment method — everything is agreed before you pay a single rupee. Bank transfer or COD, your call.</li>
          </ul>

          <h2>{"// 100% Genuine. Zero Fakes."}</h2>
          <p>
            Every component we sell is authentic and verified. We don&apos;t do knockoffs, counterfeits, or &quot;compatible alternatives&quot; that die in two weeks. We source from international and local distributors, and every product comes with clearly defined warranty coverage — from full international warranty down to as-is items. No guessing games.
          </p>

          <h2>{"// Built for Builders"}</h2>
          <p>
            Whether you&apos;re hunting for a specific RTX card, comparing B650 motherboards, or just need someone to tell you which RAM actually works with your CPU — we&apos;re here. PC Wala isn&apos;t a marketplace. It&apos;s a crew.
          </p>

          <div className="mt-8">
            <a href="https://wa.me/923423355119" className="pixel-btn" target="_blank" rel="noopener noreferrer">
              <span>▶ Start a Conversation</span>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

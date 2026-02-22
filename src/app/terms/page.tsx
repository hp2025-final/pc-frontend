import Link from 'next/link';

export const metadata = {
    title: 'Terms of Service | PC Wala Online',
    description: 'Terms and conditions for shopping with PC Wala Online — straight talk, no legal jargon overload.',
};

export default function TermsPage() {
    return (
        <main className="container-retro" style={{ paddingTop: '48px', paddingBottom: '64px' }}>
            <div className="breadcrumb">
                <Link href="/">Home</Link>
                <span className="breadcrumb-sep">/</span>
                <span>Terms of Service</span>
            </div>

            <h1 className="section-title">{"// Terms of Service"}</h1>

            <div className="pixel-box animate-fade-up max-w-4xl" style={{ padding: '32px' }}>
                <div className="prose-retro">
                    <p><strong>Last Updated:</strong> February 2026</p>

                    <p>
                        By using our website (<strong>pcwalaonline.com</strong>) and doing business with us via WhatsApp, you&apos;re agreeing to the terms below. We&apos;ve kept them as human-readable as possible.
                    </p>

                    <h2>{"// 1. Pricing & Availability"}</h2>
                    <p>
                        The PC hardware market is volatile — prices swing daily based on supply, currency rates, and global demand. That&apos;s why <strong>prices on our website are indicative ranges, not fixed numbers.</strong> The final, locked-in price is agreed upon during your WhatsApp conversation with our team.
                    </p>
                    <p>
                        Stock status on the website is updated periodically but may not reflect real-time availability. We always confirm actual stock during your WhatsApp chat before finalizing anything.
                    </p>

                    <h2>{"// 2. How Orders Work"}</h2>
                    <ul>
                        <li>Our website is a <strong>digital catalog</strong>, not a checkout system. Browsing and clicking &quot;Order on WhatsApp&quot; doesn&apos;t create a binding contract.</li>
                        <li>The deal is only final when both sides agree on the price, delivery method, and payment terms <strong>in writing on WhatsApp</strong> — and you&apos;ve made payment or advance.</li>
                        <li>We reserve the right to decline an order if stock runs out or if there&apos;s a pricing error.</li>
                    </ul>

                    <h2>{"// 3. Payments"}</h2>
                    <p>
                        No online payment gateway. We keep it straightforward — <strong>Direct Bank Transfer</strong> or <strong>Cash on Delivery (COD)</strong>, as agreed on WhatsApp. Products remain our property until paid for in full.
                    </p>

                    <h2>{"// 4. Warranties & Returns"}</h2>
                    <p>
                        Warranty coverage varies by product — from full international warranty to no warranty on clearance items. Check our <Link href="/warranty" style={{ textDecoration: 'underline', textUnderlineOffset: '3px' }}>Warranty Policy</Link> page for the full breakdown of all 5 tiers.
                    </p>
                    <p>
                        We don&apos;t accept returns for change of mind. If a product arrives Dead on Arrival (DOA) and it&apos;s covered under a valid warranty, we&apos;ll handle it. Otherwise, all sales are final once the deal is confirmed on WhatsApp.
                    </p>

                    <h2>{"// 5. Limitation of Liability"}</h2>
                    <p>
                        We&apos;re not liable for indirect or consequential damages from products purchased from us — including data loss or damage to other components from improper installation. We sell the parts; proper installation is on you (or your trusted technician).
                    </p>
                    <p>
                        We work hard to keep product specs accurate on the site, but always double-check critical specifications on the manufacturer&apos;s official website before making a decision.
                    </p>

                    <h2>{"// 6. Governing Law"}</h2>
                    <p>
                        These terms are governed by the laws of Pakistan. Any disputes fall under the exclusive jurisdiction of the courts in Karachi.
                    </p>
                </div>
            </div>
        </main>
    );
}

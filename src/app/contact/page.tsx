import Link from 'next/link';

export const metadata = {
    title: 'Contact Us | PC Wala Online',
    description: 'Reach PC Wala Online via WhatsApp or visit our Karachi store. Fast replies, real hardware advice.',
};

export default function ContactPage() {
    return (
        <main className="container-retro" style={{ paddingTop: '48px', paddingBottom: '64px' }}>
            <div className="breadcrumb">
                <Link href="/">Home</Link>
                <span className="breadcrumb-sep">/</span>
                <span>Contact</span>
            </div>

            <h1 className="section-title">{"// Contact Us"}</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-up">

                {/* Contact Info Card */}
                <div className="pixel-box" style={{ padding: '32px' }}>
                    <h2 className="font-pixel text-sm uppercase mb-6 border-b-2 border-black pb-2">{"// Get In Touch"}</h2>

                    <div className="space-y-6 prose-retro">
                        <div>
                            <h3 className="text-gray-500 mb-1">WhatsApp &amp; Phone</h3>
                            <a href="https://wa.me/923423355119" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-bold text-black border-2 border-black px-3 py-2 hover:bg-black hover:text-white transition-colors duration-150">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                                </svg>
                                +92 342 3355119
                            </a>
                            <p className="text-xs text-gray-500 mt-2">Tap to chat. We reply fast — usually within minutes during business hours.</p>
                        </div>

                        <div>
                            <h3 className="text-gray-500 mb-1">Store Location</h3>
                            <p className="font-bold text-black text-sm">
                                G41, Ground Floor,<br />
                                Regal Trade Square,<br />
                                Regal Chowk, Saddar,<br />
                                Karachi, Pakistan.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-gray-500 mb-1">How to Order</h3>
                            <p>Forget the traditional cart. Browse our catalog, find the part you need, and hit the WhatsApp button on the product page. From there, we handle everything — confirm stock, lock in the best current price, and arrange delivery or pickup. It&apos;s faster than any checkout form.</p>
                        </div>
                    </div>
                </div>

                {/* Visit Store Card */}
                <div className="pixel-box flex flex-col justify-center items-center text-center bg-gray-50" style={{ padding: '32px' }}>
                    <div className="mb-4">
                        <span style={{
                            fontFamily: 'var(--font-pixel), monospace',
                            fontSize: '32px',
                            display: 'block',
                        }}></span>
                    </div>
                    <h3 className="font-pixel text-sm uppercase mb-4">{"// Visit The HQ"}</h3>
                    <p className="prose-retro mb-4 text-sm">
                        Saddar is the hardware hub of Karachi, and we&apos;re right in the middle of it. Walk in, check out our inventory, poke at the latest GPUs, and talk shop with the team. No appointment needed — just show up.
                    </p>
                    <p className="prose-retro mb-6 text-sm" style={{ color: '#888' }}>
                        Pro tip: Message us on WhatsApp before visiting so we can keep your items ready.
                    </p>
                    <a
                        href="https://www.google.com/maps/place/PC+Wala+Online/@24.8608156,67.0254546,17z/data=!3m1!4b1!4m6!3m5!1s0x3eb33e6d7dd40001:0x1a8b3cd9d0328487!8m2!3d24.8608156!4d67.0254546!16s%2Fg%2F11cffzfk8?entry=ttu&g_ep=EgoyMDI2MDIxOC4wIKXMDSoASAFQAw%3D%3D"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pixel-btn-outline pixel-btn"
                    >
                        ▶ Open in Google Maps
                    </a>
                </div>

            </div>
        </main>
    );
}

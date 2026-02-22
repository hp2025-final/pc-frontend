import Link from 'next/link';

export const metadata = {
    title: 'Warranty Policy | PC Wala Online',
    description: 'Understand the 5 types of warranties at PC Wala Online — International, Brand, Local, Limited, and No Warranty.',
};

export default function WarrantyPage() {
    return (
        <main className="container-retro" style={{ paddingTop: '48px', paddingBottom: '64px' }}>
            <div className="breadcrumb">
                <Link href="/">Home</Link>
                <span className="breadcrumb-sep">/</span>
                <span>Warranty Information</span>
            </div>

            <h1 className="section-title">{"// Warranty Coverage"}</h1>

            <div className="animate-fade-up">
                <div className="prose-retro max-w-4xl mb-8">
                    <p>
                        We source hardware from all over — international markets, local distributors, brand-authorized channels. That means warranty coverage varies product to product. No hidden fine print here. We&apos;ll always tell you exactly what kind of coverage you&apos;re getting <strong>before</strong> you buy.
                    </p>
                    <p className="mb-6">Here are the 5 warranty tiers you&apos;ll see on our store:</p>
                </div>

                <div className="overflow-x-auto">
                    <table className="spec-table min-w-[600px]">
                        <tbody>
                            <tr>
                                <td>International Warranty</td>
                                <td>
                                    <strong>The gold standard.</strong> The manufacturer covers the product globally. If something goes wrong, you claim directly with the brand&apos;s authorized service center — which may be outside Pakistan. We&apos;ll guide you through the process if needed.
                                </td>
                            </tr>
                            <tr>
                                <td>Brand / Vendor Warranty</td>
                                <td>
                                    <strong>Local brand-backed coverage.</strong> An authorized distributor or vendor in Pakistan handles the warranty. If your hardware develops a fault, you take it to the brand&apos;s local warranty center — no international shipping required.
                                </td>
                            </tr>
                            <tr>
                                <td>Local Warranty</td>
                                <td>
                                    <strong>We&apos;ve got your back directly.</strong> If something goes wrong within the warranty period, bring or ship the item to the PC Wala store. We handle the repair or replacement ourselves. Simple as that.
                                </td>
                            </tr>
                            <tr>
                                <td>Limited Warranty</td>
                                <td>
                                    <strong>Coverage with conditions.</strong> Also claimed at our store, but with specific limitations. This typically applies to refurbished items, select imports, or used goods — for example, a 7-day checking warranty or coverage limited to certain components only.
                                </td>
                            </tr>
                            <tr>
                                <td>No Warranty</td>
                                <td>
                                    <strong>Sold as-is. Final sale.</strong> No warranty coverage at all. This is reserved for heavily discounted clearance items, specific accessories, or particular used products. The price reflects the risk — and we&apos;ll always flag this clearly before you buy.
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="pixel-box p-6 mt-8 bg-black text-white">
                    <h3 className="font-pixel text-xs uppercase mb-3 border-b-2 border-white pb-2 inline-block">{"// Not Sure? Just Ask."}</h3>
                    <p className="font-mono text-sm leading-relaxed text-gray-300">
                        Never assume. If you&apos;re eyeing a specific GPU, CPU, or peripheral and want to know exactly what warranty it carries — ask us during your WhatsApp chat. We&apos;ll give you the full breakdown before you commit.
                    </p>
                    <div className="mt-4">
                        <a href="https://wa.me/923423355119" className="pixel-btn" target="_blank" rel="noopener noreferrer" style={{ background: '#fff', color: '#000' }}>
                            ▶ Ask on WhatsApp
                        </a>
                    </div>
                </div>
            </div>
        </main>
    );
}

import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ReactNode } from 'react';

export default function Welcome({ auth }: PageProps) {
    const primaryHref = auth.user ? route('dashboard') : route('register');
    const primaryLabel = auth.user ? 'Open Dashboard' : 'Create your account';

    return (
        <>
            <Head title="Counter-Strike Finance Tracker" />
            <div className="bg-slate-50 text-slate-800">
                <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8 lg:py-10">
                    <header className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="rounded-md bg-slate-900 px-3 py-2 text-sm font-semibold text-white">
                                CS Finance
                            </div>
                            <p className="hidden text-sm text-slate-500 sm:block">
                                Counter-Strike investment tracking
                            </p>
                        </div>
                        <nav className="flex items-center gap-3">
                            <Link
                                href={route('login')}
                                className="rounded-md px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                            >
                                Log in
                            </Link>
                            <Link
                                href={route('register')}
                                className="rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
                            >
                                Register
                            </Link>
                        </nav>
                    </header>

                    <main className="pt-12 lg:pt-16">
                        <section className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                                    Built for serious CS traders
                                </p>
                                <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
                                    Track every CS transaction with confidence.
                                </h1>
                                <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                                    Capture buys, sells, trades, and trade-ups in one timeline so you can understand
                                    your real performance, position by position.
                                </p>
                                <div className="mt-9 flex flex-wrap items-center gap-4">
                                    <Link
                                        href={primaryHref}
                                        className="rounded-md bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
                                    >
                                        {primaryLabel}
                                    </Link>
                                    {!auth.user && (
                                        <Link
                                            href={route('login')}
                                            className="rounded-md border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-white"
                                        >
                                            I already have an account
                                        </Link>
                                    )}
                                </div>
                                <div className="mt-10 grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-3">
                                    <TrustPill label="Manual-first control" />
                                    <TrustPill label="Linked investment chains" />
                                    <TrustPill label="Clear realized vs unrealized P/L" />
                                </div>
                            </div>

                            <HeroMockup />
                        </section>

                        <section className="mt-20 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
                            <div className="grid gap-4 text-sm text-slate-600 lg:grid-cols-3">
                                <p>
                                    Every transaction stays traceable from first buy to final sell so your capital
                                    movement is fully auditable.
                                </p>
                                <p>
                                    Manual input keeps you in control of assumptions, fees, and execution details for
                                    more reliable reporting.
                                </p>
                                <p>
                                    Built for clarity first: less dashboard noise, stronger attribution, and faster
                                    decisions on where to reinvest.
                                </p>
                            </div>
                        </section>

                        <section className="mt-24 space-y-16">
                            <FeatureShowcase
                                eyebrow="Timeline clarity"
                                title="See how one move leads to the next."
                                description="Transaction linking connects each buy, trade-up, and sell into a coherent investment story so you can evaluate strategy quality over time."
                                visual={<TimelineVisual />}
                            />
                            <FeatureShowcase
                                eyebrow="Portfolio visibility"
                                title="Know what is open and what is closed."
                                description="Separate open inventory exposure from closed outcomes, so your next action is based on current risk and not guesswork."
                                visual={<PortfolioVisual />}
                                reverse
                            />
                            <FeatureShowcase
                                eyebrow="Performance reporting"
                                title="Measure results with operational context."
                                description="Realized and unrealized P/L are shown alongside transaction volume and chain depth, helping you benchmark how each strategy performs."
                                visual={<AnalyticsVisual />}
                            />
                        </section>

                        <section className="mt-24 rounded-2xl bg-slate-900 px-6 py-12 text-center text-white lg:px-12">
                            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">
                                Start with a clean baseline
                            </p>
                            <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
                                Build your full CS investment history in one trusted workspace.
                            </h2>
                            <p className="mx-auto mt-4 max-w-2xl text-slate-300">
                                Start tracking now and get immediate visibility into timeline flow, inventory exposure,
                                and profit/loss performance.
                            </p>
                            <div className="mt-8 flex justify-center">
                                <Link
                                    href={primaryHref}
                                    className="rounded-md bg-white px-7 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
                                >
                                    {primaryLabel}
                                </Link>
                            </div>
                        </section>
                    </main>
                </div>
            </div>
        </>
    );
}

function TrustPill({ label }: { label: string }) {
    return (
        <div className="rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 shadow-sm">
            {label}
        </div>
    );
}

function FeatureShowcase({
    eyebrow,
    title,
    description,
    visual,
    reverse = false,
}: {
    eyebrow: string;
    title: string;
    description: string;
    visual: ReactNode;
    reverse?: boolean;
}) {
    return (
        <div className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-14 ${reverse ? 'lg:[&>*:first-child]:order-2' : ''}`}>
            <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">{eyebrow}</p>
                <h3 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">{title}</h3>
                <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">{description}</p>
            </div>
            <div>{visual}</div>
        </div>
    );
}

function HeroMockup() {
    return (
        <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -top-5 -right-5 hidden h-44 w-44 rounded-xl border border-slate-200 bg-white/80 shadow-sm backdrop-blur sm:block" />
            <div className="relative rounded-2xl border border-slate-200 bg-white p-5 shadow-lg">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div>
                        <p className="text-xs uppercase tracking-[0.14em] text-slate-500">Performance Overview</p>
                        <p className="mt-1 text-lg font-semibold text-slate-900">April Session</p>
                    </div>
                    <span className="rounded bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700">+12.4%</span>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3">
                    <MetricCard title="Invested" value="$4,850" tone="neutral" />
                    <MetricCard title="Realized" value="$740" tone="positive" />
                    <MetricCard title="Unrealized" value="$190" tone="neutral" />
                </div>
                <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Chain Timeline</p>
                    <div className="mt-3 space-y-2 text-sm text-slate-700">
                        <TimelineRow label="Buy: AWP | Asiimov" value="- $410" tone="negative" />
                        <TimelineRow label="Trade-up Batch #07" value="+ $250" tone="neutral" />
                        <TimelineRow label="Sell: AK | Redline" value="+ $560" tone="positive" />
                    </div>
                </div>
            </div>
        </div>
    );
}

function TimelineVisual() {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Linked Transactions</p>
            <div className="mt-4 space-y-3">
                <Node title="Buy Entry" subtitle="M4A1-S | Printstream" amount="$260" />
                <Connector />
                <Node title="Trade-Up Input" subtitle="10 skins committed" amount="$310" />
                <Connector />
                <Node title="Output Sold" subtitle="AK-47 | Neon Rider" amount="$495" positive />
            </div>
        </div>
    );
}

function PortfolioVisual() {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Open Positions</p>
            <div className="mt-4 overflow-hidden rounded-lg border border-slate-200">
                <table className="min-w-full text-sm">
                    <thead className="bg-slate-50 text-left text-slate-500">
                        <tr>
                            <th className="px-3 py-2 font-medium">Item</th>
                            <th className="px-3 py-2 font-medium">Qty</th>
                            <th className="px-3 py-2 font-medium">Basis</th>
                            <th className="px-3 py-2 font-medium">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <PortfolioRow item="AWP | Wildfire" qty="1" basis="$182" status="Open" />
                        <PortfolioRow item="AK-47 | Bloodsport" qty="2" basis="$330" status="Open" />
                        <PortfolioRow item="USP-S | Kill Confirmed" qty="1" basis="$145" status="Watch" />
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function AnalyticsVisual() {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Analytics Snapshot</p>
            <div className="mt-4 grid grid-cols-2 gap-3">
                <ChartCard label="Win Rate" value="67%" />
                <ChartCard label="Avg Chain ROI" value="+9.8%" />
                <ChartCard label="Trades Closed" value="43" />
                <ChartCard label="Avg Hold Time" value="11d" />
            </div>
            <div className="mt-4 h-20 rounded-lg border border-slate-200 bg-slate-50 p-3">
                <div className="flex h-full items-end gap-1">
                    {[35, 55, 42, 68, 61, 74, 66].map((height, index) => (
                        <div key={index} className="w-full rounded-sm bg-slate-800/80" style={{ height: `${height}%` }} />
                    ))}
                </div>
            </div>
        </div>
    );
}

function MetricCard({
    title,
    value,
    tone,
}: {
    title: string;
    value: string;
    tone: 'positive' | 'negative' | 'neutral';
}) {
    const toneClass =
        tone === 'positive' ? 'text-emerald-700' : tone === 'negative' ? 'text-rose-700' : 'text-slate-800';

    return (
        <div className="rounded-lg border border-slate-200 bg-white px-3 py-2">
            <p className="text-[11px] uppercase tracking-[0.12em] text-slate-500">{title}</p>
            <p className={`mt-1 text-sm font-semibold ${toneClass}`}>{value}</p>
        </div>
    );
}

function TimelineRow({
    label,
    value,
    tone,
}: {
    label: string;
    value: string;
    tone: 'positive' | 'negative' | 'neutral';
}) {
    const valueTone =
        tone === 'positive' ? 'text-emerald-700' : tone === 'negative' ? 'text-rose-700' : 'text-slate-700';

    return (
        <div className="flex items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2">
            <p>{label}</p>
            <p className={`font-semibold ${valueTone}`}>{value}</p>
        </div>
    );
}

function Node({
    title,
    subtitle,
    amount,
    positive = false,
}: {
    title: string;
    subtitle: string;
    amount: string;
    positive?: boolean;
}) {
    return (
        <div className="rounded-lg border border-slate-200 bg-white px-4 py-3">
            <div className="flex items-center justify-between">
                <p className="font-semibold text-slate-900">{title}</p>
                <span className={`text-sm font-semibold ${positive ? 'text-emerald-700' : 'text-slate-700'}`}>
                    {amount}
                </span>
            </div>
            <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
        </div>
    );
}

function Connector() {
    return <div className="mx-4 h-3 border-l-2 border-dashed border-slate-300" />;
}

function PortfolioRow({
    item,
    qty,
    basis,
    status,
}: {
    item: string;
    qty: string;
    basis: string;
    status: string;
}) {
    return (
        <tr className="border-t border-slate-100">
            <td className="px-3 py-2 text-slate-700">{item}</td>
            <td className="px-3 py-2 text-slate-700">{qty}</td>
            <td className="px-3 py-2 text-slate-700">{basis}</td>
            <td className="px-3 py-2">
                <span className="rounded bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">{status}</span>
            </td>
        </tr>
    );
}

function ChartCard({ label, value }: { label: string; value: string }) {
    return (
        <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
            <p className="text-[11px] uppercase tracking-[0.12em] text-slate-500">{label}</p>
            <p className="mt-1 text-base font-semibold text-slate-900">{value}</p>
        </div>
    );
}

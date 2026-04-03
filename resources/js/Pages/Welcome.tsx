import ThemeToggle from '@/Components/ThemeToggle';
import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ReactNode } from 'react';

export default function Welcome({ auth }: PageProps) {
    const primaryHref = auth.user ? route('dashboard') : route('register');
    const primaryLabel = auth.user ? 'Open Dashboard' : 'Create your account';

    return (
        <>
            <Head title="Counter-Strike Finance Tracker" />
            <div className="bg-app-bg text-app-text">
                <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8 lg:py-10">
                    <header className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex min-w-0 items-center gap-3">
                            <img
                                src="/images/Logo.png"
                                alt="CS Finance"
                                className="h-11 w-auto object-contain sm:h-12"
                            />
                            <p className="hidden text-sm text-app-muted sm:block">
                                Counter-Strike investment tracking
                            </p>
                        </div>
                        <div className="flex flex-wrap items-center justify-end gap-3">
                            <ThemeToggle />
                            <nav className="flex items-center gap-2 sm:gap-3">
                                <Link
                                    href={route('login')}
                                    className="rounded-md px-4 py-2 text-sm font-medium text-app-text transition hover:bg-app-bg-muted"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="rounded-md bg-app-cta px-4 py-2 text-sm font-semibold text-app-cta-text transition hover:opacity-90"
                                >
                                    Register
                                </Link>
                            </nav>
                        </div>
                    </header>

                    <main className="pt-12 lg:pt-16">
                        <section className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-app-brand-teal">
                                    Built for serious CS traders
                                </p>
                                <h1 className="mt-5 text-4xl font-semibold tracking-tight text-app-text sm:text-5xl">
                                    Track every CS transaction with confidence.
                                </h1>
                                <p className="mt-6 max-w-xl text-lg leading-8 text-app-muted">
                                    Capture buys, sells, trades, and trade-ups in one timeline so you can understand your
                                    real performance, position by position.
                                </p>
                                <div className="mt-9 flex flex-wrap items-center gap-4">
                                    <Link
                                        href={primaryHref}
                                        className="rounded-md bg-app-cta px-6 py-3 text-sm font-semibold text-app-cta-text shadow-md transition hover:opacity-90"
                                    >
                                        {primaryLabel}
                                    </Link>
                                    {!auth.user && (
                                        <Link
                                            href={route('login')}
                                            className="rounded-md border border-app-border bg-app-card px-6 py-3 text-sm font-semibold text-app-text transition hover:border-app-brand-teal"
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

                        <section className="mt-20 rounded-2xl border border-app-border bg-app-card p-6 shadow-sm lg:p-8">
                            <div className="grid gap-4 text-sm text-app-muted lg:grid-cols-3">
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

                        <section className="mt-24 rounded-2xl border border-app-border bg-app-bg-elevated px-6 py-12 text-center lg:px-12">
                            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-app-brand-teal">
                                Start with a clean baseline
                            </p>
                            <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-app-text sm:text-4xl">
                                Build your full CS investment history in one trusted workspace.
                            </h2>
                            <p className="mx-auto mt-4 max-w-2xl text-app-muted">
                                Start tracking now and get immediate visibility into timeline flow, inventory exposure,
                                and profit/loss performance.
                            </p>
                            <div className="mt-8 flex justify-center">
                                <Link
                                    href={primaryHref}
                                    className="rounded-md bg-app-cta px-7 py-3 text-sm font-semibold text-app-cta-text shadow-md transition hover:opacity-90"
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
        <div className="rounded-md border border-app-border bg-app-bg-elevated px-3 py-2 text-xs font-medium text-app-muted shadow-sm">
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
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-app-brand-teal">{eyebrow}</p>
                <h3 className="mt-3 text-3xl font-semibold tracking-tight text-app-text">{title}</h3>
                <p className="mt-4 max-w-xl text-base leading-7 text-app-muted">{description}</p>
            </div>
            <div>{visual}</div>
        </div>
    );
}

function HeroMockup() {
    return (
        <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -top-5 -right-5 hidden h-44 w-44 rounded-xl border border-app-border bg-app-accent shadow-sm backdrop-blur sm:block" />
            <div className="relative -skew-y-2 transform rounded-2xl border border-app-border bg-app-card p-5 shadow-lg">
                <div className="skew-y-2 transform">
                    <div className="flex items-center justify-between border-b border-app-border pb-4">
                        <div>
                            <p className="text-xs uppercase tracking-[0.14em] text-app-muted">Performance Overview</p>
                            <p className="mt-1 text-lg font-semibold text-app-text">April Session</p>
                        </div>
                        <span
                            className="rounded px-2 py-1 text-xs font-semibold"
                            style={{
                                color: 'var(--color-positive)',
                                backgroundColor: 'var(--color-positive-bg)',
                            }}
                        >
                            +12.4%
                        </span>
                    </div>
                    <div className="mt-4 grid grid-cols-3 gap-3">
                        <MetricCard title="Invested" value="$4,850" tone="neutral" />
                        <MetricCard title="Realized" value="$740" tone="positive" />
                        <MetricCard title="Unrealized" value="$190" tone="neutral" />
                    </div>
                    <div className="mt-5 rounded-xl border border-app-border bg-app-bg-muted p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-app-muted">Chain Timeline</p>
                        <div className="mt-3 space-y-2 text-sm text-app-text">
                            <TimelineRow label="Buy: AWP | Asiimov" value="- $410" tone="negative" />
                            <TimelineRow label="Trade-up Batch #07" value="+ $250" tone="neutral" />
                            <TimelineRow label="Sell: AK | Redline" value="+ $560" tone="positive" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function TimelineVisual() {
    return (
        <div className="rounded-2xl border border-app-border bg-app-card p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-app-muted">Linked Transactions</p>
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
        <div className="rounded-2xl border border-app-border bg-app-card p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-app-muted">Open Positions</p>
            <div className="mt-4 overflow-hidden rounded-lg border border-app-border">
                <table className="min-w-full text-sm">
                    <thead className="bg-app-bg-muted text-left text-app-muted">
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
        <div className="rounded-2xl border border-app-border bg-app-card p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-app-muted">Analytics Snapshot</p>
            <div className="mt-4 grid grid-cols-2 gap-3">
                <ChartCard label="Win Rate" value="67%" />
                <ChartCard label="Avg Chain ROI" value="+9.8%" />
                <ChartCard label="Trades Closed" value="43" />
                <ChartCard label="Avg Hold Time" value="11d" />
            </div>
            <div className="mt-4 h-20 rounded-lg border border-app-border bg-app-bg-muted p-3">
                <div className="flex h-full items-end gap-1">
                    {[35, 55, 42, 68, 61, 74, 66].map((height, index) => (
                        <div
                            key={index}
                            className="w-full rounded-sm bg-app-chart"
                            style={{ height: `${height}%` }}
                        />
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
        tone === 'positive'
            ? 'text-app-positive'
            : tone === 'negative'
              ? 'text-app-negative'
              : 'text-app-text';

    return (
        <div className="rounded-lg border border-app-border bg-app-bg-elevated px-3 py-2">
            <p className="text-[11px] uppercase tracking-[0.12em] text-app-muted">{title}</p>
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
        tone === 'positive'
            ? 'text-app-positive'
            : tone === 'negative'
              ? 'text-app-negative'
              : 'text-app-text';

    return (
        <div className="flex items-center justify-between rounded-md border border-app-border bg-app-card px-3 py-2">
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
        <div className="rounded-lg border border-app-border bg-app-bg-elevated px-4 py-3">
            <div className="flex items-center justify-between">
                <p className="font-semibold text-app-text">{title}</p>
                <span className={`text-sm font-semibold ${positive ? 'text-app-positive' : 'text-app-text'}`}>
                    {amount}
                </span>
            </div>
            <p className="mt-1 text-sm text-app-muted">{subtitle}</p>
        </div>
    );
}

function Connector() {
    return (
        <div className="mx-4 h-3 border-l-2 border-dashed" style={{ borderColor: 'var(--color-border)' }} />
    );
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
        <tr className="border-t border-app-border">
            <td className="px-3 py-2 text-app-text">{item}</td>
            <td className="px-3 py-2 text-app-text">{qty}</td>
            <td className="px-3 py-2 text-app-text">{basis}</td>
            <td className="px-3 py-2">
                <span className="rounded bg-app-bg-muted px-2 py-1 text-xs font-medium text-app-muted">{status}</span>
            </td>
        </tr>
    );
}

function ChartCard({ label, value }: { label: string; value: string }) {
    return (
        <div className="rounded-lg border border-app-border bg-app-bg-muted px-3 py-2">
            <p className="text-[11px] uppercase tracking-[0.12em] text-app-muted">{label}</p>
            <p className="mt-1 text-base font-semibold text-app-text">{value}</p>
        </div>
    );
}

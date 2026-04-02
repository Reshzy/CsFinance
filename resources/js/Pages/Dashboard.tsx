import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({
    summary,
}: {
    summary: { invested: number; realized: number; unrealized: number; net: number };
}) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
                        <MetricCard title="Total Invested" value={summary.invested} />
                        <MetricCard title="Realized P/L" value={summary.realized} />
                        <MetricCard title="Unrealized P/L" value={summary.unrealized} />
                        <MetricCard title="Net P/L" value={summary.net} />
                    </div>
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="flex flex-wrap gap-3 p-6 text-gray-900">
                            <Link className="rounded bg-indigo-600 px-4 py-2 text-white" href={route('transactions.index')}>
                                Transactions
                            </Link>
                            <Link className="rounded bg-gray-800 px-4 py-2 text-white" href={route('chains.index')}>
                                Chains Timeline
                            </Link>
                            <Link className="rounded bg-gray-700 px-4 py-2 text-white" href={route('portfolio.index')}>
                                Portfolio
                            </Link>
                            <Link className="rounded bg-gray-600 px-4 py-2 text-white" href={route('analytics.index')}>
                                Analytics
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

function MetricCard({ title, value }: { title: string; value: number }) {
    const tone = value >= 0 ? 'text-green-600' : 'text-red-600';
    return (
        <div className="rounded bg-white p-4 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-gray-500">{title}</p>
            <p className={`mt-2 text-2xl font-semibold ${tone}`}>${value.toFixed(2)}</p>
        </div>
    );
}

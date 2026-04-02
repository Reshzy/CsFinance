import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

type Summary = { invested: number; realized: number; unrealized: number; net: number };

export default function Index({
    summary,
    transaction_count,
}: {
    summary: Summary;
    transaction_count: number;
}) {
    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold">Analytics</h2>}>
            <Head title="Analytics" />
            <div className="mx-auto max-w-6xl py-8 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                    <Card title="Total Invested" value={summary.invested} />
                    <Card title="Realized P/L" value={summary.realized} />
                    <Card title="Unrealized P/L" value={summary.unrealized} />
                    <Card title="Net P/L" value={summary.net} />
                </div>
                <p className="mt-4 text-sm text-gray-600">Transactions tracked: {transaction_count}</p>
            </div>
        </AuthenticatedLayout>
    );
}

function Card({ title, value }: { title: string; value: number }) {
    const tone = value >= 0 ? 'text-green-600' : 'text-red-600';
    return (
        <div className="rounded bg-white p-4 shadow">
            <p className="text-xs uppercase tracking-wide text-gray-500">{title}</p>
            <p className={`mt-2 text-2xl font-semibold ${tone}`}>${value.toFixed(2)}</p>
        </div>
    );
}

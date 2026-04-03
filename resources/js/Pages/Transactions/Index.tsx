import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

type TransactionRow = {
    id: number;
    type: string;
    executed_at: string;
    chain: string | null;
    parent_transaction_id: number | null;
    total_value: number;
    fee: number;
};

export default function Index({
    transactions,
}: {
    transactions: { data: TransactionRow[] };
}) {
    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold">Transactions</h2>}>
            <Head title="Transactions" />
            <div className="mx-auto max-w-7xl py-8 sm:px-6 lg:px-8">
                <div className="mb-4">
                    <Link
                        href={route('transactions.create')}
                        className="rounded bg-indigo-600 px-4 py-2 text-white"
                    >
                        New Transaction
                    </Link>
                </div>
                <div className="overflow-hidden rounded bg-white shadow">
                    <table className="min-w-full text-sm">
                        <thead>
                            <tr className="border-b text-left">
                                <th className="p-3">Type</th>
                                <th className="p-3">Date</th>
                                <th className="p-3">Chain</th>
                                <th className="p-3">Total</th>
                                <th className="p-3">Fee</th>
                                <th className="p-3">Link</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.data.map((row) => (
                                <tr key={row.id} className="border-b">
                                    <td className="p-3 capitalize">{row.type}</td>
                                    <td className="p-3">{row.executed_at}</td>
                                    <td className="p-3">{row.chain ?? '-'}</td>
                                    <td className="p-3">${row.total_value.toFixed(2)}</td>
                                    <td className="p-3">${row.fee.toFixed(2)}</td>
                                    <td className="p-3">
                                        <Link
                                            className="text-indigo-600"
                                            href={route('transactions.show', row.id)}
                                        >
                                            View
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

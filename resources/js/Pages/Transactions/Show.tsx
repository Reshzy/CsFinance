import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

type Transaction = {
    id: number;
    type: string;
    executed_at: string;
    fee: number;
    note: string | null;
    total_value: number;
    chain: { id: number; title: string };
    parent_transaction_id: number | null;
    lines: Array<{
        id: number;
        item: string;
        direction: string;
        qty: number;
        unit_price: number;
        subtotal: number;
    }>;
};

export default function Show({ transaction }: { transaction: Transaction }) {
    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold">Transaction #{transaction.id}</h2>}>
            <Head title={`Transaction ${transaction.id}`} />
            <div className="mx-auto max-w-4xl py-8 sm:px-6 lg:px-8">
                <div className="rounded bg-white p-6 shadow">
                    <div className="mb-4 grid grid-cols-2 gap-2 text-sm">
                        <p>Type: {transaction.type}</p>
                        <p>Date: {transaction.executed_at}</p>
                        <p>Chain: {transaction.chain?.title ?? '-'}</p>
                        <p>Parent: {transaction.parent_transaction_id ?? '-'}</p>
                        <p>Fee: ${transaction.fee.toFixed(2)}</p>
                        <p>Total: ${transaction.total_value.toFixed(2)}</p>
                    </div>
                    {transaction.note && <p className="mb-4 text-sm text-gray-700">{transaction.note}</p>}
                    <table className="min-w-full text-sm">
                        <thead>
                            <tr className="border-b text-left">
                                <th className="p-2">Item</th>
                                <th className="p-2">Direction</th>
                                <th className="p-2">Qty</th>
                                <th className="p-2">Unit</th>
                                <th className="p-2">Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transaction.lines.map((line) => (
                                <tr key={line.id} className="border-b">
                                    <td className="p-2">{line.item}</td>
                                    <td className="p-2">{line.direction}</td>
                                    <td className="p-2">{line.qty}</td>
                                    <td className="p-2">${line.unit_price.toFixed(2)}</td>
                                    <td className="p-2">${line.subtotal.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

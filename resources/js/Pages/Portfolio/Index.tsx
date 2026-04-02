import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

type Position = { item_id: number; item_name: string; qty: number };

export default function Index({ positions }: { positions: Position[] }) {
    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold">Portfolio</h2>}>
            <Head title="Portfolio" />
            <div className="mx-auto max-w-6xl py-8 sm:px-6 lg:px-8">
                <div className="rounded bg-white p-6 shadow">
                    <table className="min-w-full text-sm">
                        <thead>
                            <tr className="border-b text-left">
                                <th className="p-2">Item</th>
                                <th className="p-2">Net Qty</th>
                            </tr>
                        </thead>
                        <tbody>
                            {positions.map((position) => (
                                <tr key={position.item_id} className="border-b">
                                    <td className="p-2">{position.item_name}</td>
                                    <td className="p-2">{position.qty}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

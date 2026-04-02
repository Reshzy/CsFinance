import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

type Chain = {
    id: number;
    title: string;
    strategy: string | null;
    status: string;
    started_at: string | null;
    transactions_count: number;
};

export default function Index({ chains }: { chains: Chain[] }) {
    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold">Investment Chains</h2>}>
            <Head title="Chains" />
            <div className="mx-auto max-w-7xl py-8 sm:px-6 lg:px-8">
                <div className="overflow-hidden rounded bg-white shadow">
                    <table className="min-w-full text-sm">
                        <thead>
                            <tr className="border-b text-left">
                                <th className="p-3">Title</th>
                                <th className="p-3">Strategy</th>
                                <th className="p-3">Status</th>
                                <th className="p-3">Started</th>
                                <th className="p-3">Events</th>
                                <th className="p-3"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {chains.map((chain) => (
                                <tr key={chain.id} className="border-b">
                                    <td className="p-3">{chain.title}</td>
                                    <td className="p-3">{chain.strategy ?? '-'}</td>
                                    <td className="p-3">{chain.status}</td>
                                    <td className="p-3">{chain.started_at ?? '-'}</td>
                                    <td className="p-3">{chain.transactions_count}</td>
                                    <td className="p-3">
                                        <Link href={route('chains.show', chain.id)} className="text-indigo-600">
                                            Timeline
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

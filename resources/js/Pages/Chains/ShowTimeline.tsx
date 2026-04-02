import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

type TimelineEntry = {
    id: number;
    parent_transaction_id: number | null;
    type: string;
    executed_at: string;
    in_value: number;
    out_value: number;
    fee: number;
    delta: number;
    running_value: number;
    note: string | null;
};

export default function ShowTimeline({
    chain,
    timeline,
}: {
    chain: { id: number; title: string; strategy: string | null };
    timeline: TimelineEntry[];
}) {
    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold">{chain.title} Timeline</h2>}>
            <Head title={`${chain.title} Timeline`} />
            <div className="mx-auto max-w-6xl py-8 sm:px-6 lg:px-8">
                <div className="rounded bg-white p-6 shadow">
                    <p className="mb-4 text-sm text-gray-600">Strategy: {chain.strategy ?? '-'}</p>
                    <div className="space-y-3">
                        {timeline.map((event) => (
                            <div key={event.id} className="rounded border p-3">
                                <div className="mb-2 flex flex-wrap items-center gap-3 text-sm">
                                    <span className="rounded bg-gray-100 px-2 py-1">#{event.id}</span>
                                    <span className="capitalize">{event.type}</span>
                                    <span>{event.executed_at}</span>
                                    {event.parent_transaction_id && (
                                        <span className="rounded bg-indigo-100 px-2 py-1 text-indigo-700">
                                            Linked to #{event.parent_transaction_id}
                                        </span>
                                    )}
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <p>In: ${event.in_value.toFixed(2)}</p>
                                    <p>Out: ${event.out_value.toFixed(2)}</p>
                                    <p>Fee: ${event.fee.toFixed(2)}</p>
                                    <p>Delta: ${event.delta.toFixed(2)}</p>
                                    <p className="col-span-2">
                                        Running Value: ${event.running_value.toFixed(2)}
                                    </p>
                                </div>
                                {event.note && <p className="mt-2 text-sm text-gray-700">{event.note}</p>}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

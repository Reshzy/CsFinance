import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import { Head, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';

type Option = { id: number; title?: string; name?: string; type?: string; executed_at?: string };
type Line = { item_id: number; direction: 'in' | 'out'; qty: number; unit_price: number };

export default function Create({
    chains,
    items,
    existingTransactions,
}: {
    chains: Option[];
    items: Option[];
    existingTransactions: Option[];
}) {
    const { data, setData, post, processing, errors } = useForm<{
        chain_id: number | '';
        parent_transaction_id: number | '';
        type: 'buy' | 'sell' | 'trade' | 'tradeup';
        executed_at: string;
        fee: number;
        note: string;
        lines: Line[];
    }>({
        chain_id: '',
        parent_transaction_id: '',
        type: 'buy',
        executed_at: new Date().toISOString().slice(0, 16),
        fee: 0,
        note: '',
        lines: [{ item_id: items[0]?.id ?? 0, direction: 'out', qty: 1, unit_price: 0 }],
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        post(route('transactions.store'));
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold">New Transaction</h2>}>
            <Head title="New Transaction" />
            <div className="mx-auto max-w-3xl py-8 sm:px-6 lg:px-8">
                <form onSubmit={submit} className="space-y-4 rounded bg-white p-6 shadow">
                    <div>
                        <label className="mb-1 block text-sm">Chain</label>
                        <select
                            className="w-full rounded border"
                            value={data.chain_id}
                            onChange={(e) => setData('chain_id', Number(e.target.value))}
                        >
                            <option value="">Select chain</option>
                            {chains.map((chain) => (
                                <option key={chain.id} value={chain.id}>
                                    {chain.title}
                                </option>
                            ))}
                        </select>
                        <InputError message={errors.chain_id} />
                    </div>
                    <div>
                        <label className="mb-1 block text-sm">Parent transaction (optional)</label>
                        <select
                            className="w-full rounded border"
                            value={data.parent_transaction_id}
                            onChange={(e) =>
                                setData(
                                    'parent_transaction_id',
                                    e.target.value ? Number(e.target.value) : '',
                                )
                            }
                        >
                            <option value="">None</option>
                            {existingTransactions.map((tx) => (
                                <option key={tx.id} value={tx.id}>
                                    #{tx.id} {tx.type} {tx.executed_at}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="mb-1 block text-sm">Type</label>
                            <select
                                className="w-full rounded border"
                                value={data.type}
                                onChange={(e) =>
                                    setData(
                                        'type',
                                        e.target.value as 'buy' | 'sell' | 'trade' | 'tradeup',
                                    )
                                }
                            >
                                <option value="buy">buy</option>
                                <option value="sell">sell</option>
                                <option value="trade">trade</option>
                                <option value="tradeup">tradeup</option>
                            </select>
                        </div>
                        <div>
                            <label className="mb-1 block text-sm">Executed at</label>
                            <input
                                type="datetime-local"
                                className="w-full rounded border"
                                value={data.executed_at}
                                onChange={(e) => setData('executed_at', e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="mb-1 block text-sm">Fee</label>
                            <input
                                type="number"
                                step="0.01"
                                className="w-full rounded border"
                                value={data.fee}
                                onChange={(e) => setData('fee', Number(e.target.value))}
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-sm">Note</label>
                            <input
                                className="w-full rounded border"
                                value={data.note}
                                onChange={(e) => setData('note', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-sm font-semibold">Lines</h3>
                        {data.lines.map((line, index) => (
                            <div key={index} className="grid grid-cols-4 gap-2">
                                <select
                                    className="rounded border"
                                    value={line.item_id}
                                    onChange={(e) => {
                                        const next = [...data.lines];
                                        next[index].item_id = Number(e.target.value);
                                        setData('lines', next);
                                    }}
                                >
                                    {items.map((item) => (
                                        <option key={item.id} value={item.id}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                                <select
                                    className="rounded border"
                                    value={line.direction}
                                    onChange={(e) => {
                                        const next = [...data.lines];
                                        next[index].direction = e.target.value as 'in' | 'out';
                                        setData('lines', next);
                                    }}
                                >
                                    <option value="in">in</option>
                                    <option value="out">out</option>
                                </select>
                                <input
                                    type="number"
                                    min="1"
                                    className="rounded border"
                                    value={line.qty}
                                    onChange={(e) => {
                                        const next = [...data.lines];
                                        next[index].qty = Number(e.target.value);
                                        setData('lines', next);
                                    }}
                                />
                                <input
                                    type="number"
                                    step="0.01"
                                    className="rounded border"
                                    value={line.unit_price}
                                    onChange={(e) => {
                                        const next = [...data.lines];
                                        next[index].unit_price = Number(e.target.value);
                                        setData('lines', next);
                                    }}
                                />
                            </div>
                        ))}
                        <button
                            type="button"
                            className="rounded border px-3 py-1"
                            onClick={() =>
                                setData('lines', [
                                    ...data.lines,
                                    {
                                        item_id: items[0]?.id ?? 0,
                                        direction: 'out',
                                        qty: 1,
                                        unit_price: 0,
                                    },
                                ])
                            }
                        >
                            Add Line
                        </button>
                    </div>

                    <button
                        disabled={processing}
                        className="rounded bg-indigo-600 px-4 py-2 text-white disabled:opacity-50"
                    >
                        Save
                    </button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}

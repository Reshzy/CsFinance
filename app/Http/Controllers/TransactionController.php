<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTransactionRequest;
use App\Models\InvestmentChain;
use App\Models\Item;
use App\Models\Transaction;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class TransactionController extends Controller
{
    public function index(): Response
    {
        $transactions = Transaction::query()
            ->where('user_id', auth()->id())
            ->with(['chain:id,title', 'parentTransaction:id', 'lines.item:id,name'])
            ->orderByDesc('executed_at')
            ->paginate(20)
            ->through(fn (Transaction $transaction) => [
                'id' => $transaction->id,
                'type' => $transaction->type,
                'executed_at' => $transaction->executed_at?->toDateTimeString(),
                'chain' => $transaction->chain?->title,
                'parent_transaction_id' => $transaction->parent_transaction_id,
                'total_value' => (float) $transaction->total_value,
                'fee' => (float) $transaction->fee,
            ]);

        return Inertia::render('Transactions/Index', [
            'transactions' => $transactions,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Transactions/Create', [
            'chains' => InvestmentChain::query()
                ->where('user_id', auth()->id())
                ->orderByDesc('started_at')
                ->get(['id', 'title']),
            'items' => Item::query()
                ->where('user_id', auth()->id())
                ->orderBy('name')
                ->get(['id', 'name']),
            'existingTransactions' => Transaction::query()
                ->where('user_id', auth()->id())
                ->orderByDesc('executed_at')
                ->limit(100)
                ->get(['id', 'type', 'executed_at']),
        ]);
    }

    public function store(StoreTransactionRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $chain = InvestmentChain::query()
            ->where('id', $validated['chain_id'])
            ->where('user_id', auth()->id())
            ->firstOrFail();

        $itemIds = collect($validated['lines'])->pluck('item_id')->all();
        $ownedItemIds = Item::query()
            ->where('user_id', auth()->id())
            ->whereIn('id', $itemIds)
            ->pluck('id')
            ->all();
        abort_if(count($ownedItemIds) !== count(array_unique($itemIds)), 403);

        DB::transaction(function () use ($validated, $chain) {
            $transaction = Transaction::query()->create([
                'user_id' => auth()->id(),
                'chain_id' => $chain->id,
                'parent_transaction_id' => $validated['parent_transaction_id'] ?? null,
                'type' => $validated['type'],
                'executed_at' => $validated['executed_at'],
                'fee' => $validated['fee'] ?? 0,
                'note' => $validated['note'] ?? null,
                'total_value' => 0,
            ]);

            $total = 0.0;
            foreach ($validated['lines'] as $line) {
                $subtotal = (float) $line['qty'] * (float) $line['unit_price'];
                $total += $subtotal;

                $transaction->lines()->create([
                    'item_id' => $line['item_id'],
                    'direction' => $line['direction'],
                    'qty' => $line['qty'],
                    'unit_price' => $line['unit_price'],
                    'subtotal' => $subtotal,
                ]);
            }

            $transaction->update([
                'total_value' => round($total, 2),
            ]);
        });

        return redirect()->route('transactions.index');
    }

    public function show(Transaction $transaction): Response
    {
        abort_if($transaction->user_id !== auth()->id(), 403);
        $transaction->load(['chain:id,title', 'parentTransaction:id', 'lines.item:id,name']);

        return Inertia::render('Transactions/Show', [
            'transaction' => [
                'id' => $transaction->id,
                'type' => $transaction->type,
                'executed_at' => $transaction->executed_at?->toDateTimeString(),
                'fee' => (float) $transaction->fee,
                'note' => $transaction->note,
                'total_value' => (float) $transaction->total_value,
                'chain' => $transaction->chain,
                'parent_transaction_id' => $transaction->parent_transaction_id,
                'lines' => $transaction->lines->map(fn ($line) => [
                    'id' => $line->id,
                    'item' => $line->item?->name,
                    'direction' => $line->direction,
                    'qty' => $line->qty,
                    'unit_price' => (float) $line->unit_price,
                    'subtotal' => (float) $line->subtotal,
                ])->all(),
            ],
        ]);
    }
}

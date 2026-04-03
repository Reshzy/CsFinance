<?php

namespace App\Http\Controllers;

use App\Models\TransactionLine;
use Inertia\Inertia;
use Inertia\Response;

class PortfolioController extends Controller
{
    public function index(): Response
    {
        $positions = TransactionLine::query()
            ->selectRaw('item_id, SUM(CASE WHEN direction = "in" THEN qty ELSE -qty END) as net_qty')
            ->whereHas('transaction', fn ($query) => $query->where('user_id', auth()->id()))
            ->with('item:id,name')
            ->groupBy('item_id')
            ->havingRaw('SUM(CASE WHEN direction = "in" THEN qty ELSE -qty END) > 0')
            ->get()
            ->map(fn (TransactionLine $line) => [
                'item_id' => $line->item_id,
                'item_name' => $line->item?->name,
                'qty' => (int) $line->net_qty,
            ]);

        return Inertia::render('Portfolio/Index', [
            'positions' => $positions,
        ]);
    }
}

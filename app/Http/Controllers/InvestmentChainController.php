<?php

namespace App\Http\Controllers;

use App\Models\InvestmentChain;
use App\Services\ChainTimelineBuilder;
use Inertia\Inertia;
use Inertia\Response;

class InvestmentChainController extends Controller
{
    public function index(): Response
    {
        $chains = InvestmentChain::query()
            ->where('user_id', auth()->id())
            ->withCount('transactions')
            ->orderByDesc('started_at')
            ->get()
            ->map(fn (InvestmentChain $chain) => [
                'id' => $chain->id,
                'title' => $chain->title,
                'strategy' => $chain->strategy,
                'status' => $chain->status,
                'started_at' => $chain->started_at?->toDateTimeString(),
                'transactions_count' => $chain->transactions_count,
            ]);

        return Inertia::render('Chains/Index', [
            'chains' => $chains,
        ]);
    }

    public function show(InvestmentChain $chain, ChainTimelineBuilder $timelineBuilder): Response
    {
        abort_if($chain->user_id !== auth()->id(), 403);
        $chain->load(['transactions.lines', 'transactions.parentTransaction']);

        return Inertia::render('Chains/ShowTimeline', [
            'chain' => [
                'id' => $chain->id,
                'title' => $chain->title,
                'strategy' => $chain->strategy,
                'status' => $chain->status,
                'started_at' => $chain->started_at?->toDateTimeString(),
            ],
            'timeline' => $timelineBuilder->build($chain),
        ]);
    }
}

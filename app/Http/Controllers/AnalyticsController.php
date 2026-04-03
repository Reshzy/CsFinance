<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Services\PnlCalculator;
use Inertia\Inertia;
use Inertia\Response;

class AnalyticsController extends Controller
{
    public function index(PnlCalculator $pnlCalculator): Response
    {
        $transactions = Transaction::query()
            ->where('user_id', auth()->id())
            ->with('lines')
            ->orderBy('executed_at')
            ->get();

        return Inertia::render('Analytics/Index', [
            'summary' => $pnlCalculator->summarize($transactions),
            'transaction_count' => $transactions->count(),
        ]);
    }
}

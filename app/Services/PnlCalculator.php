<?php

namespace App\Services;

use App\Models\Transaction;
use App\Models\TransactionLine;
use Illuminate\Support\Collection;

class PnlCalculator
{
    /**
     * @param Collection<int, Transaction> $transactions
     * @return array{invested: float, realized: float, unrealized: float, net: float}
     */
    public function summarize(Collection $transactions): array
    {
        $invested = 0.0;
        $realized = 0.0;
        $unrealized = 0.0;

        foreach ($transactions as $transaction) {
            $in = $transaction->lines
                ->where('direction', 'in')
                ->sum(fn (TransactionLine $line) => (float) $line->subtotal);
            $out = $transaction->lines
                ->where('direction', 'out')
                ->sum(fn (TransactionLine $line) => (float) $line->subtotal);
            $fee = (float) $transaction->fee;

            if ($transaction->type === 'buy') {
                $invested += $out + $fee;
            }

            if ($transaction->type === 'sell') {
                $realized += ($in - $out) - $fee;
            }

            if (in_array($transaction->type, ['trade', 'tradeup'], true)) {
                $unrealized += $in - $out;
            }
        }

        return [
            'invested' => round($invested, 2),
            'realized' => round($realized, 2),
            'unrealized' => round($unrealized, 2),
            'net' => round($realized + $unrealized, 2),
        ];
    }
}

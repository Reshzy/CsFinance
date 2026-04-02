<?php

namespace App\Services;

use App\Models\InvestmentChain;

class ChainTimelineBuilder
{
    /**
     * @return array<int, array<string, mixed>>
     */
    public function build(InvestmentChain $chain): array
    {
        $runningValue = 0.0;

        return $chain->transactions
            ->sortBy('executed_at')
            ->values()
            ->map(function ($transaction) use (&$runningValue) {
                $in = (float) $transaction->lines->where('direction', 'in')->sum('subtotal');
                $out = (float) $transaction->lines->where('direction', 'out')->sum('subtotal');
                $delta = $in - $out - (float) $transaction->fee;
                $runningValue += $delta;

                return [
                    'id' => $transaction->id,
                    'parent_transaction_id' => $transaction->parent_transaction_id,
                    'type' => $transaction->type,
                    'executed_at' => $transaction->executed_at?->toIso8601String(),
                    'in_value' => round($in, 2),
                    'out_value' => round($out, 2),
                    'fee' => (float) $transaction->fee,
                    'delta' => round($delta, 2),
                    'running_value' => round($runningValue, 2),
                    'note' => $transaction->note,
                ];
            })
            ->all();
    }
}

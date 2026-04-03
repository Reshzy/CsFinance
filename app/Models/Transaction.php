<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'chain_id',
        'parent_transaction_id',
        'type',
        'executed_at',
        'fee',
        'total_value',
        'note',
    ];

    protected function casts(): array
    {
        return [
            'executed_at' => 'datetime',
            'fee' => 'decimal:2',
            'total_value' => 'decimal:2',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function chain(): BelongsTo
    {
        return $this->belongsTo(InvestmentChain::class, 'chain_id');
    }

    public function parentTransaction(): BelongsTo
    {
        return $this->belongsTo(Transaction::class, 'parent_transaction_id');
    }

    public function lines(): HasMany
    {
        return $this->hasMany(TransactionLine::class);
    }
}

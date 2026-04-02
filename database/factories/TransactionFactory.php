<?php

namespace Database\Factories;

use App\Models\InvestmentChain;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Transaction>
 */
class TransactionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'chain_id' => InvestmentChain::factory(),
            'parent_transaction_id' => null,
            'type' => fake()->randomElement(['buy', 'sell', 'trade', 'tradeup']),
            'executed_at' => now(),
            'fee' => fake()->randomFloat(2, 0, 50),
            'total_value' => fake()->randomFloat(2, 10, 1000),
            'note' => fake()->optional()->sentence(),
        ];
    }
}

<?php

namespace Database\Factories;

use App\Models\Item;
use App\Models\Transaction;
use App\Models\TransactionLine;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<TransactionLine>
 */
class TransactionLineFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $qty = fake()->numberBetween(1, 3);
        $unit = fake()->randomFloat(2, 5, 500);

        return [
            'transaction_id' => Transaction::factory(),
            'item_id' => Item::factory(),
            'direction' => fake()->randomElement(['in', 'out']),
            'qty' => $qty,
            'unit_price' => $unit,
            'subtotal' => round($qty * $unit, 2),
        ];
    }
}

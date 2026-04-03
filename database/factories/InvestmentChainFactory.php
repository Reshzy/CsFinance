<?php

namespace Database\Factories;

use App\Models\InvestmentChain;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<InvestmentChain>
 */
class InvestmentChainFactory extends Factory
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
            'title' => fake()->sentence(3),
            'strategy' => fake()->randomElement(['Flip', 'Trade', 'Trade-Up']),
            'started_at' => now(),
            'status' => fake()->randomElement(['open', 'closed']),
        ];
    }
}

<?php

namespace Database\Factories;

use App\Models\Item;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Item>
 */
class ItemFactory extends Factory
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
            'name' => fake()->words(2, true),
            'game' => 'counter-strike',
            'rarity' => fake()->randomElement(['Consumer', 'Industrial', 'Mil-Spec', 'Restricted']),
            'wear' => fake()->randomElement(['Factory New', 'Minimal Wear', 'Field-Tested']),
            'notes' => fake()->optional()->sentence(),
        ];
    }
}

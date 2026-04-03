<?php

use App\Models\InvestmentChain;
use App\Models\Item;
use App\Models\Transaction;
use App\Models\User;

test('authenticated users can create a transaction with linked line items', function () {
    $user = User::factory()->create();
    $chain = InvestmentChain::factory()->create([
        'user_id' => $user->id,
        'status' => 'open',
    ]);
    $item = Item::factory()->create([
        'user_id' => $user->id,
    ]);

    $response = $this->actingAs($user)->post(route('transactions.store'), [
        'chain_id' => $chain->id,
        'parent_transaction_id' => null,
        'type' => 'buy',
        'executed_at' => now()->toISOString(),
        'fee' => 5,
        'note' => 'Initial entry',
        'lines' => [
            [
                'item_id' => $item->id,
                'direction' => 'out',
                'qty' => 1,
                'unit_price' => 150,
            ],
        ],
    ]);

    $response->assertRedirect(route('transactions.index'));
    $this->assertDatabaseCount('transactions', 1);
    $this->assertDatabaseHas('transaction_lines', [
        'item_id' => $item->id,
        'direction' => 'out',
        'qty' => 1,
    ]);
});

test('users cannot create transaction using another users item', function () {
    $user = User::factory()->create();
    $otherUser = User::factory()->create();

    $chain = InvestmentChain::factory()->create([
        'user_id' => $user->id,
    ]);
    $foreignItem = Item::factory()->create([
        'user_id' => $otherUser->id,
    ]);

    $this->actingAs($user)->post(route('transactions.store'), [
        'chain_id' => $chain->id,
        'type' => 'buy',
        'executed_at' => now()->toISOString(),
        'lines' => [
            [
                'item_id' => $foreignItem->id,
                'direction' => 'out',
                'qty' => 1,
                'unit_price' => 80,
            ],
        ],
    ])->assertForbidden();
});

test('analytics page can be opened and returns summary payload', function () {
    $user = User::factory()->create();
    $chain = InvestmentChain::factory()->create([
        'user_id' => $user->id,
    ]);
    $item = Item::factory()->create([
        'user_id' => $user->id,
    ]);
    $buy = Transaction::factory()->create([
        'user_id' => $user->id,
        'chain_id' => $chain->id,
        'type' => 'buy',
        'fee' => 0,
    ]);
    $buy->lines()->create([
        'item_id' => $item->id,
        'direction' => 'out',
        'qty' => 1,
        'unit_price' => 100,
        'subtotal' => 100,
    ]);

    $this->actingAs($user)
        ->get(route('analytics.index'))
        ->assertOk();
});

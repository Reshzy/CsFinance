<?php

use Inertia\Testing\AssertableInertia;

it('returns a successful response', function () {
    $response = $this->get('/');

    $response->assertStatus(200);
});

it('renders the welcome inertia page', function () {
    $this->get('/')
        ->assertOk()
        ->assertInertia(fn (AssertableInertia $page) => $page
            ->component('Welcome'));
});

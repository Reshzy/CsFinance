<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('chain_id')->constrained('investment_chains')->cascadeOnDelete();
            $table->foreignId('parent_transaction_id')->nullable()->constrained('transactions')->nullOnDelete();
            $table->string('type');
            $table->timestamp('executed_at');
            $table->decimal('fee', 12, 2)->default(0);
            $table->decimal('total_value', 14, 2)->default(0);
            $table->text('note')->nullable();
            $table->timestamps();

            $table->index(['user_id', 'chain_id', 'executed_at']);
            $table->index(['user_id', 'type', 'executed_at']);
            $table->index(['parent_transaction_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};

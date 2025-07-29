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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('order_number')->unique()->nullable();
            $table->unsignedTinyInteger('order_type')->comment('0 = dine-in, 1 = takeout, 2 = delivery, 3 = check-in, 4 = checkout');
            $table->unsignedTinyInteger('discount_type')->nullable()->comment('0 = none, 1 = senior, 2 = PWD, 3 = promo');
            $table->string('discount_id_number')->nullable();
            $table->decimal('discount_amount', 10, 2)->default(0);
            $table->decimal('subtotal', 10, 2);
            $table->decimal('total', 10, 2);
            $table->decimal('tax_amount', 10, 2)->default(0);
            $table->unsignedTinyInteger('payment_method')->comment('0 = cash, 1 = card, 2 = e-wallet');
            $table->unsignedTinyInteger('status')->default(0)->comment('0 = preparing, 1 = ready, 2 = completed, 3 = cancelled');
            $table->text('notes')->nullable();
            $table->foreignId('branch_id')->constrained()->onDelete('cascade');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};

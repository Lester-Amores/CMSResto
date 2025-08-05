<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Order;
use App\Models\Meal;
use App\Models\Branch;
use Carbon\Carbon;

class OrderSeeder extends Seeder
{
    public function run(): void
    {
        $branches = Branch::all();
        $meals = Meal::all();

        if ($branches->isEmpty() || $meals->isEmpty()) {
            $this->command->warn('⚠️ No branches or meals found. Seed them first.');
            return;
        }

        $totalOrders = 300000;
        $batchSize = 1000;

        $this->command->info("🚀 Seeding $totalOrders orders in batches of $batchSize...");

        for ($i = 0; $i < $totalOrders; $i += $batchSize) {
            DB::beginTransaction();
            try {
                for ($j = 0; $j < $batchSize; $j++) {
                    $branch = $branches->random();

                    $startDate = Carbon::now()->subYear()->startOfMonth();
                    $endDate = Carbon::now();
                    $createdAt = Carbon::createFromTimestamp(
                        rand($startDate->timestamp, $endDate->timestamp)
                    )->setTime(rand(8, 22), rand(0, 59));


                    $order = Order::create([
                        'order_type' => rand(0, 2),
                        'discount_type' => rand(0, 3),
                        'discount_id_number' => null,
                        'discount_amount' => rand(0, 1) ? rand(5, 50) : 0,
                        'subtotal' => rand(100, 500),
                        'total' => rand(100, 500),
                        'payment_method' => rand(0, 2),
                        'status' => rand(0, 3),
                        'notes' => rand(0, 1) ? 'Sample note for order' : null,
                        'branch_id' => $branch->id,
                        'created_at' => $createdAt,
                        'updated_at' => $createdAt,
                    ]);

                    $order->update([
                        'order_number' => 'ORD-' . str_pad($order->id, 6, '0', STR_PAD_LEFT),
                    ]);

                    $selectedMeals = $meals->random(rand(1, 3));
                    foreach ($selectedMeals as $meal) {
                        $quantity = rand(1, 3);
                        $price = $meal->price ?? rand(50, 150);
                        $order->meals()->attach($meal->id, [
                            'quantity' => $quantity,
                            'price' => $price,
                            'total' => $price * $quantity,
                        ]);
                    }
                }
                DB::commit();
                $this->command->info("✅ Seeded batch starting at #$i");
            } catch (\Exception $e) {
                DB::rollBack();
                $this->command->error("❌ Failed at batch #$i: " . $e->getMessage());
                break;
            }
        }

        $this->command->info("🎉 Done seeding $totalOrders orders.");
    }
}

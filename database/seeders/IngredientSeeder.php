<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Ingredient;
use App\Models\Unit;
use App\Models\Branch;

class IngredientSeeder extends Seeder
{
    public function run(): void
    {
        // Step 1: Ensure Units exist
        $units = [
            'kg',
            'g',
            'liter',
            'ml',
            'pcs',
            'dozen',
            'pack',
            'bottle'
        ];

        $unitIds = [];

        foreach ($units as $unitName) {
            $unit = Unit::firstOrCreate(['name' => $unitName], ['description' => ucfirst($unitName)]);
            $unitIds[$unitName] = $unit->id;
        }

        $branchIds = Branch::pluck('id')->toArray();
        if (empty($branchIds)) {
            $this->command->warn('No branches found. Please seed branches first.');
            return;
        }

        $ingredients = [
            ['name' => 'Ribeye Steak', 'unit' => 'kg', 'cost' => 950, 'qty' => 20],
            ['name' => 'Truffle Oil', 'unit' => 'ml', 'cost' => 150, 'qty' => 250],
            ['name' => 'Parmesan Cheese', 'unit' => 'g', 'cost' => 80, 'qty' => 500],
            ['name' => 'Sourdough Bread', 'unit' => 'pcs', 'cost' => 50, 'qty' => 30],
            ['name' => 'Fresh Basil', 'unit' => 'g', 'cost' => 15, 'qty' => 200],
            ['name' => 'Mozzarella Cheese', 'unit' => 'g', 'cost' => 70, 'qty' => 600],
            ['name' => 'Olive Oil', 'unit' => 'liter', 'cost' => 350, 'qty' => 10],
            ['name' => 'Pink Himalayan Salt', 'unit' => 'g', 'cost' => 25, 'qty' => 400],
            ['name' => 'Black Peppercorn', 'unit' => 'g', 'cost' => 30, 'qty' => 300],
            ['name' => 'Wagyu Beef', 'unit' => 'kg', 'cost' => 2800, 'qty' => 5],
            ['name' => 'Eggs', 'unit' => 'dozen', 'cost' => 90, 'qty' => 15],
            ['name' => 'Butter', 'unit' => 'g', 'cost' => 45, 'qty' => 800],
            ['name' => 'Cream Cheese', 'unit' => 'g', 'cost' => 60, 'qty' => 400],
            ['name' => 'Tomato Sauce', 'unit' => 'ml', 'cost' => 35, 'qty' => 1000],
            ['name' => 'Spaghetti Noodles', 'unit' => 'pack', 'cost' => 60, 'qty' => 120],
            ['name' => 'Soy Sauce', 'unit' => 'bottle', 'cost' => 25, 'qty' => 75],
            ['name' => 'Garlic', 'unit' => 'g', 'cost' => 10, 'qty' => 300],
            ['name' => 'Onion', 'unit' => 'kg', 'cost' => 80, 'qty' => 40],
            ['name' => 'Bell Pepper', 'unit' => 'pcs', 'cost' => 15, 'qty' => 50],
            ['name' => 'Chicken Breast', 'unit' => 'kg', 'cost' => 280, 'qty' => 25],
        ];

        foreach ($ingredients as $ingredient) {
            Ingredient::create([
                'name' => $ingredient['name'],
                'unit_id' => $unitIds[$ingredient['unit']],
                'unit_cost' => $ingredient['cost'],
                'quantity' => $ingredient['qty'],
                'branch_id' => fake()->randomElement($branchIds),
            ]);
        }
    }
}

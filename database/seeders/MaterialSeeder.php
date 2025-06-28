<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Material;
use App\Models\Unit;

class MaterialSeeder extends Seeder
{
    public function run(): void
    {
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

        $materials = [
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
        ];

        foreach ($materials as $material) {
            Material::create([
                'name' => $material['name'],
                'unit_id' => $unitIds[$material['unit']],
                'unit_cost' => $material['cost'],
                'quantity' => $material['qty'],
            ]);
        }
    }
}

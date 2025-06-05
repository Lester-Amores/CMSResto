<?php

namespace Database\Seeders;

use App\Models\Menu;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MenuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $menuNames = [
            'Breakfast',
            'Lunch',
            'Dinner',
            'Drinks',
            'Desserts',
            'Kids',
        ];

        foreach ($menuNames as $name) {
            Menu::factory()->create([
                'name' => $name,
            ]);
        }
    }
}

<?php

namespace Database\Seeders;

use App\Models\Menu;
use Illuminate\Database\Seeder;

class MenuSeeder extends Seeder
{

    public function run(): void
    {
        $mealImages = collect(glob(public_path('images/meals/*')))->map(function ($path) {
            return 'images/meals/' . basename($path);
        })->values();

        $drinkImages = collect(glob(public_path('images/drinks/*')))->map(function ($path) {
            return 'images/drinks/' . basename($path);
        })->values();

        $menuNames = [
            'Breakfast',
            'Lunch',
            'Dinner',
            'Drinks',
            'Desserts',
            'Kids',
        ];

        foreach ($menuNames as $name) {
            $isDrinkType = in_array($name, ['Drinks', 'Desserts']);

            $images = $isDrinkType ? $drinkImages : $mealImages;

            $image = $images->random();

            Menu::factory()->create([
                'name' => $name,
                'img_src' => $image,
            ]);
        }
    }
}

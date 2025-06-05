<?php

namespace Database\Seeders;

use App\Models\Meal;
use App\Models\Menu;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;


class MealSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $menuMeals = config('data.menu_meals');

        $mealImages = collect(glob(public_path('images/meals/*')))->map(function ($path) {
            return 'images/meals/' . basename($path);
        })->values()->all();

        $drinkImages = collect(glob(public_path('images/drinks/*')))->map(function ($path) {
            return 'images/drinks/' . basename($path);
        })->values()->all();


        foreach ($menuMeals as $menuName => &$meals) {
            foreach ($meals as &$meal) {
                if (in_array($menuName, ['Drinks Menu', 'Desserts Menu'])) {
                    $meal['img_src'] = $drinkImages[array_rand($drinkImages)] ?? null;
                } else {
                    $meal['img_src'] = $mealImages[array_rand($mealImages)] ?? null;
                }
            }
        }


        foreach ($menuMeals as $menuName => $meals) {
            $menu = Menu::where('name', $menuName)->first();

            if (!$menu) continue;

            foreach ($meals as $meal) {
                Meal::create([
                    'name' => $meal['name'],
                    'description' => $meal['description'],
                    'price' => $meal['price'],
                    'img_src' => $meal['img_src'],
                    'menu_id' => $menu->id,
                ]);
            }
        }
    }
}

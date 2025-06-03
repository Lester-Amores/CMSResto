<?php

namespace Database\Seeders;

use App\Models\Meal;
use App\Models\Menu;
use Illuminate\Database\Seeder;

class MealSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $menuMeals = config('data.menu_meals');

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

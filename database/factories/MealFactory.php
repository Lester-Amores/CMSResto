<?php

namespace Database\Factories;

use App\Models\Menu;
use App\Models\Meal;
use Illuminate\Database\Eloquent\Factories\Factory;

class MealFactory extends Factory
{
    protected $model = Meal::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->word(),
            'description' => $this->faker->sentence(),
            'price' => $this->faker->numberBetween(50, 500),
            'menu_id' => Menu::factory(),
            'img_url' => $this->faker->imageUrl(),
        ];
    }
}

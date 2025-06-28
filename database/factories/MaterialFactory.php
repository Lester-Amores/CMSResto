<?php

namespace Database\Factories;

use App\Models\Unit;
use Illuminate\Database\Eloquent\Factories\Factory;

class MaterialFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => $this->faker->word(),
            'unit_id' => Unit::inRandomOrder()->first()?->id ?? Unit::factory(),
            'unit_cost' => $this->faker->randomFloat(2, 10, 1000),
            'quantity' => $this->faker->numberBetween(1, 100),
        ];
    }
}

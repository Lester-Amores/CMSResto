<?php

// database/factories/UnitFactory.php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class UnitFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => $this->faker->unique()->randomElement(['gram', 'millilitre', 'piece', 'liter', 'kilogram']),
            'description' => $this->faker->sentence(),
        ];
    }
}

<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class BranchFactory extends Factory
{
    public function definition(): array
    {
        $openingTime = $this->faker->time('H:i:s', '09:00:00');
        $closingTime = $this->faker->time('H:i:s', '22:00:00');

        return [
            'name' => $this->faker->company . ' Branch',
            'address' => $this->faker->streetAddress . ', ' . $this->faker->city,
            'city' => $this->faker->city,
            'province' => $this->faker->state,
            'postal_code' => $this->faker->postcode,
            'phone' => $this->faker->phoneNumber,
            'email' => $this->faker->unique()->safeEmail,
            'latitude' => $this->faker->latitude,
            'longitude' => $this->faker->longitude,
            'manager_name' => $this->faker->name,
            'opening_time' => $openingTime,
            'closing_time' => $closingTime,
            'img_src' => $this->faker->imageUrl(640, 480, 'restaurant', true),
            'notes' => $this->faker->optional()->sentence(),
        ];
    }
}

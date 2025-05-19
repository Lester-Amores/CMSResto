<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Operator>
 */
class OperatorFactory extends Factory
{

    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'last_name' => fake()->lastName(),
            'first_name' => fake()->firstName(),
            'user_id' => User::factory(['role' => user::ROLE_OPERATOR]),
            'branch_id' => User::factory(),
            'birthday' => fake()->date(),
            'started_at' => fake()->date(),
            'phone' => fake()->numerify('09#########'),
        ];
    }
}

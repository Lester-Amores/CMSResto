<?php

namespace Database\Seeders;

use App\Models\Admin;
use App\Models\Branch;
use App\Models\Operator;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class OperatorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::create([
            'email' => 'default@operator.com',
            'password' => Hash::make('password'),
            'role' => 1,
            'remember_token' => Str::random(10),
            'email_verified_at' => now(),
        ]);
    
        Operator::create([
            'first_name' => 'Default',
            'last_name' => 'Operator',
            'user_id' => $user->id,
            'branch_id' => Branch::factory()->create()->id,
            'phone' => '09123456789',
            'birthday' => '1990-01-01',
            'started_at' => '2020-01-01'
        ]);
    }
}

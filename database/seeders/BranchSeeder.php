<?php

namespace Database\Seeders;

use App\Models\Branch;
use Illuminate\Database\Seeder;

class BranchSeeder extends Seeder
{
    public function run(): void
    {
        $branches = [
            ['name' => 'Manila Central', 'address' => 'Manila, NCR'],
            ['name' => 'Cebu City', 'address' => 'Cebu, Visayas'],
            ['name' => 'Davao Downtown', 'address' => 'Davao, Mindanao'],
            ['name' => 'Quezon Avenue', 'address' => 'Quezon City, NCR'],
            ['name' => 'Baguio Hilltop', 'address' => 'Baguio, Benguet'],
        ];

        foreach ($branches as $branch) {
            Branch::create([
                'name' => $branch['name'],
                'address' => $branch['address'],
                'img_src' => null,
            ]);
        }
    }
}

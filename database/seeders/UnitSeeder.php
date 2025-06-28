<?php

// database/seeders/UnitSeeder.php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class UnitSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('units')->insert([
            [
                'name' => 'g',
                'description' => 'Metric unit of mass, commonly used for solids.',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name' => 'ml',
                'description' => 'Metric unit of volume, used for liquids.',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name' => 'pc',
                'description' => 'Individual countable item.',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name' => 'l',
                'description' => 'Larger metric volume unit, typically for liquids.',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name' => 'kl',
                'description' => 'Metric unit equal to 1,000 grams.',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ]);
    }
}

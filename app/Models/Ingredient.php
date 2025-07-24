<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Ingredient extends Model
{
    /** @use HasFactory<\Database\Factories\IngredientsFactory> */
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'unit_id',
        'unit_cost',
        'quantity'
    ];

    public function unit()
    {
        return $this->belongsTo(Unit::class);
    }

    public function meals()
    {
        return $this->belongsToMany(Meal::class)
            ->withPivot('quantity');
    }
}

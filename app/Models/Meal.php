<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Meal extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'description',
        'price',
        'menu_id',
        'img_src',
    ];

    public function menu()
    {
        return $this->belongsTo(Menu::class);
    }

    public function materials()
    {
        return $this->belongsToMany(Material::class)
            ->withPivot('quantity');
    }
}

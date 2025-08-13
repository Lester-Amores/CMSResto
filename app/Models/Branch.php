<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Branch extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'address',
        'city',
        'province',
        'postal_code',
        'phone',
        'email',
        'latitude',
        'longitude',
        'manager_name',
        'opening_time',
        'closing_time',
        'status',
        'capacity',
        'delivery_available',
        'menu_url',
        'img_src',
        'notes',
        'operator_id',
    ];

    public function operators()
    {
        return $this->hasMany(Operator::class);
    }

    public function ingredients()
    {
        return $this->hasMany(Ingredient::class);
    }
}

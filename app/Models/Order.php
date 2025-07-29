<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Order extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'order_number',
        'order_type',
        'discount_type',
        'discount_id_number',
        'discount_amount',
        'subtotal',
        'total',
        'payment_method',
        'status',
        'notes',
        'branch_id',
    ];

    const TYPE_DINE_IN   = 0;
    const TYPE_TAKEOUT   = 1;
    const TYPE_DELIVERY  = 2;
    const TYPE_CHECK_IN  = 3;
    const TYPE_CHECK_OUT = 4;

    const DISCOUNT_NONE   = 0;
    const DISCOUNT_SENIOR = 1;
    const DISCOUNT_PWD    = 2;
    const DISCOUNT_PROMO  = 3;

    const PAYMENT_CASH    = 0;
    const PAYMENT_CARD    = 1;
    const PAYMENT_EWALLET = 2;

    const STATUS_PREPARING = 0;
    const STATUS_READY     = 1;
    const STATUS_COMPLETED = 2;
    const STATUS_CANCELLED = 3;

    public function branch()
    {
        return $this->belongsTo(Branch::class);
    }

    public function meals()
    {
        return $this->belongsToMany(Meal::class, 'order_meal')
            ->withPivot(['quantity', 'price', 'total'])
            ->withTimestamps();
    }
}

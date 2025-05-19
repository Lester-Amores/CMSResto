<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Operator extends Model
{
    /** @use HasFactory<\Database\Factories\OperatorFactory> */
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'last_name',
        'first_name',
        'user_id',
        'branch_id',
        'phone',
        'birthday',
        'started_at'
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function branch(){
        return $this->belongsTo(Branch::class);
    }
}

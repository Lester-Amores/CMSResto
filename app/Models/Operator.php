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
        'birthday',
        'started_At'
    ];

    public function user(){
        return $this->belongTo(User::class);
    }
}

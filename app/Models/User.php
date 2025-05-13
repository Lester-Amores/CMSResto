<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, SoftDeletes;


    public const ROLE_ADMIN = 0;
    public const ROLE_OPERATOR = 1;
    protected $appends = ['name'];

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'email',
        'password',
        'role',
        'status',
        'remember_token',
        'email_verified_at'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }


    public function admin()
    {
        return $this->hasOne(Admin::class);
    }

    public function operator()
    {
        return $this->hasOne(Operator::class);
    }

    public function getNameAttribute()
    {
        switch ((int)$this->role) {
            case self::ROLE_ADMIN:
                return $this->admin ? $this->admin->first_name . ' ' . $this->admin->last_name : '';
            case self::ROLE_OPERATOR:
                return $this->operator ? $this->operator->first_name . ' ' . $this->operator->last_name : '';
            default:
                return '';
        }
    }
}

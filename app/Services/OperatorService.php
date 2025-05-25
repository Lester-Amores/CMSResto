<?php

namespace App\Services;

use App\Models\Operator;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;


class OperatorService
{
    public function getOperator(Request $request)
    {
        $query = Operator::query();

        if ($request->has('search') && !empty($request->search)) {
            $query->where(function ($q) use ($request) {
                $q->where('first_name', 'like', "%{$request->search}%")
                    ->orWhere('last_name', 'like', "%{$request->search}%");
            });
        }


        if ($request->filled('name')) {
            $query->where(function ($q) use ($request) {
                $q->whereRaw("LOWER(first_name) LIKE LOWER(?)", ["%{$request->name}%"])
                    ->orWhereRaw("LOWER(last_name) LIKE LOWER(?)", ["%{$request->name}%"])
                    ->orWhereRaw("LOWER(CONCAT(first_name, ' ', last_name)) LIKE LOWER(?)", ["%{$request->name}%"])
                    ->orWhereRaw("LOWER(CONCAT(last_name, ' ', first_name)) LIKE LOWER(?)", ["%{$request->name}%"]);
            });
        }


        if ($request->filled('email')) {
            $query->whereHas('user', function ($q) use ($request) {
                $q->where('email', 'like', "%{$request->email}%");
            });
        }

        $sortBy = $request->input('sortBy', 'id');
        $sortOrder = $request->filled('sortOrder') ? $request->sortOrder : 'desc';
        if ($sortBy === 'email') {
            $query->join('users', 'operators.user_id', '=', 'users.id')
                ->orderBy('users.email', $sortOrder)
                ->select('operators.*');
        } else {
            $query->orderBy($sortBy, $sortOrder);
        }

        $perPage = $request->input('rowsPerPage', 10);

        return $query->with('user')->paginate($perPage);
    }

    public function createOperator(Request $request)
    {
        $validated = $request->validated();

        if ($request->hasFile('img_src')) {
            $imagePath = $request->file('img_src')->store('uploads/admins', 'public');
        }

        $user = User::create([
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'email_verified_at' => now(),
            'remember_token' => Str::random(10)
        ]);
        Operator::create([
            'last_name' => $validated['last_name'],
            'first_name' => $validated['first_name'],
            'user_id' => $user->id,
            'phone' => $validated['phone'],
            'birthday' => $validated['birthday'],
            'started_at' => $validated['started_at'],
            'img_src' => $imagePath ?? null,
        ]);
    }

    public function updateOperator(Request $request, Operator $operator)
    {
        $validated = $request->validated();

        if ($request->hasFile('img_src')) {
            $imagePath = $request->file('img_src')->store('uploads/admins', 'public');
        }

        $operator->update([
            'first_name' => $validated['first_name'],
            'last_name' => $validated['last_name'],
            'phone' => $validated['phone'],
            'birthday' => $validated['birthday'],
            'started_at' => $validated['started_at'],
            'img_src' => $imagePath,
        ]);

        $operator->user->update([
            'email' => $validated['email'],
            'password' => isset($validated['password'])
                ? Hash::make($validated['password'])
                : $operator->user->password,
        ]);
    }
}

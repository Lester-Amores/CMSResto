<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class RoleMiddleware
{
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        $user = Auth::user();
        \Log::info($user);

        if (!$user) {
            abort(403, 'Unauthorized');
        }

        $roleMap = [
            'admin' => User::ROLE_ADMIN,
            'operator' => User::ROLE_OPERATOR,
        ];

        $allowedRoles = array_map(function ($role) use ($roleMap) {
            return $roleMap[strtolower($role)] ?? null;
        }, $roles);

        if (!in_array((int) $user->role, $allowedRoles, true)) {
            abort(403, 'Unauthorized');
        }

        return $next($request);
    }
}

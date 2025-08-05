<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Show the login page.
     */
    public function create(Request $request): Response|RedirectResponse
    {
        if (Auth::check()) {
            $user = Auth::user();

            $redirectPath = match ($user->role) {
                User::ROLE_ADMIN => route('admin.dashboard'),
                User::ROLE_OPERATOR => route('operator.dashboard'),
                default => '/',
            };

            return redirect()->to($redirectPath);
        }
        return Inertia::render('auth/login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        $request->session()->regenerate();
        $user = Auth::user();
        $redirectPath = match ($user->role) {
            User::ROLE_ADMIN => route('admin.dashboard'),
            User::ROLE_OPERATOR => route('operator.dashboard'),
            default => '/',
        };
        logger()->info('User logged in:', ['id' => Auth::id(), 'email' => Auth::user()->email]);


        return redirect()->intended($redirectPath);
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/login');
    }
}

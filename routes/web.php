<?php

use App\Http\Controllers\AdminController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});


Route::prefix('admin')->middleware(['auth', 'verified'])->group(function(){
    Route::resource('/admins', AdminController::class);
    Route::patch('/admins/restore', [AdminController::class, 'restore'])->name('restore');
    Route::post('/admins/multi-delete', [AdminController::class, 'multiDelete'])->name('multi-delete');
    Route::post('/admins/multi-restore', [AdminController::class, 'multiRestore'])->name('multi-restore');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

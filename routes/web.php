<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\BranchController;
use App\Http\Controllers\IngredientController;
use App\Http\Controllers\MealController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\OperatorController;
use App\Http\Controllers\PublicPageController;
use App\Http\Controllers\UnitController;
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

Route::get('/', [PublicPageController::class, 'home'])->name('home');
Route::get('/about', [PublicPageController::class, 'about'])->name('about');
Route::get('/services', [PublicPageController::class, 'services'])->name('services');
Route::get('/contact', [PublicPageController::class, 'contact'])->name('contact');

Route::prefix('admin')->middleware(['auth', 'verified'])->group(function () {
    Route::resource('/admins', AdminController::class)->except('update');
    Route::post('/admins/{admin}/update', [AdminController::class, 'update'])->name('admins.update');
    Route::post('/admins/multi-delete', [AdminController::class, 'multiDelete'])->name('admins.multi-delete');
    Route::post('/admins/multi-restore', [AdminController::class, 'multiRestore'])->name('admins.multi-restore');
    Route::post('admins/restore', [AdminController::class, 'restore'])->name('admins.restore');

    Route::resource('/operators', OperatorController::class)->except('update');
    Route::post('/operators/{operator}/update', [OperatorController::class, 'update'])->name('operators.update');
    Route::post('/operators/multi-delete', [OperatorController::class, 'multiDelete'])->name('operators.multi-delete');
    Route::post('/operators/multi-restore', [OperatorController::class, 'multiRestore'])->name('operators.multi-restore');
    Route::post('operators/restore', [OperatorController::class, 'restore'])->name('operators.restore');

    Route::resource('/branches', BranchController::class)->except('update');
    Route::post('/branches/{branch}/update', [BranchController::class, 'update'])->name('branches.update');
    Route::post('/branches/multi-delete', [BranchController::class, 'multiDelete'])->name('branches.multi-delete');
    Route::post('/branches/multi-restore', [BranchController::class, 'multiRestore'])->name('branches.multi-restore');
    Route::post('branches/restore', [BranchController::class, 'restore'])->name('branches.restore');

    Route::resource('/menus', MenuController::class)->except('update');
    Route::post('/menus/{menu}/update', [MenuController::class, 'update'])->name('menus.update');
    Route::post('/menus/multi-delete', [MenuController::class, 'multiDelete'])->name('menus.multi-delete');
    Route::post('/menus/multi-restore', [MenuController::class, 'multiRestore'])->name('menus.multi-restore');
    Route::post('menus/restore', [MenuController::class, 'restore'])->name('menus.restore');

    Route::resource('/meals', MealController::class)->except('update');
    Route::post('/meals/{meal}/update', [MealController::class, 'update'])->name('meals.update');
    Route::post('/meals/multi-delete', [MealController::class, 'multiDelete'])->name('meals.multi-delete');
    Route::post('/meals/multi-restore', [MealController::class, 'multiRestore'])->name('meals.multi-restore');
    Route::post('/meals/restore', [MealController::class, 'restore'])->name('meals.restore');

    Route::resource('/units', UnitController::class)->except('update');
    Route::post('/units/{unit}/update', [UnitController::class, 'update'])->name('units.update');
    Route::post('/units/multi-delete', [UnitController::class, 'multiDelete'])->name('units.multi-delete');
    Route::post('/units/multi-restore', [UnitController::class, 'multiRestore'])->name('units.multi-restore');
    Route::post('/units/restore', [UnitController::class, 'restore'])->name('units.restore');

    Route::resource('/ingredients', IngredientController::class)->except('update');
    Route::post('/ingredients/{ingredient}/update', [IngredientController::class, 'update'])->name('ingredients.update');
    Route::post('/ingredients/multi-delete', [IngredientController::class, 'multiDelete'])->name('ingredients.multi-delete');
    Route::post('/ingredients/multi-restore', [IngredientController::class, 'multiRestore'])->name('ingredients.multi-restore');
    Route::post('/ingredients/restore', [IngredientController::class, 'restore'])->name('ingredients.restore');
});



require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';

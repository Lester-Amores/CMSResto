<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use Illuminate\Http\Request;

class PublicPageController extends Controller
{
    public function home()
    {
        $menus = Menu::with('meals')->get();
        $allMeals = $menus->flatMap->meals;

        return view('public.home.home', [
            'title' => 'Home',
            'description' => 'Welcome to MySite, your go-to for XYZ services.',
            'data' => [
                'menus' => $menus,
                'meals' => $allMeals,
            ],
        ]);
    }



    public function about()
    {
        return view('public.about', [
            'title' => 'About Us',
            'description' => 'Learn more about our mission, vision, and team.',
        ]);
    }

    public function menu()
    {
        $menus = Menu::with('meals')->get();
        $allMeals = $menus->flatMap->meals;

        return view('public.menu', [
            'title' => 'Our Menu',
            'description' => 'Explore our best chef masterpieces.',
            'data' => [
                'menus' => $menus,
                'meals' => $allMeals,
            ],
        ]);
    }

    public function contact()
    {
        return view('public.contact', [
            'title' => 'Contact Us',
            'description' => 'Get in touch with us for any inquiries or support.',
        ]);
    }
}

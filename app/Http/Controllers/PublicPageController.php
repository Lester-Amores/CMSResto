<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use Illuminate\Http\Request;

class PublicPageController extends Controller
{
    public function home()
    {
        return view('public.home.home', [
            'title' => 'Home',
            'description' => 'Welcome to MySite, your go-to for XYZ services.',
            'menus' => Menu::with('meals')->get(),
        ]);
    }

    public function about()
    {
        return view('public.about', [
            'title' => 'About Us',
            'description' => 'Learn more about our mission, vision, and team.',
        ]);
    }

    public function services()
    {
        return view('public.services', [
            'title' => 'Our Services',
            'description' => 'Explore the services we offer to help you succeed.',
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

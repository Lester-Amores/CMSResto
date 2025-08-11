@extends('layouts.app')

@section('content')
    @include('public.home.welcome')
    @include('public..partials.menu-section', ['data' => $data])
@endsection

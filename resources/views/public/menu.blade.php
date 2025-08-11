@extends('layouts.app')

@section('content')
    <div class="pt-10"></div>
    @include('public.partials.menu-section', ['data' => $data])
@endsection
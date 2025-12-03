<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/', fn () => response()->json(['message' => 'OK']));

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/api', fn() => response()->json(['message' => 'OK']));
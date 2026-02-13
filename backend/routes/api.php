<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\V1\AnimeController;
use App\Http\Controllers\V1\EpisodeController;
use App\Http\Controllers\V1\EpisodeSourceController;
use App\Http\Controllers\V1\PlayBackController;
use App\Http\Controllers\V1\SeasonController;

Route::get('/', fn () => response()->json(['message' => 'OK']));

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Anime Resource
Route::apiResource('animes', AnimeController::class);

//
Route::apiResource('animes.seasons', SeasonController::class);

Route::apiResource('seasons.episodes', EpisodeController::class);

Route::apiResource('episodes.sources', EpisodeSourceController::class);

Route::get('episodes/{episode}/stream', [PlayBackController::class, 'stream']);


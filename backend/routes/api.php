<?php

use App\Http\Controllers\V1\AnimeController;
use App\Http\Controllers\V1\EpisodeController;
use App\Http\Controllers\V1\EpisodeSourceController;
use App\Http\Controllers\V1\PlayBackController;
use App\Http\Controllers\V1\SeasonController;
use App\Models\Anime;
use App\Models\Season;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

// Anime Resource
Route::apiResource('animes', AnimeController::class);

// Anime Seasons Resource
Route::apiResource('animes.seasons', SeasonController::class);
Route::get('seasons', function (Anime $anime) {
    $data = $anime->seasons()->get();
    return response()->json($data);
});

// Season Episodes Resource
Route::apiResource('animes.seasons.episodes', EpisodeController::class);

// Episode Sources Resource
Route::apiResource('animes.seasons.episodes.sources', EpisodeSourceController::class);

// Route::get('episodes/{episode}/stream', [PlayBackController::class, 'stream']);

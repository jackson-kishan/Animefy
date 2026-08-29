<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

Route::get('/post', function() {
  return 'this is a post request';
});

require __DIR__.'/auth.php';

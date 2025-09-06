<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('episode_sources', function (Blueprint $table) {
            $table->id();
            $table->foreignId('episode_id')->constrained()->cascadeOnDelete();
            $table->string('type')->default('hls'); // hls | mp4 | dash
            $table->string('quality')->nullable(); // 1080p, 720p, auto
            $table->string('lang')->nullable(); // "ja", "en"
            $table->string('url'); // HLS .m3u8 or file URL (can be signed later)
            $table->boolean('is_primary')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('episode_sources');
    }
};

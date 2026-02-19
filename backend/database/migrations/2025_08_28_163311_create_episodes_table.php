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
        Schema::create('episodes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('season_id')->constrained()->cascadeOnDelete();
            $table->unsignedInteger('number');
            $table->string('title');
            $table->text('description')->nullable();
            $table->unsignedInteger('duration_seconds')->nullable();
            $table->timestamp('published_at')->nullable();
            $table->string('thumbnail_path')->nullable();
            $table->string('type')->default('hls'); // hls | mp4 | dash
            $table->string('quality')->nullable(); // 1080p, 720p, auto
            $table->enum('lang', ['ja', 'en'])->nullable();
            $table->string('url'); // HLS .m3u8 or file URL (can be signed later)
            $table->boolean('is_primary')->default(false);
            $table->unique(['season_id','number']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('episodes');
    }
};

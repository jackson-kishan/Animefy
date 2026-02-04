<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SeasonResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'anime_id' => $this->anime_id,
            'number' => $this->number,
            'title' => $this->title,
            'description' => $this->description,
            'images' => $this->images,
            'episodes_count' => $this->whenLoaded('episodes_count'),
            'episodes' => EpisodeResource::collection($this->whenLoaded('episodes')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}

<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class AnimeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'synopsis' => 'required|string',
            'images' => 'required|string',
            'status' => ['required', Rule::in(['ongoing', 'completed'])],
            'year' => 'required|integer|between:1970,2100',
            'rating' => 'required|numeric|between:0,10',
            'genres' => 'required|array',
            'genres.*' => 'string',
        ];
    }
}

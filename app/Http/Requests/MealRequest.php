<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MealRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        if ($this->has('materials') && is_string($this->materials)) {
            $this->merge([
                'materials' => json_decode($this->materials, true),
            ]);
        }
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'price' => 'required|integer|min:0',
            'menu_id' => 'required|exists:menus,id',
            'img_src' => 'required|image|mimes:jpg,jpeg,png,webp|max:2048',
            'materials' => 'required|array',
            'materials.*.id' => 'required|exists:materials,id',
            'materials.*.quantity' => 'required|integer|min:1',
        ];
    }
}

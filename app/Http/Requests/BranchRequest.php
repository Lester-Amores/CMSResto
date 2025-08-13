<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BranchRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $isUpdate = $this->route('branch');

        $imageRule = $isUpdate
            ? 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048'
            : 'required|image|mimes:jpg,jpeg,png,webp|max:2048';

        return [
            'name' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'city' => 'nullable|string|max:255',
            'province' => 'nullable|string|max:255',
            'postal_code' => 'nullable|string|max:10',
            'phone' => 'nullable|string|max:50',
            'email' => 'nullable|email|max:255',
            'latitude' => 'nullable|numeric|between:-90,90',
            'longitude' => 'nullable|numeric|between:-180,180',
            'manager_name' => 'nullable|string|max:255',
            'opening_time' => 'nullable|date_format:H:i:s',
            'closing_time' => 'nullable|date_format:H:i:s',
            'img_src' => $imageRule,
            'notes' => 'nullable|string',
            'operator_id' => 'nullable|integer|exists:operators,id',
        ];
    }
}

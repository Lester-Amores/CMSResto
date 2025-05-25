<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class AdminRequest extends FormRequest
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
        return  [
            'last_name' => 'required|string|max:255',
            'first_name' => 'required|string|max:255',
            'img_src' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'email' => [
                'nullable',
                'email',
                'max:255',
                Rule::unique('users', 'email')->ignore($this->route('admin')),
            ],
            'role' => 'nullable|int|in:0,1',
            'status' => 'nullable|int|in:0,1,2',
            'password' =>  [
                $this->route('admin') ? 'nullable' : 'required',
                'string',
                'min:8',
            ],
        ];
    }
}

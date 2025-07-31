<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class OrderRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }
    protected function prepareForValidation(): void
    {
        if ($this->has('meals') && is_string($this->meals)) {
            $this->merge([
                'meals' => json_decode($this->meals, true),
            ]);
        }
    }
    public function rules(): array
    {
        return [
            'order_type'       => 'required|integer|in:0,1,2,3,4',
            'discount_type'    => 'nullable|integer|in:0,1,2,3',
            'discount_id_number'  => 'required_if:discount_type,1,2|string|max:50',
            'discount_amount'  => 'nullable|numeric|min:0',
            'subtotal'         => 'required|numeric|min:0',
            'total'            => 'required|numeric|min:0',
            'payment_method'   => 'required|integer|in:0,1,2',
            'status'           => 'required|integer|in:0,1,2,3',
            'notes'            => 'nullable|string|max:500',
            'branch_id'        => 'required|exists:branches,id',
            'tax_amount'       => 'nullable|numeric|min:0',
            'meals'            => 'required|array|min:1',
            'meals.*.meal_id'  => 'required|exists:meals,id',
            'meals.*.quantity' => 'required|integer|min:1',
        ];
    }

    public function messages(): array
    {
        return [
            'meals.required' => 'At least one meal must be included in the order.',
            'branch_id.exists' => 'Selected branch does not exist.',
        ];
    }
}

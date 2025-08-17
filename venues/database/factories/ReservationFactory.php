<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Reservation>
 */
class ReservationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'slot' => fake()->randomElement([
                '09:00', '12:00', '15:00', '18:00', '21:00'
            ]),
            'date' => fake()->dateTimeBetween('now', '+90days'),
        ];
    }
}

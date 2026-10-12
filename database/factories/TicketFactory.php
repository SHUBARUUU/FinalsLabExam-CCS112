<?php

namespace Database\Factories;

use App\Models\Ticket;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Ticket>
 */
class TicketFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'title' => fake()->sentence(4),
            'description' => fake()->paragraph(),
            'priority' => fake()->randomElement(Ticket::PRIORITIES),
            'status' => fake()->randomElement(Ticket::STATUSES),
            'category' => fake()->randomElement(Ticket::CATEGORIES),
        ];
    }
}
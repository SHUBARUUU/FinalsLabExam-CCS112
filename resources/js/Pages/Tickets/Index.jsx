import { PriorityBadge, StatusBadge } from '@/Components/Badge';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

const selectClass =
    'rounded-md border-gray-300 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500';

function FilterSelect({ label, value, onChange, choices }) {
    return (
        <select
            aria-label={label}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={selectClass}
        >
            <option value="">All {label}</option>
            {choices.map((choice) => (
                <option key={choice} value={choice}>
                    {choice}
                </option>
            ))}
        </select>
    );
}

function Pagination({ tickets }) {
    if (tickets.last_page <= 1) {
        return null;
    }

    const linkClass =
        'rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50';
    const disabledClass =
        'rounded-md border border-gray-200 bg-gray-100 px-3 py-1.5 text-sm text-gray-400';

    return (
        <div className="mt-6 flex items-center justify-between">
            {tickets.prev_page_url ? (
                <Link href={tickets.prev_page_url} className={linkClass}>
                    Previous
                </Link>
            ) : (
                <span className={disabledClass}>Previous</span>
            )}

            <span className="text-sm text-gray-600">
                Page {tickets.current_page} of {tickets.last_page}
            </span>

            {tickets.next_page_url ? (
                <Link href={tickets.next_page_url} className={linkClass}>
                    Next
                </Link>
            ) : (
                <span className={disabledClass}>Next</span>
            )}
        </div>
    );
}

export default function Index({ tickets, filters, options }) {
    const hasFilters = Object.values(filters).some(Boolean);

    const applyFilter = (key, value) => {
        const next = { ...filters, [key]: value };
        Object.keys(next).forEach((k) => {
            if (!next[k]) {
                delete next[k];
            }
        });

        router.get(route('tickets.index'), next, {
            preserveState: true,
            replace: true,
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        My Tickets
                    </h2>
                    <Link
                        href={route('tickets.create')}
                        className="inline-flex items-center rounded-md bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white hover:bg-gray-700"
                    >
                        New Ticket
                    </Link>
                </div>
            }
        >
            <Head title="Tickets" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-4 flex flex-wrap gap-3">
                        <FilterSelect
                            label="Statuses"
                            value={filters.status ?? ''}
                            onChange={(v) => applyFilter('status', v)}
                            choices={options.statuses}
                        />
                        <FilterSelect
                            label="Priorities"
                            value={filters.priority ?? ''}
                            onChange={(v) => applyFilter('priority', v)}
                            choices={options.priorities}
                        />
                        <FilterSelect
                            label="Categories"
                            value={filters.category ?? ''}
                            onChange={(v) => applyFilter('category', v)}
                            choices={options.categories}
                        />
                    </div>

                    {tickets.data.length === 0 ? (
                        <div className="rounded-lg bg-white p-10 text-center shadow">
                            <p className="text-lg font-medium text-gray-900">
                                {hasFilters
                                    ? 'No tickets match these filters.'
                                    : 'No tickets yet.'}
                            </p>
                            <p className="mt-1 text-sm text-gray-500">
                                {hasFilters
                                    ? 'Try changing or clearing a filter.'
                                    : 'Create your first ticket to get started.'}
                            </p>
                            {!hasFilters && (
                                <Link
                                    href={route('tickets.create')}
                                    className="mt-4 inline-flex items-center rounded-md bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white hover:bg-gray-700"
                                >
                                    New Ticket
                                </Link>
                            )}
                        </div>
                    ) : (
                        <>
                            {/* Desktop: table */}
                            <div className="hidden overflow-hidden bg-white shadow sm:rounded-lg md:block">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                Title
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                Category
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                Priority
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                Created
                                            </th>
                                            <th className="px-6 py-3" />
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {tickets.data.map((ticket) => (
                                            <tr key={ticket.id}>
                                                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                                    <Link
                                                        href={route('tickets.show', ticket.id)}
                                                        className="hover:underline"
                                                    >
                                                        {ticket.title}
                                                    </Link>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-500">
                                                    {ticket.category}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <PriorityBadge value={ticket.priority} />
                                                </td>
                                                <td className="px-6 py-4">
                                                    <StatusBadge value={ticket.status} />
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-500">
                                                    {new Date(ticket.created_at).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 text-right text-sm">
                                                    <Link
                                                        href={route('tickets.edit', ticket.id)}
                                                        className="text-indigo-600 hover:text-indigo-900"
                                                    >
                                                        Edit
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Mobile: stacked cards */}
                            <div className="space-y-4 md:hidden">
                                {tickets.data.map((ticket) => (
                                    <div
                                        key={ticket.id}
                                        className="rounded-lg bg-white p-4 shadow"
                                    >
                                        <Link
                                            href={route('tickets.show', ticket.id)}
                                            className="break-words font-medium text-gray-900 hover:underline"
                                        >
                                            {ticket.title}
                                        </Link>
                                        <div className="mt-2 flex flex-wrap items-center gap-2">
                                            <PriorityBadge value={ticket.priority} />
                                            <StatusBadge value={ticket.status} />
                                            <span className="text-xs text-gray-500">
                                                {ticket.category}
                                            </span>
                                        </div>
                                        <div className="mt-3 flex items-center justify-between text-sm text-gray-500">
                                            <span>
                                                {new Date(ticket.created_at).toLocaleDateString()}
                                            </span>
                                            <Link
                                                href={route('tickets.edit', ticket.id)}
                                                className="text-indigo-600 hover:text-indigo-900"
                                            >
                                                Edit
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <Pagination tickets={tickets} />
                        </>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
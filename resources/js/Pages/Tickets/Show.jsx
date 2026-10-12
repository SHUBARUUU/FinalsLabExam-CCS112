import { PriorityBadge, StatusBadge } from '@/Components/Badge';
import DangerButton from '@/Components/DangerButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Show({ ticket }) {
    const { delete: destroy, processing } = useForm({});

    const handleDelete = () => {
        if (window.confirm('Delete this ticket? This cannot be undone.')) {
            destroy(route('tickets.destroy', ticket.id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Ticket #{ticket.id}
                </h2>
            }
        >
            <Head title={`Ticket #${ticket.id}`} />

            <div className="py-12">
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                    <div className="space-y-6 bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <div>
                            <h3 className="break-words text-2xl font-semibold text-gray-900">
                                {ticket.title}
                            </h3>
                            <div className="mt-3 flex flex-wrap items-center gap-2">
                                <PriorityBadge value={ticket.priority} />
                                <StatusBadge value={ticket.status} />
                                <span className="text-sm text-gray-500">
                                    {ticket.category}
                                </span>
                            </div>
                        </div>

                        <p className="whitespace-pre-wrap break-words text-gray-700">
                            {ticket.description}
                        </p>

                        <div className="text-sm text-gray-500">
                            <p>Created: {new Date(ticket.created_at).toLocaleString()}</p>
                            <p>Updated: {new Date(ticket.updated_at).toLocaleString()}</p>
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                            <Link
                                href={route('tickets.edit', ticket.id)}
                                className="inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white hover:bg-gray-700"
                            >
                                Edit
                            </Link>
                            <DangerButton onClick={handleDelete} disabled={processing}>
                                {processing ? 'Deleting...' : 'Delete'}
                            </DangerButton>
                            <Link
                                href={route('tickets.index')}
                                className="text-sm text-gray-600 underline hover:text-gray-900"
                            >
                                Back to tickets
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
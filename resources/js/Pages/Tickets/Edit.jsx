import TicketForm from '@/Components/TicketForm';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Edit({ ticket, options }) {
    const { data, setData, put, processing, errors } = useForm({
        title: ticket.title,
        description: ticket.description,
        priority: ticket.priority,
        status: ticket.status,
        category: ticket.category,
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('tickets.update', ticket.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Edit Ticket
                </h2>
            }
        >
            <Head title="Edit Ticket" />

            <div className="py-12">
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <TicketForm
                            data={data}
                            setData={setData}
                            errors={errors}
                            processing={processing}
                            options={options}
                            onSubmit={submit}
                            submitLabel="Save Changes"
                            cancelHref={route('tickets.show', ticket.id)}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
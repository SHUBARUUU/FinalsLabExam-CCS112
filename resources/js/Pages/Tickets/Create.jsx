import TicketForm from '@/Components/TicketForm';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Create({ options }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        priority: options.priorities[1],
        status: options.statuses[0],
        category: options.categories[0],
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('tickets.store'));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    New Ticket
                </h2>
            }
        >
            <Head title="New Ticket" />

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
                            submitLabel="Create Ticket"
                            cancelHref={route('tickets.index')}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
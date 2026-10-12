import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link } from '@inertiajs/react';

const fieldClass =
    'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500';

function SelectField({ id, label, value, onChange, choices, error }) {
    return (
        <div>
            <InputLabel htmlFor={id} value={label} />
            <select id={id} value={value} onChange={onChange} className={fieldClass}>
                {choices.map((choice) => (
                    <option key={choice} value={choice}>
                        {choice}
                    </option>
                ))}
            </select>
            <InputError message={error} className="mt-2" />
        </div>
    );
}

export default function TicketForm({
    data,
    setData,
    errors,
    processing,
    options,
    onSubmit,
    submitLabel,
    cancelHref,
}) {
    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <div>
                <InputLabel htmlFor="title" value="Title" />
                <TextInput
                    id="title"
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                    className="mt-1 block w-full"
                />
                <InputError message={errors.title} className="mt-2" />
            </div>

            <div>
                <InputLabel htmlFor="description" value="Description" />
                <textarea
                    id="description"
                    rows={5}
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    className={fieldClass}
                />
                <InputError message={errors.description} className="mt-2" />
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                <SelectField
                    id="priority"
                    label="Priority"
                    value={data.priority}
                    onChange={(e) => setData('priority', e.target.value)}
                    choices={options.priorities}
                    error={errors.priority}
                />
                <SelectField
                    id="status"
                    label="Status"
                    value={data.status}
                    onChange={(e) => setData('status', e.target.value)}
                    choices={options.statuses}
                    error={errors.status}
                />
                <SelectField
                    id="category"
                    label="Category"
                    value={data.category}
                    onChange={(e) => setData('category', e.target.value)}
                    choices={options.categories}
                    error={errors.category}
                />
            </div>

            <div className="flex items-center gap-4">
                <PrimaryButton disabled={processing}>
                    {processing ? 'Saving...' : submitLabel}
                </PrimaryButton>
                <Link
                    href={cancelHref}
                    className="text-sm text-gray-600 underline hover:text-gray-900"
                >
                    Cancel
                </Link>
            </div>
        </form>
    );
}
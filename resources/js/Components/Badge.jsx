const PRIORITY_STYLES = {
    Low: 'bg-gray-100 text-gray-700 ring-gray-500/20',
    Medium: 'bg-blue-100 text-blue-700 ring-blue-600/20',
    High: 'bg-orange-100 text-orange-700 ring-orange-600/20',
    Urgent: 'bg-red-100 text-red-700 ring-red-600/20',
};

const STATUS_STYLES = {
    Open: 'bg-green-100 text-green-700 ring-green-600/20',
    'In Progress': 'bg-yellow-100 text-yellow-800 ring-yellow-600/20',
    Resolved: 'bg-purple-100 text-purple-700 ring-purple-600/20',
    Closed: 'bg-gray-200 text-gray-700 ring-gray-500/20',
};

const BASE =
    'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset';

export function PriorityBadge({ value }) {
    return (
        <span className={`${BASE} ${PRIORITY_STYLES[value] ?? PRIORITY_STYLES.Low}`}>
            {value}
        </span>
    );
}

export function StatusBadge({ value }) {
    return (
        <span className={`${BASE} ${STATUS_STYLES[value] ?? STATUS_STYLES.Closed}`}>
            {value}
        </span>
    );
}
interface TableProps {
    itemsPerPage?: "25" | "50" | "100";
    items: any[];
    columns: Column[];
}

interface Column {
    postion: number;
    name: string;
    label: string;
}

export default function Table(props: TableProps) {
    const { items, columns, itemsPerPage } = props;

    return (
        <div className="bg-gray-800 text-white">
            <table>
                <thead className="border-b">
                    <tr>
                        {columns.map((column) => (
                            <th key={column.name}>{column.label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, i) => (
                        <tr key={i.toString()}>
                            {columns.map((column, i) => (

                                <td key={column.name}>{item[column.name as keyof typeof item]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
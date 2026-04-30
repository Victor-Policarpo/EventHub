import type { EmployeeData } from "../../types";
import { Card } from "../Common";

export function EmployeeCard({ employee }: { employee: EmployeeData }) {
    return (
        <Card>
            <h2 className="font-bold text-lg">{employee.name}</h2>
            <p className="text-gray-600">{employee.telephone}</p>
            <p className="text-gray-600">{employee.isAvailable ? "Disponível" : "Indisponível"}</p>
        </Card>
    );
}
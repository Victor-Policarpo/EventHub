import type { ToyData } from "../../types";
import { Card } from "../Common/Card";

export default function ToyCard({ toy }: { toy: ToyData }) {
    return (
    <Card>
        <h2 className="font-bold text-lg">{toy.name}</h2>
        <p className="text-gray-600">{toy.valueForFourHours}</p>
        <p className="text-gray-600">{toy.availableQuantity}</p>
    </Card>
    )
}
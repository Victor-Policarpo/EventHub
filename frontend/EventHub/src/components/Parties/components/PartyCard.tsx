import type { PartyData } from "../../../types";
import { Card } from "../../Common";

export function PartyCard({ party }: { party: PartyData }) {
    return (
        <Card>
            <h2 className="font-bold text-lg">{party.name}</h2>
            <p className="text-gray-600">{party.address}</p>
            <div className="mt-2 text-sm">
                <p>{party.startDateHours}</p>
                <p>{party.partyStatus}</p>
                <p>{party.assemblyStatus}</p>
            </div>
        </Card>
    );
}
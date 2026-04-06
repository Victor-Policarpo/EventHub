import type { PartyData } from "../../types/types";

function PartyCard({ party }: { party: PartyData }) {
    return (
        <div className="party-card mb-4 p-4 border rounded shadow hover:shadow-lg transition-shadow duration-300">
            <h2>{party.name}</h2>
            <p>{party.address}</p>
            <p>{party.startDateHours}</p>
            <p>Status da Festa: {party.partyStatus}</p>
            <p>Status da Montagem: {party.assemblyStatus}</p>
        </div>
    );
}
export default PartyCard;
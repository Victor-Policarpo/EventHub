import api from "../../lib/axios";

export async function startPartyRequest(partyId: string | number) {
  const response = await api.patch(`/auth/parties/${partyId}/start-party`);
  return response.data;
}

export async function endPartyRequest(partyId: string | number) {
  const response = await api.patch(`/auth/parties/${partyId}/end-party`);
  return response.data;
}

export async function collectPartyRequest(partyId: string | number) {
  const response = await api.patch(`/auth/parties/${partyId}/collect-party`);
  return response.data;
}

export async function cancelPartyRequest(partyId: string | number) {
  const response = await api.patch(`/auth/parties/${partyId}/cancel-party`);
  return response.data;
}
import api from "../../lib/axios";
import type { EmployeeParty, PartyDetails, ToyParty } from "../../types";

export async function getPartyById(partyId: number):Promise<PartyDetails> {
    const response = await api.get(`auth/parties/${partyId}`);
    const data = response.data;
    return {
    ...data,
    partyId: String(data.partyId),
    partyToys: data.partyToys.map((toy: ToyParty) => ({
      ...toy,
      toyId: String(toy.toyId)
    })),
    employees: data.employees.map((emp: EmployeeParty) => ({
      ...emp,
      employeeId: String(emp.employeeId)
    }))
  };
}
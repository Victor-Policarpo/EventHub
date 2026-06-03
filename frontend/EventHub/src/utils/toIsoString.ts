export const parseIsoString = (isoString: string) => {
    if (!isoString) return { date: "", time: "" };
    const dateObj = new Date(isoString);
    if (isNaN(dateObj.getTime())) return { date: "", time: "" };

    // Formato YYYY-MM-DD
    const date = dateObj.toISOString().split("T")[0];
    // Formato HH:MM
    const time = dateObj.toTimeString().split(" ")[0].substring(0, 5);
    return { date, time };
};

export const combineToIsoString = (date: string, time: string) => {
    if (!date) return "";
    // Se tiver data mas não tiver hora, assume 00:00 para evitar quebra
    const validTime = time || "00:00";
    return `${date}T${validTime}:00`;
};
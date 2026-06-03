export const formatDateHours = (rawStr?: string) => {
    if (!rawStr) return { date: "Não informada", time: null };

    // Formato ISO (ex: 2024-05-20T14:30:00)
    if (rawStr.includes("T")) {
        const [datePart, timePart] = rawStr.split("T");
        // Converte YYYY-MM-DD para DD/MM/YYYY
        const formattedDate = datePart.split("-").reverse().join("/");
        return { date: formattedDate, time: timePart.substring(0, 5) };
    }

    // Formato com espaço (ex: "20/05/2024 14:30" ou "20/05/2024 14:30:00")
    const parts = rawStr.split(" ");
    if (parts.length >= 2) {
        return {
            date: parts[0],
            time: parts[1].substring(0, 5) // Garante apenas HH:mm
        };
    }

    // Fallback caso seja apenas uma data simples
    return { date: rawStr, time: null };
};

export const formatToDateTimeLocal = (dateString: string | undefined) => {
    if (!dateString) return "";
    return dateString.replace(" ", "T").slice(0, 16);
};

export const formatForApi = (dateStr: string | undefined) => {
    if (!dateStr) return undefined;
    return `${dateStr}:00`; 
};

export const splitIsoToFields = (isoString: string | undefined) => {
    if (!isoString) return { date: "", time: "" };
    const cleanString = isoString.replace(" ", "T"); 
    const dateObj = new Date(cleanString);
    
    if (isNaN(dateObj.getTime())) return { date: "", time: "" };

    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');

    return {
        date: `${year}-${month}-${day}`,
        time: `${hours}:${minutes}`
    };
};
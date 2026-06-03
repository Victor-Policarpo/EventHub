export const formatDateHours = (dataIso: string) => {
    const data = new Date(dataIso);
    const dia = data.toLocaleDateString('pt-BR');
    const hora = data.toLocaleTimeString('pt-BR', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });

    return `${dia} ${hora}`;
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
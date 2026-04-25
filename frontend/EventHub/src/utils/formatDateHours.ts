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
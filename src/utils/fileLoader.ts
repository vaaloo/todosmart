export const loadJsonFile = (file: File, callback: (data: any) => void) => {
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const json = JSON.parse(e.target?.result as string);
            callback(json);
        } catch (error) {
            console.error("Erreur de parsing JSON :", error);
        }
    };
    reader.readAsText(file);
};
export const openPdf = (blob: Blob) => {
    const url = URL.createObjectURL(blob);
    const newWindow = window.open();
    if (newWindow) {
        newWindow.location.href = url;
    } else {
        alert("Браузер заблокировал открытие вкладки");
    }
    setTimeout(() => URL.revokeObjectURL(url), 5000);
};

export const downloadPdf = (blob: Blob, fileName: string) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
};
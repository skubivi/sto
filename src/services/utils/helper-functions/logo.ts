import logo from '../../../assets/logo-mini.png'

export const dataToBase64 = (text: string, file?: File | Blob): Promise<{text: string, photo?: string}> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader()
        if (file === undefined) resolve({text})
        else {
            reader.onload = () => resolve({text, photo: reader.result as string})
            reader.onerror = reject
            reader.readAsDataURL(file)
        }
    })

export const toBase64 = (file: File | Blob): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    }
);

export const getLogoBase64 = async () => {
    const res = await fetch(logo);
    const blob = await res.blob();
    const logoBase64 = await toBase64(blob);
    return logoBase64
}
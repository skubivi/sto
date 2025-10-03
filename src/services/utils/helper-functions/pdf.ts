import { IPostMechanicFilialReport, IPostMechanicReport, IPostReceptionistFilialReport, IPostReceptionistReport } from "../../types/analytics";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { Content, TDocumentDefinitions } from "pdfmake/interfaces";
import { dataToBase64, getLogoBase64 } from "./logo";
import { IElectroDiagnosticData, IFreeReportData } from "../../types/documents";

pdfMake.vfs = pdfFonts.vfs;

export const openPdf = (docLink: string) => {
    window.open(docLink, "_blank")
};

export const openPdfBlob = (blob: Blob) => {
  const url = URL.createObjectURL(blob);
  window.open(url, "_blank");
  URL.revokeObjectURL(url); // очистка после открытия
};

export const downloadPdf = async (docLink: string, fileName: string) => {
    try {
    const response = await fetch(docLink, { credentials: "include" })
    if (!response.ok) throw new Error(`Ошибка при загрузке: ${response.statusText}`)

    const blob = await response.blob()

    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = fileName || "file.pdf"
    document.body.appendChild(link)
    link.click()

    link.remove()
    URL.revokeObjectURL(url)
  } catch (err) {
    console.error("Не удалось скачать файл:", err)
  }
};

export const createMechanicReportBlob = async (data: IPostMechanicReport[], isFullAdmin: boolean) => {
    const headerRow = isFullAdmin
        ? ['Станция', 'Механик', 'Кол-во диагностик', 'Выявлено работ (шт.)', 'Среднее за диагностику', 'Отчетов по готовым работам']
        : ['Механик', 'Кол-во диагностик', 'Выявлено работ (шт.)', 'Среднее за диагностику', 'Отчетов по готовым работам'];
    const body = data.map(el => {
        const base = [
            el.mechanic,
            el.diagnosticsCount.toString(),
            el.worksCount.toString(),
            el.worksAverage.toString(),
            el.reportsCount.toString()
        ];
        if (isFullAdmin) {
            return [el.filial, ...base];
        }
        return base;
    });

    const logoBase64 = await getLogoBase64()

    const docDefinition: TDocumentDefinitions = {
        content: [
            { text: "Сводный отчет по проделанным работам (по ст.)", style: "header" },
            {
                image: logoBase64,
                width: 40,
                absolutePosition: { x: 520, y: 10 }
            },
            {
                table: {
                    headerRows: 1,
                    widths: isFullAdmin
                        ? ["auto", "*", "auto", "auto", "auto", "auto"]
                        : ["*", "auto", "auto", "auto", "auto"],
                    body: [
                        headerRow.map(h => ({ text: h, bold: true, fillColor: "#eeeeee", color: "#000" })),
                        ...body
                    ],
                    dontBreakRows: false
                },
                layout: {
                    hLineWidth: (i, node) => (i === 0 || i === node.table.body.length ? 2 : 0.5),
                    vLineWidth: () => 0.5,
                    hLineColor: () => "#808080",
                    vLineColor: () => "#808080",
                    paddingLeft: () => 5,
                    paddingRight: () => 5,
                    paddingTop: () => 3,
                    paddingBottom: () => 3,
                },
            },
        ],
        styles: {
        header: {
            fontSize: 24,
            bold: true,
            margin: [0, 0, 0, 30],
        },
        },
        defaultStyle: { font: "Roboto", fontSize: 10 },
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return new Promise<Blob>((resolve, _) => {
        const pdfDocGenerator = pdfMake.createPdf(docDefinition);

        pdfDocGenerator.getBlob(blob => {
            resolve(blob);
        });
    });
}

export const createMechanicFilialReportBlob = async (data: IPostMechanicFilialReport[]) => {
    const headerRow = ['Механик', 'Кол-во диагностик', 'Выявлено работ (шт.)', 'Среднее за диагностику', 'Отчетов по готовым работам']
    const body = data.map(el => {
        const base = [
            el.filial.toString(),
            el.diagnosticsCount.toString(),
            el.worksCount.toString(),
            el.worksAverage.toString(),
            el.reportsCount.toString()
        ];
        return base;
    });

    const logoBase64 = await getLogoBase64()

    const docDefinition: TDocumentDefinitions = {
        content: [
            { text: "Сводный отчет по проделанным работам (в общем)", style: "header" },
            {
                image: logoBase64,
                width: 40,
                absolutePosition: { x: 520, y: 10 }
            },
            {
                table: {
                    headerRows: 1,
                    widths: ["*", "auto", "auto", "auto", "auto"],
                    body: [
                        headerRow.map(h => ({ text: h, bold: true, fillColor: "#eeeeee", color: "#000" })),
                        ...body
                    ],
                    dontBreakRows: false
                },
                layout: {
                    hLineWidth: (i, node) => (i === 0 || i === node.table.body.length ? 2 : 0.5),
                    vLineWidth: () => 0.5,
                    hLineColor: () => "#808080",
                    vLineColor: () => "#808080",
                    paddingLeft: () => 5,
                    paddingRight: () => 5,
                    paddingTop: () => 3,
                    paddingBottom: () => 3,
                },
            },
        ],
        styles: {
        header: {
            fontSize: 24,
            bold: true,
            margin: [0, 0, 0, 30],
        },
        },
        defaultStyle: { font: "Roboto", fontSize: 10 },
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return new Promise<Blob>((resolve, _) => {
        const pdfDocGenerator = pdfMake.createPdf(docDefinition);

        pdfDocGenerator.getBlob(blob => {
            resolve(blob);
        });
    });
}

export const createReceptionistReportBlob = async (data: IPostReceptionistReport[], isFullAdmin: boolean) => {
    const headerRow = isFullAdmin
        ? ['Станция', 'Приемщик', 'Машин принято', 'Машин осмотрено', '% осмотров', 'Машин отдано', 'Отправлено осмотров по готовым машинам', '% отчетов от отданых']
        : ['Приемщик', 'Машин принято', 'Машин осмотрено', '% осмотров', 'Машин отдано', 'Отправлено осмотров по готовым машинам', '% отчетов от отданых'];
    const body = data.map(el => {
        const base = [
            el.receptionist,
            el.carsCount.toString(),
            el.carsProcessed.toString(),
            el.processedPercent.toString() + '%',
            el.carsGivenAway.toString(),
            el.reportsGivenAway.toString(),
            el.reportsPercent.toString() + '%'
        ];
        if (isFullAdmin) {
            return [el.filial, ...base];
        }
        return base;
    });

    const logoBase64 = await getLogoBase64()

    const docDefinition: TDocumentDefinitions = {
        content: [
            { text: "Сводный отчет по принятым машинам (по ст.)", style: "header" },
            {
                image: logoBase64,
                width: 40,
                absolutePosition: { x: 520, y: 10 }
            },
            {
                table: {
                    headerRows: 1,
                    widths: isFullAdmin
                        ? ["auto", "*", "auto", "auto", "auto", "auto", "auto", "auto"]
                        : ["*", "auto", "auto", "auto", "auto", "auto", "auto"],
                    body: [
                        headerRow.map(h => ({ text: h, bold: true, fillColor: "#eeeeee", color: "#000" })),
                        ...body
                    ],
                    dontBreakRows: false
                },
                layout: {
                    hLineWidth: (i, node) => (i === 0 || i === node.table.body.length ? 2 : 0.5),
                    vLineWidth: () => 0.5,
                    hLineColor: () => "#808080",
                    vLineColor: () => "#808080",
                    paddingLeft: () => 5,
                    paddingRight: () => 5,
                    paddingTop: () => 3,
                    paddingBottom: () => 3,
                },
            },
        ],
        styles: {
        header: {
            fontSize: 24,
            bold: true,
            margin: [0, 0, 0, 30],
        },
        },
        defaultStyle: { font: "Roboto", fontSize: 10 },
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return new Promise<Blob>((resolve, _) => {
        const pdfDocGenerator = pdfMake.createPdf(docDefinition);

        pdfDocGenerator.getBlob(blob => {
            resolve(blob);
        });
    });
}

export const createReceptionistFilialReportBlob = async (data: IPostReceptionistFilialReport[]) => {
    const headerRow = ['Станция', 'Машин принято', 'Машин осмотрено', '% осмотров', 'Машин отдано', 'Отправлено осмотров по готовым машинам', '% отчетов от отданых']
    const body = data.map(el => {
        const base = [
            el.filial,
            el.carsCount.toString(),
            el.carsProcessed.toString(),
            el.processedPercent.toString() + '%',
            el.carsGivenAway.toString(),
            el.reportsGivenAway.toString(),
            el.reportsPercent.toString() + '%'
        ];
        return base;
    });

    const logoBase64 = await getLogoBase64()

    const docDefinition: TDocumentDefinitions = {
        content: [
            { text: "Сводный отчет по принятым машинам (в общем)", style: "header" },
            {
                image: logoBase64,
                width: 40,
                absolutePosition: { x: 520, y: 10 }
            },
            {
                table: {
                    headerRows: 1,
                    widths: ["*", "auto", "auto", "auto", "auto", "auto", "auto"],
                    body: [
                        headerRow.map(h => ({ text: h, bold: true, fillColor: "#eeeeee", color: "#000" })),
                        ...body
                    ],
                    dontBreakRows: false
                },
                layout: {
                    hLineWidth: (i, node) => (i === 0 || i === node.table.body.length ? 2 : 0.5),
                    vLineWidth: () => 0.5,
                    hLineColor: () => "#808080",
                    vLineColor: () => "#808080",
                    paddingLeft: () => 5,
                    paddingRight: () => 5,
                    paddingTop: () => 3,
                    paddingBottom: () => 3,
                },
            },
        ],
        styles: {
        header: {
            fontSize: 24,
            bold: true,
            margin: [0, 0, 0, 30],
        },
        },
        defaultStyle: { font: "Roboto", fontSize: 10 },
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return new Promise<Blob>((resolve, _) => {
        const pdfDocGenerator = pdfMake.createPdf(docDefinition);

        pdfDocGenerator.getBlob(blob => {
            resolve(blob);
        });
    });
}

export const createFreeReportBlob = async (data: IFreeReportData) => {
    const logoBase64 = await getLogoBase64()

    const now = new Date(Date.now())
    const dateText = `Дата: ${now.getDate().toString().padStart(2, '0')}.${(now.getMonth() + 1).toString().padStart(2, '0')}.${now.getFullYear()}`
    const mechanicText = 'Механик: ' + data.mechanicName
    const carNumberText = 'Гос. номер: ' + data.carNumber
    const mileageText = 'Пробег: ' + data.mileage + ' км'

    const body = (
        await Promise.all(
            data.data.map(async (el, index) => {
            const toPush = await dataToBase64(el.text, el.photo);
            return toPush.photo
                ? [
                    { text: `-${index + 1}. ${toPush.text}`, style: "text" },
                    { image: toPush.photo, style: "photo", width: 520, fit: [174, 120] }
                ]
                : [{ text: `-${index + 1}. ${toPush.text}`, style: "text" }];
            })
        )
    ).flat();

    console.log(body)

    const docDefinition: TDocumentDefinitions = {
        content: [
            { text: "Отчет по выполненым работам", style: "header" },
            {
                image: logoBase64,
                width: 40,
                absolutePosition: { x: 520, y: 10 }
            },
            {
                text: dateText, style: "text"
            },
            {
                text: mechanicText, style: "text"
            },
            {
                text: carNumberText, style: "text"
            },
            {
                text: mileageText, style: "mileage"
            },
            ...body as Content[]
        ],
        styles: {
            header: {
                fontSize: 24,
                bold: true,
                margin: [0, 0, 0, 30],
            },
            mileage: {
                fontSize: 12,
                margin: [0, 0, 0, 30]
            },
            text: {
                fontSize: 12,
                marginBottom: 10
            },
            photo: {
                marginBottom: 10,
                alignment: 'center'
            }
        },
        defaultStyle: { font: "Roboto", fontSize: 10 },
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return new Promise<Blob>((resolve, _) => {
        const pdfDocGenerator = pdfMake.createPdf(docDefinition);

        pdfDocGenerator.getBlob(blob => {
            resolve(blob);
        });
    });
}

export const createElectroReportBlob = async (data: IElectroDiagnosticData) => {
    const logoBase64 = await getLogoBase64()

    const now = new Date(Date.now())
    const dateText = `Дата: ${now.getDate().toString().padStart(2, '0')}.${(now.getMonth() + 1).toString().padStart(2, '0')}.${now.getFullYear()}`
    const mechanicText = 'Механик: ' + data.mechanicName
    const carNumberText = 'Гос. номер: ' + data.carNumber
    const mileageText = 'Пробег: ' + data.mileage + ' км'

    const body = (
        await Promise.all(
            data.data.map(async (el, index) => {
                const text = `${el.subtitle}: ${el.text}`
                const toPush = await dataToBase64(text, el.photo);
                return toPush.photo
                    ? [
                        { text: `-${index + 1}. ${toPush.text}`, style: "text" },
                        { image: toPush.photo, style: "photo", fit: [174, 120] }
                    ]
                    : [{ text: `-${index + 1}. ${toPush.text}`, style: "text" }];
                }
            )
        )
    ).flat();

    const docDefinition: TDocumentDefinitions = {
        content: [
            { text: "Отчет по электродиагностике", style: "header" },
            {
                image: logoBase64,
                width: 40,
                absolutePosition: { x: 520, y: 10 }
            },
            {
                text: dateText, style: "text"
            },
            {
                text: mechanicText, style: "text"
            },
            {
                text: carNumberText, style: "text"
            },
            {
                text: mileageText, style: "mileage"
            },
            ...body as Content[]
        ],
        styles: {
            header: {
                fontSize: 24,
                bold: true,
                margin: [0, 0, 0, 30],
            },
            mileage: {
                fontSize: 12,
                margin: [0, 0, 0, 30]
            },
            text: {
                fontSize: 12,
                marginBottom: 10
            },
            photo: {
                marginBottom: 10,
                alignment: 'center'
            }
        },
        defaultStyle: { font: "Roboto", fontSize: 10 },
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return new Promise<Blob>((resolve, _) => {
        const pdfDocGenerator = pdfMake.createPdf(docDefinition);

        pdfDocGenerator.getBlob(blob => {
            resolve(blob);
        });
    });
}

export const createMetalReportBlob = async (data: IElectroDiagnosticData) => {
    const logoBase64 = await getLogoBase64()

    const now = new Date(Date.now())
    const dateText = `Дата: ${now.getDate().toString().padStart(2, '0')}.${(now.getMonth() + 1).toString().padStart(2, '0')}.${now.getFullYear()}`
    const mechanicText = 'Механик: ' + data.mechanicName
    const carNumberText = 'Гос. номер: ' + data.carNumber
    const mileageText = 'Пробег: ' + data.mileage + ' км'

    const body = (
        await Promise.all(
            data.data.map(async (el, index) => {
                const text = `${el.title}: ${el.text}`
                const toPush = await dataToBase64(text, el.photo);
                return toPush.photo
                    ? [
                        { text: `-${index + 1}. ${toPush.text}`, style: "text" },
                        { image: toPush.photo, style: "photo", fit: [174, 120] }
                    ]
                    : [{ text: `-${index + 1}. ${toPush.text}`, style: "text" }];
                }
            )
        )
    ).flat();

    const docDefinition: TDocumentDefinitions = {
        content: [
            { text: "Отчет по слесарной диагностике", style: "header" },
            {
                image: logoBase64,
                width: 40,
                absolutePosition: { x: 520, y: 10 }
            },
            {
                text: dateText, style: "text"
            },
            {
                text: mechanicText, style: "text"
            },
            {
                text: carNumberText, style: "text"
            },
            {
                text: mileageText, style: "mileage"
            },
            ...body as Content[]
        ],
        styles: {
            header: {
                fontSize: 24,
                bold: true,
                margin: [0, 0, 0, 30],
            },
            mileage: {
                fontSize: 12,
                margin: [0, 0, 0, 30]
            },
            text: {
                fontSize: 12,
                marginBottom: 10
            },
            photo: {
                marginBottom: 10,
                alignment: 'center'
            }
        },
        defaultStyle: { font: "Roboto", fontSize: 10 },
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return new Promise<Blob>((resolve, _) => {
        const pdfDocGenerator = pdfMake.createPdf(docDefinition);

        pdfDocGenerator.getBlob(blob => {
            resolve(blob);
        });
    });
}
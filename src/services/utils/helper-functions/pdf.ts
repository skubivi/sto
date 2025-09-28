import { IPostMechanicFilialReport, IPostMechanicReport, IPostReceptionistFilialReport, IPostReceptionistReport } from "../../types/analytics";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { TDocumentDefinitions } from "pdfmake/interfaces";
import { getLogoBase64 } from "./logo";

pdfMake.vfs = pdfFonts.vfs;

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
    const orientation = "landscape" as const;

    const logoBase64 = await getLogoBase64()

    const docDefinition: TDocumentDefinitions = {
        pageOrientation: orientation,
        content: [
            { text: "Сводный отчет по проделанным работам (по ст.)", style: "header" },
            {
                image: logoBase64,
                width: 30,
                absolutePosition: { x: 800, y: 10 }
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
            fontSize: 16,
            bold: true,
            margin: [0, 0, 0, 10],
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
    const orientation = "landscape" as const;

    const logoBase64 = await getLogoBase64()

    const docDefinition: TDocumentDefinitions = {
        pageOrientation: orientation,
        content: [
            { text: "Сводный отчет по проделанным работам (в общем)", style: "header" },
            {
                image: logoBase64,
                width: 30,
                absolutePosition: { x: 800, y: 10 }
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
            fontSize: 16,
            bold: true,
            margin: [0, 0, 0, 10],
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
    const orientation = "landscape" as const;

    const logoBase64 = await getLogoBase64()

    const docDefinition: TDocumentDefinitions = {
        pageOrientation: orientation,
        content: [
            { text: "Сводный отчет по принятым машинам (по ст.)", style: "header" },
            {
                image: logoBase64,
                width: 30,
                absolutePosition: { x: 800, y: 10 }
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
            fontSize: 16,
            bold: true,
            margin: [0, 0, 0, 10],
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
    const orientation = "landscape" as const;

    const logoBase64 = await getLogoBase64()

    const docDefinition: TDocumentDefinitions = {
        pageOrientation: orientation,
        content: [
            { text: "Сводный отчет по принятым машинам (в общем)", style: "header" },
            {
                image: logoBase64,
                width: 30,
                absolutePosition: { x: 800, y: 10 }
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
            fontSize: 16,
            bold: true,
            margin: [0, 0, 0, 10],
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
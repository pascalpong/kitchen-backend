import * as QRCode from 'qrcode';
import * as fs from 'fs';

const opts: QRCode.QRCodeToDataURLOptions = {
    errorCorrectionLevel: 'L',
    type: 'image/png',
    margin: 1,
    color: {
        dark: "#000000",
        light: "#FFFFFF"
    }
};

const generateQRCode = async (url: string, outputFilePath: string) => {
    try {
        const qrCodeURL = await QRCode.toDataURL(url, opts);
        const base64Data = qrCodeURL.replace(/^data:image\/png;base64,/, "");
        const binaryData = Buffer.from(base64Data, 'base64');

        fs.writeFile(outputFilePath, binaryData, 'base64', (err) => {
            if (err) {
                console.error('Error writing file', err);
            } else {
                return outputFilePath;
            }
        });
    } catch (err) {
        console.error('Error generating QR Code', err);
    }
};

export { generateQRCode }
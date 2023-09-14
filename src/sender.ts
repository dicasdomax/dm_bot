import { create, Whatsapp, SocketState, CatchQR } from 'venom-bot';
import parsePhoneNumber from 'libphonenumber-js';

export type QRCode = {
    base64Qr: string;
    attempts: number|undefined;
};

class Sender {
    private client: Whatsapp;
    private connected: boolean;
    private qr: QRCode;

    get isConnected(): boolean {
        return this.connected;
    }

    get qrCode(): QRCode {
        return this.qr;
    }

    constructor() {
        this.initialize();
    }

    async sendText(to: string, body: string) {
        if (!parsePhoneNumber(to, 'BR')) {
            throw new Error('Número Inválido!');
        }

        let phoneNumber = parsePhoneNumber(to, 'BR')
            ?.format('E.164')
            .replace('+', '') as string;

        phoneNumber = phoneNumber.includes('@c.us')
            ? phoneNumber
            : `${phoneNumber}@c.us`;

        await this.client.sendText(phoneNumber, body);
    }

    async sendFile(to: string, path: string, fileName: string, body: string) {
        if (!parsePhoneNumber(to, 'BR')) {
            throw new Error('Número Inválido!');
        }

        let phoneNumber = parsePhoneNumber(to, 'BR')
            ?.format('E.164')
            .replace('+', '') as string;

        phoneNumber = phoneNumber.includes('@c.us')
            ? phoneNumber
            : `${phoneNumber}@c.us`;

        await this.client.sendFile(phoneNumber, path, fileName, body);
    }

    async sendImage(to: string, path: string, imageName: string, body: string) {
        if (!parsePhoneNumber(to, 'BR')) {
            throw new Error('Número Inválido!');
        }

        let phoneNumber = parsePhoneNumber(to, 'BR')
            ?.format('E.164')
            .replace('+', '') as string;

        phoneNumber = phoneNumber.includes('@c.us')
            ? phoneNumber
            : `${phoneNumber}@c.us`;

        await this.client.sendImage(phoneNumber, path, imageName, body);
    }

    async sendLinkPreview(to: string, url: string, body: string) {
        if (!parsePhoneNumber(to, 'BR')) {
            throw new Error('Número Inválido!');
        }

        let phoneNumber = parsePhoneNumber(to, 'BR')
            ?.format('E.164')
            .replace('+', '') as string;

        phoneNumber = phoneNumber.includes('@c.us')
            ? phoneNumber
            : `${phoneNumber}@c.us`;

        await this.client.sendLinkPreview(phoneNumber, url, body);
    }

    private initialize() {
        const configureCatchQR: CatchQR = (base64Qr, asciiQR, attempts) => {
            this.qr = { base64Qr, attempts };
        };

        const status = (statusSession: string) => {
            this.connected = ['isLogged', 'qrReadSuccess', 'chatAvailable'].includes(
                statusSession
            );
            console.log(statusSession);
        };

        const start = (client: Whatsapp) => {
            this.client = client;

            client.onStateChange((state) => {
                this.connected = state === SocketState.CONNECTED;
            });
        }

        create({
            session: 'sessao1',
            statusFind: status,
            catchQR: configureCatchQR, // Use a função configureCatchQR para configurar o catchQR
        })
            .then((client) => start(client))
            .catch((error) => console.error(error));
    }
}

export default Sender;

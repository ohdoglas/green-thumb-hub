import crypto from 'crypto';

export default async function generateConfirmationToken(): Promise<string> {
    const string = await crypto.randomBytes(32).toString('hex');
    return string  // Gera um token de 64 caracteres hexadecimais
}
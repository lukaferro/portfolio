/**
 * Script per generare il link "Save to Google Wallet" tramite JWT firmato con Service Account (RS256).
 *
 * Requisiti:
 * 1. Crea un account su Google Pay & Wallet Console: https://pay.google.com/business/console
 * 2. Ottieni il tuo ISSUER_ID.
 * 3. Crea una Service Account su Google Cloud Console e scarica la chiave privata JSON (service-account-key.json).
 * 4. Associa l'email del Service Account all'Issuer Account su Google Wallet Console.
 *
 * Utilizzo:
 * node google-wallet/generate-pass.js --issuerId=YOUR_ISSUER_ID --keyPath=path/to/service-account-key.json
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function base64UrlEncode(str) {
  return Buffer.from(str)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

function parseArgs() {
  const args = {};
  for (const arg of process.argv.slice(2)) {
    if (arg.startsWith('--')) {
      const [key, value] = arg.slice(2).split('=');
      args[key] = value;
    }
  }
  return args;
}

function main() {
  const args = parseArgs();
  const issuerId = args.issuerId || process.env.GOOGLE_WALLET_ISSUER_ID || '3388000000023238791';
  const keyPath = args.keyPath || process.env.GOOGLE_WALLET_KEY_PATH || path.join(__dirname, 'service-account-key.json');

  console.log('--- Google Wallet Pass Generator ---');
  console.log(`Issuer ID: ${issuerId}`);
  console.log(`Key Path: ${keyPath}`);

  let privateKey = null;
  let clientEmail = 'your-service-account@project.iam.gserviceaccount.com';

  if (fs.existsSync(keyPath)) {
    try {
      const keyJson = JSON.parse(fs.readFileSync(keyPath, 'utf8'));
      privateKey = keyJson.private_key;
      clientEmail = keyJson.client_email;
      console.log(`Caricata chiave per Service Account: ${clientEmail}`);
    } catch (err) {
      console.warn('Avviso: impossibile leggere il file chiave specificato:', err.message);
    }
  } else {
    console.warn(`File ${keyPath} non trovato. Verrà generato il payload JSON di esempio per la console.`);
  }

  // Load genericClass and genericObject templates
  const classTemplateRaw = fs.readFileSync(path.join(__dirname, 'generic-class.json'), 'utf8');
  const objectTemplateRaw = fs.readFileSync(path.join(__dirname, 'generic-object.json'), 'utf8');

  const genericClass = JSON.parse(classTemplateRaw.replace(/\$\{ISSUER_ID\}/g, issuerId));
  const genericObject = JSON.parse(objectTemplateRaw.replace(/\$\{ISSUER_ID\}/g, issuerId));

  const jwtClaims = {
    iss: clientEmail,
    aud: 'google',
    origins: ['https://portfolio-five-sand-51.vercel.app'],
    typ: 'savetowallet',
    payload: {
      genericClasses: [genericClass],
      genericObjects: [genericObject]
    }
  };

  if (!privateKey) {
    console.log('\n=== JWT Payload (Da firmare o usare via Google Wallet API) ===');
    console.log(JSON.stringify(jwtClaims, null, 2));
    console.log('\nPer generare il link finale, posiziona il file "service-account-key.json" nella cartella google-wallet/');
    console.log('oppure passa --issuerId e --keyPath come argomenti.');
    return;
  }

  // RS256 JWT Generation using standard Node crypto
  const header = {
    alg: 'RS256',
    typ: 'JWT'
  };

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(jwtClaims));
  const signingInput = `${encodedHeader}.${encodedPayload}`;

  const signer = crypto.createSign('RSA-SHA256');
  signer.update(signingInput);
  const signature = signer.sign(privateKey);
  const encodedSignature = signature
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

  const jwt = `${signingInput}.${encodedSignature}`;
  const saveUrl = `https://pay.google.com/gp/v/save/${jwt}`;

  console.log('\n=== LINK GENERATO "SALVA IN GOOGLE WALLET" ===');
  console.log(saveUrl);
  console.log('\nPuoi aprire questo link da qualsiasi dispositivo (Android, iOS o Desktop con account Google)');
  console.log('per aggiungere istantaneamente la tua Digital Business Card in Google Wallet!');

  fs.writeFileSync(path.join(__dirname, 'last-generated-link.txt'), saveUrl, 'utf8');
}

main();

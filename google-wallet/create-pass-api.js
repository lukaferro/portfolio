const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

async function getAccessToken(key) {
  const now = Math.floor(Date.now() / 1000);
  const header = Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT' })).toString('base64url');
  const claim = Buffer.from(JSON.stringify({
    iss: key.client_email,
    scope: 'https://www.googleapis.com/auth/wallet_object.issuer',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now
  })).toString('base64url');
  
  const signer = crypto.createSign('RSA-SHA256');
  signer.update(header + '.' + claim);
  const sig = signer.sign(key.private_key, 'base64url');
  const assertion = header + '.' + claim + '.' + sig;
  
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion
    })
  });
  
  const tokenData = await res.json();
  if (!tokenData.access_token) {
    throw new Error('Impossibile ottenere token OAuth2: ' + JSON.stringify(tokenData));
  }
  return tokenData.access_token;
}

async function main() {
  const keyPath = path.join(__dirname, 'service-account-key.json');
  if (!fs.existsSync(keyPath)) {
    console.error('File service-account-key.json non trovato!');
    return;
  }
  
  const key = JSON.parse(fs.readFileSync(keyPath, 'utf8'));
  console.log('Autenticazione in corso per:', key.client_email);
  
  const token = await getAccessToken(key);
  console.log('Token ottenuto con successo!');
  
  const issuerId = '3388000000023238791';
  const classId = `${issuerId}.business_card_luca_ferro`;
  const objectId = `${issuerId}.luca_ferro_card_001`;
  
  const genericClass = JSON.parse(fs.readFileSync(path.join(__dirname, 'generic-class.json'), 'utf8'));
  const genericObject = JSON.parse(fs.readFileSync(path.join(__dirname, 'generic-object.json'), 'utf8'));
  
  // 1. Check or Create Class
  console.log('Verifica classe:', classId);
  const classRes = await fetch(`https://walletobjects.googleapis.com/walletobjects/v1/genericClass/${classId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  
  if (classRes.status === 404) {
    console.log('Classe non trovata, creazione in corso...');
    const createRes = await fetch('https://walletobjects.googleapis.com/walletobjects/v1/genericClass', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(genericClass)
    });
    const createData = await createRes.json();
    if (!createRes.ok) {
      console.error('Errore creazione classe:', createData);
      return;
    }
    console.log('Classe creata con successo!');
  } else if (!classRes.ok) {
    const errData = await classRes.json();
    console.error('Errore controllo classe:', errData);
    return;
  } else {
    console.log('Classe già esistente.');
  }
  
  // 2. Check or Create Object
  console.log('Verifica oggetto:', objectId);
  const objRes = await fetch(`https://walletobjects.googleapis.com/walletobjects/v1/genericObject/${objectId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  
  if (objRes.status === 404) {
    console.log('Oggetto non trovato, creazione in corso...');
    const createObjRes = await fetch('https://walletobjects.googleapis.com/walletobjects/v1/genericObject', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(genericObject)
    });
    const objData = await createObjRes.json();
    if (!createObjRes.ok) {
      console.error('Errore creazione oggetto:', objData);
      return;
    }
    console.log('Oggetto creato con successo!');
  } else if (!objRes.ok) {
    const errData = await objRes.json();
    console.error('Errore controllo oggetto:', errData);
    return;
  } else {
    console.log('Oggetto già esistente.');
  }
  
  // 3. Generate clean JWT with just the object reference
  const jwtClaims = {
    iss: key.client_email,
    aud: 'google',
    origins: ['https://portfolio-five-sand-51.vercel.app'],
    typ: 'savetowallet',
    payload: {
      genericObjects: [{ id: objectId }]
    }
  };
  
  const header = Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT' })).toString('base64url');
  const payload = Buffer.from(JSON.stringify(jwtClaims)).toString('base64url');
  const signer = crypto.createSign('RSA-SHA256');
  signer.update(header + '.' + payload);
  const signature = signer.sign(key.private_key, 'base64url');
  
  const jwt = `${header}.${payload}.${signature}`;
  const saveUrl = `https://pay.google.com/gp/v/save/${jwt}`;
  
  console.log('\n=============================================');
  console.log('LINK UFFICIALE DEFINITIVO "SALVA IN WALLET":');
  console.log(saveUrl);
  console.log('=============================================\n');
}

main().catch(console.error);

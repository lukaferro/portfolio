# Guida Completa alla Configurazione del Pass "Digital Business Card" per Google Wallet

Questa guida descrive i passaggi per configurare, emettere e distribuire il pass personalizzato di Google Wallet per il biglietto da visita digitale di **Luca Ferro**.

---

## 1. Architettura del Pass Google Wallet

Il pass utilizza le API ufficiali di Google Wallet basate sulla risorsa **Generic Pass** (Pass Generico).
È composto da due entità:
1. **Generic Class (`generic-class.json`)**: Il modello/template globale che definisce la struttura, il tipo di barcode (QR Code verso `https://portfolio-five-sand-51.vercel.app/card`) e la tipologia di titolari.
2. **Generic Object (`generic-object.json`)**: L'istanza effettiva del biglietto da visita contenente:
   - Header: **Luca Ferro**
   - Subheader: **Frontend Web Developer**
   - Immagine profilo / Logo e Hero banner
   - Moduli di testo: Email, Telefono, Sede (Varese, IT), Competenze Core
   - Collegamenti diretti: Sito Portfolio, LinkedIn, GitHub, Chiamata telefonica, Download diretto file vCard `.vcf`.

---

## 2. Prerequisiti: Registrazione su Google Pay & Wallet Console

1. Accedi alla [Google Pay & Wallet Console](https://pay.google.com/business/console).
2. Seleziona **Google Wallet API** e clicca su **Build your first pass**.
3. Accetta i Termini di Servizio per creare il tuo profilo Emittente (**Issuer Account**).
4. Copia il tuo **Issuer ID** numerico (es. `3388000000022345678`).

---

## 3. Configurazione Google Cloud & Service Account

1. Vai su [Google Cloud Console](https://console.cloud.google.com/).
2. Crea un progetto o seleziona un progetto esistente.
3. Abilita l'API **Google Wallet API**.
4. Vai su **IAM & Amministrazione** > **Account di servizio (Service Accounts)**.
5. Clicca su **Crea account di servizio**:
   - Nome: `google-wallet-issuer`
   - Ruolo: non è necessario un ruolo GCP particolare.
6. Clicca sull'account di servizio creato > scheda **Chiavi (Keys)** > **Aggiungi chiave** > **Crea nuova chiave** > Tipo **JSON**.
7. Salva il file scaricato rinominandolo in:
   `google-wallet/service-account-key.json`
8. **IMPORTANTE**: Torna nella [Google Pay & Wallet Console](https://pay.google.com/business/console) nella sezione **Users / Access management** e aggiungi l'email del tuo Service Account (es. `google-wallet-issuer@tuo-progetto.iam.gserviceaccount.com`) con ruolo **Developer** o **Admin**.

---

## 4. Generazione del Link "Aggiungi a Google Wallet"

All'interno del terminale del progetto, esegui il seguente comando inserendo il tuo effettivo Issuer ID:

```bash
node google-wallet/generate-pass.js --issuerId=IL_TUO_ISSUER_ID --keyPath=google-wallet/service-account-key.json
```

Lo script:
1. Inserisce il tuo `ISSUER_ID` all'interno della classe e dell'oggetto.
2. Firma il JWT con algoritmo **RS256** utilizzando la chiave privata del tuo Service Account.
3. Restituisce il link formattato:
   `https://pay.google.com/gp/v/save/<JWT>`
4. Salva il link nel file `google-wallet/last-generated-link.txt`.

---

## 5. Distribuzione ed Utilizzo

Puoi condividere o utilizzare il link del pass in diversi modi:

1. **Aggiunta diretta dallo smartphone**: Aprendo il link generato da uno smartphone Android (o browser desktop con account Google), apparirà la schermata ufficiale di Google Wallet con il pulsante **"Salva in Google Wallet"**.
2. **Pulsante sul Portfolio / Landing Card**: Nel file `src/app/pages/card/card.component.html`, puoi inserire il link generato all'interno del modale Google Wallet o direttamente sotto forma di pulsante ufficiale "Add to Google Wallet".
3. **NFC Tag**: Puoi scrivere questo URL all'interno di una card NFC fisica (tag NTAG213 / NTAG215) per trasferire istantaneamente la card e il pass toccando qualsiasi smartphone moderno!

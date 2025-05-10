# 🔐 Password Web Service

Un semplice Web Service RESTful per la generazione, validazione e verifica di password tramite Node.js + Express.

## 🚀 Funzionalità implementate

Il servizio espone i seguenti **4 endpoint**:

---
# ENDPOINT /password 

### 1. `GET /generate`

Genera una password sicura personalizzata.

#### Parametri Query:
| Parametro         | Tipo    | Default  | Descrizione                                      |
|-------------------|---------|----------|--------------------------------------------------|
| `length`          | Number  | `12`     | Lunghezza della password da generare            |
| `base`            | String  | `passwdGenN` | Prefisso della password generata         |
| `uppercase`       | Boolean | `true`   | Includere lettere maiuscole                     |
| `digits`          | Boolean | `true`   | Includere numeri                                |
| `special_chars`   | Boolean | `true`   | Includere caratteri speciali                    |



#### Esempio richiesta:
```http
GET /password/generate?length=16&uppercase=true&digits=true&special_chars=false
```
#### Esempio di risposta

```json
{
  "password": "passwdGen0aHkdpflkwhDPoiw"
}

```

### oppure

#### Esempio richiesta:
```http
GET /password/generate?length=16&base&uppercase=true&digits=true&special_chars=false
```
#### Esempio di risposta

```json
{
  "password": "aHkdpflkwhDPoiw"
}
```

### 1. `POST /validate`

🧪 Valida la robustezza di una password secondo regole predefinite.

🔍 Requisiti controllati:

Lunghezza minima: 10 caratteri

Almeno un numero

Almeno una lettera maiuscola

Almeno un carattere speciale

#### Esempio richiesta: 
```http
POST /password/validate
```

### 📅 Corpo richiesta:

```json
{
  "password": "passwdGendsoabybncq!"
}
```

#### Esempio di risposta

```json
{
  "password": "passwdGendsoabybncq",
  "validation": false,
  "problems": [
    "Manca un numero.",
    "Manca un carattere speciale."
  ],
  "strength": "buona"
}
```
#### oppure

### 📅 Corpo richiesta:

```json
{
  "password": "passwdGendsoabybncq0!"
}
```

#### Esempio di risposta

```json
{
  "password": "passwdGendsoabybncq0|!",
  "validation": true,
  "strength": "ottimale"
}
```
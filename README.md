# 🔐 Password Web Service

Un semplice Web Service RESTful per la generazione, validazione e verifica di password tramite Node.js + Express.

## 🚀 Funzionalità implementate

Il servizio espone i seguenti **4 endpoint**:

---

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

### 1. `POST /generate`

🧪 Valida la robustezza di una password secondo regole predefinite.
### 📅 Corpo richiesta:

```json
{
  "password": "Passw0rd!"
}
```
🔍 Requisiti controllati:
Lunghezza minima: 10 caratteri

Almeno un numero

Almeno una lettera maiuscola

Almeno un carattere speciale
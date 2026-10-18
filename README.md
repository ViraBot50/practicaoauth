# Práctica OAuth 2.0: iniciar sesión con Discord (Jose Brayan S.A)

Página en **Next.js** con un botón **"Continuar con GitHub"** usando OAuth 2.0 a través de [Auth.js](https://authjs.dev). Después de iniciar sesión muestra el nombre, correo y foto que la app recibió, sin conocer nunca la contraseña.

La práctica para el grupo está en **[PRACTICA.md](PRACTICA.md)**: agregar un segundo botón (Twitch u otro proveedor).

## Archivos importantes

```
auth.ts                              Configuración de OAuth: aquí se agregan los proveedores
app/page.tsx                         Página: botones de inicio de sesión y datos del usuario
app/api/auth/[...nextauth]/route.ts  Rutas de OAuth (login, callback, logout)
.env.local                           Tus credenciales (NO se sube a GitHub)
```

## 1. Credenciales de GitHub

1. Abre [github.com/settings/applications/new](https://github.com/settings/applications/new).
2. Llena:
   - **Application name:** `Práctica OAuth`
   - **Homepage URL:** `http://localhost:3000`
   - **Authorization callback URL:** `http://localhost:3000/api/auth/callback/github`
3. Pulsa **Register application**.
4. Copia el **Client ID**. Pulsa **Generate a new client secret** y copia el secreto en ese momento (solo se muestra una vez).

## 2. Correr en tu computadora

Necesitas [Node.js 20 o superior](https://nodejs.org). En la carpeta del proyecto:

```bash
npm install
cp .env.example .env.local
npx auth secret
open -e .env.local
```

`npx auth secret` agrega `AUTH_SECRET` a `.env.local` automáticamente. En el archivo que se abre, pega tus credenciales y guarda:

```
AUTH_GITHUB_ID=tu-client-id
AUTH_GITHUB_SECRET=tu-client-secret
```

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

> En Windows usa `copy` en lugar de `cp` y abre `.env.local` con el Bloc de notas.

## 3. Subir a GitHub

Crea un repositorio vacío en [github.com/new](https://github.com/new) y en la carpeta del proyecto:

```bash
git init
git add .
git commit -m "Práctica OAuth 2.0"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/oauth-demo.git
git push -u origin main
```

## 4. Desplegar en Vercel

1. En [vercel.com](https://vercel.com) entra con GitHub → **Add New → Project** → importa el repositorio.
2. En **Environment Variables** agrega `AUTH_SECRET`, `AUTH_GITHUB_ID` y `AUTH_GITHUB_SECRET` (copia los valores de tu `.env.local`).
3. **Deploy.** Obtendrás una URL como `https://oauth-demo-xxxx.vercel.app`.
4. Una OAuth App de GitHub acepta solo una callback URL. Crea una segunda OAuth App para producción con Homepage `https://oauth-demo-xxxx.vercel.app` y callback `https://oauth-demo-xxxx.vercel.app/api/auth/callback/github`, y usa sus credenciales en Vercel.

> Usa el dominio de producción de Vercel; las URLs de *preview* cambian y el proveedor las rechazará.

## Problemas comunes

| Error | Solución |
| --- | --- |
| *Falta configurar las credenciales* | Revisa que `.env.local` tenga `AUTH_SECRET` y las credenciales, y reinicia `npm run dev`. |
| `redirect_uri_mismatch` | La URL de callback no está registrada exactamente igual en el proveedor. |
| Agregaste variables y no funcionan | Detén el servidor (Ctrl + C) y vuelve a correr `npm run dev`. |

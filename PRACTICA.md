# Práctica: agrega tu propio botón de inicio de sesión

La página ya permite **iniciar sesión con GitHub** usando OAuth 2.0. Tu tarea es agregar **otro proveedor**: Twitch, Discord o Google.

**Tiempo estimado:** 20–30 minutos.
**Necesitas:** Node.js 20+, el proyecto descargado y una cuenta del proveedor que elijas.

## Paso 1. Registra tu app en el proveedor

Cada proveedor te da un **Client ID** y un **Client Secret**. Al registrar la app, pon como URL de redireccionamiento:

```
http://localhost:3000/api/auth/callback/<proveedor>
```

| Proveedor | Dónde registrar la app | URL de redireccionamiento |
| --- | --- | --- |
| **Twitch** | [dev.twitch.tv/console/apps](https://dev.twitch.tv/console/apps) → *Registra tu aplicación* (categoría *Website Integration*, cliente *Confidencial*) | `http://localhost:3000/api/auth/callback/twitch` |
| Discord | [discord.com/developers/applications](https://discord.com/developers/applications) → *New Application* → *OAuth2* | `http://localhost:3000/api/auth/callback/discord` |

> **Twitch** pide tener activada la **verificación en dos pasos** en tu cuenta antes de registrar apps. Después de crearla, entra a *Administrar* y pulsa *Nuevo secreto* para obtener el Client Secret.

## Paso 2. Agrega las credenciales

En el archivo `.env.local` agrega (ejemplo con Twitch):

```
AUTH_TWITCH_ID=tu-client-id
AUTH_TWITCH_SECRET=tu-client-secret
```

Para Discord serían `AUTH_DISCORD_ID` y `AUTH_DISCORD_SECRET`.

## Paso 3. Agrega el proveedor en `auth.ts`

Quita las barras `//` de las dos líneas marcadas con `PRÁCTICA`:

```ts
import Twitch from "next-auth/providers/twitch";

const providers: Provider[] = [
  GitHub,
  Twitch,
];
```

Para Discord: `import Discord from "next-auth/providers/discord";` y agrega `Discord` a la lista.

## Paso 4. Prueba

Detén el servidor con **Ctrl + C**, corre `npm run dev` y abre [http://localhost:3000](http://localhost:3000). Debe aparecer el botón **"Continuar con Twitch"**. Inicia sesión y revisa los datos que recibió la app.

## Preguntas para entregar

1. ¿Qué permisos te pidió el proveedor en la pantalla de consentimiento?
2. ¿Qué datos recibió la app? ¿Por qué no recibió tu contraseña?
3. ¿Para qué sirve la URL de redireccionamiento? ¿Qué pasa si escribes una distinta?
4. En los roles de OAuth, ¿quién es el cliente, el servidor de autorización y el propietario del recurso en tu práctica?
5. ¿Qué diferencia hubo entre configurar GitHub y configurar tu proveedor?

**Entrega:** captura de la página con los dos botones, captura después de iniciar sesión con tu proveedor, y las respuestas.

import { auth, providerList, signIn, signOut } from "@/auth";

// Color de cada botón según el proveedor. Si agregas uno que no está aquí, usa el color por defecto.
const BRAND: Record<string, { bg: string; fg: string; border?: string }> = {
  google: { bg: "#ffffff", fg: "#1f1f1f", border: "#dadce0" },
  twitch: { bg: "#9146ff", fg: "#ffffff" },
  github: { bg: "#24292f", fg: "#ffffff" },
  discord: { bg: "#5865f2", fg: "#ffffff" },
  spotify: { bg: "#1db954", fg: "#000000" },
};

const ERRORS: Record<string, string> = {
  AccessDenied: "Cancelaste el permiso en la pantalla de consentimiento.",
  Configuration: "Falta configurar las credenciales del proveedor. Revisa el archivo .env.local.",
  OAuthCallbackError: "El proveedor regresó un error. Revisa que la URL de redireccionamiento esté registrada.",
};

export default async function Home({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const session = await auth();
  const { error } = await searchParams;

  if (session?.user) {
    const { user } = session;
    return (
      <>
        <section className="card welcome">
          {user.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={user.image} alt="" width={88} height={88} className="avatar" referrerPolicy="no-referrer" />
          )}
          <div>
            <p className="eyebrow">Sesión iniciada con {session.provider ?? "OAuth"}</p>
            <h1 className="h1-small">Hola, {user.name ?? "usuario"}</h1>
            {user.email && <p className="muted">{user.email}</p>}
          </div>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <button className="btn btn-outline" type="submit">Cerrar sesión</button>
          </form>
        </section>

        <section className="grid grid-2">
          <div className="card">
            <h3>Datos que recibió la app</h3>
            <p className="muted small">Solo lo que autorizaste en la pantalla de consentimiento. Nunca tu contraseña.</p>
            <pre>{JSON.stringify(user, null, 2)}</pre>
          </div>
          <div className="card">
            <h3>¿Qué pasó al dar clic?</h3>
            <ol className="mini-steps">
              <li>La app te mandó a {session.provider ?? "el proveedor"} con su <code>client_id</code> y los permisos que pide.</li>
              <li>Iniciaste sesión allá y aceptaste los permisos.</li>
              <li>El proveedor te regresó a <code>/api/auth/callback/{session.provider}</code> con un código de un solo uso.</li>
              <li>El servidor de la app cambió ese código por un <strong>access token</strong>.</li>
              <li>Con el token, la app pidió tu nombre, correo y foto, y creó tu sesión.</li>
            </ol>
          </div>
        </section>
      </>
    );
  }

  return (
    <section className="login-wrap">
      <div className="card login">
        <p className="eyebrow">Práctica · OAuth 2.0</p>
        <h1 className="h1-small">Iniciar sesión</h1>
        <p className="muted">Entra con una cuenta que ya tienes. La app no conocerá tu contraseña.</p>

        {error && <p className="alert alert-bad">{ERRORS[error] ?? `Error: ${error}`}</p>}

        <div className="providers">
          {providerList.map((provider) => {
            const brand = BRAND[provider.id] ?? { bg: "#15203b", fg: "#f5f2ec" };
            return (
              <form
                key={provider.id}
                action={async () => {
                  "use server";
                  await signIn(provider.id, { redirectTo: "/" });
                }}
              >
                <button
                  type="submit"
                  className="btn btn-provider"
                  style={{ background: brand.bg, color: brand.fg, borderColor: brand.border ?? brand.bg }}
                >
                  Continuar con {provider.name}
                </button>
              </form>
            );
          })}
        </div>
        <p className="muted small hint">
          ¿Solo ves un botón? La práctica es agregar otro botón (Twitch, GitHub, Discord…) en <code>auth.ts</code>.
        </p>
      </div>
    </section>
  );
}

import '../styles/splash.css'

export interface SplashVisualProps {
  /** Título principal exibido abaixo do anel. */
  title?: string
  /** Linha de apoio abaixo do título. */
  subtitle?: string
  /** Quando `true`, aplica o fade-out de saída (opacidade 0). */
  isExiting?: boolean
  /**
   * Caminho público da logo. Padrão: servida da raiz (`/public`).
   * Se preferir importar o asset pelo bundler, passe a URL importada aqui.
   */
  logoSrc?: string
}

/**
 * Splash visual autônomo do Finvexys Finance.
 *
 * Contém SOMENTE a identidade visual original: o anel luminoso azul/ciano
 * (arco "cometa" com gradiente + orbe líder), os glows de profundidade, o
 * fundo (véu claro sobre a onda) e a logo oficial.
 *
 * NÃO inclui AuthContext, serviços financeiros, APIs, rotas nem a lógica de
 * inicialização (os antigos "passos de boot" e os ícones lucide-react foram
 * removidos). A redução de movimento é tratada 100% por CSS
 * (`@media (prefers-reduced-motion: reduce)`), sem necessidade de JavaScript.
 */
export function SplashVisual({
  title = 'Preparando seu ambiente financeiro...',
  subtitle = 'Ambiente de demonstração Finvexys Finance',
  isExiting = false,
  logoSrc = '/finvexys-logo-sidebar-cropped.png',
}: SplashVisualProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Preparando seu ambiente financeiro"
      className={`fvx-splash${isExiting ? ' is-exiting' : ''}`}
    >
      <div className="fvx-splash__inner">
        <div className="fvx-ring">
          {/* Glows difusos (azul + ciano) para profundidade premium */}
          <div className="fvx-ring__glow fvx-ring__glow--primary" aria-hidden />
          <div className="fvx-ring__glow fvx-ring__glow--cyan" aria-hidden />

          {/* Anel SVG (viewBox 0 0 100 100) */}
          <svg className="fvx-ring__svg" viewBox="0 0 100 100" aria-hidden>
            <defs>
              {/* Gradiente do arco: azul-escuro -> azul -> ciano */}
              <linearGradient
                id="fvx-splash-arc"
                gradientUnits="userSpaceOnUse"
                x1="6"
                y1="50"
                x2="94"
                y2="50"
              >
                <stop offset="0%" stopColor="#0a1f6b" />
                <stop offset="50%" stopColor="#1a73ff" />
                <stop offset="100%" stopColor="#33e6ff" />
              </linearGradient>
            </defs>

            {/* Camadas de profundidade (estáticas) */}
            <circle cx="50" cy="50" r="47.5" fill="none" strokeWidth="0.75" stroke="rgba(34,211,238,0.20)" />
            <circle cx="50" cy="50" r="44" fill="none" strokeWidth="3.5" stroke="rgba(37,99,235,0.12)" />
            <circle cx="50" cy="50" r="40.5" fill="none" strokeWidth="0.75" stroke="rgba(37,99,235,0.10)" />

            {/* Cometa (arco 72% + glow em camadas + orbe líder). Só este grupo gira. */}
            <g className="fvx-ring__rotor">
              <circle
                cx="50"
                cy="50"
                r="44"
                fill="none"
                stroke="url(#fvx-splash-arc)"
                strokeWidth="15.5"
                strokeLinecap="round"
                pathLength={100}
                strokeDasharray="72 28"
                opacity="0.07"
              />
              <circle
                cx="50"
                cy="50"
                r="44"
                fill="none"
                stroke="url(#fvx-splash-arc)"
                strokeWidth="8.8"
                strokeLinecap="round"
                pathLength={100}
                strokeDasharray="72 28"
                opacity="0.18"
              />
              <circle
                cx="50"
                cy="50"
                r="44"
                fill="none"
                stroke="url(#fvx-splash-arc)"
                strokeWidth="2.6"
                strokeLinecap="round"
                pathLength={100}
                strokeDasharray="72 28"
              />
              {/* Orbe líder na ponta do arco (~259,2°): halos concêntricos */}
              <circle cx="41.8" cy="6.8" r="7.8" fill="#bfffff" opacity="0.12" />
              <circle cx="41.8" cy="6.8" r="4.4" fill="#bfffff" opacity="0.30" />
              <circle cx="41.8" cy="6.8" r="2.1" fill="#bfffff" />
            </g>
          </svg>

          {/* Logo oficial imutável — estável, proporções preservadas */}
          <img className="fvx-ring__logo" src={logoSrc} alt="Finvexys Finance" />
        </div>

        <h1 className="fvx-splash__title">{title}</h1>
        <p className="fvx-splash__subtitle">{subtitle}</p>
      </div>
    </div>
  )
}

export default SplashVisual

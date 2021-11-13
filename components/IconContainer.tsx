import Link from "next/link"

type IconProps = {
  children: any
  href?: string
  mailTo?: Boolean
  action?: () => void
  color: string
  cursor?:string
}

type LinkProps = {
  children: any
  color: string
  cursor?:string
}

const IconFormatter = ({ children, color, cursor = 'pointer' }: LinkProps) => {
  return (
    <span className="footer-link">
      {children}
      <style jsx>{`
        .footer-link {
          cursor: ${cursor};
          color: lightgray;
          transition: color 2s;
        }

        .footer-link:hover {
          color: ${color};
        }
      `}</style>
    </span>
  )
}

export const IconContainer = ({
  children,
  href,
  mailTo,
  color,
  action,
  cursor
}: IconProps) => {
  if (mailTo)
    return (
      <a href={`mailto:${href}`} style={{ marginLeft: 20 }}>
        <IconFormatter {...{ color, cursor }}>{children}</IconFormatter>
      </a>
    )

  if (href)
    return (
      <Link href={href}>
        <a style={{ marginLeft: 20 }}>
          <IconFormatter {...{ color, cursor  }}>{children}</IconFormatter>
        </a>
      </Link>
    )

  return (
    <a onClick={action}>
      <IconFormatter {...{ color, cursor  }}>{children}</IconFormatter>
    </a>
  )
}

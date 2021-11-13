import Link from "next/link"

type IconProps = {
  children: any
  href: string
  mailTo?: Boolean
  color: string
}

type LinkProps = {
  children: any
  color: string
}

const LinkContainer = ({ children, color }: LinkProps) => {
  return (
    <span className="footer-link">
      {children}
      <style jsx>{`
        .footer-link {
          margin-left: 20px;
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

export const IconContainer = ({ children, href, mailTo, color }: IconProps) => {
  if (mailTo)
    return (
      <a href={`mailto:${href}`}>
        <LinkContainer {...{ color }}>{children}</LinkContainer>
      </a>
    )

  return (
    <Link href={href}>
      <a>
        <LinkContainer {...{ color }}>{children}</LinkContainer>
      </a>
    </Link>
  )
}

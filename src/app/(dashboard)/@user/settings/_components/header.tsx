
type HeaderProps = {
  title: string;
  subtitle?: string;
  description?: string;
}

export function Header({ title , subtitle, description }: HeaderProps) {
  return (
    <>
              <h1 className="text-3xl font-bold ">{title}</h1>
              <h2 className="text-2xl font-bold text-blue-600">{subtitle}</h2>
              <p className=" text-sm text-slate-500">
                {description}
              </p>

    </>
  )
}
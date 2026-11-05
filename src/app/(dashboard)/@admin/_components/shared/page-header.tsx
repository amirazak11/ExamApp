import { Fragment } from "react"
import Link from "next/link"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

interface PageHeaderProps {
  breadcrumbs: { label: string; href?: string }[]
  title?: string
  subtitle?: React.ReactNode
  leading?: React.ReactNode
  actions?: React.ReactNode
}

export function PageHeader({
  breadcrumbs,
  title,
  subtitle,
  leading,
  actions,
}: PageHeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200">
      <Breadcrumb className="px-6 py-3">
        <BreadcrumbList className="text-xs">
          {breadcrumbs.map((item, index) => (
            <Fragment key={index}>
              <BreadcrumbItem className="max-w-64">
                {item.href ? (
                  <BreadcrumbLink asChild className="truncate">
                    <Link href={item.href}>{item.label}</Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage className="truncate text-blue-600">
                    {item.label}
                  </BreadcrumbPage>
                )}
              </BreadcrumbItem>
              {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
            </Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>

      {(title || leading || actions) && (
        <div className="flex items-center justify-between gap-4 border-t border-gray-100 px-6 py-4">
          <div className="min-w-0">
            {leading}
            {title && (
              <h1 className="truncate text-lg font-semibold text-gray-900">
                {title}
              </h1>
            )}
            {subtitle && <div className="text-xs text-gray-500">{subtitle}</div>}
          </div>
          {actions && (
            <div className="flex shrink-0 items-center gap-2">{actions}</div>
          )}
        </div>
      )}
    </header>
  )
}

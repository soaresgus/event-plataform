interface ButtonProps {
    title: string
    variant: 'primary' | 'secondary'
    extraStyles?: string
    icon?: any
    href?: string
    [attr: string]: any
}

const ButtonStyles = {
    'primary': 'p-4 text-sm bg-green-500 flex items-center rounded font-bold uppercase gap-2 justify-center hover:bg-green-700 transition-colors',
    'secondary': 'p-4 text-sm border border-blue-500 text-blue-500 flex items-center rounded font-bold uppercase gap-2 justify-center hover:bg-blue-500 hover:text-gray-900 transition-colors',
}

export function Button({ title, href, extraStyles, variant, icon, ...rest }: ButtonProps) {
    return (
        href
            ? (
                <a href={href} {...rest} className={`${ButtonStyles[variant]} ${extraStyles}`}>
                    {icon ?? icon}
                    {title}
                </a>
            ) :
            (
                <button {...rest} className={`${ButtonStyles[variant]} ${extraStyles}`}>
                    {icon ?? icon}
                    {title}
                </button>
            )
    )
}
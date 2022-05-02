import Link from "next/link";

interface LinkProps {
    href: string;
    text: string
}

export default function LinkComponent({ href, text }: LinkProps) {
    return (
        <Link href={href}>
            <a className="w-full h-auto">{text}</a>
        </Link>
    );
}
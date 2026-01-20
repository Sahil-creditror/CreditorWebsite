import Image from "next/image";
import Link from "next/link";

interface BackButtonProps {
    href?: string;
    text?: string;
}

const Backbutton = ({ href = "/", text = "Back" }: BackButtonProps) => {
    return (
        <Link href={href} className="group flex gap-3 items-center w-fit bg-primary hover:bg-secondary dark:border dark:border-primary dark:hover:border dark:hover:border-white/30 rounded-full transition-all duration-500 ease-in-out">
            <Image src={"https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883669/creditor-website-assets/images/Icon/back-btn.svg"} alt="Image" width={42} height={42} className="group-hover:translate-x-16.5 transform transition-transform duration-500 ease-in-out"/>
            <span className="pr-4 text-lg font-bold text-secondary group-hover:text-white group-hover:-translate-x-10 transform transition-transform duration-500 ease-in-out">{text}</span>
        </Link>
    );
};

export default Backbutton;

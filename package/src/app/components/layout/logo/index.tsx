import Image from 'next/image';
import Link from 'next/link';

const Logo = (props: { sticky: boolean }) => {
    const { sticky } = props;
    return (
        <Link href="/" className={sticky ? "opacity-100 transition-opacity duration-300" : "opacity-0 pointer-events-none transition-opacity duration-300"}>
            <Image
                src={sticky ? "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883695/creditor-website-assets/images/logo/creditorlogowhite.png" : "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883691/creditor-website-assets/images/logo/creditorlogo.png"}
                alt="logo"
                width={200}
                height={150}
                quality={100}
                priority
                className="hidden xsm:block w-28 md:w-40 lg:w-52 h-auto"
                />
            <Image src={sticky ? "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883706/creditor-website-assets/images/logo/logo_roadmap.png" : "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883706/creditor-website-assets/images/logo/logo_roadmap.png"} alt='logo' width={40} height={40} className='block xsm:hidden' />
        </Link>
    );
};

export default Logo;

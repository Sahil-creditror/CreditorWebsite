import Image from 'next/image';
import Link from 'next/link';

const Logo = (props: { sticky: boolean }) => {
    const { sticky } = props;
    return (
        <Link href="/">
            <Image
                src={sticky ? "/images/logo/creditorlogowhite.png" : "/images/logo/creditorlogoblack.png"}
                alt="logo"
                width={200}
                height={150}
                quality={100}
                priority
                className="hidden xsm:block w-28 md:w-40 lg:w-52 h-auto"
                />
            <Image src={sticky ? "/images/logo/logo_roadmap.png" : "/images/logo/logo_roadmap.png"} alt='logo' width={40} height={40} className='block xsm:hidden' />
        </Link>
    );
};

export default Logo;

import Image from "next/image";
import Slider from "react-infinite-logo-slider";

const Logoslider = ({ logo }: { logo?: { light: string; dark: string } }) => {
    return (
        <Slider.Slide>
            <Image
                src={logo?.light || ""}
                alt="partner logo"
                height={80}
                width={200}
                className="block dark:hidden"
                loading="lazy"
            />
            
            <Image
                src={logo?.dark || ""}
                alt="partner logo"
                height={80}
                width={200}
                className="hidden dark:block"
                loading="lazy"
            />
        </Slider.Slide>
    );
};

export default Logoslider;

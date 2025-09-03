import Image from "next/image"
import { useEffect, useState } from "react";

const Footer = () => {
    const [footerData, setFooterData] = useState<any>(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/layout-data')
                if (!res.ok) throw new Error('Failed to fetch')
                const data = await res.json()
                setFooterData(data?.footerData)
            } catch (error) {
                console.error('Error fetching services:', error)
            }
        }
        fetchData()
    }, [])

    return (
        <footer>
            <div className="bg-secondary py-10 md:py-20 xl:py-40">
                <div className="container">
                    <div className="flex flex-col xl:flex-row gap-10 xl:gap-0">

                        <div className="flex flex-col gap-10 xl:max-w-xl xl:w-1/3 w-full">
                            {footerData?.tagline &&
                                <h2 className="text-white xl:max-w-xl">{footerData?.tagline}</h2>
                            }
                            <div className='flex flex-col gap-2'>
                                {footerData && footerData?.info?.map((value: any, index: any) => {
                                    return (
                                        <div key={index}>
                                            <a href={value.href} className='flex gap-4'>
                                                <Image src={value.icon} alt="icon" width={24} height={24} />
                                                <span className='text-white hover:text-primary text-lg'>{value.link}</span>
                                            </a>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 w-full gap-10 md:gap-0">
                            <div className='flex flex-col gap-3'>
                                <h4 className='text-white font-medium'>Legal & Policies</h4>
                                <ul className='flex flex-col gap-1.5'>
                                    <li>
                                        <a href="/privacy-policy" className='text-lg text-white hover:text-primary'>Privacy Policies</a>
                                    </li>
                                    <li>
                                        <a href="/terms-and-conditions" className='text-lg text-white hover:text-primary'>Terms and Condition</a>
                                    </li>
                                    <li>
                                        <a href="/return-refund" className='text-lg text-white hover:text-primary'>Return and Refunds</a>
                                    </li>
                                    <li>
                                        <a href="/tncmasterclass" className='text-lg text-white hover:text-primary'>Membership Terms and Conditions</a>
                                    </li>
                                </ul>
                            </div>

                            <div className='flex flex-col gap-3'>
                                <h4 className='text-white font-medium'>Contact Us</h4>
                                <ul className='flex flex-col gap-1.5'>
                                    <li>
                                        <a href="mailto:counselor@creditoracademy.com" className='text-lg text-white hover:text-primary'>counselor@creditoracademy.com</a>
                                    </li>
                                    <li>
                                        <a href="tel:+14254009246" className='text-lg text-white hover:text-primary'>(425-400-9246)</a>
                                    </li>
                                    <li>
                                        <span className='text-lg text-white'>9:00 AM to 5:00 PM EST</span>
                                    </li>
                                </ul>
                            </div>

                            <div className='flex flex-col gap-3'>
                                <h4 className='text-white font-medium'>Social Links</h4>
                                <p className='text-white/70 text-base'>Follow us on social media to stay updated with our latest news and offerings.</p>
                                <ul className='flex flex-col gap-1.5'>
                                    <li>
                                        <a href="#" className='text-lg text-white hover:text-primary'>Facebook</a>
                                    </li>
                                    <li>
                                        <a href="#" className='text-lg text-white hover:text-primary'>X</a>
                                    </li>
                                    <li>
                                        <a href="#" className='text-lg text-white hover:text-primary'>YouTube</a>
                                    </li>
                                    <li>
                                        <a href="#" className='text-lg text-white hover:text-primary'>Rumble</a>
                                    </li>
                                    <li>
                                        <a href="#" className='text-lg text-white hover:text-primary'>TikTok</a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className="bg-secondary border-t border-white/10">
                <div className="container py-6">
                    <p className='text-center text-white/70 text-sm'>© Creditor Academy 2025</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
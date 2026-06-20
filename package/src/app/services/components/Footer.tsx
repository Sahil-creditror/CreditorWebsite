"use client";

import Image from "next/image"
import { useEffect, useState } from "react";

const Footer = () => {
    const [footerData, setFooterData] = useState<any>(null);
    const socials = [
        { name: 'Facebook', href: 'https://www.facebook.com/groups/1455118361753321/', icon: 'https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883527/creditor-website-assets/images/footer/facebook.png' },
        { name: 'X', href: 'https://x.com/CreditorAcademy', icon: 'https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883533/creditor-website-assets/images/footer/twitter.png' },
        { name: 'YouTube', href: 'https://www.youtube.com/@creditoracademy', icon: 'https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883538/creditor-website-assets/images/footer/youtube.png' },
        { name: 'Rumble', href: 'https://rumble.com/user/CreditorAcademy', icon: 'https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883531/creditor-website-assets/images/footer/rumble.png' },
        { name: 'TikTok', href: 'https://www.tiktok.com/@creditoracademy', icon: 'https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883532/creditor-website-assets/images/footer/tiktok.png' },
    ];
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
                    <div className="flex flex-col xl:flex-row gap-10 xl:gap-12">

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

                        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 w-full gap-8 md:gap-10 xl:gap-12">
                            <div className='flex flex-col gap-3'>
                                <h4 className='text-white font-medium'>Lawful & Policies</h4>
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
                                        <a href="/signup" className='text-lg text-white hover:text-primary'>Membership Terms and Conditions</a>
                                    </li>
                                </ul>
                            </div>

                            <div className='flex flex-col gap-3'>
                                <h4 className='text-white font-medium'>Contact Us</h4>
                                <ul className='flex flex-col gap-1.5'>
                                    <li>
                                        <a href="mailto:counselor@creditoracademy.com" className='flex items-center gap-3 text-lg text-white hover:text-primary'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                                <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 2v.01L12 12 4 6.01V6h16zM4 18V8.24l8 5.76 8-5.76V18H4z"/>
                                            </svg>
                                            <span>counselor@creditoracademy.com</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="tel:+14254009246" className='flex items-center gap-3 text-lg text-white hover:text-primary'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                                <path d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.11.37 2.31.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.4 21 3 13.6 3 4a1 1 0 0 1 1-1h3.49a1 1 0 0 1 1 1c0 1.27.19 2.47.57 3.58a1 1 0 0 1-.25 1.01l-2.19 2.2z"/>
                                            </svg>
                                            <span>(425-400-9246)</span>
                                        </a>
                                    </li>
                                    <li>
                                        <div className='flex items-center gap-3 text-lg text-white'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                                <path d="M12 1a11 11 0 1 0 11 11A11.013 11.013 0 0 0 12 1zm0 20a9 9 0 1 1 9-9 9.01 9.01 0 0 1-9 9zm.5-9.59V6h-2v7h6v-2h-4z"/>
                                            </svg>
                                            <span>9:00 AM to 5:00 PM EST</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <div className='flex flex-col gap-3'>
                                <h4 className='text-white font-medium'>Social Links</h4>
                                <p className='text-white/70 text-base'>Follow us on social media to stay updated with our latest news and offerings.</p>
                                <ul className='flex flex-row flex-wrap gap-3'>
                                    {socials.map((s) => (
                                        <li key={s.name}>
                                            <a
                                                href={s.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className='inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors group rounded-full border border-white/15 bg-white/5 px-3 py-1.5 hover:bg-primary hover:border-primary'
                                                aria-label={s.name}
                                            >
                                                <img src={s.icon} alt={`${s.name} icon`} width={20} height={20} loading="lazy" className="transition-transform group-hover:scale-105" />
                                                <span className='text-sm font-medium'>{s.name}</span>
                                            </a>
                                        </li>
                                    ))}
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

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
                                <ul className='flex flex-row items-center gap-4'>
                                    <li>
                                        <a href="https://www.facebook.com/groups/1455118361753321/" target="_blank" rel="noopener noreferrer" aria-label="Facebook group" className='text-white hover:text-primary'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22 12.07C22 6.49 17.52 2 11.94 2S2 6.49 2 12.07c0 5.02 3.66 9.19 8.44 9.93v-7.02H7.9v-2.91h2.54V9.41c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.23.2 2.23.2v2.45h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.91h-2.34V22c4.78-.74 8.44-4.91 8.44-9.93z"/></svg>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://x.com/CreditorAcademy" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className='text-white hover:text-primary'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2H21l-6.5 7.433L22 22h-6.873l-4.79-6.263L4.82 22H2l7.06-8.07L2 2h6.99l4.367 5.79L18.244 2zm-2.4 18h2.3L8.24 4H5.83l10.014 16z"/></svg>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.youtube.com/@creditoracademy" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className='text-white hover:text-primary'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.498 6.186a3.004 3.004 0 0 0-2.116-2.127C19.531 3.5 12 3.5 12 3.5s-7.531 0-9.382.559A3.004 3.004 0 0 0 .502 6.186C0 8.043 0 12 0 12s0 3.957.502 5.814a3.004 3.004 0 0 0 2.116 2.127C4.469 20.5 12 20.5 12 20.5s7.531 0 9.382-.559a3.004 3.004 0 0 0 2.116-2.127C24 15.957 24 12 24 12s0-3.957-.502-5.814zM9.75 15.568V8.432L15.818 12 9.75 15.568z"/></svg>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://rumble.com/user/CreditorAcademy" target="_blank" rel="noopener noreferrer" aria-label="Rumble" className='text-white hover:text-primary'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21.77 10.37c2.226 3.86-2.778 9.222-8.482 11.998-5.705 2.776-10.74 2.353-12.965-1.508-2.225-3.86 1.27-8.72 6.974-11.495C12.999 6.586 19.544 6.51 21.77 10.37zM6.88 9.93c-4.27 2.078-6.783 5.808-5.06 8.79 1.723 2.98 6.79 3.18 11.06 1.103 4.27-2.078 8.38-6.497 6.657-9.478-1.723-2.98-8.386-2.493-12.657-.415zm8.72 2.44c1.088.53 1.087 2.73 0 3.26l-5.37 2.62c-1.09.53-2.23-.19-2.23-1.63V11.38c0-1.44 1.14-2.16 2.23-1.63l5.37 2.62z"/></svg>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.tiktok.com/@creditoracademy" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className='text-white hover:text-primary'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21 8.5a6.5 6.5 0 0 1-5.5-6.42h-3.2v12.3a3.38 3.38 0 1 1-3.38-3.38c.23 0 .46.02.68.07V7.83A6.58 6.58 0 0 0 6.5 7 6.5 6.5 0 1 0 13 13.5V9.7a9.7 9.7 0 0 0 6 2V8.5z"/></svg>
                                        </a>
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
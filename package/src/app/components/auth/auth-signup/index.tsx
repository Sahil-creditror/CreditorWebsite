"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";


const AuthSignup = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        phone: "",
        gender: "male",
        dob: "",
        organization_id: "be68e945-b827-4905-8b44-62126364d1b7"
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await fetch("http://localhost:9000/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.success) {
                setSuccess(true);
                if (data.accessToken) {
                    localStorage.setItem("token", data.accessToken);
                }
                setTimeout(() => {
                    router.push("/");
                }, 2000);
            } else {
                setError(data.message || "Registration failed. Please try again.");
            }
        } catch (err) {
            setError("Something went wrong. Please check your connection.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="py-20 bg-lightgray dark:bg-darkblack min-h-[calc(100vh-80px)]">
            <div className="container overflow-hidden">
                <div className="max-w-4xl mx-auto flex flex-col md:flex-row bg-white dark:bg-twilliteblack rounded-[40px] shadow-2xl overflow-hidden border border-secondary/5 dark:border-white/5 transition-all duration-500">
                    {/* Left Column - Branding/Info */}
                    <div className="md:w-5/12 bg-primary p-10 flex flex-col justify-center text-white relative">
                        <div className="relative z-10">
                            <h2 className="text-white text-3xl md:text-4xl mb-6">Join Creditor Academy</h2>
                            <p className="text-white/80 text-lg mb-8">
                                Start your journey towards financial mastery today. Create your account and access premium resources.
                            </p>
                            <ul className="space-y-4">
                                {["Expert Courses", "Financial Tools", "Community Support"].map((item, index) => (
                                    <li key={index} className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="20 6 9 17 4 12"></polyline>
                                            </svg>
                                        </div>
                                        <span className="font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {/* Decorative Elements */}
                        <div className="absolute top-[-50px] left-[-50px] w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-[-100px] right-[-50px] w-64 h-64 bg-secondary/20 rounded-full blur-3xl"></div>
                    </div>

                    {/* Right Column - Form */}
                    <div className="md:w-7/12 p-8 md:p-12 relative overflow-hidden">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-2xl font-bold text-secondary dark:text-white">Create Account</h3>
                            <div className="text-sm text-secondary/60 dark:text-white/60">
                                <Link href="https://lmsathena.com/login" className="text-primary font-bold hover:underline">Sign In</Link>
                            </div>
                        </div>

                        {error && (
                            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-2xl text-sm font-medium border border-red-100 dark:border-red-900/30 flex items-center gap-3">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                                {error}
                            </div>
                        )}

                        {success ? (
                            <div className="text-center py-10">
                                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                </div>
                                <h4 className="text-2xl font-bold mb-2">Registration Successful!</h4>
                                <p className="text-secondary/60 dark:text-white/60">Welcome to the community. Redirecting to home...</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="flex flex-col">
                                        <label className="text-xs font-bold uppercase tracking-wider text-secondary/40 dark:text-white/40 mb-2 px-1">First Name</label>
                                        <input
                                            type="text"
                                            name="first_name"
                                            placeholder="First Name"
                                            required
                                            className="w-full px-5 py-4 rounded-2xl bg-lightgray dark:bg-darkblack border border-transparent focus:border-primary focus:bg-white dark:focus:bg-twilliteblack transition-all outline-none text-secondary dark:text-white font-medium signup-input"
                                            value={formData.first_name}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="text-xs font-bold uppercase tracking-wider text-secondary/40 dark:text-white/40 mb-2 px-1">Last Name</label>
                                        <input
                                            type="text"
                                            name="last_name"
                                            placeholder="Last Name"
                                            required
                                            className="w-full px-5 py-4 rounded-2xl bg-lightgray dark:bg-darkblack border border-transparent focus:border-primary focus:bg-white dark:focus:bg-twilliteblack transition-all outline-none text-secondary dark:text-white font-medium signup-input"
                                            value={formData.last_name}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col">
                                    <label className="text-xs font-bold uppercase tracking-wider text-secondary/40 dark:text-white/40 mb-2 px-1">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="your@email.com"
                                        required
                                        className="w-full px-5 py-4 rounded-2xl bg-lightgray dark:bg-darkblack border border-transparent focus:border-primary focus:bg-white dark:focus:bg-twilliteblack transition-all outline-none text-secondary dark:text-white font-medium signup-input"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="flex flex-col">
                                        <label className="text-xs font-bold uppercase tracking-wider text-secondary/40 dark:text-white/40 mb-2 px-1">Phone Number</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            placeholder="Phone Number"
                                            required
                                            className="w-full px-5 py-4 rounded-2xl bg-lightgray dark:bg-darkblack border border-transparent focus:border-primary focus:bg-white dark:focus:bg-twilliteblack transition-all outline-none text-secondary dark:text-white font-medium signup-input"
                                            value={formData.phone}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="text-xs font-bold uppercase tracking-wider text-secondary/40 dark:text-white/40 mb-2 px-1">Date of Birth</label>
                                        <input
                                            type="date"
                                            name="dob"
                                            required
                                            className="w-full px-5 py-4 rounded-2xl bg-lightgray dark:bg-darkblack border border-transparent focus:border-primary focus:bg-white dark:focus:bg-twilliteblack transition-all outline-none text-secondary dark:text-white font-medium signup-input"
                                            value={formData.dob}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="flex flex-col">
                                        <label className="text-xs font-bold uppercase tracking-wider text-secondary/40 dark:text-white/40 mb-2 px-1">Password</label>
                                        <input
                                            type="password"
                                            name="password"
                                            placeholder="••••••••"
                                            required
                                            className="w-full px-5 py-4 rounded-2xl bg-lightgray dark:bg-darkblack border border-transparent focus:border-primary focus:bg-white dark:focus:bg-twilliteblack transition-all outline-none text-secondary dark:text-white font-medium signup-input"
                                            value={formData.password}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="text-xs font-bold uppercase tracking-wider text-secondary/40 dark:text-white/40 mb-2 px-1">Gender</label>
                                        <select
                                            name="gender"
                                            value={formData.gender}
                                            onChange={handleChange}
                                            className="w-full px-5 py-4 rounded-2xl bg-lightgray dark:bg-darkblack border border-transparent focus:border-primary focus:bg-white dark:focus:bg-twilliteblack transition-all outline-none text-secondary dark:text-white font-medium appearance-none"
                                        >
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-primary hover:bg-secondary text-white font-bold py-5 rounded-2xl shadow-[0_10px_20px_-5px_rgba(2,111,226,0.3)] hover:shadow-none transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 disabled:opacity-70 flex items-center justify-center gap-3"
                                >
                                    {loading ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            Processing...
                                        </>
                                    ) : (
                                        "Create Account"
                                    )}
                                </button>
                            </form>
                        )}
                        
                        <p className="mt-8 text-center text-[10px] text-secondary/40 dark:text-white/40 max-w-xs mx-auto">
                            By clicking "Create Account", you agree to our <Link href="#" className="underline">Terms of Service</Link> and <Link href="#" className="underline">Privacy Policy</Link>.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AuthSignup;

"use client";

import React, { useMemo, useState } from "react";

type Option = { label: string; value: string };

type Owner = {
	firstName: string;
	lastName: string;
	title: string;
	ownershipPercent: string;
	personalPhone: string;
	individualWithControl: string;
	address: string;
	city: string;
	state: string;
	zip: string;
	dlNumber: string;
	dlStateIssued: string;
	dlIssueDate: string;
	dlExpDate: string;
	dob: string;
	ssn: string;
	priorBankruptcy: string;
};

type PercentGroup = {
	ecommerce: string;
	cardPresentRetail: string;
	cardPresentKeyed: string;
	moto: string;
};

type MarketGroup = {
	b2c: string;
	b2b: string;
	government: string;
};

type SalesProfile = {
	extendedObligations: string;
	usesAffiliateMarketing: string;
	advertisingMethod: string;
	straightSaleBilling: string;
	monthlyBilling: string;
	averageTicket: string;
	highTicket: string;
	monthlyVolume: string;
	annualVolume: string;
	initiationPercent: PercentGroup;
	marketPercent: MarketGroup;
};

type CustomerService = {
	whoProvides: string;
	centerName: string;
	phone: string;
	email: string;
};

type Fulfillment = {
	whoProvides: string;
	whereStored: string;
	fulfillmentHouseName: string;
	shippingService: string;
	deliveryTimeFrame: string;
};

type BankInfo = {
	accountType: string;
	bankName: string;
	nameOnAccount: string;
	routingNumber: string;
	accountNumber: string;
};

type ContactDetails = {
	firstName: string;
	lastName: string;
	phone: string;
	email: string;
	chargebackNotification: string;
	chargebackEmail: string;
};

type LegalOverview = {
	legalName: string;
	entityType: string;
	tinType: string;
	federalTaxId: string;
	legalAddress: string;
	legalSuite: string;
	legalCity: string;
	legalState: string;
	legalZip: string;
	legalPhone: string;
	legalEmail: string;
};

type Mailing = {
	address: string;
	suite: string;
	city: string;
	state: string;
	zip: string;
};

type DbaOverview = {
	dbaName: string;
	businessType: string;
	businessStartDate: string;
	yearsInBusiness: string;
	address: string;
	suite: string;
	city: string;
	state: string;
	zip: string;
	locationType: string;
	squareFeet: string;
	phone: string;
	email: string;
	verticalType: string;
	productsAndServices: string;
	website: string;
	cardHolderDescriptor: string;
};

type SupportingDocuments = {
	articlesOfOrg?: File | null;
	ss4Letter?: File | null;
	voidedCheck?: File | null;
	governmentId?: File | null;
	businessStatement1?: File | null;
	businessStatement2?: File | null;
	businessStatement3?: File | null;
	personalStatement1?: File | null;
	personalStatement2?: File | null;
	personalStatement3?: File | null;
	customerServiceAgreement?: File | null;
	fulfillmentAgreement?: File | null;
	crmAgreement?: File | null;
	chargebackAgreement?: File | null;
	coa?: File | null;
};

type FormState = {
	legal: LegalOverview;
	mailing: Mailing;
	contact: ContactDetails;
	owners: Owner[];
	dba: DbaOverview;
	sales: SalesProfile;
	customerService: CustomerService;
	fulfillment: Fulfillment;
	bank: BankInfo;
	documents: SupportingDocuments;
};

const states: Option[] = [
	{ label: "Select an Option", value: "" },
	{ label: "AL", value: "AL" },
	{ label: "AK", value: "AK" },
	{ label: "AZ", value: "AZ" },
	{ label: "AR", value: "AR" },
	{ label: "CA", value: "CA" },
	{ label: "CO", value: "CO" },
	{ label: "CT", value: "CT" },
	{ label: "DE", value: "DE" },
	{ label: "DC", value: "DC" },
	{ label: "FL", value: "FL" },
	{ label: "GA", value: "GA" },
	{ label: "HI", value: "HI" },
	{ label: "ID", value: "ID" },
	{ label: "IL", value: "IL" },
	{ label: "IN", value: "IN" },
	{ label: "IA", value: "IA" },
	{ label: "KS", value: "KS" },
	{ label: "KY", value: "KY" },
	{ label: "LA", value: "LA" },
	{ label: "ME", value: "ME" },
	{ label: "MD", value: "MD" },
	{ label: "MA", value: "MA" },
	{ label: "MI", value: "MI" },
	{ label: "MN", value: "MN" },
	{ label: "MS", value: "MS" },
	{ label: "MO", value: "MO" },
	{ label: "MT", value: "MT" },
	{ label: "NE", value: "NE" },
	{ label: "NV", value: "NV" },
	{ label: "NH", value: "NH" },
	{ label: "NJ", value: "NJ" },
	{ label: "NM", value: "NM" },
	{ label: "NY", value: "NY" },
	{ label: "NC", value: "NC" },
	{ label: "ND", value: "ND" },
	{ label: "OH", value: "OH" },
	{ label: "OK", value: "OK" },
	{ label: "OR", value: "OR" },
	{ label: "PA", value: "PA" },
	{ label: "RI", value: "RI" },
	{ label: "SC", value: "SC" },
	{ label: "SD", value: "SD" },
	{ label: "TN", value: "TN" },
	{ label: "TX", value: "TX" },
	{ label: "UT", value: "UT" },
	{ label: "VT", value: "VT" },
	{ label: "VA", value: "VA" },
	{ label: "WA", value: "WA" },
	{ label: "WV", value: "WV" },
	{ label: "WI", value: "WI" },
	{ label: "WY", value: "WY" },
];

const yesNo: Option[] = [
	{ label: "Select an Option", value: "" },
	{ label: "Yes", value: "yes" },
	{ label: "No", value: "no" },
];

const selectDefault: Option = { label: "Select an Option", value: "" };

const initialOwner = (): Owner => ({
	firstName: "",
	lastName: "",
	title: "",
	ownershipPercent: "",
	personalPhone: "",
	individualWithControl: "",
	address: "",
	city: "",
	state: "",
	zip: "",
	dlNumber: "",
	dlStateIssued: "",
	dlIssueDate: "",
	dlExpDate: "",
	dob: "",
	ssn: "",
	priorBankruptcy: "",
});

const initialForm: FormState = {
	legal: {
		legalName: "",
		entityType: "",
		tinType: "",
		federalTaxId: "",
		legalAddress: "",
		legalSuite: "",
		legalCity: "",
		legalState: "",
		legalZip: "",
		legalPhone: "",
		legalEmail: "",
	},
	mailing: { address: "", suite: "", city: "", state: "", zip: "" },
	contact: {
		firstName: "",
		lastName: "",
		phone: "",
		email: "",
		chargebackNotification: "",
		chargebackEmail: "",
	},
	owners: [initialOwner()],
	dba: {
		dbaName: "",
		businessType: "",
		businessStartDate: "",
		yearsInBusiness: "",
		address: "",
		suite: "",
		city: "",
		state: "",
		zip: "",
		locationType: "",
		squareFeet: "",
		phone: "",
		email: "",
		verticalType: "",
		productsAndServices: "",
		website: "",
		cardHolderDescriptor: "",
	},
	sales: {
		extendedObligations: "",
		usesAffiliateMarketing: "",
		advertisingMethod: "",
		straightSaleBilling: "",
		monthlyBilling: "",
		averageTicket: "",
		highTicket: "",
		monthlyVolume: "",
		annualVolume: "",
		initiationPercent: {
			ecommerce: "",
			cardPresentRetail: "",
			cardPresentKeyed: "",
			moto: "",
		},
		marketPercent: { b2c: "", b2b: "", government: "" },
	},
	customerService: { whoProvides: "", centerName: "", phone: "", email: "" },
	fulfillment: { whoProvides: "", whereStored: "", fulfillmentHouseName: "", shippingService: "", deliveryTimeFrame: "" },
	bank: { accountType: "", bankName: "", nameOnAccount: "", routingNumber: "", accountNumber: "" },
	documents: {},
};

function Section({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
	const [open, setOpen] = useState(defaultOpen);
	return (
		<section className="mb-6">
			<div className="relative rounded-md border border-secondary/20 dark:border-white/20 p-4">
				<div className="flex items-center">
					<h3 className="text-xl md:text-2xl font-semibold">{title}</h3>
					<button
						type="button"
						aria-expanded={open}
						aria-controls={`${title.replace(/\s+/g, "-").toLowerCase()}-content`}
						onClick={() => setOpen((v) => !v)}
						className="ml-auto inline-flex h-8 w-8 md:h-9 md:w-9 items-center justify-center rounded-full bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 transition focus:outline-none focus:ring-2 focus:ring-blue-300 dark:text-blue-400 dark:bg-blue-400/10 dark:hover:bg-blue-400/20 dark:focus:ring-blue-500"
					>
						<span className="sr-only">Toggle section</span>
						<svg
							className={`h-6 w-6 transition-transform ${open ? "rotate-180" : "rotate-0"}`}
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth={2.5}
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path d="M6 9l6 6 6-6" />
						</svg>
					</button>
				</div>
				{open && (
					<div id={`${title.replace(/\s+/g, "-").toLowerCase()}-content`} className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
						{children}
					</div>
				)}
			</div>
		</section>
	);
}

function Label({ children, required }: { children: React.ReactNode; required?: boolean }) {
	return (
		<label className="text-sm font-medium">
			{children} {required && <span className="text-red-500">*</span>}
		</label>
	);
}

function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
	return (
		<input
			{...props}
			className={`w-full border-b border-secondary/20 px-2 py-3 outline-none transition dark:border-white/20 focus:border-secondary/60 dark:focus:border-primary ${props.className ?? ""}`}
		/>
	);
}

function PasswordInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
	const [visible, setVisible] = useState(false);
	return (
		<div className="relative">
			<input
				{...props}
				type={visible ? "text" : "password"}
				className={`w-full border-b border-secondary/20 pr-10 px-2 py-3 outline-none transition dark:border-white/20 focus:border-secondary/60 dark:focus:border-primary ${props.className ?? ""}`}
			/>
			<button
				type="button"
				className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex h-7 w-7 items-center justify-center rounded-full text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:text-blue-400 dark:hover:bg-white/10"
				onClick={() => setVisible((v) => !v)}
				aria-label={visible ? "Hide value" : "Show value"}
			>
				{visible ? (
					<svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
						<path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-5 0-9.27-3.11-11-7.5a11.64 11.64 0 0 1 3.22-4.5" />
						<path d="M1 1l22 22" />
						<path d="M9.9 4.24A10.94 10.94 0 0 1 12 4c5 0 9.27 3.11 11 7.5a11.64 11.64 0 0 1-2.22 3.34" />
						<path d="M14.12 14.12A3 3 0 0 1 9.88 9.88" />
					</svg>
				) : (
					<svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
						<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
						<circle cx="12" cy="12" r="3" />
					</svg>
				)}
			</button>
		</div>
	);
}

// Utilities for date formatting/parsing
function formatDateISO(d: Date) {
	const yyyy = d.getFullYear();
	const mm = String(d.getMonth() + 1).padStart(2, "0");
	const dd = String(d.getDate()).padStart(2, "0");
	return `${yyyy}-${mm}-${dd}`;
}
function parseDateISO(v?: string): Date | null {
	if (!v) return null;
	const parts = v.split("-");
	if (parts.length !== 3) return null;
	const [y, m, d] = parts.map((n) => Number(n));
	if (!y || !m || !d) return null;
	const date = new Date(y, m - 1, d);
	return isNaN(date.getTime()) ? null : date;
}

function useOutsideClick<T extends HTMLElement>(ref: React.RefObject<T>, handler: () => void) {
	React.useEffect(() => {
		function onClick(e: MouseEvent) {
			if (!ref.current) return;
			if (!ref.current.contains(e.target as Node)) handler();
		}
		document.addEventListener("mousedown", onClick);
		return () => document.removeEventListener("mousedown", onClick);
	}, [ref, handler]);
}

function DateInput({ value, onChange, placeholder, className, required }: { value?: string; onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; placeholder?: string; className?: string; required?: boolean }) {
	const [open, setOpen] = useState(false);
	const containerRef = React.useRef<HTMLDivElement>(null);
	useOutsideClick(containerRef as unknown as React.RefObject<HTMLElement>, () => setOpen(false));

	const selectedDate = parseDateISO(value);
	const [cursor, setCursor] = useState<Date>(() => selectedDate || new Date());

	function changeMonth(delta: number) {
		setCursor((prev) => new Date(prev.getFullYear(), prev.getMonth() + delta, 1));
	}

	function changeYear(delta: number) {
		setCursor((prev) => new Date(prev.getFullYear() + delta, prev.getMonth(), 1));
	}

	function handleSelect(day: number) {
		const chosen = new Date(cursor.getFullYear(), cursor.getMonth(), day);
		const iso = formatDateISO(chosen);
		if (onChange) {
			const event = { target: { value: iso } } as unknown as React.ChangeEvent<HTMLInputElement>;
			onChange(event);
		}
		setOpen(false);
	}

	const year = cursor.getFullYear();
	const month = cursor.getMonth();
	const firstDay = new Date(year, month, 1).getDay();
	const daysInMonth = new Date(year, month + 1, 0).getDate();
	const weeks: Array<Array<number | null>> = [];
	let current = 1;
	for (let w = 0; w < 6; w++) {
		const row: Array<number | null> = [];
		for (let d = 0; d < 7; d++) {
			const cellIndex = w * 7 + d;
			if (cellIndex < firstDay || current > daysInMonth) {
				row.push(null);
			} else {
				row.push(current++);
			}
		}
		weeks.push(row);
	}

	const today = new Date();
	const isToday = (d: number) => d === today.getDate() && month === today.getMonth() && year === today.getFullYear();
	const isSelected = (d: number) => selectedDate && d === selectedDate.getDate() && month === selectedDate.getMonth() && year === selectedDate.getFullYear();

	return (
		<div ref={containerRef} className={`relative ${className ?? ""}`}>
			<button type="button" onClick={() => setOpen((v) => !v)} className="w-full text-left rounded-md border border-secondary/30 bg-white px-3 py-2 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-300 dark:bg-transparent dark:border-white/20" aria-expanded={open} aria-haspopup="dialog">
				{value || placeholder || "Select date"}
			</button>
			{open && (
				<div className="absolute z-10 mt-2 w-72 rounded-lg border border-secondary/20 bg-white p-3 shadow-lg dark:bg-neutral-900 dark:border-white/10">
				<div className="flex items-center justify-between mb-2">
					<div className="flex items-center gap-1">
						<button type="button" onClick={() => changeMonth(-1)} aria-label="Previous month" className="inline-flex h-8 w-8 items-center justify-center rounded-full text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:text-blue-400 dark:hover:bg-white/10">
							<svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
						</button>
					</div>
					<div className="flex items-center gap-2">
						<div className="text-sm font-semibold">{cursor.toLocaleString(undefined, { month: "long" })}</div>
						<select
							aria-label="Select year"
							className="rounded-md border border-secondary/30 bg-white px-2 py-1 text-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-300 dark:bg-neutral-900 dark:border-white/20"
							value={year}
							onChange={(e) => {
								const newYear = Number(e.target.value);
								if (!isNaN(newYear)) {
									setCursor(new Date(newYear, month, 1));
								}
							}}
						>
							{Array.from({ length: 201 }, (_, i) => year - 100 + i).map((y) => (
								<option key={y} value={y}>{y}</option>
							))}
						</select>
					</div>
					<div className="flex items-center gap-1">
						<button type="button" onClick={() => changeMonth(1)} aria-label="Next month" className="inline-flex h-8 w-8 items-center justify-center rounded-full text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:text-blue-400 dark:hover:bg-white/10">
							<svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
						</button>
					</div>
					</div>
					<div className="grid grid-cols-7 gap-1 text-center text-xs text-neutral-500">
						<div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
					</div>
					<div className="mt-1 grid grid-cols-7 gap-1">
						{weeks.flat().map((d, i) => (
							<div key={i} className="h-9">
								{d ? (
									<button type="button" onClick={() => handleSelect(d)} className={`w-full h-9 rounded-md text-sm transition
										${isSelected(d) ? "bg-blue-600 text-white" : isToday(d) ? "border border-blue-300 text-blue-700" : "hover:bg-blue-50 text-neutral-700"}
									`}>
										{d}
									</button>
								) : (
									<span className="inline-block w-full h-9" />
								)}
							</div>
						))}
					</div>
				</div>
			)}
			<input type="hidden" value={value} onChange={onChange} required={required} />
		</div>
	);
}

function SelectInput({ options, value, onChange, className }: React.SelectHTMLAttributes<HTMLSelectElement> & { options: Option[] }) {
	const [open, setOpen] = useState(false);
	const wrapperRef = React.useRef<HTMLDivElement>(null);
	useOutsideClick(wrapperRef as unknown as React.RefObject<HTMLElement>, () => setOpen(false));
	const selected = options.find((o) => o.value === value) || options[0];

	function selectValue(val: string) {
		if (onChange) {
			const event = { target: { value: val } } as unknown as React.ChangeEvent<HTMLSelectElement>;
			onChange(event);
		}
		setOpen(false);
	}

	return (
		<div ref={wrapperRef} className={`relative ${className ?? ""}`}>
			<button type="button" onClick={() => setOpen((v) => !v)} className="w-full rounded-md border border-secondary/30 bg-white px-3 py-2 text-left outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-300 dark:bg-transparent dark:border-white/20">
				{selected?.label}
				<svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-600 dark:text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
			</button>
			{open && (
				<ul className="absolute z-10 mt-2 max-h-60 w-full overflow-auto rounded-md border border-secondary/20 bg-white p-1 shadow-lg dark:bg-neutral-900 dark:border-white/10">
					{options.map((o) => (
						<li key={o.value || o.label}>
							<button type="button" onClick={() => selectValue(o.value)} className={`w-full rounded-md px-3 py-2 text-left text-sm transition hover:bg-blue-50 hover:text-blue-700 ${o.value === value ? "bg-blue-600 text-white hover:bg-blue-600 hover:text-white" : "text-neutral-700"}`}>
								{o.label}
							</button>
						</li>
					))}
				</ul>
			)}
			<select className="sr-only" value={value} onChange={onChange}>
				{options.map((o) => (
					<option key={o.value} value={o.value}>{o.label}</option>
				))}
			</select>
		</div>
	);
}

function FileInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
	const [fileName, setFileName] = useState<string>("");
	const [error, setError] = useState<string>("");
	const inputRef = React.useRef<HTMLInputElement>(null);

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0];
		const MAX_BYTES = 20 * 1024 * 1024; // 20 MB

		if (file) {
			if (file.size > MAX_BYTES) {
				setError("File exceeds 20MB. Please upload a smaller file.");
				setFileName("");
				if (inputRef.current) {
					inputRef.current.value = "";
				}
				if (props.onChange) {
					const emptyEvent = { target: { files: null } } as unknown as React.ChangeEvent<HTMLInputElement>;
					props.onChange(emptyEvent);
				}
				return;
			}
			setError("");
			setFileName(file.name);
		} else {
			setError("");
			setFileName("");
		}

		if (props.onChange) props.onChange(e);
	}

	return (
		<div>
			<input
				{...props}
				ref={inputRef}
				onChange={handleChange}
				type="file"
				accept=".pdf,.png,.jpg,.jpeg"
				className={`w-full border-b border-secondary/20 px-2 py-3 outline-none transition dark:border-white/20 file:mr-3 file:rounded file:border file:px-3 file:py-1 file:text-sm focus:border-secondary/60 dark:focus:border-primary ${props.className ?? ""}`}
			/>
			{error ? (
				<div className="mt-1 flex items-center text-sm text-red-600">
					<svg className="mr-1 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12" y2="17"/></svg>
					<span>{error}</span>
				</div>
			) : (
				fileName ? <div className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">{fileName}</div> : null
			)}
		</div>
	);
}

export default function PMAForm() {
	const [form, setForm] = useState<FormState>(initialForm);
	const [saving, setSaving] = useState(false);
	const [submitting, setSubmitting] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [submittedFolder, setSubmittedFolder] = useState<string>("");
	const [errors, setErrors] = useState<{ legalPhone?: string; contactPhone?: string; bankRouting?: string; ownerErrors: Array<{ personalPhone?: string; dlDates?: string; dob?: string }>}>({ ownerErrors: [{ }] });

	const initiationTotal = useMemo(() => {
		const p = form.sales.initiationPercent;
		return [p.ecommerce, p.cardPresentRetail, p.cardPresentKeyed, p.moto]
			.map((v) => Number(v || 0))
			.reduce((a, b) => a + b, 0);
	}, [form.sales.initiationPercent]);

	const marketTotal = useMemo(() => {
		const p = form.sales.marketPercent;
		return [p.b2c, p.b2b, p.government]
			.map((v) => Number(v || 0))
			.reduce((a, b) => a + b, 0);
	}, [form.sales.marketPercent]);

	function update<K extends keyof FormState>(section: K, value: Partial<FormState[K]>) {
		setForm((prev) => ({ ...prev, [section]: { ...(prev[section] as any), ...(value as any) } }));
	}

	function updateOwner(index: number, value: Partial<Owner>) {
		setForm((prev) => {
			const next = [...prev.owners];
			next[index] = { ...next[index], ...value };
			return { ...prev, owners: next };
		});
	}

	function digitsOnly(input: string): string {
		return (input || "").replace(/\D+/g, "");
	}

	function addOwner() {
		setForm((prev) => ({ ...prev, owners: [...prev.owners, initialOwner()] }));
		setErrors((prev) => ({ ...prev, ownerErrors: [...prev.ownerErrors, {}] }));
	}

	function removeOwner(index: number) {
		setForm((prev) => ({ ...prev, owners: prev.owners.filter((_, i) => i !== index) }));
		setErrors((prev) => ({ ...prev, ownerErrors: prev.ownerErrors.filter((_, i) => i !== index) }));
	}

	async function onSaveProgress() {
		setSaving(true);
		try {
			localStorage.setItem("pma_form_progress", JSON.stringify(form));
			alert("Progress saved locally.");
		} finally {
			setSaving(false);
		}
	}

	async function onSubmit(e: React.FormEvent) {
		e.preventDefault();
		setSubmitting(true);
		try {
			// Validation rules
			const errors: string[] = [];

			// 1) Contact number max 10 digits (and required elsewhere)
			const contactDigits = digitsOnly(form.contact.phone);
			if (contactDigits.length !== 10) {
				errors.push("Contact Phone must be exactly 10 digits.");
			}

			// 2) Issue date must be prior to Exp date per owner
			form.owners.forEach((o, i) => {
				const issue = parseDateISO(o.dlIssueDate);
				const exp = parseDateISO(o.dlExpDate);
				if (issue && exp && issue >= exp) {
					errors.push(`Owner #${i + 1}: DL Issue Date must be before Exp Date.`);
				}
			});

			// 3) DOB must be at least 18 years old
			const today = new Date();
			const eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
			form.owners.forEach((o, i) => {
				const dob = parseDateISO(o.dob);
				if (dob && dob > eighteenYearsAgo) {
					errors.push(`Owner #${i + 1}: Must be at least 18 years old.`);
				}
			});

			// 4) Bank Routing must be exactly 9 digits
			const routingDigits = digitsOnly(form.bank.routingNumber);
			if (routingDigits.length !== 9) {
				errors.push("Bank Routing number must be exactly 9 digits.");
			}

			if (errors.length) {
				alert(errors.join("\n"));
				return;
			}
			if (initiationTotal !== 100 || marketTotal !== 100) {
				alert("Percentages must equal 100% in Sales Profile sections.");
				return;
			}

			const formData = new FormData();
			const payload = { ...form };
			// Strip File objects from payload documents for JSON snapshot
			const docSnapshot: Record<string, string | null> = {};
			Object.entries(form.documents).forEach(([key, val]) => {
				docSnapshot[key] = val ? (val as File).name : null;
			});
			(payload as any).documents = docSnapshot;
			formData.append("payload", JSON.stringify(payload));

			// Append files
			Object.entries(form.documents).forEach(([key, val]) => {
				if (val instanceof File) {
					formData.append(key, val as File);
				}
			});

			const res = await fetch("/api/pma", { method: "POST", body: formData });
			if (!res.ok) {
				const data = await res.json().catch(() => ({} as any));
				const msg = (data && (data.detail || data.error)) || `Request failed: ${res.status}`;
				throw new Error(msg);
			}
            const data = await res.json();
            setSubmittedFolder(String(data.folder || ""));
            setShowSuccessModal(true);
		} catch (err: any) {
			console.error("PMA submission client error", err);
			alert(`Submission failed: ${String(err?.message || err)}`);
		} finally {
			setSubmitting(false);
		}
	}

	React.useEffect(() => {
		const saved = localStorage.getItem("pma_form_progress");
		if (saved) {
			try {
				const parsed = JSON.parse(saved) as FormState;
				setForm(parsed);
			} catch {}
		}
	}, []);

	return (
		<form onSubmit={onSubmit} className="max-w-5xl mx-auto px-4 md:px-6 py-8 mt-20">
			{/* 1. Legal Overview */}
			<Section title="1. Legal Overview">
				<div>
					<Label required>Legal Name</Label>
					<TextInput placeholder="Enter legal name" value={form.legal.legalName} onChange={(e) => update("legal", { legalName: e.target.value })} required />
				</div>
				<div>
					<Label required>Entity Type</Label>
					<SelectInput value={form.legal.entityType} onChange={(e) => update("legal", { entityType: e.target.value })} options={[selectDefault, { label: "LLC", value: "llc" }, { label: "Corp", value: "corp" }, { label: "Sole Prop", value: "sole" }]} required />
				</div>
				<div>
					<Label required>TIN Type</Label>
					<SelectInput value={form.legal.tinType} onChange={(e) => update("legal", { tinType: e.target.value })} options={[selectDefault, { label: "EIN", value: "ein" }, { label: "SSN", value: "ssn" }]} required />
				</div>
				<div>
					<Label required>Federal Tax ID/EIN</Label>
					<PasswordInput placeholder="Enter Federal Tax ID/EIN" value={form.legal.federalTaxId} onChange={(e) => update("legal", { federalTaxId: e.target.value })} required />
				</div>
				<div>
					<Label required>Legal Address</Label>
					<TextInput placeholder="Street address" value={form.legal.legalAddress} onChange={(e) => update("legal", { legalAddress: e.target.value })} required />
				</div>
				<div>
					<Label>Legal Suite</Label>
					<TextInput placeholder="Apt, suite, etc." value={form.legal.legalSuite} onChange={(e) => update("legal", { legalSuite: e.target.value })} />
				</div>
				<div>
					<Label required>Legal City</Label>
					<TextInput placeholder="City" value={form.legal.legalCity} onChange={(e) => update("legal", { legalCity: e.target.value })} required />
				</div>
				<div>
					<Label required>Legal State</Label>
					<SelectInput value={form.legal.legalState} onChange={(e) => update("legal", { legalState: e.target.value })} options={states} required />
				</div>
				<div>
					<Label required>Legal ZIP</Label>
					<TextInput placeholder="ZIP code" value={form.legal.legalZip} onChange={(e) => update("legal", { legalZip: e.target.value })} required inputMode="numeric" maxLength={10} />
				</div>
				<div>
					<Label required>Legal Phone</Label>
					<TextInput placeholder="##########" inputMode="numeric" value={form.legal.legalPhone} onChange={(e) => {
						const digits = (e.target.value || "").replace(/\D+/g, "").slice(0, 10);
						update("legal", { legalPhone: digits });
						setErrors((prev) => ({ ...prev, legalPhone: digits.length === 10 ? undefined : "Phone must be 10 digits." }));
					}} required />
					{errors.legalPhone ? (
						<div className="mt-1 flex items-center text-sm text-red-600">
							<svg className="mr-1 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12" y2="17"/></svg>
							<span>{errors.legalPhone}</span>
						</div>
					) : null}
				</div>
				<div>
					<Label required>Legal Email</Label>
					<TextInput type="email" placeholder="name@example.com" value={form.legal.legalEmail} onChange={(e) => update("legal", { legalEmail: e.target.value })} required />
				</div>
			</Section>

			{/* 2. Mailing Address */}
			<Section title="2. Mailing Address">
				<div>
					<Label required>Mailing Address</Label>
					<TextInput placeholder="Street address" value={form.mailing.address} onChange={(e) => update("mailing", { address: e.target.value })} required />
				</div>
				<div>
					<Label>Mailing Suite #</Label>
					<TextInput placeholder="Apt, suite, etc." value={form.mailing.suite} onChange={(e) => update("mailing", { suite: e.target.value })} />
				</div>
				<div>
					<Label required>Mailing City</Label>
					<TextInput placeholder="City" value={form.mailing.city} onChange={(e) => update("mailing", { city: e.target.value })} required />
				</div>
				<div>
					<Label required>Mailing State</Label>
					<SelectInput value={form.mailing.state} onChange={(e) => update("mailing", { state: e.target.value })} options={states} required />
				</div>
				<div>
					<Label required>Mailing Zip</Label>
					<TextInput placeholder="ZIP code" value={form.mailing.zip} onChange={(e) => update("mailing", { zip: e.target.value })} required />
				</div>
			</Section>

			{/* 3. Contact Details */}
			<Section title="3. Contact Details">
				<div>
					<Label required>Contact First Name</Label>
					<TextInput placeholder="First name" value={form.contact.firstName} onChange={(e) => update("contact", { firstName: e.target.value })} required />
				</div>
				<div>
					<Label required>Contact Last Name</Label>
					<TextInput placeholder="Last name" value={form.contact.lastName} onChange={(e) => update("contact", { lastName: e.target.value })} required />
				</div>
				<div>
				<Label required>Contact Phone</Label>
				<TextInput placeholder="##########" inputMode="numeric" value={form.contact.phone} onChange={(e) => {
					const digits = (e.target.value || "").replace(/\D+/g, "").slice(0, 10);
					update("contact", { phone: digits });
					setErrors((prev) => ({ ...prev, contactPhone: digits.length === 10 ? undefined : "Phone must be 10 digits." }));
				}} required />
				{errors.contactPhone ? (
					<div className="mt-1 flex items-center text-sm text-red-600">
						<svg className="mr-1 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12" y2="17"/></svg>
						<span>{errors.contactPhone}</span>
					</div>
				) : null}
				</div>
				<div>
					<Label required>Contact Email</Label>
					<TextInput type="email" placeholder="name@example.com" value={form.contact.email} onChange={(e) => update("contact", { email: e.target.value })} required />
				</div>
				<div>
					<Label>Chargeback Notification</Label>
					<SelectInput value={form.contact.chargebackNotification} onChange={(e) => update("contact", { chargebackNotification: e.target.value })} options={[selectDefault, { label: "Send via regular mail", value: "mail" }, { label: "Do not send mail", value: "no_mail" }]} />
				</div>
				<div>
					<Label>Chargeback Email</Label>
					<TextInput type="email" placeholder="name@example.com" value={form.contact.chargebackEmail} onChange={(e) => update("contact", { chargebackEmail: e.target.value })} />
				</div>
			</Section>

			{/* 4. Primary Owner + Additional Owners */}
			<Section title="4. Owner(s)">
				<div className="md:col-span-2">
					<div className="space-y-8">
						{form.owners.map((owner, idx) => (
							<div key={idx} className="border border-secondary/20 dark:border-white/20 rounded-md p-4">
								<div className="flex items-center mb-4">
									<h4 className="font-semibold">{idx === 0 ? "Primary Owner" : `Additional Owner ${idx}`}</h4>
									{idx > 0 && (
										<button type="button" onClick={() => removeOwner(idx)} className="ml-auto inline-flex items-center gap-2 rounded-md bg-red-500/10 hover:bg-red-500/20 text-red-600 px-3 py-1.5 text-sm">
											<svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
												<path d="M3 6h18" />
												<path d="M8 6v-2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
												<path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
												<path d="M10 11v6" />
												<path d="M14 11v6" />
											</svg>
											Remove owner
										</button>
									)}
								</div>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div>
										<Label required>First Name</Label>
										<TextInput placeholder="First name" value={owner.firstName} onChange={(e) => updateOwner(idx, { firstName: e.target.value })} required />
									</div>
									<div>
										<Label required>Last Name</Label>
										<TextInput placeholder="Last name" value={owner.lastName} onChange={(e) => updateOwner(idx, { lastName: e.target.value })} required />
									</div>
									<div>
										<Label required>Title</Label>
										<SelectInput value={owner.title} onChange={(e) => updateOwner(idx, { title: e.target.value })} options={[selectDefault, { label: "Owner", value: "owner" }, { label: "Manager", value: "manager" }, { label: "Officer", value: "officer" }]} required />
									</div>
									<div>
										<Label required>Ownership %</Label>
										<TextInput placeholder="e.g., 50" inputMode="numeric" value={owner.ownershipPercent} onChange={(e) => updateOwner(idx, { ownershipPercent: e.target.value })} required />
									</div>
				<div>
					<Label required>Personal Phone</Label>
					<TextInput placeholder="##########" inputMode="numeric" value={owner.personalPhone} onChange={(e) => {
						const digits = (e.target.value || "").replace(/\D+/g, "").slice(0, 10);
						updateOwner(idx, { personalPhone: digits });
						setErrors((prev) => {
							const next = { ...prev, ownerErrors: [...prev.ownerErrors] };
							next.ownerErrors[idx] = { ...(next.ownerErrors[idx] || {}), personalPhone: digits.length === 10 ? undefined : "Phone must be 10 digits." };
							return next;
						});
					}} required />
					{errors.ownerErrors[idx]?.personalPhone ? (
						<div className="mt-1 flex items-center text-sm text-red-600">
							<svg className="mr-1 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12" y2="17"/></svg>
							<span>{errors.ownerErrors[idx]?.personalPhone}</span>
						</div>
					) : null}
				</div>
									<div>
										<Label required>Individual With Control?</Label>
										<SelectInput value={owner.individualWithControl} onChange={(e) => updateOwner(idx, { individualWithControl: e.target.value })} options={yesNo} required />
									</div>
									<div>
										<Label required>Address</Label>
										<TextInput placeholder="Street address" value={owner.address} onChange={(e) => updateOwner(idx, { address: e.target.value })} required />
									</div>
									<div>
										<Label required>City</Label>
										<TextInput placeholder="City" value={owner.city} onChange={(e) => updateOwner(idx, { city: e.target.value })} required />
									</div>
									<div>
										<Label required>State</Label>
										<SelectInput value={owner.state} onChange={(e) => updateOwner(idx, { state: e.target.value })} options={states} required />
									</div>
									<div>
										<Label required>ZIP</Label>
										<TextInput placeholder="ZIP code" value={owner.zip} onChange={(e) => updateOwner(idx, { zip: e.target.value })} required />
									</div>
									<div>
										<Label required>DL Number</Label>
										<TextInput placeholder="Driver license number" value={owner.dlNumber} onChange={(e) => updateOwner(idx, { dlNumber: e.target.value })} required />
									</div>
									<div>
										<Label required>State Issued</Label>
										<SelectInput value={owner.dlStateIssued} onChange={(e) => updateOwner(idx, { dlStateIssued: e.target.value })} options={states} required />
									</div>
									<div>
					<Label required>Issue Date</Label>
					<DateInput placeholder="Select date" value={owner.dlIssueDate} onChange={(e) => {
						const val = e.target.value;
						updateOwner(idx, { dlIssueDate: val });
						setErrors((prev) => {
							const next = { ...prev, ownerErrors: [...prev.ownerErrors] };
							const issue = parseDateISO(val);
							const exp = parseDateISO(form.owners[idx].dlExpDate);
							next.ownerErrors[idx] = { ...(next.ownerErrors[idx] || {}), dlDates: issue && exp && issue >= exp ? "Issue date must be before Exp date." : undefined };
							return next;
						});
					}} />
									</div>
									<div>
					<Label required>Exp Date</Label>
					<DateInput placeholder="Select date" value={owner.dlExpDate} onChange={(e) => {
						const val = e.target.value;
						updateOwner(idx, { dlExpDate: val });
						setErrors((prev) => {
							const next = { ...prev, ownerErrors: [...prev.ownerErrors] };
							const issue = parseDateISO(form.owners[idx].dlIssueDate);
							const exp = parseDateISO(val);
							next.ownerErrors[idx] = { ...(next.ownerErrors[idx] || {}), dlDates: issue && exp && issue >= exp ? "Issue date must be before Exp date." : undefined };
							return next;
						});
					}} />
									</div>
				{errors.ownerErrors[idx]?.dlDates ? (
					<div className="md:col-span-2 mt-1 flex items-center text-sm text-red-600">
						<svg className="mr-1 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12" y2="17"/></svg>
						<span>{errors.ownerErrors[idx]?.dlDates}</span>
					</div>
				) : null}
									<div>
					<Label required>Date of Birth</Label>
					<DateInput placeholder="Select date" value={owner.dob} onChange={(e) => {
						const val = e.target.value;
						updateOwner(idx, { dob: val });
						setErrors((prev) => {
							const next = { ...prev, ownerErrors: [...prev.ownerErrors] };
							const today = new Date();
							const eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
							const dob = parseDateISO(val);
							next.ownerErrors[idx] = { ...(next.ownerErrors[idx] || {}), dob: dob && dob > eighteenYearsAgo ? "Must be at least 18 years old." : undefined };
							return next;
						});
					}} />
					{errors.ownerErrors[idx]?.dob ? (
						<div className="mt-1 flex items-center text-sm text-red-600">
							<svg className="mr-1 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12" y2="17"/></svg>
							<span>{errors.ownerErrors[idx]?.dob}</span>
						</div>
					) : null}
									</div>
									<div>
										<Label required>Social Security Number</Label>
										<TextInput placeholder="SSN" value={owner.ssn} onChange={(e) => updateOwner(idx, { ssn: e.target.value })} required />
									</div>
									<div>
										<Label>Prior Bankruptcy</Label>
										<SelectInput value={owner.priorBankruptcy} onChange={(e) => updateOwner(idx, { priorBankruptcy: e.target.value })} options={yesNo} />
									</div>
								</div>
							</div>
						))}
						<button type="button" onClick={addOwner} className="text-sm mt-2 px-3 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-300">
							+ Add additional owner
						</button>
					</div>
				</div>
			</Section>

			{/* 5. DBA Overview */}
			<Section title="5. DBA Overview">
				<div>
					<Label required>DBA Name</Label>
					<TextInput placeholder="Doing Business As (DBA) name" value={form.dba.dbaName} onChange={(e) => update("dba", { dbaName: e.target.value })} required />
				</div>
				<div>
					<Label required>Business Type</Label>
					<SelectInput value={form.dba.businessType} onChange={(e) => update("dba", { businessType: e.target.value })} options={[selectDefault, { label: "Retail", value: "retail" }, { label: "E-commerce", value: "ecom" }, { label: "Service", value: "service" }]} required />
				</div>
				<div>
					<Label required>Business Start Date</Label>
					<DateInput placeholder="Select date" value={form.dba.businessStartDate} onChange={(e) => update("dba", { businessStartDate: e.target.value })} />
				</div>
				<div>
					<Label required>Years In Business</Label>
					<TextInput placeholder="e.g., 3" inputMode="numeric" value={form.dba.yearsInBusiness} onChange={(e) => update("dba", { yearsInBusiness: e.target.value })} required />
				</div>
				<div>
					<Label required>DBA Address</Label>
					<TextInput placeholder="Street address" value={form.dba.address} onChange={(e) => update("dba", { address: e.target.value })} required />
				</div>
				<div>
					<Label>DBA Suite #</Label>
					<TextInput placeholder="Apt, suite, etc." value={form.dba.suite} onChange={(e) => update("dba", { suite: e.target.value })} />
				</div>
				<div>
					<Label required>DBA City</Label>
					<TextInput placeholder="City" value={form.dba.city} onChange={(e) => update("dba", { city: e.target.value })} required />
				</div>
				<div>
					<Label required>DBA State</Label>
					<SelectInput value={form.dba.state} onChange={(e) => update("dba", { state: e.target.value })} options={states} required />
				</div>
				<div>
					<Label required>DBA ZIP</Label>
					<TextInput placeholder="ZIP code" value={form.dba.zip} onChange={(e) => update("dba", { zip: e.target.value })} required />
				</div>
				<div>
					<Label required>Location Type</Label>
					<SelectInput value={form.dba.locationType} onChange={(e) => update("dba", { locationType: e.target.value })} options={[selectDefault, { label: "Office", value: "office" }, { label: "Storefront", value: "storefront" }, { label: "Warehouse", value: "warehouse" }]} required />
				</div>
				<div>
					<Label>Square Feet</Label>
					<TextInput placeholder="e.g., 1200" inputMode="numeric" value={form.dba.squareFeet} onChange={(e) => update("dba", { squareFeet: e.target.value })} />
				</div>
				<div>
					<Label required>DBA Phone</Label>
					<TextInput placeholder="###-###-####" value={form.dba.phone} onChange={(e) => update("dba", { phone: e.target.value })} required />
				</div>
				<div>
					<Label>DBA Email</Label>
					<TextInput type="email" placeholder="name@example.com" value={form.dba.email} onChange={(e) => update("dba", { email: e.target.value })} />
				</div>
				<div className="md:col-span-2">
					<Label>Vertical Type</Label>
					<SelectInput value={form.dba.verticalType} onChange={(e) => update("dba", { verticalType: e.target.value })} options={[selectDefault, { label: "Health", value: "health" }, { label: "Financial", value: "financial" }, { label: "Education", value: "education" }]} />
				</div>
				<div className="md:col-span-2">
					<Label>Products & Services Sold</Label>
					<TextInput placeholder="Describe what you sell" value={form.dba.productsAndServices} onChange={(e) => update("dba", { productsAndServices: e.target.value })} />
				</div>
				<div className="md:col-span-2">
					<Label>Website</Label>
					<TextInput type="url" placeholder="https://example.com" value={form.dba.website} onChange={(e) => update("dba", { website: e.target.value })} />
				</div>
				<div className="md:col-span-2">
					<Label>Card Holder Descriptor</Label>
					<TextInput placeholder="What appears on customer card statements" value={form.dba.cardHolderDescriptor} onChange={(e) => update("dba", { cardHolderDescriptor: e.target.value })} />
				</div>
			</Section>

			{/* 6. Sales Profile */}
			<Section title="6. Sales Profile">
				<div>
					<Label required>Extended Obligations</Label>
					<SelectInput value={form.sales.extendedObligations} onChange={(e) => update("sales", { extendedObligations: e.target.value })} options={yesNo} required />
				</div>
				<div>
					<Label required>Uses Affiliate Marketing?</Label>
					<SelectInput value={form.sales.usesAffiliateMarketing} onChange={(e) => update("sales", { usesAffiliateMarketing: e.target.value })} options={yesNo} required />
				</div>
				<div>
					<Label required>Advertising Method</Label>
					<SelectInput value={form.sales.advertisingMethod} onChange={(e) => update("sales", { advertisingMethod: e.target.value })} options={[selectDefault, { label: "Online", value: "online" }, { label: "TV/Radio", value: "broadcast" }, { label: "Print", value: "print" }]} required />
				</div>
				<div>
					<Label>Straight Sale Billing</Label>
					<SelectInput value={form.sales.straightSaleBilling} onChange={(e) => update("sales", { straightSaleBilling: e.target.value })} options={yesNo} />
				</div>
				<div>
					<Label>Monthly Billing</Label>
					<SelectInput value={form.sales.monthlyBilling} onChange={(e) => update("sales", { monthlyBilling: e.target.value })} options={yesNo} />
				</div>
				<div>
					<Label required>Average Ticket</Label>
					<TextInput placeholder="e.g., 50" inputMode="numeric" value={form.sales.averageTicket} onChange={(e) => update("sales", { averageTicket: e.target.value })} required />
				</div>
				<div>
					<Label required>High Ticket</Label>
					<TextInput placeholder="e.g., 500" inputMode="numeric" value={form.sales.highTicket} onChange={(e) => update("sales", { highTicket: e.target.value })} required />
				</div>
				<div>
					<Label required>Monthly Volume</Label>
					<TextInput placeholder="e.g., 20000" inputMode="numeric" value={form.sales.monthlyVolume} onChange={(e) => update("sales", { monthlyVolume: e.target.value })} required />
				</div>
				<div>
					<Label required>Annual Volume</Label>
					<TextInput placeholder="e.g., 240000" inputMode="numeric" value={form.sales.annualVolume} onChange={(e) => update("sales", { annualVolume: e.target.value })} required />
				</div>
				<div className="md:col-span-2">
					<Label>Estimate sales initiation methods (must equal 100%)</Label>
					<div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-2">
						<TextInput placeholder="E-commerce %" inputMode="numeric" value={form.sales.initiationPercent.ecommerce} onChange={(e) => update("sales", { initiationPercent: { ...form.sales.initiationPercent, ecommerce: e.target.value } })} />
						<TextInput placeholder="Card Present Retail %" inputMode="numeric" value={form.sales.initiationPercent.cardPresentRetail} onChange={(e) => update("sales", { initiationPercent: { ...form.sales.initiationPercent, cardPresentRetail: e.target.value } })} />
						<TextInput placeholder="Card Present Keyed %" inputMode="numeric" value={form.sales.initiationPercent.cardPresentKeyed} onChange={(e) => update("sales", { initiationPercent: { ...form.sales.initiationPercent, cardPresentKeyed: e.target.value } })} />
						<TextInput placeholder="MOTO %" inputMode="numeric" value={form.sales.initiationPercent.moto} onChange={(e) => update("sales", { initiationPercent: { ...form.sales.initiationPercent, moto: e.target.value } })} />
					</div>
					<p className={`text-sm mt-1 ${initiationTotal === 100 ? "text-green-600" : "text-red-600"}`}>Total: {initiationTotal}%</p>
				</div>
				<div className="md:col-span-2">
					<Label>Estimate sales groups (must equal 100%)</Label>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
						<TextInput placeholder="B2C %" inputMode="numeric" value={form.sales.marketPercent.b2c} onChange={(e) => update("sales", { marketPercent: { ...form.sales.marketPercent, b2c: e.target.value } })} />
						<TextInput placeholder="B2B %" inputMode="numeric" value={form.sales.marketPercent.b2b} onChange={(e) => update("sales", { marketPercent: { ...form.sales.marketPercent, b2b: e.target.value } })} />
						<TextInput placeholder="Government %" inputMode="numeric" value={form.sales.marketPercent.government} onChange={(e) => update("sales", { marketPercent: { ...form.sales.marketPercent, government: e.target.value } })} />
					</div>
					<p className={`text-sm mt-1 ${marketTotal === 100 ? "text-green-600" : "text-red-600"}`}>Total: {marketTotal}%</p>
				</div>
			</Section>

			{/* 7. Customer Service */}
			<Section title="7. Customer Service">
				<div>
					<Label required>Who Provides CS?</Label>
					<SelectInput value={form.customerService.whoProvides} onChange={(e) => update("customerService", { whoProvides: e.target.value })} options={[selectDefault, { label: "In-house", value: "inhouse" }, { label: "Third-party", value: "thirdparty" }]} required />
				</div>
				<div>
					<Label>CS Center Name</Label>
					<TextInput placeholder="Call center name" value={form.customerService.centerName} onChange={(e) => update("customerService", { centerName: e.target.value })} />
				</div>
				<div>
					<Label required>CS Phone</Label>
					<TextInput placeholder="###-###-####" value={form.customerService.phone} onChange={(e) => update("customerService", { phone: e.target.value })} required />
				</div>
				<div>
					<Label>CS Email</Label>
					<TextInput type="email" placeholder="support@example.com" value={form.customerService.email} onChange={(e) => update("customerService", { email: e.target.value })} />
				</div>
			</Section>

			{/* 8. Fulfillment Process */}
			<Section title="8. Fulfillment Process">
				<div>
					<Label required>Who Provides Fulfillment?</Label>
					<SelectInput value={form.fulfillment.whoProvides} onChange={(e) => update("fulfillment", { whoProvides: e.target.value })} options={[selectDefault, { label: "In-house", value: "inhouse" }, { label: "Third-party", value: "thirdparty" }]} required />
				</div>
				<div>
					<Label required>Where Is Product Stored?</Label>
					<SelectInput value={form.fulfillment.whereStored} onChange={(e) => update("fulfillment", { whereStored: e.target.value })} options={[selectDefault, { label: "Warehouse", value: "warehouse" }, { label: "Office", value: "office" }, { label: "3PL", value: "3pl" }]} required />
				</div>
				<div>
					<Label>Fulfillment House Name</Label>
					<TextInput placeholder="Fulfillment partner name" value={form.fulfillment.fulfillmentHouseName} onChange={(e) => update("fulfillment", { fulfillmentHouseName: e.target.value })} />
				</div>
				<div>
					<Label>Shipping Service Used</Label>
					<SelectInput value={form.fulfillment.shippingService} onChange={(e) => update("fulfillment", { shippingService: e.target.value })} options={[selectDefault, { label: "UPS", value: "ups" }, { label: "FedEx", value: "fedex" }, { label: "USPS", value: "usps" }]} />
				</div>
				<div>
					<Label>Delivery Time Frame</Label>
					<SelectInput value={form.fulfillment.deliveryTimeFrame} onChange={(e) => update("fulfillment", { deliveryTimeFrame: e.target.value })} options={[selectDefault, { label: "1-3 days", value: "1-3" }, { label: "3-7 days", value: "3-7" }, { label: "7-14 days", value: "7-14" }]} />
				</div>
			</Section>

			{/* 9. Bank Information */}
			<Section title="9. Bank Information">
				<div>
					<Label required>Bank Account Type</Label>
					<SelectInput value={form.bank.accountType} onChange={(e) => update("bank", { accountType: e.target.value })} options={[selectDefault, { label: "Checking", value: "checking" }, { label: "Savings", value: "savings" }]} required />
				</div>
				<div>
					<Label required>Bank Name</Label>
					<TextInput placeholder="Bank name" value={form.bank.bankName} onChange={(e) => update("bank", { bankName: e.target.value })} required />
				</div>
				<div>
					<Label required>Name on Bank Account</Label>
					<TextInput placeholder="Account holder name" value={form.bank.nameOnAccount} onChange={(e) => update("bank", { nameOnAccount: e.target.value })} required />
				</div>
				<div>
					<Label required>Bank Routing #</Label>
					<TextInput placeholder="#########" inputMode="numeric" value={form.bank.routingNumber} onChange={(e) => {
						const digits = (e.target.value || "").replace(/\D+/g, "").slice(0, 9);
						update("bank", { routingNumber: digits });
						setErrors((prev) => ({ ...prev, bankRouting: digits.length === 9 ? undefined : "Routing number must be 9 digits." }));
					}} required />
					{errors.bankRouting ? (
						<div className="mt-1 flex items-center text-sm text-red-600">
							<svg className="mr-1 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12" y2="17"/></svg>
							<span>{errors.bankRouting}</span>
						</div>
					) : null}
				</div>
				<div>
					<Label required>Bank Account #</Label>
					<TextInput placeholder="Account number" inputMode="numeric" value={form.bank.accountNumber} onChange={(e) => update("bank", { accountNumber: e.target.value })} required />
				</div>
			</Section>

			{/* 10. Supporting Documents */}
			<Section title="10. Supporting Documents">
				<div className="md:col-span-2 text-sm text-muted-foreground">
					<p>Upload in PDF, JPG or PNG format.</p>
				</div>
				<div>
					<Label required>Articles Of Org</Label>
					<FileInput onChange={(e) => update("documents", { articlesOfOrg: e.target.files?.[0] || null })} required />
				</div>
				<div>
					<Label required>SS-4 Letter</Label>
					<FileInput onChange={(e) => update("documents", { ss4Letter: e.target.files?.[0] || null })} required />
				</div>
				<div>
					<Label>Voided Check</Label>
					<FileInput onChange={(e) => update("documents", { voidedCheck: e.target.files?.[0] || null })} />
				</div>
				<div>
					<Label required>Government ID</Label>
					<FileInput onChange={(e) => update("documents", { governmentId: e.target.files?.[0] || null })} required />
				</div>
				<div>
					<Label>Business Statement 1</Label>
					<FileInput onChange={(e) => update("documents", { businessStatement1: e.target.files?.[0] || null })} />
				</div>
				<div>
					<Label>Business Statement 2</Label>
					<FileInput onChange={(e) => update("documents", { businessStatement2: e.target.files?.[0] || null })} />
				</div>
				<div>
					<Label>Business Statement 3</Label>
					<FileInput onChange={(e) => update("documents", { businessStatement3: e.target.files?.[0] || null })} />
				</div>
				<div>
					<Label required>Personal Statement 1</Label>
					<FileInput onChange={(e) => update("documents", { personalStatement1: e.target.files?.[0] || null })} required />
				</div>
				<div>
					<Label required>Personal Statement 2</Label>
					<FileInput onChange={(e) => update("documents", { personalStatement2: e.target.files?.[0] || null })} required />
				</div>
				<div>
					<Label required>Personal Statement 3</Label>
					<FileInput onChange={(e) => update("documents", { personalStatement3: e.target.files?.[0] || null })} required />
				</div>
				<div>
					<Label>Customer Service Agreement</Label>
					<FileInput onChange={(e) => update("documents", { customerServiceAgreement: e.target.files?.[0] || null })} />
				</div>
				<div>
					<Label>Fulfillment Agreement</Label>
					<FileInput onChange={(e) => update("documents", { fulfillmentAgreement: e.target.files?.[0] || null })} />
				</div>
				<div>
					<Label>CRM Agreement</Label>
					<FileInput onChange={(e) => update("documents", { crmAgreement: e.target.files?.[0] || null })} />
				</div>
				<div>
					<Label>Chargeback Agreement</Label>
					<FileInput onChange={(e) => update("documents", { chargebackAgreement: e.target.files?.[0] || null })} />
				</div>
				<div className="md:col-span-2">
					<Label>COA's</Label>
					<FileInput onChange={(e) => update("documents", { coa: e.target.files?.[0] || null })} />
				</div>
			</Section>

			<div className="flex items-center justify-center gap-3">
				<button type="button" onClick={onSaveProgress} disabled={saving} className="inline-flex items-center gap-2 rounded-md border border-secondary/20 dark:border-white/20 px-4 py-2 text-sm">
					{saving ? "Saving..." : "Save progress"}
				</button>
				<button type="submit" disabled={submitting} className="inline-flex items-center gap-2 rounded-md bg-blue-600 hover:bg-blue-700 px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-300">
					{submitting ? "Submitting..." : "Submit Form"}
				</button>
			</div>
            {showSuccessModal && (
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-label="Form submitted successfully"
                    className="fixed inset-0 z-50 flex items-center justify-center"
                    onClick={(e) => { if (e.target === e.currentTarget) setShowSuccessModal(false); }}
                >
                    <div className="absolute inset-0 bg-black/50" />
                    <div className="relative z-10 w-full max-w-sm mx-auto rounded-2xl bg-white p-6 shadow-2xl text-center dark:bg-neutral-900 border border-secondary/20 dark:border-white/10">
                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30">
                            <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                <path d="M22 4L12 14.01l-3-3" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold mb-1">Form submitted!</h3>
                        <p className="text-sm text-neutral-600 dark:text-neutral-300">Thank you. Your documents have been uploaded{submittedFolder ? ` to folder ${submittedFolder}` : ""}.</p>
                        <div className="mt-5 flex justify-center">
                            <button
                                type="button"
                                onClick={() => setShowSuccessModal(false)}
                                className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                autoFocus
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
		</form>
	);
}

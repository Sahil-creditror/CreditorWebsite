"use client";

import React, { useState, useEffect, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Loader2, ShieldCheck } from 'lucide-react';

interface Certificate {
  id: string;
  name: string;
  domain?: string; // new field
  course?: string; // legacy fallback
  issuedDate: string;
  issuer?: string;
}

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function CertificateVerifier(): React.ReactElement {
  const [certId, setCertId] = useState<string>('');
  const [status, setStatus] = useState<Status>('idle');
  const [certificate, setCertificate] = useState<Certificate | null>(null);

  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get('cert');
    if (param) {
      setCertId(param);
      void handleVerify(param);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleVerify = async (id: string) => {
    if (!id) return;
    setStatus('loading');
    try {
      const res = await fetch('/certificates.json');
      if (!res.ok) throw new Error('Network error');
      const data: Certificate[] = await res.json();
      const match = data.find((c) => c.id === id.trim());
      if (match) {
        setCertificate(match);
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    void handleVerify(certId);
  };

  const domainLabel = certificate?.domain ?? certificate?.course ?? '—';

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-blue-900 via-blue-300 to-blue-50 dark:from-neutral-950 dark:via-neutral-950 dark:to-black">
      <div className="pointer-events-none absolute inset-0 [background-image:radial-gradient(1200px_600px_at_20%_-10%,rgba(59,130,246,0.10),transparent),radial-gradient(900px_500px_at_80%_110%,rgba(16,185,129,0.10),transparent)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.35] dark:opacity-[0.2] [background-image:repeating-linear-gradient(0deg,transparent,transparent_23px,rgba(0,0,0,0.04)_24px),repeating-linear-gradient(90deg,transparent,transparent_23px,rgba(0,0,0,0.04)_24px)] dark:[background-image:repeating-linear-gradient(0deg,transparent,transparent_23px,rgba(255,255,255,0.05)_24px),repeating-linear-gradient(90deg,transparent,transparent_23px,rgba(255,255,255,0.05)_24px)]" />
      <div className="pointer-events-none absolute inset-0 mix-blend-soft-light opacity-40 [background-image:radial-gradient(circle_at_70%_20%,rgba(255,255,255,0.6),transparent_35%),radial-gradient(circle_at_30%_80%,rgba(255,255,255,0.4),transparent_35%)] dark:opacity-20" />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative max-w-2xl w-full mx-auto rounded-2xl shadow-2xl p-8 border bg-white/80 backdrop-blur-xl border-gray-200 dark:bg-neutral-900/70 dark:border-neutral-800 mt-20"
      >
        <div className="flex flex-col items-center gap-2 mb-6">
          <div className="inline-flex items-center justify-center rounded-full h-12 w-12 bg-blue-600/10 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100">Certificate Verification</h1>
          <p className="text-center text-gray-600 dark:text-gray-400">Verify the authenticity of a certificate issued by Creditor Academy.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2 sm:gap-3 mb-6">
          <label htmlFor="cert-id" className="sr-only">Certificate ID</label>
          <input
            id="cert-id"
            type="text"
            placeholder="Enter Certificate ID"
            value={certId}
            onChange={(e) => setCertId(e.target.value)}
            className="w-full sm:flex-grow px-4 py-2 border rounded-lg bg-white/70 dark:bg-neutral-800/70 border-gray-300 dark:border-neutral-700 text-gray-800 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/70 focus:border-blue-500/70"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full sm:w-auto px-6 py-2 rounded-lg text-white transition disabled:opacity-70 disabled:cursor-not-allowed bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-sm"
          >
            {status === 'loading' ? 'Verifying…' : 'Verify'}
          </button>
        </form>

        {status !== 'success' && (
          <div className="-mt-2 mb-2 text-xs text-gray-500 dark:text-gray-500 text-center">
            Hint: Example format e.g. <span className="font-mono">CERT-********</span>
          </div>
        )}

        {status === 'loading' && (
          <div className="flex items-center justify-center text-blue-600 dark:text-blue-400">
            <Loader2 className="animate-spin mr-2" />
            Verifying…
          </div>
        )}

        {status === 'error' && (
          <div className="flex items-center justify-center px-4 py-3 rounded-md border text-red-700 border-red-200 bg-red-50 dark:text-red-300 dark:border-red-900/60 dark:bg-red-900/20">
            <XCircle className="mr-2" /> Invalid certificate ID or network error.
          </div>
        )}

        {status === 'success' && certificate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 border-t pt-6 border-gray-200 dark:border-neutral-800"
          >
            <div className="flex items-center text-green-600 dark:text-emerald-400 mb-4">
              <CheckCircle className="mr-2" />
              <span className="font-semibold">Valid Certificate</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 dark:text-gray-200">
              <div className="rounded-lg border p-4 border-gray-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/60">
                <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Name</p>
                <p className="mt-1 font-medium text-gray-900 dark:text-gray-100">{certificate.name}</p>
              </div>
              <div className="rounded-lg border p-4 border-gray-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/60">
                <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Domain</p>
                <p className="mt-1 font-medium text-gray-900 dark:text-gray-100">{domainLabel}</p>
              </div>
              <div className="rounded-lg border p-4 border-gray-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/60">
                <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Issued Date</p>
                <p className="mt-1 font-medium text-gray-900 dark:text-gray-100">{certificate.issuedDate}</p>
              </div>
              <div className="rounded-lg border p-4 border-gray-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/60">
                <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Issuer</p>
                <p className="mt-1 font-medium text-gray-900 dark:text-gray-100">{certificate.issuer ?? 'Creditor Academy'}</p>
              </div>
            </div>

            <div className="mt-4 rounded-md border px-4 py-3 border-green-200 bg-green-50 text-green-800 dark:border-emerald-800/60 dark:bg-emerald-900/20 dark:text-emerald-300">
              This is a valid certificate issued by Creditor Academy.
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
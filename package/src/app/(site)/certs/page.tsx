"use client";

import React, { useState, useEffect, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-200"
      >
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Certificate Verification</h1>

        <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Enter Certificate ID"
            value={certId}
            onChange={(e) => setCertId(e.target.value)}
            className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Verify
          </button>
        </form>

        {status === 'loading' && (
          <div className="flex items-center justify-center text-blue-600">
            <Loader2 className="animate-spin mr-2" />
            Verifying...
          </div>
        )}

        {status === 'error' && (
          <div className="flex items-center justify-center text-red-600">
            <XCircle className="mr-2" /> Invalid certificate ID or network error.
          </div>
        )}

        {status === 'success' && certificate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 border-t pt-6"
          >
            <div className="flex items-center text-green-600 mb-4">
              <CheckCircle className="mr-2" />
              <span className="font-semibold">Valid Certificate</span>
            </div>

            <div className="space-y-2 text-gray-700">
              <p><strong>Name:</strong> {certificate.name}</p>
              <p><strong>Domain:</strong> {domainLabel}</p>
              <p><strong>Issued Date:</strong> {certificate.issuedDate}</p>
              <p><strong>Issuer:</strong> {certificate.issuer ?? 'Creditor Academy'}</p>
            </div>

            <div className="mt-4 rounded-md border border-green-200 bg-green-50 text-green-800 px-4 py-3">
              This is a valid Certificate issued by Creditor Academy.
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
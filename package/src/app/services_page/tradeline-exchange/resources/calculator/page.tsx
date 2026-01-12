"use client";

import { useState } from "react";

type Account = {
  id: string;
  description?: string;
  age: number;
  limit: number;
  balance: number;
};

const uid = () => Math.random().toString(36).slice(2, 9);

export default function TradelineCalculatorPage(): React.ReactElement {
  const [accounts, setAccounts] = useState<Account[]>([
    { id: uid(), description: "Example — Visa (ending 1234)", age: 2.5, limit: 10000, balance: 2500 },
  ]);

  const addRow = () =>
    setAccounts((s) => [...s, { id: uid(), description: "", age: 0, limit: 0, balance: 0 }]);

  const removeRow = (id: string) =>
    setAccounts((s) => s.filter((a) => a.id !== id));

  const updateRow = (id: string, patch: Partial<Account>) =>
    setAccounts((s) => s.map((a) => (a.id === id ? { ...a, ...patch } : a)));

  const averageAge =
    accounts.length === 0
      ? 0
      : accounts.reduce((sum, a) => sum + (Number.isFinite(a.age) ? a.age : 0), 0) /
        accounts.length;

  const overallUtilization = () => {
    const bal = accounts.reduce((s, a) => s + (Number.isFinite(a.balance) ? a.balance : 0), 0);
    const lim = accounts.reduce((s, a) => s + (Number.isFinite(a.limit) ? a.limit : 0), 0);
    return lim === 0 ? 0 : (bal / lim) * 100;
  };

  const individualUtil = (a: Account) => (!a.limit ? 0 : (a.balance / a.limit) * 100);

  return (
    <main className="min-h-screen w-full bg-slate-50 pt-24">

      {/* 🔵 HERO */}
      <section className="w-full bg-gradient-to-br from-[#0F6FD3] via-[#0b5fa8] to-[#083f7a] text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 mt-8">

          <div>
            <span className="inline-block mb-4 px-4 py-1 text-sm rounded-full bg-white/15 border border-white/20">
              Credit Education Tool
            </span>

            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              Tradeline Calculator
            </h1>

            <p className="mt-5 text-lg text-blue-100 max-w-2xl leading-relaxed">
              Model how <strong>authorized user tradelines</strong> may affect your
              <strong> average age of accounts</strong> and <strong>credit utilization</strong>
              before you buy.
            </p>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/15 backdrop-blur-md p-6 rounded-2xl border border-white/20">
              <p className="text-xs uppercase tracking-wide text-blue-100">Average Age</p>
              <p className="text-3xl font-bold mt-2">{averageAge.toFixed(2)} yrs</p>
            </div>

            <div className="bg-white/15 backdrop-blur-md p-6 rounded-2xl border border-white/20">
              <p className="text-xs uppercase tracking-wide text-blue-100">Utilization</p>
              <p className="text-3xl font-bold mt-2">{overallUtilization().toFixed(2)}%</p>
            </div>
          </div>
        </div>
      </section>

      {/* 📘 INSTRUCTIONS */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto">

          <h2 className="text-3xl font-bold text-blue-900 mb-6">
            How to Use the Tradeline Calculator
          </h2>

          <div className="grid md:grid-cols-2 gap-8">

            <div className="space-y-4 text-lg text-slate-700">
              <p><strong>Step 1:</strong> Obtain a recent copy of your credit report.</p>
              <p>
                <strong>Step 2:</strong> Identify <strong>revolving accounts only</strong>
                (credit cards). Do <u>not</u> include auto loans, mortgages, student loans,
                or installment accounts.
              </p>
              <p>
                <strong>Step 3:</strong> Calculate the age of each card (e.g., 2.5 years)
                and enter it under <strong>Age (yrs)</strong>.
              </p>
            </div>

            <div className="space-y-4 text-lg text-slate-700">
              <p>
                <strong>Step 4 (Optional):</strong> Add a card name under
                <strong> Description</strong> for clarity.
              </p>
              <p>
                <strong>Step 5:</strong> Enter the <strong>credit limit</strong>.
              </p>
              <p>
                <strong>Step 6:</strong> Enter the <strong>current balance owed</strong>.
              </p>
            </div>
          </div>

          <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-xl">
            <p className="text-blue-900 text-lg">
              Once your current accounts are entered, you can add
              <strong> hypothetical tradelines</strong> to see how different ages
              and limits may affect your averages.
            </p>
          </div>
        </div>
      </section>

      {/* 📊 CALCULATOR */}
      <section className="bg-blue-50 py-16 px-6">
        <div className="max-w-7xl mx-auto">

          <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
            <h2 className="text-2xl font-bold text-blue-900">Revolving Credit Accounts</h2>
            <button
              onClick={addRow}
              className="px-5 py-2 bg-[#0F6FD3] text-white font-semibold rounded-lg shadow hover:bg-blue-700"
            >
              + Add Account
            </button>
          </div>

          <div className="overflow-x-auto bg-white shadow-xl rounded-2xl border border-blue-100">
            <table className="w-full text-sm">
              <thead className="bg-blue-100 text-blue-800 uppercase text-xs">
                <tr>
                  <th className="p-4 text-left">Description</th>
                  <th className="p-4">Age (yrs)</th>
                  <th className="p-4">Limit</th>
                  <th className="p-4">Balance</th>
                  <th className="p-4">Utilization</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                {accounts.map((a) => (
                  <tr key={a.id} className="border-t">
                    <td className="p-4">
                      <input
                        value={a.description}
                        onChange={(e) => updateRow(a.id, { description: e.target.value })}
                        className="w-full p-2 border rounded-md"
                        placeholder="Visa / Amex / Discover"
                      />
                    </td>

                    <td className="p-4">
                      <input
                        type="number"
                        step="0.1"
                        value={a.age}
                        onChange={(e) => updateRow(a.id, { age: Number(e.target.value) })}
                        className="w-24 p-2 border rounded-md"
                      />
                    </td>

                    <td className="p-4">
                      <input
                        type="number"
                        value={a.limit}
                        onChange={(e) => updateRow(a.id, { limit: Number(e.target.value) })}
                        className="w-28 p-2 border rounded-md"
                      />
                    </td>

                    <td className="p-4">
                      <input
                        type="number"
                        value={a.balance}
                        onChange={(e) => updateRow(a.id, { balance: Number(e.target.value) })}
                        className="w-28 p-2 border rounded-md"
                      />
                    </td>

                    <td className="p-4 font-mono">
                      {individualUtil(a).toFixed(2)}%
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() => removeRow(a.id)}
                        className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </section>
    </main>
  );
}

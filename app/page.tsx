"use client"; // Client component karena kita fetch CSV di browser

import { useJournal } from "@/hooks/useJournal";
import { ArrowUpRight, ArrowDownRight, Wallet } from "lucide-react";

export default function Dashboard() {
  const { trades, isLoading } = useJournal();

  if (isLoading) return <div className="p-10 text-center text-white">Loading data saham...</div>;

  // Hitung Metrik Sederhana (Javascript Array Reduce)
  // Pastikan nama kolom di Sheet sesuai: 'PnL', 'Ticker', 'Status'
  const totalProfit = trades.reduce((acc: number, curr: any) => acc + Number(curr.PnL || 0), 0);
  const winCount = trades.filter((t: any) => Number(t.PnL) > 0).length;
  const winRate = trades.length > 0 ? ((winCount / trades.length) * 100).toFixed(1) : 0;

  return (
    <main className="min-h-screen bg-[#0f1115] text-white pb-20 md:pb-0">
      
      {/* HEADER MOBILE & DESKTOP */}
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-xl font-bold tracking-tight">Trading Journal 🚀</h1>
        <p className="text-gray-400 text-sm">Semester 5 Portfolio</p>
      </div>

      <div className="p-4 max-w-7xl mx-auto space-y-6">
        
        {/* SCORECARDS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="col-span-2 md:col-span-1 bg-[#1a1d24] p-5 rounded-xl border border-gray-800">
            <div className="flex items-center gap-2 text-gray-400 mb-2">
              <Wallet size={16} />
              <span className="text-xs uppercase font-semibold">Net Profit</span>
            </div>
            <div className={`text-2xl font-bold ${totalProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              Rp {totalProfit.toLocaleString('id-ID')}
            </div>
          </div>

          <div className="bg-[#1a1d24] p-5 rounded-xl border border-gray-800">
            <div className="text-gray-400 text-xs uppercase font-semibold mb-2">Win Rate</div>
            <div className="text-2xl font-bold text-blue-400">{winRate}%</div>
          </div>
          
          <div className="bg-[#1a1d24] p-5 rounded-xl border border-gray-800">
            <div className="text-gray-400 text-xs uppercase font-semibold mb-2">Total Trades</div>
            <div className="text-2xl font-bold">{trades.length}</div>
          </div>
        </div>

        {/* RECENT TRADES LIST */}
        <div className="bg-[#1a1d24] rounded-xl border border-gray-800 overflow-hidden">
          <div className="p-4 border-b border-gray-800 font-semibold">Riwayat Transaksi</div>
          
          <div className="divide-y divide-gray-800">
            {trades.map((trade: any, idx: number) => {
              const isProfit = Number(trade.PnL) >= 0;
              return (
                <div key={idx} className="p-4 flex justify-between items-center hover:bg-gray-800/50 transition">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${isProfit ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                      {isProfit ? <ArrowUpRight size={20} /> : <ArrowDownRight size={20} />}
                    </div>
                    <div>
                      <div className="font-bold">{trade.Ticker}</div>
                      <div className="text-xs text-gray-500">{trade.Date} • {trade.Strategy}</div>
                    </div>
                  </div>
                  <div className={`text-right font-mono ${isProfit ? 'text-green-400' : 'text-red-400'}`}>
                    {isProfit ? '+' : ''}{Number(trade.PnL).toLocaleString('id-ID')}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </main>
  );
}
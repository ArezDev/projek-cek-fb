'use client';

import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [input, setInput] = useState("");
  const [liveResult, setLiveResult] = useState("");
  const [deadResult, setDeadResult] = useState("");
  const [liveCount, setLiveCount] = useState(0);
  const [deadCount, setDeadCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    setLoading(true);
    setLiveResult("");
    setDeadResult("");
    setLiveCount(0);
    setDeadCount(0);

    const lines = input.split("\n").filter(line => line.trim() !== "");

    for (const line of lines) {
      try {
        const res = await axios.post("/api/cek", { user: line.trim() });

        if (res.data?.status === true) {
          setLiveResult(prev => prev + line + "\n");
          setLiveCount(prev => prev + 1);
        } else {
          setDeadResult(prev => prev + line + "\n");
          setDeadCount(prev => prev + 1);
        }
      } catch (err) {
        setDeadResult(prev => prev + line + "\n");
        setDeadCount(prev => prev + 1);
      }
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-6 text-black">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 bg-center bg-cover bg-no-repeat">
        
        <div className="flex flex-col items-center justify-center gap-6">
          
          {/* Input Textarea */}
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-48 p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            placeholder="UID Facebook atau UID|PASSWORD|COOKIE (1 baris per akun)"
          />

          {/* Button & Counter */}
          <div className="w-full flex justify-between items-center text-gray-500">
            <button
              onClick={handleCheck}
              disabled={loading}
              className={`bg-blue-500 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
              }`}
            >
              {loading ? "Memproses..." : "Cek Akun"}
            </button>

            <div className="flex gap-4 text-lg">
              <p className="text-green-500">Live: {liveCount}</p>
              <p className="text-red-500">Dead: {deadCount}</p>
            </div>
          </div>

          {/* Hasil Live dan Dead */}
          <div className="flex flex-col sm:flex-row gap-6 w-full">
            <textarea
              value={liveResult}
              readOnly
              className="w-full sm:w-1/2 h-48 p-4 border-2 border-green-400 rounded-lg resize-none"
              placeholder="Live Result"
            />
            <textarea
              value={deadResult}
              readOnly
              className="w-full sm:w-1/2 h-48 p-4 border-2 border-red-400 rounded-lg resize-none"
              placeholder="Dead Result"
            />
          </div>
        </div>

        {/* Footer */}
        <footer className="flex gap-6 flex-wrap items-center justify-center pt-6 border-t border-gray-300 mt-6">
          <p className="text-cyan-600 text-2xl">Powered by BalaneSohib.team</p>
        </footer>
      </div>
    </div>
  );
}

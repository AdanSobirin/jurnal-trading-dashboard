import useSWR from 'swr';
import Papa from 'papaparse';

// Ganti link ini dengan Link CSV dari Google Sheet Anda
const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ_2gznA_xv31Kn3_oOWjDovHjikujKzPHyHS8D8zWZIMQlwI0fT9JbeJgmWcXzERvNdeMTZ9jN-tgn/pub?gid=0&single=true&output=csv';

const fetcher = async (url: string) => {
  const res = await fetch(url);
  const text = await res.text();
  
  return new Promise((resolve, reject) => {
    Papa.parse(text, {
      header: true, // Baris pertama jadi key object
      skipEmptyLines: true,
      complete: (results) => resolve(results.data),
      error: (error) => reject(error),
    });
  });
};

export const useJournal = () => {
  const { data, error, isLoading } = useSWR(CSV_URL, fetcher, {
    refreshInterval: 10000, // Cek data baru tiap 10 detik
  });

  return {
    trades: data || [],
    isLoading,
    isError: error,
  };
};
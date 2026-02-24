'use client'; // Regra de Boundary [cite: 2026-02-16]
import {
  useState,
  useEffect,
} from 'react';

export default function RedirectTimer({
  targetUrl,
}: {
  targetUrl: string;
}) {
  const [timeLeft, setTimeLeft] =
    useState(5); // 5 segundos de retenção pro CPM contar

  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(
      () => setTimeLeft((t) => t - 1),
      1000,
    );
    return () =>
      clearInterval(interval);
  }, [timeLeft]);

  if (timeLeft > 0) {
    return (
      <button
        disabled
        className='bg-gray-700 text-gray-400 font-bold py-3 px-8 rounded cursor-not-allowed w-full md:w-auto'>
        Aguarde {timeLeft} segundos...
      </button>
    );
  }

  return (
    <a
      href={targetUrl}
      rel='nofollow noopener noreferrer'
      className='bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-8 rounded transition-all shadow-[0_0_15px_rgba(219,39,119,0.5)] w-full md:w-auto inline-block'>
      Assistir Vídeo Agora
    </a>
  );
}

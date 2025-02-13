'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGitHubStore } from '../store/githubStore';
import { fetchRepositories } from '../api/github';
import Image from 'next/image';
import GitHubIcon from '../utils/icons/github';

export default function ExplorerPage() {
  const [username, setUsername] = useState('lodash');
  const { setRepositories } = useGitHubStore();
  const router = useRouter();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;
    const repos = await fetchRepositories(username);
    setRepositories(repos); //Armazena no Zustand
    router.push('/pages/repositoriesList'); //Redirecionamento para pagina que lista os repositórios
  };

  return (
    <div className='relative bg-gray-900 min-h-screen flex flex-col items-center justify-center text-white px-4'>
      <div className="hidden md:block absolute inset-0 opacity-10">
        <GitHubIcon />
      </div>
      <div className="relative  flex flex-col items-center justify-center text-white px-4">
        {/* Introdução */}
        <h1 className="text-6xl font-bold mb-4 text-center">GitHub Explorer</h1>
        <p className="text-lg text-gray-400 mb-6 text-center max-w-md">
          Descubra repositórios no GitHub de qualquer usuário. Digite o nome de usuário e veja os projetos!
        </p>

        {/* Formulário de pesquisa */}
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Digite o usuário do GitHub"
            className="flex-1 border p-3 rounded-md text-black focus:outline-none"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md transition"
          >
            Buscar
          </button>
        </form>

        {/* Rodapé simples */}
        <footer className="mt-10 text-gray-500 text-sm text-center ">
          Projeto desenvolvido como teste para a empresa
          <Image src='/imgs/logo-magazord.png' width={360} height={360} alt='logo-magazord' />
        </footer>
      </div>
    </div>

  );
}

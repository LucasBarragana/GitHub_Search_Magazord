'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import { useGitHubStore } from '../store/githubStore';
import { fetchRepositories } from '../api/github';

export default function ExplorerPage() {
  const [username, setUsername] = useState('');
  const { setRepositories } = useGitHubStore();
  const router = useRouter(); // Hook para navegação

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const repos = await fetchRepositories(username);
    setRepositories(repos); // Armazena no Zustand
    router.push('/pages/repositoriesList'); // Redireciona para a página de repositórios
  };

  return (
    <div className="p-8">
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Digite o usuário do GitHub"
          className="border p-2"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          Buscar
        </button>
      </form>
    </div>
  );
}

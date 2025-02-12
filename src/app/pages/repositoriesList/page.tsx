'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useGitHubStore } from '@/app/store/githubStore';

export default function RepositoriesPage() {
  const { repositories, setSelectedRepo } = useGitHubStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [minStars, setMinStars] = useState('');
  const [maxStars, setMaxStars] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [sortBy, setSortBy] = useState<'stars' | 'date'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Lista única de linguagens
  const uniqueLanguages = useMemo(() => {
    const languages = new Set(repositories.map((repo) => repo.language).filter(Boolean));
    return Array.from(languages);
  }, [repositories]);

  // Filtragem e ordenação
  const filteredRepositories = useMemo(() => {
    return repositories
      .filter((repo) => {
        const stars = repo.stargazers_count;
        const min = minStars ? Number(minStars) : 0;
        const max = maxStars ? Number(maxStars) : Infinity;

        return (
          stars >= min &&
          stars <= max &&
          (selectedLanguage ? repo.language === selectedLanguage : true) &&
          (searchTerm ? repo.name.toLowerCase().includes(searchTerm.toLowerCase()) : true)
        );
      })
      .sort((a, b) => {
        if (sortBy === 'stars') {
          return sortOrder === 'asc'
            ? a.stargazers_count - b.stargazers_count
            : b.stargazers_count - a.stargazers_count;
        } else {
          return sortOrder === 'asc'
            ? new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
            : new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        }
      });
  }, [repositories, searchTerm, minStars, maxStars, selectedLanguage, sortBy, sortOrder]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Filtros</h2>

      {/* Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          placeholder="Buscar por nome..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Min estrelas"
          value={minStars}
          onChange={(e) => setMinStars(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Max estrelas"
          value={maxStars}
          onChange={(e) => setMaxStars(e.target.value)}
          className="border p-2 rounded"
        />
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Todas as linguagens</option>
          {uniqueLanguages.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </div>

      {/* Ordenação */}
      <div className="mb-6 flex flex-wrap gap-4">
        <div>
          <label className="mr-2">Ordenar por:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'stars' | 'date')}
            className="border p-2 rounded"
          >
            <option value="date">Mais novos primeiro</option>
            <option value="stars">Mais estrelas primeiro</option>
          </select>
        </div>
        <button
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {sortOrder === 'asc' ? 'Ascendente' : 'Descendente'}
        </button>
      </div>

      {/* Lista de Repositórios */}
      {filteredRepositories.length > 0 ? (
        filteredRepositories.map((repo) => (
          <div key={repo.id} className="p-4 border-b">
            <Link
              href={`/pages/repository/${repo.name}`}
              className="text-blue-500"
              onClick={() => setSelectedRepo(repo)}
            >
              {repo.name} ({repo.stargazers_count} ⭐) - {repo.language || 'Sem linguagem'} - 📅{' '}
              {new Date(repo.created_at).toLocaleDateString()}
            </Link>
          </div>
        ))
      ) : (
        <p className="text-gray-500">Nenhum repositório encontrado.</p>
      )}
    </div>
  );
}

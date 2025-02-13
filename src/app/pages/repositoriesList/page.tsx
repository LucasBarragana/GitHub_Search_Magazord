'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useGitHubStore } from '@/app/store/githubStore';
import { languageEmojis } from '@/app/utils/languageEmojis';
import GitHubIcon from '@/app/utils/icons/github';
import LeftArrow from '@/app/utils/icons/leftArrow';
import Image from 'next/image';

export default function RepositoriesPage() {
  const { repositories, setSelectedRepo } = useGitHubStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [minStars, setMinStars] = useState('');
  const [maxStars, setMaxStars] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [sortBy, setSortBy] = useState<'stars' | 'date'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const userName = repositories.length > 0 ? repositories[0].owner.login : 'Usuário Desconhecido';

  const uniqueLanguages = useMemo(() => {
    const languages = new Set(repositories.map((repo) => repo.language).filter(Boolean));
    return Array.from(languages);
  }, [repositories]);

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
    <div className='relative bg-gray-100 '>
        <div className="absolute inset-0 opacity-10">
            <GitHubIcon />
        </div>
        <div className="relative px-6 py-10 max-w-4xl mx-auto">
            <div className='flex justify-between mb-8'>
                <div className='font-semibold text-xl md:text-3xl flex gap-4'>
                    <Image src='/imgs/bussula.png' width={24} height={24} alt='bussula' />
                    <p>GitHub_Explorer</p>             
                </div>
                <Link href='/' className='flex items-center  text-gray-700 hover:text-gray-500'>
                    <LeftArrow />
                    <p>Pesquisar outro usuário</p>                    
                </Link>
            </div>
            <h2 className="font-bold mb-4 text-center ">
                <p className='text-4xl mb-2'>Repositórios do GitHub - {userName}</p>
                <Link href='/pages/favorites' className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>
                    Ver Favoritos ⭐
                </Link>
            </h2>

            {/* Filtros */}
            <div className="grid grid-cols-3 gap-4  mb-6">
                <div>
                    <p className='font-semibold'>Filtrar por Repositório</p>
                    <input
                    type="text"
                    placeholder="Buscar por nome..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border p-2 rounded w-full"
                    />
                </div>

                <div>
                    <p className='font-semibold'>Filtrar por estrelas</p>
                    <div className='flex gap-4'>
                        <input
                        type="number"
                        placeholder="Min estrelas"
                        value={minStars}
                        onChange={(e) => setMinStars(e.target.value)}
                        className="border p-2 rounded w-full"
                        />
                        <input
                        type="number"
                        placeholder="Max estrelas"
                        value={maxStars}
                        onChange={(e) => setMaxStars(e.target.value)}
                        className="border p-2 rounded w-full"
                        />
                    </div>
                </div>

                <div>
                    <p className='font-semibold'>Filtrar por Linguagem</p>
                    <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="border p-2 rounded w-full"
                    >
                    <option value="">Todas as linguagens</option>
                    {uniqueLanguages.map((lang) => (
                        <option key={lang} value={lang}>
                        {lang}
                        </option>
                    ))}
                    </select>
                </div>
            </div>

            <div className="flex flex-wrap gap-4 mb-6 justify-center">
                <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'stars' | 'date')}
                className="border p-2 rounded"
                >
                <option value="date">Mais novos primeiro</option>
                <option value="stars">Mais estrelas primeiro</option>
                </select>
                <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                {sortOrder === 'asc' ? 'Ascendente' : 'Descendente'}
                </button>
            </div>
            

            {/* Listagem de Repositórios */}
            <div className="space-y-4 ">
                {filteredRepositories.length > 0 ? (
                    filteredRepositories.map((repo) => (
                        <div key={repo.id} className="p-4 text-blue-800 bg-white border rounded shadow-md hover:bg-gray-50">
                            <Link
                                href={`/pages/repository/${repo.name}`}
                                className="text-blue-800"
                                onClick={() => setSelectedRepo(repo)}
                            >
                                <p className='text-2xl font-semibold'>{repo.name}</p>
                                <div className="grid grid-cols-4 font-semibold text-center">
                                <p>{repo.stargazers_count} ⭐</p>
                                <p>
                                    {repo.language ? (
                                        <>
                                            {languageEmojis[repo.language] || languageEmojis["Default"]} {repo.language}
                                        </>
                                    ) : (
                                        <>💻 Sem linguagem</>
                                    )}
                                </p>
                                <p>📅 {new Date(repo.created_at).toLocaleDateString()}</p>
                                <p className='ml-20'>
                                    <Image src="/imgs/rightRow.png" width={24} height={24} alt='rigth arrow'/>
                                </p>                                
                            </div>
                            </Link>
                        </div>
                    ))
                ) : (
                    <p className="text-center">Nenhum repositório encontrado.</p>
                )}
            </div>
        </div>
    </div>

  );
}

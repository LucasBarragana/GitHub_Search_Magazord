'use client'

import Link from 'next/link';
import { useGitHubStore } from '@/app/store/githubStore';
import GitHubIcon from '@/app/utils/icons/github';
import LeftArrow from '@/app/utils/icons/leftArrow';
import Image from 'next/image';

export default function FavoritesPage() {
  const { starredRepositories } = useGitHubStore();

  return (
    <div className="relative bg-gray-100 min-h-screen text-gray-800">
      <div className="absolute inset-0 opacity-10">
        <GitHubIcon />
      </div>
      <div className="relative px-6 py-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between mb-8">
          <div className="font-semibold text-3xl flex gap-4">
            <Image src="/imgs/bussula.png" width={24} height={24} alt="bussula" />
            <p>GitHub_Explorer</p>
          </div>
          <Link href="/pages/repositoriesList" className="flex items-center text-gray-700 hover:text-gray-500">
            <LeftArrow />
            <p className="ml-2">Voltar para Repositórios</p>
          </Link>
        </div>

        {/* Título */}
        <h2 className="text-4xl font-bold mb-6 text-center">Repositórios Favoritos ⭐</h2>

        {/* Lista de Favoritos */}
        <div className="space-y-4">
          {starredRepositories.length > 0 ? (
            starredRepositories.map((repo) => (
              <div 
                key={repo.id} 
                className="p-4 bg-white border rounded-lg shadow-md hover:bg-gray-50 transition"
              >
                <Link href={`/pages/repository/${repo.owner.login}/${repo.name}`} className="text-blue-800 block">
                  <p className="text-2xl font-semibold mb-2">{repo.name}</p>
                  <div className="grid grid-cols-3 font-semibold text-center text-gray-600">
                    <p>{repo.stargazers_count} ⭐</p>
                    <p>📅 {new Date(repo.created_at).toLocaleDateString()}</p>
                    <p className="flex justify-center">
                      <Image src="/imgs/rightRow.png" width={24} height={24} alt="right arrow" />
                    </p>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">Nenhum repositório favorito encontrado.</p>
          )}
        </div>
      </div>
    </div>
  );
}

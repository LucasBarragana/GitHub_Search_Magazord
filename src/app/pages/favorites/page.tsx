'use client'

import Link from 'next/link';
import { useGitHubStore } from '@/app/store/githubStore';
import GitHubIcon from '@/app/utils/icons/github';
import LeftArrow from '@/app/utils/icons/leftArrow';
import Image from 'next/image';

export default function FavoritesPage() {
  const { starred } = useGitHubStore();

  return (
    <div className='relative bg-gray-100'>
      <div className="absolute inset-0 opacity-10">
        <GitHubIcon />
      </div>
      <div className="relative px-6 py-10 max-w-4xl mx-auto">
        <div className='flex justify-between mb-8'>
          <div className='font-semibold text-3xl flex gap-4'>
            <Image src='/imgs/bussula.png' width={24} height={24} alt='bussula' />
            <p>GitHub_Explorer</p>
          </div>
          <Link href='/pages/repositoriesList' className='flex items-center text-gray-700 hover:text-gray-500'>
            <LeftArrow />
            <p>Voltar para Repositórios</p>
          </Link>
        </div>
        <h2 className="text-4xl font-bold mb-4 text-center">Repositórios Favoritos ⭐</h2>
        <div className="space-y-4">
          {starred.length > 0 ? (
            starred.map((repo) => (
              <div key={repo.id} className="p-4 text-blue-800 bg-white border rounded shadow-md hover:bg-gray-50">
                <Link href={`/pages/repository/${repo.name}`} className="text-blue-800">
                  <p className='text-2xl font-semibold'>{repo.name}</p>
                  <div className="grid grid-cols-3 font-semibold text-center">
                    <p>{repo.stargazers_count} ⭐</p>
                    <p>📅 {new Date(repo.created_at).toLocaleDateString()}</p>
                    <p className='ml-20'>
                      <Image src="/imgs/rightRow.png" width={24} height={24} alt='right arrow'/>
                    </p>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <p className="text-center">Nenhum repositório favorito encontrado.</p>
          )}
        </div>
      </div>
    </div>
  );
}

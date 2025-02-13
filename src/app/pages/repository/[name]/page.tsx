'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import useSWR from 'swr';
import { useGitHubStore } from '../../../store/githubStore';
import LeftArrow from '@/app/utils/icons/leftArrow';
import GitHubIcon from '@/app/utils/icons/github';
import Image from 'next/image';
import Badge from '@/app/components/RepositoryList/Badge';
import ListSection from '@/app/components/RepositoryList/ListenSection';

interface Fork {
  id: number;
  html_url: string;
  full_name?: string;
  owner?: {
    login: string;
  };
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function RepositoryDetails() {
  const params = useParams();
  const { name } = params as { name: string };
  const { selectedRepo } = useGitHubStore();

  if (!selectedRepo) {
    return <p className="text-center text-gray-600">Não encontramos nenhum usuário com este nome.</p>;
  }

  const owner = selectedRepo.owner.login;

  const { data: repo, error: repoError } = useSWR(`https://api.github.com/repos/${owner}/${name}`, fetcher);
  const { data: pulls, error: pullError } = useSWR(`https://api.github.com/repos/${owner}/${name}/pulls`, fetcher);
  const { data: issues, error: issueError } = useSWR(`https://api.github.com/repos/${owner}/${name}/issues`, fetcher);
  const { data: forks, error: forksError } = useSWR(`https://api.github.com/repos/${owner}/${name}/forks`, fetcher);

  if (repoError || pullError || issueError) 
    return <p className="text-center text-red-500">Erro ao carregar os dados.</p>;
  if (!repo) 
    return <p className="text-center text-gray-500">Carregando...</p>;

  return (
    <div className='relative bg-gray-100'>
      <div className="absolute inset-0 opacity-10">
        <GitHubIcon />
      </div>
      <div className="relative px-6 py-10 max-w-4xl mx-auto">
        {/* Cabeçalho */}
        <div className='flex justify-between mb-8'>
          <div className='font-semibold text-xl md:text-3xl flex gap-4'>
            <Image src='/imgs/bussula.png' width={24} height={24} alt='bussula' />
            <p>GitHub_Explorer</p>             
          </div>
          <Link href="/pages/repositoriesList" className='flex items-center  text-gray-700 hover:text-gray-500'>
            <LeftArrow />
            <p>Voltar</p>                    
          </Link>
        </div>

        {/* Nome e Descrição */}
        <h1 className="text-4xl font-bold text-center mb-4">{repo.name}</h1>
        <p className="text-gray-700 text-center mb-6">{repo.description || 'Sem descrição disponível.'}</p>

        {/* Estatísticas */}
        <div className="flex flex-wrap justify-center gap-6 text-gray-700 ">
          <Badge imgSrc="/imgs/stars.png" count={repo.stargazers_count} label="Stars" section="#" />
          <Badge imgSrc="/imgs/forks.png" count={repo.forks_count} label="Forks" section="#forks" />
          <Badge imgSrc="/imgs/issues.png" count={repo.open_issues_count} label="Issues Abertas" section="#issues" />
          <Badge imgSrc="/imgs/pullrequest.png" count={pulls?.length || 0} label="Pull Requests" section="#pulls" />
        </div>

        {/* Link para GitHub */}
        <div className="text-center mt-6">
          <Link href={repo.html_url} target="_blank" className="text-blue-500 font-semibold hover:underline">
            Ver no GitHub
          </Link>
        </div>

        {/* Seção de Pull Requests */}
        <ListSection 
          id='pulls'
          title="Últimas Pull Requests" 
          items={pulls || []} 
          emptyMessage="No momento, não existe nenhuma pull request acessível ou realizada." 
        />

        {/* Seção de Issues Abertas */}
        <ListSection 
          id='issues'
          title="Issues Abertas" 
          items={issues || []} 
          emptyMessage="No momento, não existe nenhuma issue acessível ou aberta." 
        />

        {/* Seção de Forks */}
        <ListSection 
          id='forks'
          title="Forks" 
          items={(forks as Fork[])?.map((fork) => ({
            id: fork.id,
            html_url: fork.html_url,
            title: fork.full_name || fork.owner?.login || "Fork sem nome"
          })) || []} 
          emptyMessage="No momento, não existe nenhum fork acessível." 
        />
      </div>
    </div>
  );
}

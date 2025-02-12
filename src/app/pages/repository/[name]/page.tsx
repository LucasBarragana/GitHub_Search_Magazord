'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import useSWR from 'swr';
import { useGitHubStore } from '../../../store/githubStore';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function RepositoryDetails() {
  const params = useParams();
  const { name } = params as { name: string };
  const { selectedRepo } = useGitHubStore();

  if (!selectedRepo) {
    return <p>Não encontramos nenhum usuário com este nome</p>;
  }

  const owner = selectedRepo.owner.login;

  const { data: repo, error: repoError } = useSWR(
    `https://api.github.com/repos/${owner}/${name}`,
    fetcher
  );

  const { data: pulls, error: pullError } = useSWR(
    `https://api.github.com/repos/${owner}/${name}/pulls`,
    fetcher
  );

  const { data: issues, error: issueError } = useSWR(
    `https://api.github.com/repos/${owner}/${name}/issues`,
    fetcher
  );

  console.log("Repositório recebido:", repo);
  console.log("Pull Requests recebidas:", pulls);

  if (repoError || pullError || issueError) return <p>Erro ao carregar os dados</p>;
  if (!repo) return <p>Carregando...</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">{repo.name}</h1>
      <p>{repo.description || 'Sem descrição disponível.'}</p>

      <div className="flex gap-4 mt-4">
        <span>⭐ {repo.stargazers_count} Stars</span>
        <span>🍴 {repo.forks_count} Forks</span>
        <span>🐛 {repo.open_issues_count} Issues Abertas</span>
      </div>

      <Link href={repo.html_url} target="_blank" className="text-blue-500 mt-4 block">
        Ver no GitHub
      </Link>

      {/* Listar Pull Requests */}
      <h2 className="text-xl font-bold mt-6">Últimas Pull Requests</h2>
      {pulls && pulls.length > 0 ? (
        <ul className="list-disc ml-6">
          {pulls.map((pr: any) => (
            <li key={pr.id}>
              <Link href={pr.html_url} target="_blank" className="text-blue-500">
                {pr.title}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No momento, não existe nenhuma pull request feita.</p>
      )}

      {/* Listar Issues */}
      <h2 className="text-xl font-bold mt-6">Issues Abertas</h2>
      {issues && issues.length > 0 ? (
        <ul className="list-disc ml-6">
          {issues.map((issue: any) => (
            <li key={issue.id}>
              <Link href={issue.html_url} target="_blank" className="text-blue-500">
                {issue.title}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No momento, não existe nenhuma issue aberta.</p>
      )}
    </div>
  );
}

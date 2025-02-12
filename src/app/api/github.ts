export async function fetchRepositories(username: string) {
    const res = await fetch(`https://api.github.com/users/${username}/repos`);
    if (!res.ok) throw new Error('Erro ao buscar repositórios');
    return res.json();
  }
  
  export async function fetchStarred(username: string) {
    const res = await fetch(`https://api.github.com/users/${username}/starred`);
    if (!res.ok) throw new Error('Erro ao buscar favoritos');
    return res.json();
  }
  
  export async function fetchRepositoryDetails(owner: string, repoName: string) {
    const res = await fetch(`https://api.github.com/repos/${owner}/${repoName}`);
    if (!res.ok) throw new Error('Erro ao buscar detalhes do repositório');
    return res.json();
  }
  
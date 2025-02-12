import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useGitHub(username: string) {
  const { data: repositories, error: repoError } = useSWR(
    username ? `https://api.github.com/users/${username}/repos` : null,
    fetcher
  );

  const { data: starred, error: starError } = useSWR(
    username ? `https://api.github.com/users/${username}/starred` : null,
    fetcher
  );

  return { repositories, starred, repoError, starError };
}
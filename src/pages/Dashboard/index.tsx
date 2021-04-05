import React, {FormEvent, useEffect, useState} from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Title, Form, Repositories, Error } from './styles';
import { Link } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };

}


const Dashboard: React.FC = () => {
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storedRepositories = localStorage.getItem('@GithubExplorer:repositories');

    if(storedRepositories) {
      return JSON.parse(storedRepositories);
    }

    return [];
  });
  const [newRepo, setNewRepo] = useState('');
  const [inputError, setInputError] = useState('');

  useEffect(() => {
    localStorage.setItem(
      '@GithubExplorer:repositories',
      JSON.stringify(repositories)
    );
  }, [repositories]);

  async function handleAddRepository(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    if(!newRepo) {
      setInputError('digite o autor/nome do repositorio');
      return;
    }

    try {
    const response = await api.get<Repository>(`repos/${newRepo}`);
    const repository = response.data;
    
    setRepositories([...repositories, repository]);
    setNewRepo('');
    setInputError('');
    }

    catch(err) {
      setInputError('Erro na busca por esse repositorio');
    }
  }
  return (
    <>
      <img src={logoImg} alt='github explorer' />
      <Title>Explore Repositorios no github</Title>

      <Form hasError={!!inputError} onSubmit={handleAddRepository} >
        <input value={newRepo} onChange={e => setNewRepo(e.target.value)} placeholder='digite o nome do repositorio' />
        <button type='submit' >Pesquisar</button>
      </Form>

      { inputError && <Error>{inputError}</Error> }

      <Repositories>
        {repositories.map(repository => (
          <Link key={repository.full_name} to={`repositories/${repository.full_name}`}>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <div>
            <strong>{repository.full_name}</strong>
            <p>{repository.description}</p>
          </div>

          <FiChevronRight height={20} /> 
        </Link>
        ))}
      </Repositories>

      
    </>
  )
}

export default Dashboard
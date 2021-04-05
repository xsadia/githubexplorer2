import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Header, RepositoryInfo, Issues } from './styles';
import { Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';


interface RepositoryParams {
  repository: string;
}

const Repository: React.FC = () => {
  const { params } = useRouteMatch<RepositoryParams>();

  return (
    <>
    <Header>
      <img src={logoImg} alt="github explorer"/>
      <Link to="/">
        <FiChevronLeft size={16} />
        Voltar
      </Link>
    </Header>

    <RepositoryInfo>
      <header>
        <img src="https://i.natgeofe.com/n/4bf47147-ce80-49c6-98ae-52f63349045f/67655_16x9.jpg?w=636&h=358" alt=""/>
        <div>
          <strong>Rocketseat/unform</strong>
          <p>description</p>
        </div>
      </header>
      <ul>
        <li>
          <strong>1800</strong>
          <span>stars</span>
        </li>

        <li>
          <strong>1800</strong>
          <span>Forks</span>
        </li>

        <li>
          <strong>1800</strong>
          <span>Issues</span>
        </li>
      </ul>
    </RepositoryInfo>

    <Issues>
      <Link to={'fawfwafw'}>
        <div>
          <strong>repository.full_name</strong>
          <p>repository.description</p>
        </div>

        <FiChevronRight height={20} /> 
      </Link>
    </Issues>
    </>
  )
}

export default Repository
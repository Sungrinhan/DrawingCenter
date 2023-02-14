import Link from 'next/link';
import { useRouter } from 'next/router';
import { LinkButton } from '../styles/NavBar';

const NavBar = () => {
  const router = useRouter();
  return (
    <nav>
      <LinkButton href="/" className={router.pathname === '/' ? 'active' : ''}>
        Home
      </LinkButton>

      <LinkButton href="/drawcenterkonva" className={router.pathname === '/drawcenterkonva' ? 'active' : ''}>
        Draw Center with Konva
      </LinkButton>

      <LinkButton href="/test" className={router.pathname === 'test' ? 'active' : ''}>
        TEst
      </LinkButton>
      <style jsx>{`
        nav {
          background-color: none;
        }

        .active {
          color: tomato;
        }

        a {
          margin: 10px;
        }
      `}</style>
    </nav>
  );
};

export default NavBar;

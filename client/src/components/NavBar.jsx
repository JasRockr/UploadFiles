import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

const links = [
  {
    link: '/',
    text: 'Home',
    id: 1,
  },
  {
    link: '/',
    text: 'Page',
    id: 2,
  },
];

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windowDimension, setWindowDimension] = useState({
    innerHeight: window.innerHeight,
    innerWidth: window.innerWidth,
  });

  const detectSize = () => {
    setWindowDimension({
      innerHeight: window.innerHeight,
      innerWidth: window.innerWidth,
    });
  };

  useEffect(() => {
    window.addEventListener('resize', detectSize);
    return () => {
      window.addEventListener('resize', detectSize);
    };
  }, [windowDimension.innerWidth]);

  return (
    <div className="flex items-center w-full px-4 justify-around bg-green-500">
      <Link to={'/'} className="text-white font-semibold text-xl p-2">
        Logo
      </Link>
      {windowDimension.innerWidth > 768
        ? links.map(l => (
            <Link
              className="text-xl text-white font-semibold"
              to={l.link}
              key={l.id}
            >
              {l.text}
            </Link>
          ))
        : isMenuOpen &&
          links.map(l => (
            <Link
              className="text-xl text-white font-semibold"
              to={l.link}
              key={l.id}
            >
              {l.text}
            </Link>
          ))}
      {!isMenuOpen ? (
        <AiOutlineMenu
          size={24}
          color="#f2f2f2"
          onClick={() => setIsMenuOpen(true)}
        />
      ) : (
        <AiOutlineClose
          size={24}
          color="#f2f2f2"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default NavBar;

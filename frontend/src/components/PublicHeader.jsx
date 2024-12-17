
import { useEffect, useState } from 'react';

export default function PublicHeader() {
  const [isLoginPage, setIsLoginPage] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsLoginPage(window.location.pathname === '/login');
    }
  }, []);

  return (
    <header className="bg-white">
      <nav
        aria-label="Global"
        className="mx-auto border-b shadow-md flex max-w-7xl items-center justify-between p-3 pl-8 lg:px-8"
      >
        <div className="flex items-center">
          <a href="/" className="-m-1.5">
            <span className="sr-only">Tutor Now</span>
            <img alt="logo" src="/logo.png" className="h-16 w-auto" />
          </a>
        </div>

        {!isLoginPage && (
          <div className="mr-8">
            <a
              href="/login"
              className="text-sm text-white bg-blue-950 px-5 py-3 font-semibold hover:bg-blue-700"
            >
              Login
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}

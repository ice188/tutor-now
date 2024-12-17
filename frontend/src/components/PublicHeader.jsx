export default function PublicHeader() {
  return (
    <header className="bg-white">
      <nav
        aria-label="Global"
        className="mx-auto border-b shadow-md flex max-w-7xl items-center justify-between p-3 pl-8 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5">
            <span className="sr-only">Tutor Now</span>
            <img alt="logo" src="/logo.png" className="h-16 w-auto" />
          </a>
        </div>
      </nav>
    </header>
  );
}

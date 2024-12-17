export default function PrivateHeader() {
  const handleLogout = () => {
    localStorage.removeItem('token');
  }
  return (
    <header className="bg-white">
      <nav
        aria-label="Global"
        className="mx-auto border-b shadow-md flex max-w-7xl pr-16 items-center justify-between p-3 pl-8 lg:px-8"
      >

        <div className="flex lg:flex-1 items-center justify-center">
          <a href="/" className="-m-1.5">
            <span className="sr-only">Tutor Now</span>
            <img alt="Tutor Now Logo" src="/logo.png" className="h-16 w-auto" />
          </a>
        </div>

        <div className="flex space-x-6 items-center">
          <a
            href="/dashboard"
            className="text-sm font-semibold text-blue-950 hover:text-blue-700"
          >
            Dashboard
          </a>
          <a
            href="/create-booking"
            className="text-sm font-semibold text-blue-950 hover:text-blue-700"
          >
            Create Booking
          </a>
          <a
            href="/availability-request"
            className="text-sm font-semibold text-blue-950 hover:text-blue-700"
          >
            Availability Request
          </a>
          <a
            href="/all-appointments"
            className="text-sm font-semibold text-blue-950 hover:text-blue-700"
          >
            All Appointments
          </a>
          <button
            onClick={handleLogout}
            className="text-sm text-white bg-blue-950 px-5 py-2 font-semibold text-red-600 hover:bg-blue-700"
          >
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
}

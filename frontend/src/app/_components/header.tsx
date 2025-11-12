import Link from "next/link";

export function Header() {
  return (
    <header className="bg-dark text-white sticky top-0 z-50 border-b border-dark-700">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-primary">SMi</div>
            <span className="text-sm text-gray-300 hidden sm:block">GROUP</span>
          </Link>

          <nav className="flex items-center space-x-6">
            <Link
              href="/"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Demandas
            </Link>
            <Link
              href="/itens"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Itens
            </Link>
          </nav>

          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-xs font-medium">User</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

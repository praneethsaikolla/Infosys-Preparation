import { Link, useLocation } from "react-router-dom";
import { BookOpen, Home, ClipboardList } from "lucide-react";

const Navbar = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Infosys Prep</h1>
              <p className="text-xs text-muted-foreground">Exam Practice Portal</p>
            </div>
          </Link>

          <div className="flex items-center gap-1">
            <Link
              to="/"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                isActive("/")
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-muted"
              }`}
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Home</span>
            </Link>
            <Link
              to="/mock-test"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                isActive("/mock-test")
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-muted"
              }`}
            >
              <ClipboardList className="w-4 h-4" />
              <span className="hidden sm:inline">Mock Test</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

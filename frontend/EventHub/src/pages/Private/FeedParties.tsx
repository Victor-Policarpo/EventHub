import { Link } from "react-router-dom";
import FeedParty from "../../components/Parties/FeedParty";
import Header from "../../components/Ui/Header";

function Feed() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Próximos Eventos
          </h1>
          <nav className="space-x-4">
            <Link to="/feed/toys" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md">
              Brinquedos
            </Link>
            <Link to="/feed/employees" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md">
              Funcionarios
            </Link>
          </nav>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 border border-slate-100">
          <FeedParty/>
        </div>

      </main>
    </div>
  );
}

export default Feed;
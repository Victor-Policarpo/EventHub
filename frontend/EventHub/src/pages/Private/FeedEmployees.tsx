import { Header, Button, FeedEmployee } from "../../components";

export function FeedEmployees() {
    return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Funcionarios
          </h1>
          <nav className="space-x-4">
            <Button
              to={"/feed/toys"}
              variant="ghost"
            >
              Brinquedos
            </Button>

            <Button 
              to={"/feed"}
              variant="ghost"
              >
              Festas
            </Button>
          </nav>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-slate-100">
          <FeedEmployee/>
        </div>

      </main>
    </div>
  );
}
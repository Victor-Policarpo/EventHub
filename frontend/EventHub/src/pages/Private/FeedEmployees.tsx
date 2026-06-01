import { Header, Button, FeedEmployee } from "../../components";
import { Guard } from "../../components/Common/Guard";

export function FeedEmployees() {
    return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Funcionarios
          </h1>
          <nav className="space-x-4 flex flex-row">
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
            
            <Guard 
              role="ADMIN"
            >
              <Button 
                to={"/employee"}
                variant="ghost"
              >
                Adicionar Funcionario
              </Button>

              <Button 
                to={"/dashboard"}
                variant="ghost"
              >
                  Dashboard
              </Button>
            </Guard>

          </nav>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-slate-100">
          <FeedEmployee/>
        </div>

      </main>
    </div>
  );
}
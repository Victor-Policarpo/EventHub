import { Button } from "../../components";

export function NotFoundPage() {
  return (
    // Canvas minimalista: fundo totalmente branco e conteúdo centralizado
    <main className="min-h-screen w-full flex flex-col items-center justify-center bg-white px-6 py-16 text-center">
      
      {/* 404 atuando como âncora visual (substituindo ilustrações) */}
      <p className="text-6xl md:text-8xl font-extrabold text-blue-600 tracking-tighter">
        404
      </p>
      
      {/* Hierarquia clara de título e subtítulo */}
      <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        Página não encontrada
      </h1>
      
      <p className="mt-4 text-base text-slate-500 max-w-md mx-auto leading-relaxed">
        Desculpe, não conseguimos encontrar a página que você está procurando. Verifique o link ou retorne para o início.
      </p>
      
      {/* Botão espaçado para garantir o "respiro" do layout */}
      <div className="mt-10 w-full sm:w-auto">
        <Button 
          to="/login" 
          variant="primary" 
          className="w-full sm:w-auto min-h-12 px-8 text-base"
        >
          Ir para o Login
        </Button>
      </div>
      
    </main>
  );
}
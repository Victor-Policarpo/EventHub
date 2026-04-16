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
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 border border-slate-100">
          <FeedParty/>
        </div>

      </main>
    </div>
  );
}

export default Feed;
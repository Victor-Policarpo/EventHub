import { Link } from "react-router-dom";
import Toys from "../../components/Toys/ToyFeed";
import Header from "../../components/Ui/Header";
function FeedToys(){
    return (
        <div className="min-h-screen bg-slate-50">
            <Header />
            <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="mb-6 flex justify-between items-center">
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                Brinquedos
                    </h1>
                    <nav>
                        <Link to="/feed" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md">
                        Festas
                        </Link>
                    </nav>
                </div>
                <div className="bg-white rounded-2xl shadow-sm p-6 border border-slate-100">
                    <Toys/>
                </div>
            </main>
    </div>
    );

}
export default FeedToys;
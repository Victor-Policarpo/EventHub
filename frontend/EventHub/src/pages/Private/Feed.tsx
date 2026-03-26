import { Link } from "react-router-dom";
function Feed(){
    return (
        <div>
            <h1>Feed de Eventos</h1>
            <p>Aqui você verá os eventos disponíveis.</p>
            <Link to="/profile">
                <button>Ir para Perfil</button>
            </Link>
        </div>
    );
}
export default Feed;
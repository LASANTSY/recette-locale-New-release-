// src/components/layouts/AdminLayout.jsx
import {Outlet} from 'react-router-dom';
const AdminLayout = () => {


    return (
        <div className="h-screen flex overflow-hidden bg-[#F2F2F2]"> {/* Conteneur principal en pleine hauteur */}
            {/* Sidebar fixe */}
            <div className="flex-none">
                <Sidebar/>
            </div>

            {/* Conteneur du contenu principal */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header fixe */}
                <div className="flex-none">
                    <Header  userData ={ "" } />
                </div>

                {/* Zone de contenu scrollable */}
                <main className="flex-1 overflow-y-auto p-6">
                    <div className="h-full">
                        <Outlet/>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;

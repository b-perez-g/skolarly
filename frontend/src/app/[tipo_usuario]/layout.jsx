import NavbarApoderado from '@/components/Navbars/NavbarApoderado';
import NavbarDocente from '@/components/Navbars/NavbarDocente'

export default function RootLayout({ children, params }) {
  return (
    <div>
        {params.tipo_usuario==="Apoderado" ? <NavbarApoderado tipo_usuario = {params.tipo_usuario} /> : null}
        {params.tipo_usuario==="Docente" ? <NavbarDocente tipo_usuario = {params.tipo_usuario} /> : null}
      <div 
        className="mt-4 ml-12 p-5 ml-8 mr-8 sm:ml-12 sm:mr-12 md:ml-16 md:mr-16 lg:ml-64 lg:mr-32 xl:ml-64 xl:mr-64">
        {children}
      </div>
    </div>
  );
}

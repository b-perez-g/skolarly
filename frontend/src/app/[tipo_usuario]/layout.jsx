import NavbarApoderado from '@/components/Navbars/NavbarApoderado';
import NavbarDocente from '@/components/Navbars/NavbarDocente';
import Footer from '@/components/Footer';

export default function RootLayout({ children, params }) {
  return (
    <div className="flex flex-col min-h-screen">
      {params.tipo_usuario === "Apoderado" ? <NavbarApoderado tipo_usuario={params.tipo_usuario} /> : null}
      {params.tipo_usuario === "Docente" ? <NavbarDocente tipo_usuario={params.tipo_usuario} /> : null}
      <div className="flex-grow mt-4 ml-12 p-5 ml-8 mr-8 sm:ml-12 sm:mr-12 md:ml-16 md:mr-16 lg:ml-64 lg:mr-32 xl:ml-64 xl:mr-64">
        {children}
        <div className='mt-8'>
        <Footer />
        </div>
      </div>
    </div>
  );
}

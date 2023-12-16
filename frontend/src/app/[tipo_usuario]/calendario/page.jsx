import React from 'react';
import AdvancedCalendar from '@/components/Calendario';
import { Button } from '@nextui-org/react';

function Page() {
  return (
    <div>
        <div className="mt-5 bg-blue-900 p-5 border-2 border-white rounded-lg mb-5">
        <h2 className="text-3xl font-bold text-blue-50 text-left">Calendario de actividades</h2>
      </div>
      <div className='flex justify-end'> {/* Cambiado de 'justify-right' a 'justify-end' */}
        <Button color='primary'>Agendar cita</Button>
      </div>
      <div>
        <AdvancedCalendar />
      </div>
    </div>
  );
}

export default Page;

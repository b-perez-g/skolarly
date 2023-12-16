'use client'
import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Modal from 'react-modal';

moment.locale('es');

const localizer = momentLocalizer(moment);

const events = [
  {
    id: 1,
    title: 'Reunión de apoderados',
    start: new Date(2023, 11, 18, 18, 0),
    end: new Date(2023, 11, 18, 19, 0),
  },
  {
    id: 2,
    title: 'Paseo fin de año 8°A',
    start: new Date(2023, 11, 20, 10, 0),
    end: new Date(2023, 11, 20, 18, 0),
  },
];

const messages = {
  allDay: 'Todo el día',
  previous: 'Anterior',
  next: 'Siguiente',
  today: 'Hoy',
  month: 'Mes',
  week: 'Semana',
  day: 'Día',
  agenda: 'Agenda',
  date: 'Fecha',
  time: 'Hora',
  event: 'Evento',
  showMore: (total) => `+ Ver más (${total})`,
};

const AdvancedCalendar = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="flex justify-center mt-5">
      <div className="w-full">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          views={['month', 'week', 'day']}
          onSelectEvent={handleEventClick}
          style={{ height: '70vh' }}
          messages={messages}
        />
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Detalles del Evento"
      >
        <h2>{selectedEvent && selectedEvent.title}</h2>
        <p>
          <strong>Fecha de inicio:</strong>{' '}
          {selectedEvent && moment(selectedEvent.start).format('LLLL')}
        </p>
        <p>
          <strong>Fecha de finalización:</strong>{' '}
          {selectedEvent && moment(selectedEvent.end).format('LLLL')}
        </p>
        <button onClick={closeModal}>Cerrar</button>
      </Modal>
    </div>
  );
};

export default AdvancedCalendar;

import { create } from 'zustand';

export const useAppState = create((set) => ({
  alumno: {},
  curso: {},
  asignaturas: [],
  calificaciones: [],
  asistencia: [],
  anotaciones:[],
  companeros:[],
  apoderado: {},
  profJefe: {},
  bloquesHorarios: [],
  setAlumno: (alumno) => set({ alumno }),
  setCurso: (curso) => set({ curso }),
  setAsignaturas: (asignaturas) => set({ asignaturas }),
  setCalificaciones: (calificaciones) => set ({calificaciones}),
  setAsistencia: (asistencia) => set ({asistencia}),
  setAnotaciones: (anotaciones) => set ({anotaciones}),
  setCompaneros: (companeros) => set ({companeros}),
  setApoderado: (apoderado) => set({apoderado}),
  setProfJefe: (profJefe) => set({profJefe}),
  setBloquesHorarios: (bloquesHorarios) => set({bloquesHorarios})
}));
export const mockPatients = [
  { 
    id: 1, 
    name: "Lucas Prieto", 
    age: 7, 
    condition: `Sufre de hiperreactividad al contacto físico; tiene problemas con el roce accidental o intencional de terceros, lo que gatilla respuestas de huida o bloqueo motor. Este registro es crítico para protocolos de atención presencial donde el examen físico o la proximidad son necesarios.`, 
    active: true,
    activities: [
      { title: "Sesión Ocupacional 01", duration: "12:30", link: "#" },
      { title: "Evaluación de Bloqueo", duration: "05:15", link: "#" },
      { title: "Avance de Movilidad", duration: "08:45", link: "#" }
    ],
    weeklyStats: { completed: 3, goal: 5, days: [true, false, true, true, false, false, false] }
  },

  { 
    id: 2, 
    name: "María Fernández", 
    age: 6, 
    condition: `Sufre de defensividad táctil ante materiales sintéticos; tiene problemas con el contacto cutáneo de fibras rígidas y etiquetas de ropa, manifestando irritabilidad inmediata. Esta condición es frecuente en trastornos del procesamiento sensorial y requiere un control estricto de los materiales en contacto con el usuario`, 
    active: true,
    activities: [
      { title: "Reacción a Texturas", duration: "10:00", link: "#" },
      { title: "Test de Etiquetas", duration: "04:20", link: "#" }
    ],
    weeklyStats: { completed: 2, goal: 3, days: [false, true, false, true, false, false, false] }
  },

  { 
    id: 3, 
    name: "Carlos Soto", 
    age: 6, 
    condition: `Sufre de hipersensibilidad a partículas sólidas pequeñas; tiene problemas con el contacto con arena, tierra, tiza o harinas, manifestando una respuesta de rechazo táctil inmediata y persistente.`, 
    active: true,
    activities: [
      { title: "Actividad en Arena 01", duration: "15:00", link: "#" },
      { title: "Registro de Tiza", duration: "06:10", link: "#" }
    ],
    weeklyStats: { completed: 4, goal: 4, days: [true, true, true, true, false, false, false] }
  },
  
  { 
    id: 4, 
    name: "Ana Torrez", 
    age: 9, 
    condition: `Sufre de aversión sensorial a texturas húmedas; tiene problemas con la manipulación de sustancias viscosas, pegajosas o fluidas, limitando su participación en actividades de higiene o terapia manual.`, 
    active: true,
    activities: [
      { title: "Manejo de Geles", duration: "09:30", link: "#" },
      { title: "Terapia de Fluidos", duration: "11:15", link: "#" },
      { title: "Actividad con maicena y agua", duration: "12:00", link: "#" }
    ],
    weeklyStats: { completed: 1, goal: 3, days: [false, false, false, true, false, false, false] }
  },
];

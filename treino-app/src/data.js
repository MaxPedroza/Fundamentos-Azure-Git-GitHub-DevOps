export const initialWorkouts = [
  {
    id: 'a',
    name: 'Treino A',
    focus: 'Peito e tríceps',
    color: 'lime',
    duration: '55 min',
    exercises: [
      { id: 'supino-reto', name: 'Supino reto com barra', muscle: 'Peito', sets: 4, reps: '8–10', load: '40 kg', rest: 90 },
      { id: 'supino-inclinado', name: 'Supino inclinado com halteres', muscle: 'Peito', sets: 3, reps: '10–12', load: '16 kg', rest: 75 },
      { id: 'crucifixo', name: 'Crucifixo na máquina', muscle: 'Peito', sets: 3, reps: '12–15', load: '35 kg', rest: 60 },
      { id: 'triceps-corda', name: 'Tríceps na corda', muscle: 'Tríceps', sets: 3, reps: '10–12', load: '25 kg', rest: 60 },
    ],
  },
  {
    id: 'b',
    name: 'Treino B',
    focus: 'Costas e bíceps',
    color: 'blue',
    duration: '60 min',
    exercises: [
      { id: 'puxada-frente', name: 'Puxada frontal', muscle: 'Costas', sets: 4, reps: '8–10', load: '45 kg', rest: 90 },
      { id: 'remada-baixa', name: 'Remada baixa', muscle: 'Costas', sets: 3, reps: '10–12', load: '40 kg', rest: 75 },
      { id: 'rosca-direta', name: 'Rosca direta com barra', muscle: 'Bíceps', sets: 3, reps: '10–12', load: '18 kg', rest: 60 },
    ],
  },
  {
    id: 'c',
    name: 'Treino C',
    focus: 'Pernas completas',
    color: 'orange',
    duration: '65 min',
    exercises: [
      { id: 'leg-press', name: 'Leg press 45°', muscle: 'Quadríceps', sets: 4, reps: '10–12', load: '120 kg', rest: 120 },
      { id: 'mesa-flexora', name: 'Mesa flexora', muscle: 'Posterior', sets: 3, reps: '10–12', load: '35 kg', rest: 75 },
      { id: 'cadeira-extensora', name: 'Cadeira extensora', muscle: 'Quadríceps', sets: 3, reps: '12–15', load: '40 kg', rest: 60 },
    ],
  },
  {
    id: 'd',
    name: 'Treino D',
    focus: 'Ombros e abdômen',
    color: 'purple',
    duration: '45 min',
    exercises: [
      { id: 'desenvolvimento', name: 'Desenvolvimento com halteres', muscle: 'Ombros', sets: 4, reps: '8–10', load: '14 kg', rest: 90 },
      { id: 'elevacao-lateral', name: 'Elevação lateral', muscle: 'Ombros', sets: 3, reps: '12–15', load: '8 kg', rest: 60 },
      { id: 'prancha', name: 'Prancha', muscle: 'Abdômen', sets: 3, reps: '30–45 s', load: 'Peso corporal', rest: 45 },
    ],
  },
]

export const sampleHistory = [
  { id: 'sample-1', date: '2026-10-25', workoutName: 'Treino A', focus: 'Peito e tríceps', duration: 52, volume: 3820, pain: '' },
  { id: 'sample-2', date: '2026-10-23', workoutName: 'Treino B', focus: 'Costas e bíceps', duration: 58, volume: 4160, pain: '' },
  { id: 'sample-3', date: '2026-10-21', workoutName: 'Treino C', focus: 'Pernas completas', duration: 63, volume: 6890, pain: 'Leve incômodo no joelho esquerdo' },
]

export function formatDate(date) {
  return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short' }).format(new Date(`${date}T12:00:00`))
}

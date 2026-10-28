import { useEffect, useMemo, useState } from 'react'
import {
  Activity, ArrowLeft, ArrowRight, Bell, CalendarDays, Check, CheckCircle2,
  ChevronDown, ChevronRight, CircleHelp, Clock3, Dumbbell, FileImage, Flame, HeartPulse,
  History, LayoutDashboard, LogIn, LogOut, MoreHorizontal, Pause, Play,
  Plus, Settings2, Sparkles, Timer, TrendingUp, Trophy, Upload, X, Zap,
} from 'lucide-react'
import { formatDate, initialWorkouts, sampleHistory } from './data'
import {
  isFirebaseConfigured, loadUserData, saveUserData, signIn, signInWithGoogle,
  signOutUser, watchAuth,
} from './firebase'
import './App.css'

const storageKey = 'pulso-workout-data'
const navItems = [
  { id: 'home', label: 'Visão geral', icon: LayoutDashboard },
  { id: 'workouts', label: 'Meus treinos', icon: Dumbbell },
  { id: 'progress', label: 'Evolução', icon: TrendingUp },
]

function readSavedData() {
  try {
    const saved = localStorage.getItem(storageKey)
    return saved ? JSON.parse(saved) : {}
  } catch {
    return {}
  }
}

function App() {
  const savedData = useMemo(readSavedData, [])
  const [workouts, setWorkouts] = useState(savedData.workouts ?? initialWorkouts)
  const [history, setHistory] = useState(savedData.history ?? sampleHistory)
  const [activePage, setActivePage] = useState('home')
  const [selectedWorkoutId, setSelectedWorkoutId] = useState('a')
  const [activeWorkoutId, setActiveWorkoutId] = useState(null)
  const [completedSets, setCompletedSets] = useState({})
  const [restSeconds, setRestSeconds] = useState(0)
  const [timerRunning, setTimerRunning] = useState(false)
  const [restDuration, setRestDuration] = useState(90)
  const [sessionStarted, setSessionStarted] = useState(null)
  const [feedbackOpen, setFeedbackOpen] = useState(false)
  const [feedbackText, setFeedbackText] = useState('')
  const [feedbackPain, setFeedbackPain] = useState('Não')
  const [feedbackTarget, setFeedbackTarget] = useState(null)
  const [authOpen, setAuthOpen] = useState(false)
  const [authMode, setAuthMode] = useState('login')
  const [authEmail, setAuthEmail] = useState('')
  const [authPassword, setAuthPassword] = useState('')
  const [authError, setAuthError] = useState('')
  const [user, setUser] = useState(null)
  const [cloudReady, setCloudReady] = useState(false)
  const [notice, setNotice] = useState('')
  const [aiInput, setAiInput] = useState('')
  const [aiImage, setAiImage] = useState(null)
  const [aiLoading, setAiLoading] = useState(false)
  const [aiError, setAiError] = useState('')
  const [aiResult, setAiResult] = useState('')

  const selectedWorkout = workouts.find((workout) => workout.id === selectedWorkoutId) ?? workouts[0]
  const activeWorkout = workouts.find((workout) => workout.id === activeWorkoutId)
  const completedCount = history.filter((entry) => !entry.id.startsWith('sample-')).length
  const latestWorkout = history[0]

  useEffect(() => {
    const unsubscribe = watchAuth(async (nextUser) => {
      setUser(nextUser)
      setCloudReady(false)
      if (!nextUser) {
        setCloudReady(true)
        return
      }
      try {
        const cloudData = await loadUserData(nextUser.uid)
        if (cloudData?.workouts) setWorkouts(cloudData.workouts)
        if (cloudData?.history) setHistory(cloudData.history)
      } catch {
        setNotice('Não foi possível sincronizar agora. Seus dados continuam salvos neste dispositivo.')
      } finally {
        setCloudReady(true)
      }
    })
    return unsubscribe
  }, [])

  useEffect(() => {
    const data = { workouts, history }
    localStorage.setItem(storageKey, JSON.stringify(data))
    if (user && cloudReady) {
      saveUserData(user.uid, data).catch(() => {
        setNotice('Falha ao sincronizar. Confira sua conexão e as regras do Firestore.')
      })
    }
  }, [workouts, history, user, cloudReady])

  useEffect(() => {
    if (!timerRunning) return undefined
    const interval = window.setInterval(() => {
      setRestSeconds((seconds) => {
        if (seconds <= 1) {
          window.clearInterval(interval)
          setTimerRunning(false)
          if ('vibrate' in navigator) navigator.vibrate([250, 100, 250])
          return 0
        }
        return seconds - 1
      })
    }, 1000)
    return () => window.clearInterval(interval)
  }, [timerRunning])

  useEffect(() => {
    if (!notice) return undefined
    const timeout = window.setTimeout(() => setNotice(''), 4500)
    return () => window.clearTimeout(timeout)
  }, [notice])

  function startWorkout(workoutId) {
    setActiveWorkoutId(workoutId)
    setSelectedWorkoutId(workoutId)
    setCompletedSets({})
    setSessionStarted(Date.now())
    setActivePage('session')
  }

  function markSet(exerciseId, setNumber, rest) {
    const setKey = `${exerciseId}-${setNumber}`
    setCompletedSets((current) => ({ ...current, [setKey]: !current[setKey] }))
    setRestDuration(rest)
    setRestSeconds(rest)
    setTimerRunning(true)
  }

  function finishWorkout() {
    if (!activeWorkout) return
    const duration = Math.max(1, Math.round((Date.now() - sessionStarted) / 60000))
    const volume = activeWorkout.exercises.reduce((total, exercise) => {
      const load = Number.parseFloat(exercise.load) || 0
      const reps = Number.parseInt(exercise.reps, 10) || 10
      return total + load * reps * exercise.sets
    }, 0)
    const entry = {
      id: crypto.randomUUID(),
      date: new Date().toISOString().slice(0, 10),
      workoutName: activeWorkout.name,
      focus: activeWorkout.focus,
      duration,
      volume,
      pain: '',
    }
    setHistory((current) => [entry, ...current])
    setFeedbackTarget(entry.id)
    setFeedbackOpen(true)
    setActiveWorkoutId(null)
    setActivePage('progress')
  }

  function saveFeedback() {
    setHistory((current) => current.map((entry) => (
      entry.id === feedbackTarget
        ? { ...entry, pain: feedbackPain === 'Sim' ? feedbackText.trim() || 'Incômodo não especificado' : '' }
        : entry
    )))
    setFeedbackOpen(false)
    setFeedbackText('')
    setFeedbackPain('Não')
    setNotice('Treino salvo. Boa evolução! 💪')
  }

  async function submitAuth(event) {
    event.preventDefault()
    setAuthError('')
    try {
      await signIn(authEmail, authPassword, authMode === 'register')
      setAuthOpen(false)
    } catch (error) {
      setAuthError(error.message || 'Não foi possível entrar. Verifique seus dados.')
    }
  }

  async function googleAuth() {
    setAuthError('')
    try {
      await signInWithGoogle()
      setAuthOpen(false)
    } catch (error) {
      setAuthError(error.message || 'Não foi possível entrar com Google.')
    }
  }

  async function generateWorkout(event) {
    event.preventDefault()
    setAiError('')
    setAiResult('')
    const proxyUrl = import.meta.env.VITE_GEMINI_PROXY_URL
    if (!proxyUrl) {
      setAiError('Configure VITE_GEMINI_PROXY_URL para conectar uma função segura do Gemini. A chave da API não deve ficar no navegador.')
      return
    }
    if (!aiInput.trim() && !aiImage) {
      setAiError('Cole o treino atual ou envie uma imagem para começar.')
      return
    }
    setAiLoading(true)
    try {
      const response = await fetch(proxyUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: [
            'Analise o treino enviado e proponha uma evolução segura de 6 a 12 semanas.',
            'Responda em português com JSON: {"name":"Treino X","focus":"grupos musculares","exercises":[{"name":"exercício","muscle":"grupo","sets":3,"reps":"8-12","load":"carga sugerida","rest":90}]}',
            'Não faça diagnóstico médico. Considere o histórico de dores informado e evite movimentos que provoquem desconforto.',
            `Treino atual: ${aiInput || 'Veja a imagem anexada.'}`,
            `Histórico de dores: ${history.filter((entry) => entry.pain).map((entry) => entry.pain).join('; ') || 'Nenhuma dor registrada.'}`,
          ].join('\n'),
          image: aiImage?.data ?? null,
          mimeType: aiImage?.type ?? null,
        }),
      })
      if (!response.ok) throw new Error('O serviço de IA não respondeu. Tente novamente em instantes.')
      const result = await response.json()
      const answer = result.workout ?? result
      const generated = typeof answer === 'string' ? JSON.parse(answer.replace(/```(?:json)?|```/g, '').trim()) : answer
      if (!generated?.exercises?.length) throw new Error('A resposta da IA não trouxe exercícios em um formato válido.')
      const routine = {
        id: `ai-${crypto.randomUUID()}`,
        name: generated.name || 'Novo ciclo',
        focus: generated.focus || 'Ciclo evolutivo',
        color: 'lime',
        duration: 'Novo ciclo',
        exercises: generated.exercises.map((exercise, index) => ({
          id: `ai-ex-${index}-${crypto.randomUUID()}`,
          name: exercise.name || 'Exercício',
          muscle: exercise.muscle || 'Geral',
          sets: Number(exercise.sets) || 3,
          reps: String(exercise.reps || '8–12'),
          load: String(exercise.load || 'A definir'),
          rest: Number(exercise.rest) || 90,
          note: exercise.note || '',
        })),
      }
      setWorkouts((current) => [routine, ...current])
      setSelectedWorkoutId(routine.id)
      setAiResult(`${routine.name} foi criado com ${routine.exercises.length} exercícios e adicionado às suas fichas.`)
      setAiInput('')
      setAiImage(null)
    } catch (error) {
      setAiError(error.message || 'Não foi possível gerar seu novo ciclo.')
    } finally {
      setAiLoading(false)
    }
  }

  async function chooseImage(event) {
    const file = event.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setAiError('Escolha um arquivo de imagem.')
      return
    }
    if (file.size > 8 * 1024 * 1024) {
      setAiError('A imagem deve ter no máximo 8 MB.')
      return
    }
    const data = await new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result)
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
    setAiImage({ name: file.name, type: file.type, data })
    setAiError('')
  }

  function updateLoad(exerciseId, load) {
    setWorkouts((current) => current.map((workout) => ({
      ...workout,
      exercises: workout.exercises.map((exercise) => (
        exercise.id === exerciseId ? { ...exercise, load } : exercise
      )),
    })))
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#home" onClick={(event) => { event.preventDefault(); setActivePage('home') }}>
          <span className="brand-mark"><Activity size={21} strokeWidth={2.6} /></span>
          <span>PULSO<span className="brand-dot">.</span></span>
        </a>
        <div className="workspace-label">TREINO</div>
        <nav className="side-nav" aria-label="Navegação principal">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button key={id} className={`nav-link ${activePage === id || (id === 'workouts' && activePage === 'session') ? 'active' : ''}`} onClick={() => setActivePage(id)}>
              <Icon size={18} /><span>{label}</span>
            </button>
          ))}
          <button className={`nav-link ${activePage === 'ai' ? 'active' : ''}`} onClick={() => setActivePage('ai')}>
            <Sparkles size={18} /><span>Coach IA</span><span className="nav-new">NOVO</span>
          </button>
        </nav>
        <div className="sidebar-rule" />
        <div className="workspace-label">SUA ROTINA</div>
        <div className="routine-nav">
          {workouts.slice(0, 4).map((workout) => (
            <button key={workout.id} onClick={() => { setSelectedWorkoutId(workout.id); setActivePage('workouts') }}>
              <span className={`routine-dot ${workout.color}`} />{workout.name}<span className="routine-day">{workout.focus.split(' ')[0]}</span>
            </button>
          ))}
        </div>
        <div className="sidebar-spacer" />
        <div className="sidebar-tip">
          <div className="tip-icon"><Zap size={16} fill="currentColor" /></div>
          <strong>Um passo de cada vez.</strong>
          <p>Consistência é o segredo da evolução.</p>
        </div>
        <button className="profile-button" onClick={() => user ? signOutUser() : setAuthOpen(true)}>
          <span className="avatar">{user ? (user.displayName?.[0] || user.email?.[0] || 'M').toUpperCase() : 'M'}</span>
          <span className="profile-copy"><strong>{user?.displayName || 'Marina Costa'}</strong><small>{user ? user.email : 'Plano gratuito'}</small></span>
          {user ? <LogOut size={16} /> : <ChevronDown size={16} />}
        </button>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <div className="breadcrumb"><span>Workspace</span><ChevronRight size={14} /><strong>{activePage === 'home' ? 'Visão geral' : activePage === 'progress' ? 'Evolução' : activePage === 'ai' ? 'Coach IA' : activePage === 'session' ? 'Modo academia' : 'Meus treinos'}</strong></div>
          <div className="topbar-actions">
            {!user && <button className="text-button" onClick={() => { setAuthMode('login'); setAuthOpen(true) }}><LogIn size={16} /> Entrar</button>}
            <button className="icon-button notification-button" aria-label="Notificações" onClick={() => setNotice('Você está em dia com sua rotina. Continue assim!')}><Bell size={18} /><span /></button>
            <button className="avatar top-avatar" aria-label="Abrir conta" onClick={() => user ? signOutUser() : setAuthOpen(true)}>{user ? (user.displayName?.[0] || user.email?.[0] || 'M').toUpperCase() : 'M'}</button>
          </div>
        </header>

        <div className="page-content">
          {activePage === 'home' && (
            <Dashboard
              workouts={workouts}
              history={history}
              completedCount={completedCount}
              latestWorkout={latestWorkout}
              onStart={startWorkout}
              onNavigate={setActivePage}
            />
          )}
          {activePage === 'workouts' && (
            <WorkoutsPage
              workouts={workouts}
              selectedWorkout={selectedWorkout}
              onSelect={(id) => setSelectedWorkoutId(id)}
              onStart={startWorkout}
              onUpdateLoad={updateLoad}
              onNavigate={setActivePage}
            />
          )}
          {activePage === 'session' && activeWorkout && (
            <SessionPage
              workout={activeWorkout}
              completedSets={completedSets}
              restSeconds={restSeconds}
              restDuration={restDuration}
              timerRunning={timerRunning}
              onMarkSet={markSet}
              onToggleTimer={() => setTimerRunning((running) => !running)}
              onResetTimer={() => { setRestSeconds(restDuration); setTimerRunning(false) }}
              onChooseDuration={(seconds) => { setRestDuration(seconds); setRestSeconds(seconds); setTimerRunning(false) }}
              onFinish={finishWorkout}
              onExit={() => setActivePage('workouts')}
            />
          )}
          {activePage === 'progress' && <ProgressPage history={history} workouts={workouts} completedCount={completedCount} />}
          {activePage === 'ai' && (
            <AiPage
              input={aiInput}
              image={aiImage}
              loading={aiLoading}
              error={aiError}
              result={aiResult}
              onInput={setAiInput}
              onImage={chooseImage}
              onRemoveImage={() => setAiImage(null)}
              onSubmit={generateWorkout}
              onClear={() => { setAiInput(''); setAiImage(null); setAiError(''); setAiResult('') }}
            />
          )}
        </div>
        <footer className="app-footer"><span>© 2026 Pulso · Feito para evoluir</span><span><span className={`sync-dot ${isFirebaseConfigured && user ? 'online' : ''}`} />{user ? (cloudReady ? 'Sincronizado' : 'Sincronizando…') : 'Modo local'}</span></footer>
      </main>

      {notice && <div className="toast"><CheckCircle2 size={18} />{notice}<button onClick={() => setNotice('')} aria-label="Fechar aviso"><X size={15} /></button></div>}
      {feedbackOpen && (
        <Modal title="Treino concluído!" subtitle="Um bom treino começa com atenção ao seu corpo." onClose={() => setFeedbackOpen(false)}>
          <div className="feedback-icon"><HeartPulse size={22} /></div>
          <label className="field-label">Sentiu algum incômodo ou dor?</label>
          <div className="choice-row">
            {['Não', 'Sim'].map((answer) => <button key={answer} className={`choice-button ${feedbackPain === answer ? 'chosen' : ''}`} onClick={() => setFeedbackPain(answer)}>{answer === 'Não' ? <Check size={16} /> : <HeartPulse size={16} />}{answer}</button>)}
          </div>
          {feedbackPain === 'Sim' && <label className="field-label">Onde sentiu o incômodo?<textarea className="input textarea" value={feedbackText} onChange={(event) => setFeedbackText(event.target.value)} placeholder="Ex.: leve desconforto no ombro direito..." rows={3} /></label>}
          <button className="button button-primary full-button" onClick={saveFeedback}>Salvar feedback <ArrowRight size={17} /></button>
          <p className="privacy-note">Seu feedback ajuda a adaptar os próximos ciclos. Em caso de dor persistente, procure um profissional de saúde.</p>
        </Modal>
      )}
      {authOpen && (
        <Modal title={authMode === 'login' ? 'Boas-vindas de volta' : 'Crie sua conta'} subtitle="Entre para sincronizar treinos e histórico na nuvem." onClose={() => { setAuthOpen(false); setAuthError('') }}>
          <button className="google-button" onClick={googleAuth}><GoogleMark />Continuar com Google</button>
          <div className="separator"><span>ou use seu e-mail</span></div>
          <form className="auth-form" onSubmit={submitAuth}>
            <label className="field-label">E-mail<input className="input" type="email" autoComplete="email" required value={authEmail} onChange={(event) => setAuthEmail(event.target.value)} placeholder="voce@email.com" /></label>
            <label className="field-label">Senha<input className="input" type="password" autoComplete={authMode === 'login' ? 'current-password' : 'new-password'} minLength={6} required value={authPassword} onChange={(event) => setAuthPassword(event.target.value)} placeholder="Mínimo de 6 caracteres" /></label>
            {authError && <p className="form-error">{authError}</p>}
            {!isFirebaseConfigured && <p className="privacy-note">Configure o Firebase no .env.local para ativar o login. O app continua disponível em modo local.</p>}
            <button className="button button-primary full-button" type="submit">{authMode === 'login' ? 'Entrar' : 'Criar conta'}<ArrowRight size={17} /></button>
          </form>
          <p className="auth-switch">{authMode === 'login' ? 'Ainda não tem uma conta?' : 'Já tem uma conta?'} <button onClick={() => { setAuthMode(authMode === 'login' ? 'register' : 'login'); setAuthError('') }}>{authMode === 'login' ? 'Criar conta' : 'Entrar'}</button></p>
        </Modal>
      )}
    </div>
  )
}

function Dashboard({ workouts, history, completedCount, latestWorkout, onStart, onNavigate }) {
  const todayName = new Intl.DateTimeFormat('pt-BR', { weekday: 'long' }).format(new Date())
  const dateLabel = new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date())
  const recommendation = workouts[0]
  const weekDays = ['S', 'T', 'Q', 'Q', 'S', 'S', 'D']
  const doneDays = [true, true, false, true, false, false, false]

  return (
    <>
      <div className="welcome-row">
        <div><div className="eyebrow"><span className="eyebrow-line" />{dateLabel}</div><h1>Bom dia, Marina <span className="wave">✦</span></h1><p className="page-lead">Mais um dia para chegar mais perto da sua melhor versão.</p></div>
        <button className="button button-primary start-top" onClick={() => onStart(recommendation.id)}><Play size={16} fill="currentColor" />Começar treino</button>
      </div>
      <div className="dashboard-grid">
        <section className="hero-card">
          <div className="hero-content">
            <span className="hero-pill"><span /> TREINO DE HOJE</span>
            <h2>{recommendation?.name ?? 'Seu próximo treino'}<br /><span>{recommendation?.focus ?? 'Seu programa personalizado'}</span></h2>
            <p>Seu próximo passo está esperando.<br />Vamos fazer valer?</p>
            <button className="button button-lime" onClick={() => onStart(recommendation.id)}>Iniciar sessão <ArrowRight size={17} /></button>
          </div>
          <div className="hero-art" aria-hidden="true"><div className="art-glow" /><div className="art-disc disc-one" /><div className="art-disc disc-two" /><div className="art-bar" /><Dumbbell className="art-dumbbell" size={190} strokeWidth={1.1} /></div>
          <span className="hero-number">01<span> / 04</span></span>
        </section>
        <section className="week-card card">
          <div className="card-heading"><div><span className="eyebrow">SEU RITMO</span><h3>Esta semana</h3></div><button className="icon-button subtle-button" aria-label="Ver evolução" onClick={() => onNavigate('progress')}><ArrowRight size={17} /></button></div>
          <div className="week-days">{weekDays.map((day, index) => <div key={`${day}-${index}`} className={`week-day ${doneDays[index] ? 'done' : ''} ${index === 2 ? 'today' : ''}`}><span>{day}</span><b>{doneDays[index] ? <Check size={15} /> : index + 26}</b></div>)}</div>
          <div className="week-summary"><span><span className="status-dot" />3 treinos concluídos</span><strong>75%</strong></div>
          <div className="progress-track"><span style={{ width: '75%' }} /></div>
          <p className="week-note">Faltam <strong>1 treino</strong> para sua meta semanal</p>
        </section>
      </div>

      <div className="section-heading"><div><span className="eyebrow">SUA JORNADA</span><h2>Visão geral</h2></div><button className="text-button" onClick={() => onNavigate('progress')}>Ver evolução <ArrowRight size={16} /></button></div>
      <div className="stats-grid">
        <StatCard icon={Dumbbell} label="Treinos concluídos" value={`${completedCount + 12}`} caption="+3 esta semana" tone="lime" />
        <StatCard icon={Clock3} label="Tempo treinando" value="28h 40m" caption="no total" tone="blue" />
        <StatCard icon={Flame} label="Sequência atual" value="4 dias" caption="Seu recorde: 9 dias" tone="orange" />
        <StatCard icon={Trophy} label="Volume total" value="48.2k" caption="kg levantados" tone="purple" />
      </div>

      <div className="lower-grid">
        <section className="card routine-card">
          <div className="card-heading"><div><span className="eyebrow">PLANO DE TREINO</span><h3>Suas fichas</h3></div><button className="text-button" onClick={() => onNavigate('workouts')}>Ver todas <ArrowRight size={16} /></button></div>
          <div className="routine-list">
            {workouts.slice(0, 3).map((workout, index) => (
              <button className="routine-row" key={workout.id} onClick={() => onStart(workout.id)}>
                <span className={`routine-icon ${workout.color}`}><Dumbbell size={17} /></span><span className="routine-info"><strong>{workout.name} <i>{index === 0 ? 'HOJE' : ''}</i></strong><small>{workout.focus} · {workout.exercises.length} exercícios</small></span><span className="routine-duration"><Clock3 size={14} />{workout.duration}</span><ChevronRight size={17} className="row-chevron" />
              </button>
            ))}
          </div>
        </section>
        <section className="card recent-card">
          <div className="card-heading"><div><span className="eyebrow">ÚLTIMA SESSÃO</span><h3>Seu progresso</h3></div><button className="icon-button subtle-button" aria-label="Histórico" onClick={() => onNavigate('progress')}><ArrowRight size={17} /></button></div>
          {latestWorkout ? (
            <>
              <div className="recent-info"><span className="recent-calendar"><CalendarDays size={18} /></span><div><strong>{latestWorkout.workoutName} <span>· {latestWorkout.focus}</span></strong><small>{formatDate(latestWorkout.date)} · {latestWorkout.duration} min</small></div></div>
              <MiniChart />
              <div className="recent-bottom"><span>Volume da sessão</span><strong>{latestWorkout.volume.toLocaleString('pt-BR')} <small>kg</small></strong></div>
            </>
          ) : <p className="empty-copy">Finalize seu primeiro treino para acompanhar o progresso.</p>}
        </section>
      </div>
    </>
  )
}

function StatCard({ icon: Icon, label, value, caption, tone }) {
  return <div className="stat-card card"><span className={`stat-icon ${tone}`}><Icon size={17} /></span><span className="stat-label">{label}</span><strong className="stat-value">{value}</strong><small className="stat-caption">{caption}</small></div>
}

function MiniChart() {
  return <div className="mini-chart" aria-label="Gráfico de evolução de carga"><svg viewBox="0 0 360 70" preserveAspectRatio="none" role="img"><defs><linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#b6f347" stopOpacity=".22" /><stop offset="100%" stopColor="#b6f347" stopOpacity="0" /></linearGradient></defs><path d="M0 53 C25 49 34 57 58 45 S92 48 116 36 S151 43 178 29 S216 35 238 22 S277 29 302 13 S333 17 360 5 V70 H0Z" fill="url(#chartFill)" /><path d="M0 53 C25 49 34 57 58 45 S92 48 116 36 S151 43 178 29 S216 35 238 22 S277 29 302 13 S333 17 360 5" fill="none" stroke="#b6f347" strokeWidth="2.5" vectorEffect="non-scaling-stroke" /><circle cx="302" cy="13" r="3" fill="#b6f347" /></svg><div className="chart-labels"><span>18 OUT</span><span>20 OUT</span><span>22 OUT</span><span>25 OUT</span></div></div>
}

function WorkoutsPage({ workouts, selectedWorkout, onSelect, onStart, onUpdateLoad, onNavigate }) {
  return (
    <>
      <div className="welcome-row page-title-row"><div><div className="eyebrow"><span className="eyebrow-line" />PROGRAMA PERSONALIZADO</div><h1>Meus treinos</h1><p className="page-lead">Tudo pronto para sua próxima sessão.</p></div><button className="button button-primary" onClick={() => onNavigate('ai')}><Sparkles size={16} />Novo ciclo com IA</button></div>
      <div className="workout-layout">
        <section className="workout-picker card"><div className="card-heading"><div><span className="eyebrow">SUAS FICHAS</span><h3>Programa atual</h3></div><span className="count-pill">{workouts.length} fichas</span></div>
          <div className="picker-list">{workouts.map((workout, index) => <button key={workout.id} className={`picker-item ${selectedWorkout?.id === workout.id ? 'selected' : ''}`} onClick={() => onSelect(workout.id)}><span className={`picker-letter ${workout.color}`}>{workout.name.replace('Treino ', '').slice(-1)}</span><span><strong>{workout.name}</strong><small>{workout.focus}</small></span><span className="picker-index">0{index + 1}</span></button>)}</div>
          <div className="coach-callout"><span className="callout-icon"><Sparkles size={16} /></span><div><strong>Quer evoluir seu treino?</strong><small>Gere um novo ciclo personalizado com IA.</small></div><button aria-label="Criar treino com IA" onClick={() => onNavigate('ai')}><ArrowRight size={16} /></button></div>
        </section>
        {selectedWorkout && <section className="workout-detail"><div className="detail-banner card"><div><span className="eyebrow">FICHA ATUAL</span><h2>{selectedWorkout.name}<span className="detail-bullet">·</span><small>{selectedWorkout.focus}</small></h2><p><Dumbbell size={15} />{selectedWorkout.exercises.length} exercícios <span>·</span><Clock3 size={15} />{selectedWorkout.duration}</p></div><button className="button button-lime" onClick={() => onStart(selectedWorkout.id)}><Play size={15} fill="currentColor" />Iniciar treino</button></div>
          <div className="exercise-list">{selectedWorkout.exercises.map((exercise, index) => <article className="exercise-card card" key={exercise.id}><div className="exercise-number">{String(index + 1).padStart(2, '0')}</div><div className="exercise-main"><strong>{exercise.name}</strong><small>{exercise.muscle}{exercise.note ? ` · ${exercise.note}` : ''}</small><div className="exercise-metrics"><span><b>{exercise.sets}</b> séries</span><span><b>{exercise.reps}</b> reps</span><span><Clock3 size={13} /><b>{exercise.rest}s</b> descanso</span></div></div><label className="load-control"><small>CARGA</small><span><input aria-label={`Carga para ${exercise.name}`} value={exercise.load} onChange={(event) => onUpdateLoad(exercise.id, event.target.value)} /><Settings2 size={14} /></span></label></article>)}</div>
        </section>}
      </div>
    </>
  )
}

function SessionPage({ workout, completedSets, restSeconds, restDuration, timerRunning, onMarkSet, onToggleTimer, onResetTimer, onChooseDuration, onFinish, onExit }) {
  const totalSets = workout.exercises.reduce((total, exercise) => total + exercise.sets, 0)
  const done = Object.values(completedSets).filter(Boolean).length
  const percent = totalSets ? Math.round((done / totalSets) * 100) : 0
  const mm = String(Math.floor(restSeconds / 60)).padStart(2, '0')
  const ss = String(restSeconds % 60).padStart(2, '0')

  return (
    <div className="session-page">
      <div className="session-top"><button className="back-button" onClick={onExit}><ArrowLeft size={17} />Sair do modo academia</button><span className="live-pill"><span />SESSÃO EM ANDAMENTO</span></div>
      <div className="session-heading"><div><span className="eyebrow">MODO ACADEMIA · {workout.name.toUpperCase()}</span><h1>{workout.focus}</h1><p>{done} de {totalSets} séries concluídas <span>·</span> {percent}%</p></div><button className="button button-lime finish-button" onClick={onFinish}><Check size={16} />Finalizar treino</button></div>
      <div className="session-progress"><span style={{ width: `${percent}%` }} /></div>
      <div className="session-layout"><div className="session-exercises">{workout.exercises.map((exercise, index) => <article className="session-exercise card" key={exercise.id}><div className="session-exercise-head"><span className="exercise-number">{String(index + 1).padStart(2, '0')}</span><div><strong>{exercise.name}</strong><small>{exercise.muscle} · {exercise.load}</small></div><MoreHorizontal size={19} /></div><div className="set-grid">{Array.from({ length: exercise.sets }, (_, setIndex) => { const key = `${exercise.id}-${setIndex + 1}`; return <button key={key} className={`set-row ${completedSets[key] ? 'is-done' : ''}`} onClick={() => onMarkSet(exercise.id, setIndex + 1, exercise.rest)}><span className="set-number">SÉRIE {String(setIndex + 1).padStart(2, '0')}</span><span className="set-reps">{exercise.reps} reps</span><span className="set-load">{exercise.load}</span><span className="set-check">{completedSets[key] ? <Check size={15} /> : <Plus size={15} />}</span></button> })}</div></article>)}</div>
        <aside className="timer-card card"><div className="timer-header"><span className="eyebrow">DESCANSO</span><Timer size={18} /></div><div className="timer-ring" style={{ '--timer-progress': `${restDuration ? ((restDuration - restSeconds) / restDuration) * 100 : 0}%` }}><div><strong>{mm}:{ss}</strong><span>{restSeconds > 0 ? 'RECUPERANDO' : 'PRONTO?'}</span></div></div><div className="timer-controls"><button className="timer-control primary" onClick={onToggleTimer} aria-label={timerRunning ? 'Pausar cronômetro' : 'Iniciar cronômetro'}>{timerRunning ? <Pause size={18} /> : <Play size={18} fill="currentColor" />}</button><button className="timer-control" onClick={onResetTimer} aria-label="Reiniciar cronômetro"><History size={17} /></button></div><div className="timer-presets">{[60, 90, 120].map((seconds) => <button key={seconds} className={restDuration === seconds ? 'selected' : ''} onClick={() => onChooseDuration(seconds)}>{seconds < 60 ? `${seconds}s` : `${seconds / 60}m`}</button>)}</div><p className="timer-tip"><Zap size={14} />Respire fundo. Seu próximo set começa quando você estiver pronto.</p><div className="session-summary"><span>Progresso da sessão</span><strong>{done}/{totalSets}</strong><div className="progress-track"><span style={{ width: `${percent}%` }} /></div></div></aside>
      </div>
    </div>
  )
}

function ProgressPage({ history, workouts, completedCount }) {
  const sessions = history.filter((entry) => !entry.id.startsWith('sample-'))
  const totalVolume = history.reduce((total, entry) => total + (entry.volume || 0), 0)
  const painEntries = history.filter((entry) => entry.pain)
  const barValues = [45, 59, 52, 72, 66, 84, 76, 94]
  return (
    <>
      <div className="welcome-row page-title-row"><div><div className="eyebrow"><span className="eyebrow-line" />DADOS DA SUA JORNADA</div><h1>Sua evolução</h1><p className="page-lead">Cada repetição conta. Olha só o que você já construiu.</p></div><div className="period-select"><CalendarDays size={16} />Últimos 30 dias<ChevronDown size={15} /></div></div>
      <div className="progress-stats"><StatCard icon={Dumbbell} label="Treinos registrados" value={`${sessions.length}`} caption={`${completedCount} concluídos por você`} tone="lime" /><StatCard icon={Activity} label="Volume acumulado" value={`${(totalVolume / 1000).toFixed(1)}k`} caption="kg movimentados" tone="blue" /><StatCard icon={Flame} label="Maior sequência" value="9 dias" caption="Seu recorde pessoal" tone="orange" /></div>
      <div className="progress-layout"><section className="card volume-card"><div className="card-heading"><div><span className="eyebrow">FORÇA AO LONGO DO TEMPO</span><h3>Evolução de carga</h3></div><span className="trend-chip"><TrendingUp size={14} />+12,8%</span></div><div className="large-chart"><div className="chart-y-labels"><span>80 kg</span><span>60 kg</span><span>40 kg</span><span>20 kg</span></div><div className="bar-chart">{barValues.map((value, index) => <div className="bar-column" key={index}><div className="bar-track"><span style={{ height: `${value}%` }} /></div><small>{['01 OUT', '05 OUT', '09 OUT', '13 OUT', '17 OUT', '21 OUT', '25 OUT', 'HOJE'][index]}</small></div>)}</div></div><div className="chart-legend"><span /> Volume total por semana <span className="legend-note">Atualizado com seus treinos</span></div></section>
        <section className="card pain-card"><div className="card-heading"><div><span className="eyebrow">ATENÇÃO AO CORPO</span><h3>Feedback de dores</h3></div><HeartPulse size={18} className="pain-head-icon" /></div>{painEntries.length ? painEntries.slice(0, 3).map((entry) => <div className="pain-entry" key={entry.id}><span className="pain-entry-icon"><HeartPulse size={16} /></span><div><strong>{entry.pain}</strong><small>{entry.workoutName} · {formatDate(entry.date)}</small></div></div>) : <div className="pain-empty"><span><CheckCircle2 size={20} /></span><strong>Nenhum incômodo registrado</strong><small>Continue ouvindo seu corpo durante os treinos.</small></div>}<div className="safety-note"><CircleHelp size={15} /><span>Esses relatos ajudam a IA a sugerir alternativas. Consulte um profissional para avaliação de dores persistentes.</span></div></section></div>
      <section className="card history-card"><div className="card-heading"><div><span className="eyebrow">ATIVIDADE</span><h3>Histórico de treinos</h3></div><span className="count-pill">{history.length} sessões</span></div><div className="history-table"><div className="history-head"><span>SESSÃO</span><span>DATA</span><span>DURAÇÃO</span><span>VOLUME</span><span>FEEDBACK</span></div>{history.map((entry) => <div className="history-row" key={entry.id}><div className="history-session"><span className={`history-icon ${workouts.find((workout) => workout.name === entry.workoutName)?.color ?? 'lime'}`}><Dumbbell size={16} /></span><span><strong>{entry.workoutName}</strong><small>{entry.focus}</small></span></div><span>{formatDate(entry.date)}</span><span>{entry.duration} min</span><strong>{entry.volume.toLocaleString('pt-BR')} kg</strong><span className={`feedback-status ${entry.pain ? 'pain' : ''}`}>{entry.pain ? <><HeartPulse size={14} />Registrado</> : <><CheckCircle2 size={14} />Sem dores</>}</span></div>)}</div></section>
    </>
  )
}

function AiPage({ input, image, loading, error, result, onInput, onImage, onRemoveImage, onSubmit, onClear }) {
  return (
    <>
      <div className="welcome-row page-title-row"><div><div className="eyebrow"><span className="eyebrow-line" />INTELIGÊNCIA A FAVOR DO SEU PROGRESSO</div><h1>Seu próximo ciclo começa aqui<span className="lime-dot">.</span></h1><p className="page-lead">A IA analisa seu treino atual e ajuda a montar um novo ciclo para você.</p></div><span className="ai-orb"><Sparkles size={24} /></span></div>
      <div className="ai-layout"><section className="ai-form-card card"><div className="ai-card-title"><span className="ai-icon"><Sparkles size={18} /></span><div><strong>Monte seu novo ciclo</strong><small>Envie seu treino atual para começar</small></div></div><form onSubmit={onSubmit}><label className="field-label">Cole o texto do seu treino<textarea className="input textarea ai-textarea" value={input} onChange={(event) => onInput(event.target.value)} placeholder={'Ex.: Treino A — Peito e tríceps\nSupino reto: 4 séries de 8–10 reps, 40 kg\nTríceps corda: 3 séries de 12 reps, 25 kg'} rows={8} /></label><div className="upload-divider"><span>ou envie uma foto</span></div><label className={`upload-box ${image ? 'has-file' : ''}`}><input type="file" accept="image/*" onChange={onImage} /><span className="upload-icon"><FileImage size={20} /></span><span><strong>{image?.name || 'Clique para enviar uma imagem'}</strong><small>{image ? 'Imagem pronta para análise' : 'PNG ou JPG · até 8 MB'}</small></span>{image ? <button className="remove-file" type="button" onClick={(event) => { event.preventDefault(); onRemoveImage() }} aria-label="Remover imagem"><X size={16} /></button> : <Upload size={18} className="upload-arrow" />}</label><div className="ai-hint"><HeartPulse size={16} /><span>Vamos considerar os relatos de dor registrados no seu histórico e sugerir alternativas.</span></div>{error && <p className="form-error">{error}</p>}{result && <p className="form-success"><CheckCircle2 size={16} />{result}</p>}<div className="ai-actions"><button className="button button-quiet" type="button" onClick={onClear}>Limpar</button><button className="button button-primary" type="submit" disabled={loading}>{loading ? <span className="spinner" /> : <Sparkles size={16} />}{loading ? 'Analisando...' : 'Gerar novo ciclo'}<ArrowRight size={16} /></button></div></form></section>
        <aside className="ai-side"><section className="card how-card"><span className="eyebrow">COMO FUNCIONA</span><h3>Um ciclo pensado para você.</h3><div className="steps-list"><div className="ai-step"><span>01</span><div><strong>Compartilhe seu treino</strong><small>Texto ou foto da ficha atual.</small></div></div><div className="ai-step"><span>02</span><div><strong>A IA analisa seu contexto</strong><small>Volume, nível e histórico de dores.</small></div></div><div className="ai-step"><span>03</span><div><strong>Receba uma nova proposta</strong><small>Um ciclo progressivo de 6 a 12 semanas.</small></div></div></div></section><section className="safe-card"><div className="safe-icon"><HeartPulse size={18} /></div><div><strong>Treino com responsabilidade</strong><p>A IA oferece sugestões gerais, não substitui orientação profissional. Ajuste o treino se sentir desconforto.</p></div></section><div className="privacy-note ai-privacy"><span className="sync-dot" />Sua imagem será enviada apenas ao serviço de IA configurado no seu projeto.</div></aside></div>
    </>
  )
}

function Modal({ title, subtitle, onClose, children }) {
  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  return <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}><section className="modal card" role="dialog" aria-modal="true" aria-labelledby="modal-title"><button className="modal-close icon-button" onClick={onClose} aria-label="Fechar"><X size={18} /></button><div className="modal-heading"><span className="modal-mark"><Activity size={20} /></span><h2 id="modal-title">{title}</h2><p>{subtitle}</p></div>{children}</section></div>
}

function GoogleMark() {
  return <svg viewBox="0 0 48 48" aria-hidden="true" className="google-mark"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z" transform="translate(0 5)" /><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.76 7.18l7.73 6C44.42 38.05 47 31.96 47 24.55h-.02Z" transform="translate(0 0)" /><path fill="#FBBC05" d="M10.53 28.59a14.4 14.4 0 0 1-.75-4.59c0-1.59.27-3.13.75-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.86.92 7.51 2.55 10.77l7.98-6.18Z" transform="translate(1 0)" /><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.73-6c-2.15 1.45-4.9 2.3-8.18 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.18C6.51 42.62 14.62 48 24 48Z" transform="translate(0 0)" /></svg>
}

export default App

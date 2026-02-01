
import React, { useState, useEffect, useMemo } from 'react';
import { CATEGORIES, INITIAL_QUESTIONS } from './constants';
import { CategoryID, Question, Category } from './types';
import { geminiService } from './geminiService';
import { 
  Home, 
  Settings, 
  Heart, 
  ChevronLeft, 
  Share2, 
  Sparkles, 
  RefreshCw,
  X,
  Copy,
  Check,
  Bell,
  BellOff,
  UserPlus
} from 'lucide-react';

// Sub-components
const Splash: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 overflow-hidden">
      <div className="relative">
        <div className="absolute -inset-10 bg-gradient-to-r from-purple-600 to-blue-500 blur-2xl opacity-30 animate-pulse"></div>
        <div className="relative text-6xl mb-6">💬</div>
      </div>
      <h1 className="text-4xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
        CONECTA
      </h1>
      <p className="mt-2 text-slate-400 font-medium tracking-widest text-xs uppercase">Sua voz, seu mundo</p>
      <div className="mt-12 w-48 h-1 bg-slate-800 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 animate-[loading_2s_ease-in-out_infinite]"></div>
      </div>
      <style>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

const SettingsView: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'settings' | 'about' | 'privacy' | 'terms'>('settings');
  const [notifications, setNotifications] = useState(() => {
    return localStorage.getItem('conecta_notifications') === 'true';
  });

  const toggleNotifications = async () => {
    const newState = !notifications;
    if (newState && 'Notification' in window) {
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        alert('Para receber notificações, você precisa permitir nas configurações do seu navegador.');
        return;
      }
    }
    setNotifications(newState);
    localStorage.setItem('conecta_notifications', String(newState));
  };

  const shareApp = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'App Conecta',
          text: 'Descubra o Conecta, o melhor guia para destravar conversas e criar conexões reais!',
          url: window.location.origin,
        });
      } catch (error) {
        console.error('Erro ao compartilhar:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.origin);
      alert('Link do app copiado para a área de transferência!');
    }
  };

  const content = {
    settings: (
      <div className="space-y-6">
        <h2 className="text-xl font-bold">Configurações Gerais</h2>
        
        <div className="glass p-5 rounded-3xl flex items-center justify-between border-white/10">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-2xl ${notifications ? 'bg-blue-500/20 text-blue-400' : 'bg-slate-800 text-slate-500'}`}>
              {notifications ? <Bell size={20} /> : <BellOff size={20} />}
            </div>
            <div>
              <p className="font-bold">Notificações</p>
              <p className="text-xs text-slate-400">Dicas diárias e novidades</p>
            </div>
          </div>
          <button 
            onClick={toggleNotifications}
            className={`w-12 h-7 rounded-full transition-all duration-300 relative ${notifications ? 'bg-blue-600' : 'bg-slate-700'}`}
          >
            <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all duration-300 ${notifications ? 'left-6' : 'left-1'}`}></div>
          </button>
        </div>

        <button 
          onClick={shareApp}
          className="w-full glass p-5 rounded-3xl flex items-center justify-between border-white/10 hover:bg-white/5 transition-colors group"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-purple-500/20 text-purple-400 group-hover:scale-110 transition-transform">
              <UserPlus size={20} />
            </div>
            <div className="text-left">
              <p className="font-bold">Compartilhar App</p>
              <p className="text-xs text-slate-400">Convide amigos para o Conecta</p>
            </div>
          </div>
          <div className="bg-white/5 p-2 rounded-xl">
            <Share2 size={16} className="text-slate-400" />
          </div>
        </button>

        <div className="glass p-5 rounded-3xl flex items-center justify-between border-white/10">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-indigo-500/20 text-indigo-400">
              <span className="text-sm font-bold">PT</span>
            </div>
            <div>
              <p className="font-bold">Idioma do App</p>
              <p className="text-xs text-slate-400">Português (Brasil)</p>
            </div>
          </div>
          <div className="bg-slate-800 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter">Padrão</div>
        </div>

        <div className="glass p-5 rounded-3xl flex items-center justify-between border-white/10 opacity-60">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-slate-800 text-white">
              <span className="text-sm font-bold">🌙</span>
            </div>
            <div>
              <p className="font-bold">Modo Escuro</p>
              <p className="text-xs text-slate-400">Otimizado para economia</p>
            </div>
          </div>
          <div className="w-12 h-7 bg-blue-600/30 rounded-full flex items-center px-1">
            <div className="w-5 h-5 bg-blue-500 rounded-full translate-x-5"></div>
          </div>
        </div>
      </div>
    ),
    about: (
      <div className="space-y-6">
        <h2 className="text-xl font-bold">Sobre o Conecta</h2>
        <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
          <p>
            O <strong>Conecta</strong> nasceu de uma necessidade fundamental humana: a conexão genuína. Em um mundo cada vez mais digital e apressado, as conversas profundas acabam perdendo espaço para o superficial. Nossa missão é devolver o brilho às interações sociais.
          </p>
          <p>
            Utilizamos a tecnologia de Inteligência Artificial mais avançada do Google para curar e gerar perguntas que desafiam o óbvio. Seja em um primeiro encontro, em uma reunião de família ou em um café com colegas de trabalho, o Conecta oferece o "empurrãozinho" necessário para destravar diálogos inesquecíveis.
          </p>
          <p>
            <strong>Principais Funcionalidades:</strong>
            <ul className="list-disc pl-5 mt-2 space-y-2">
              <li>Mais de 100 perguntas base em 6 categorias distintas.</li>
              <li>Geração infinita de novas perguntas através de IA em tempo real.</li>
              <li>Sistema de favoritos para salvar seus melhores quebra-gelos.</li>
              <li>Compartilhamento rápido para redes sociais e mensagens.</li>
              <li>Dicas diárias automáticas enviadas via notificação.</li>
            </ul>
          </p>
          <div className="glass p-5 rounded-3xl border-white/5 mt-4">
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Versão do Sistema</p>
            <p className="text-xs font-medium">1.6.0 Platinum Edition (2025)</p>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-3 mb-1">Powered By</p>
            <p className="text-xs font-medium">Google Gemini 3 Flash AI Model</p>
          </div>
        </div>
      </div>
    ),
    privacy: (
      <div className="space-y-6">
        <h2 className="text-xl font-bold">Privacidade e Segurança</h2>
        <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
          <p>
            Sua privacidade é nossa prioridade absoluta. Entendemos que as conversas que você tem são pessoais e, por isso, o <strong>Conecta</strong> opera sob uma política de "Zero Dados em Nuvem" para suas interações.
          </p>
          <p className="font-bold text-white">Como tratamos seus dados:</p>
          <ol className="list-decimal pl-5 space-y-3">
            <li>
              <strong>Armazenamento Local:</strong> Todas as perguntas que você favorita ou gera ficam guardadas exclusivamente na memória do seu dispositivo (LocalStorage). Se você limpar os dados do navegador, essas informações serão removidas.
            </li>
            <li>
              <strong>Processamento de IA:</strong> Quando você solicita a geração de novas perguntas ou dicas diárias, enviamos apenas o contexto necessário para a API do Google Gemini. Nenhuma informação pessoal sua é enviada neste processo.
            </li>
            <li>
              <strong>Notificações:</strong> As notificações são processadas localmente pelo seu navegador após serem disparadas pela atualização diária do app. Não mantemos servidores de push que rastreiam sua localização ou identidade.
            </li>
          </ol>
        </div>
      </div>
    ),
    terms: (
      <div className="space-y-6">
        <h2 className="text-xl font-bold">Termos de Uso</h2>
        <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
          <p>
            Ao acessar e utilizar o aplicativo <strong>Conecta</strong>, você concorda em cumprir estes termos e condições de uso. Leia-os atentamente.
          </p>
          <p className="font-bold text-white">1. Propósito do Serviço</p>
          <p>
            O Conecta é uma ferramenta de auxílio social e entretenimento. O conteúdo gerado pela IA destina-se a facilitar conversas e não deve ser interpretado como aconselhamento profissional, psicológico ou jurídico.
          </p>
          <p className="font-bold text-white">2. Responsabilidade do Usuário</p>
          <p>
            Você é o único responsável pela forma como utiliza as perguntas sugeridas. O uso das perguntas para fins de assédio, intimidação, bullying ou qualquer atividade ilegal é estritamente proibido. Respeite sempre os limites e o consentimento das pessoas com quem você está interagindo.
          </p>
        </div>
      </div>
    )
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col p-6 animate-in slide-in-from-bottom duration-400">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-black tracking-tight">CENTRAL</h1>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Painel de Controle</p>
        </div>
        <button onClick={onClose} className="p-3 glass rounded-2xl hover:bg-white/10 transition-colors">
          <X size={24} />
        </button>
      </div>

      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide shrink-0">
          <button 
            onClick={() => setActiveTab('settings')}
            className={`px-5 py-2.5 rounded-2xl whitespace-nowrap text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'settings' ? 'bg-blue-600 shadow-lg shadow-blue-600/30 scale-105' : 'glass text-slate-400'}`}
          >Ajustes</button>
          <button 
            onClick={() => setActiveTab('about')}
            className={`px-5 py-2.5 rounded-2xl whitespace-nowrap text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'about' ? 'bg-blue-600 shadow-lg shadow-blue-600/30 scale-105' : 'glass text-slate-400'}`}
          >Sobre</button>
          <button 
            onClick={() => setActiveTab('privacy')}
            className={`px-5 py-2.5 rounded-2xl whitespace-nowrap text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'privacy' ? 'bg-blue-600 shadow-lg shadow-blue-600/30 scale-105' : 'glass text-slate-400'}`}
          >Privacidade</button>
          <button 
            onClick={() => setActiveTab('terms')}
            className={`px-5 py-2.5 rounded-2xl whitespace-nowrap text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'terms' ? 'bg-blue-600 shadow-lg shadow-blue-600/30 scale-105' : 'glass text-slate-400'}`}
          >Termos</button>
        </div>
        <div className="flex-1 overflow-y-auto pb-24 pr-2 custom-scrollbar scrollbar-hide">
          {content[activeTab]}
        </div>
      </div>
    </div>
  );
};

interface QuestionCardProps {
  question: Question;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  gradient: string;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, isFavorite, onToggleFavorite, gradient }) => {
  const [copied, setCopied] = useState(false);

  const shareQuestion = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Pergunta Conecta',
        text: `"${question.text}" - Vi no app Conecta!`,
        url: window.location.href,
      }).catch(console.error);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(question.text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="relative group overflow-hidden glass rounded-[2.5rem] p-7 mb-5 card-shadow animate-in slide-in-from-bottom-3 duration-400 border-white/5">
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${gradient} opacity-10 blur-3xl group-hover:opacity-20 transition-opacity`}></div>
      
      <div className="flex flex-col h-full relative z-10">
        <p className="text-xl font-bold leading-snug mb-8 text-slate-100 tracking-tight">
          "{question.text}"
        </p>
        
        <div className="flex justify-between items-center mt-auto gap-3">
          <div className="flex gap-2.5">
            <button 
              onClick={() => onToggleFavorite(question.id)}
              className={`p-3.5 rounded-2xl transition-all duration-300 ${isFavorite ? 'bg-rose-500 text-white scale-110 shadow-lg shadow-rose-500/30' : 'glass text-slate-500 hover:text-white'}`}
              title={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
            >
              <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} strokeWidth={isFavorite ? 0 : 2} />
            </button>

            <button 
              onClick={copyToClipboard}
              className={`p-3.5 rounded-2xl transition-all duration-300 ${copied ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30' : 'glass text-slate-500 hover:text-white'}`}
              title="Copiar pergunta"
            >
              {copied ? <Check size={20} /> : <Copy size={20} />}
            </button>
          </div>
          
          <button 
            onClick={shareQuestion}
            className="p-3.5 glass rounded-2xl text-slate-500 hover:text-white transition-all active:scale-90"
            title="Compartilhar"
          >
            <Share2 size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentView, setCurrentView] = useState<'home' | 'questions' | 'settings'>('home');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [dailyTip, setDailyTip] = useState<string>(() => {
    return localStorage.getItem('conecta_daily_tip') || "As perguntas mais simples abrem as portas mais profundas.";
  });
  const [questions, setQuestions] = useState<Question[]>(() => {
    const saved = localStorage.getItem('conecta_questions');
    return saved ? JSON.parse(saved) : INITIAL_QUESTIONS;
  });
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('conecta_favs');
    return saved ? JSON.parse(saved) : [];
  });
  const [isGenerating, setIsGenerating] = useState(false);

  // Daily Tip Logic
  useEffect(() => {
    const checkDailyTip = async () => {
      const lastDate = localStorage.getItem('conecta_last_tip_date');
      const today = new Date().toLocaleDateString();

      if (lastDate !== today) {
        const newTip = await geminiService.generateDailyTip();
        setDailyTip(newTip);
        localStorage.setItem('conecta_daily_tip', newTip);
        localStorage.setItem('conecta_last_tip_date', today);

        // Notify user if enabled
        const notificationsEnabled = localStorage.getItem('conecta_notifications') === 'true';
        if (notificationsEnabled && 'Notification' in window && Notification.permission === 'granted') {
          new Notification('Dica do Dia - Conecta 💬', {
            body: newTip,
            icon: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
          });
        }
      }
    };

    if (!showSplash) {
      checkDailyTip();
    }
  }, [showSplash]);

  useEffect(() => {
    localStorage.setItem('conecta_favs', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('conecta_questions', JSON.stringify(questions));
  }, [questions]);

  const filteredQuestions = useMemo(() => {
    if (!selectedCategory) return [];
    if (selectedCategory.id === 'favorites') {
      return questions.filter(q => favorites.includes(q.id));
    }
    return questions.filter(q => q.category === selectedCategory.id);
  }, [selectedCategory, questions, favorites]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const isAlreadyFav = prev.includes(id);
      if (isAlreadyFav) {
        return prev.filter(f => f !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
    setCurrentView('questions');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const generateMore = async () => {
    if (!selectedCategory || selectedCategory.id === 'favorites') return;
    setIsGenerating(true);
    const existingTexts = filteredQuestions.map(q => q.text);
    const newQs = await geminiService.generateMoreQuestions(selectedCategory.id, existingTexts);
    
    if (newQs.length > 0) {
      setQuestions(prev => [...prev, ...newQs as Question[]]);
    }
    setIsGenerating(false);
  };

  if (showSplash) return <Splash onComplete={() => setShowSplash(false)} />;

  return (
    <div className="min-h-screen max-w-md mx-auto relative bg-slate-950 text-white flex flex-col font-['Plus_Jakarta_Sans'] antialiased">
      {/* Background blobs */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-15%] right-[-15%] w-80 h-80 bg-blue-600/10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-[5%] left-[-15%] w-80 h-80 bg-rose-600/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Header */}
      <header className="sticky top-0 p-6 flex justify-between items-center z-40 bg-slate-950/80 backdrop-blur-xl border-b border-white/5">
        {currentView === 'questions' ? (
          <button onClick={() => setCurrentView('home')} className="px-4 py-2.5 glass rounded-2xl flex items-center gap-2 text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-colors">
            <ChevronLeft size={18} />
            Início
          </button>
        ) : (
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center text-xl shadow-lg shadow-blue-600/20">
              💬
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tighter leading-none">CONECTA</h1>
              <p className="text-[8px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-1">Smart Connection</p>
            </div>
          </div>
        )}
        <button 
          onClick={() => setCurrentView('settings')}
          className="p-3 glass rounded-2xl hover:bg-white/10 transition-colors"
        >
          <Settings size={20} />
        </button>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 px-6 pt-6 pb-28 min-h-0">
        {currentView === 'home' && (
          <div className="animate-in fade-in slide-in-from-bottom-5 duration-600">
            <div className="mb-10">
              <h2 className="text-5xl font-black mb-4 leading-[1.1] tracking-tighter">Conecte-se<br/>ao agora.</h2>
              <p className="text-slate-400 text-sm font-medium leading-relaxed">Selecione uma categoria para iniciar conversas que realmente importam.</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {CATEGORIES.filter(cat => cat.id !== 'favorites').map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat)}
                  className={`relative overflow-hidden p-7 rounded-[2.5rem] text-left transition-all active:scale-95 group card-shadow glass h-52 flex flex-col justify-between border-white/5`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-5 group-hover:opacity-15 transition-all duration-500`}></div>
                  <div className="text-5xl mb-3 drop-shadow-2xl transition-transform group-hover:scale-110 duration-500 origin-left">{cat.icon}</div>
                  <div>
                    <h3 className="font-black text-lg leading-tight mb-1 uppercase tracking-tighter text-slate-100">{cat.name}</h3>
                    <div className="flex items-center gap-1">
                      <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${cat.gradient} animate-pulse`}></div>
                      <p className="text-[9px] text-slate-500 uppercase tracking-widest font-black">
                        Abrir Guia
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-10 glass p-7 rounded-[2.5rem] flex items-center gap-5 relative overflow-hidden group border-white/5">
              <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="w-16 h-16 bg-blue-500/20 rounded-3xl flex items-center justify-center text-4xl shadow-inner shadow-blue-400/10 shrink-0">
                ✨
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-black uppercase tracking-widest text-[10px] text-blue-400 mb-1">Dica do Especialista</h4>
                <p className="text-sm text-slate-300 leading-snug font-medium italic break-words">"{dailyTip}"</p>
              </div>
            </div>
          </div>
        )}

        {currentView === 'questions' && selectedCategory && (
          <div className="flex flex-col animate-in fade-in duration-400">
            <div className="mb-10 p-7 glass rounded-[2.5rem] relative overflow-hidden border-white/5 shadow-2xl">
              <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${selectedCategory.gradient} opacity-20 blur-[60px]`}></div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-4xl drop-shadow-lg">{selectedCategory.icon}</span>
                  <div>
                    <h2 className="text-3xl font-black uppercase tracking-tighter leading-none">{selectedCategory.name}</h2>
                    <p className="text-[9px] text-slate-500 font-black uppercase tracking-[0.2em] mt-1">Categoria Selecionada</p>
                  </div>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed font-medium mb-5">{selectedCategory.description}</p>
                <div className="flex gap-2">
                   <div className="px-4 py-1.5 bg-white/5 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/5">
                     {filteredQuestions.length} Perguntas Disponíveis
                   </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              {filteredQuestions.length > 0 ? (
                <>
                  {filteredQuestions.map((q) => (
                    <QuestionCard 
                      key={q.id} 
                      question={q} 
                      isFavorite={favorites.includes(q.id)} 
                      onToggleFavorite={toggleFavorite}
                      gradient={selectedCategory.gradient}
                    />
                  ))}
                  
                  {selectedCategory.id !== 'favorites' && (
                    <button 
                      onClick={generateMore}
                      disabled={isGenerating}
                      className="w-full mt-10 h-20 glass rounded-[2rem] flex items-center justify-center gap-4 font-black text-xs uppercase tracking-[0.2em] transition-all hover:bg-white/10 active:scale-95 disabled:opacity-50 border-white/5 shadow-xl group"
                    >
                      {isGenerating ? (
                        <RefreshCw size={24} className="animate-spin text-blue-400" />
                      ) : (
                        <>
                          <Sparkles size={24} className="text-blue-400 group-hover:rotate-12 transition-transform" />
                          <span>Gerar novas frases com IA</span>
                        </>
                      )}
                    </button>
                  )}
                </>
              ) : (
                <div className="text-center py-24 px-8 glass rounded-[3.5rem] animate-in zoom-in-95 duration-400 border-white/5 shadow-inner">
                  <div className="text-6xl mb-8 grayscale opacity-20 animate-bounce">📭</div>
                  <h3 className="text-2xl font-black mb-3 text-slate-100 tracking-tighter uppercase">Silêncio Absoluto</h3>
                  <p className="text-slate-500 text-sm mb-10 leading-relaxed font-medium">Parece que ainda não há faíscas por aqui. Vamos criar algo novo?</p>
                  {selectedCategory.id === 'favorites' ? (
                    <button onClick={() => setCurrentView('home')} className="bg-rose-600 px-10 py-4 rounded-3xl font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl shadow-rose-600/30 active:scale-95 transition-all">
                      Explorar Categorias
                    </button>
                  ) : (
                    <button 
                      onClick={generateMore} 
                      disabled={isGenerating}
                      className="bg-blue-600 px-10 py-4 rounded-3xl font-black uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-3 mx-auto disabled:opacity-50 shadow-2xl shadow-blue-600/30 active:scale-95 transition-all"
                    >
                      {isGenerating ? <RefreshCw className="animate-spin" size={18} /> : <Sparkles size={18} />}
                      Ativar Inteligência Artificial
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Settings Modal Layer */}
      {currentView === 'settings' && <SettingsView onClose={() => setCurrentView('home')} />}

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md h-28 glass border-t border-white/5 flex items-center justify-around px-8 z-40 bg-slate-950/90 backdrop-blur-2xl">
        <button 
          onClick={() => {
            setCurrentView('home');
            setSelectedCategory(null);
          }}
          className={`flex flex-col items-center gap-2 transition-all duration-300 ${currentView === 'home' && selectedCategory?.id !== 'favorites' ? 'text-blue-500 scale-110' : 'text-slate-500 hover:text-slate-300'}`}
        >
          <div className={`p-2 rounded-xl transition-all ${currentView === 'home' && !selectedCategory ? 'bg-blue-500/10' : ''}`}>
            <Home size={26} strokeWidth={currentView === 'home' && !selectedCategory ? 2.5 : 2} />
          </div>
          <span className="text-[9px] font-black uppercase tracking-widest">Início</span>
        </button>
        
        <button 
          onClick={() => handleCategorySelect(CATEGORIES.find(c => c.id === 'favorites')!)}
          className={`relative flex flex-col items-center gap-2 transition-all duration-300 ${selectedCategory?.id === 'favorites' && currentView === 'questions' ? 'text-rose-500 scale-110' : 'text-slate-500 hover:text-slate-300'}`}
        >
          {favorites.length > 0 && (
            <span className="absolute top-1 right-2 w-4 h-4 bg-rose-500 text-white text-[9px] font-black rounded-full flex items-center justify-center animate-pulse z-10 border-2 border-slate-950">
              {favorites.length}
            </span>
          )}
          <div className={`p-2 rounded-xl transition-all ${selectedCategory?.id === 'favorites' ? 'bg-rose-500/10' : ''}`}>
            <Heart size={26} fill={selectedCategory?.id === 'favorites' && currentView === 'questions' ? 'currentColor' : 'none'} strokeWidth={selectedCategory?.id === 'favorites' ? 0 : 2} />
          </div>
          <span className="text-[9px] font-black uppercase tracking-widest">Salvos</span>
        </button>

        <button 
          onClick={() => setCurrentView('settings')}
          className={`flex flex-col items-center gap-2 transition-all duration-300 ${currentView === 'settings' ? 'text-blue-500 scale-110' : 'text-slate-500 hover:text-slate-300'}`}
        >
          <div className={`p-2 rounded-xl transition-all ${currentView === 'settings' ? 'bg-blue-500/10' : ''}`}>
            <Settings size={26} strokeWidth={currentView === 'settings' ? 2.5 : 2} />
          </div>
          <span className="text-[9px] font-black uppercase tracking-widest">Menu</span>
        </button>
      </nav>
      
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}

import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { BadgePercent, MapPin, Phone, Building2, Tag, Gift } from 'lucide-react';

interface ParceriaRow {
  "Estabelecimento ": string;
  Desconto: string;
  "Endereço": string;
  Telefone: string;
}

interface Categoria {
  nome: string;
  items: ParceriaRow[];
}

export default function Parcerias() {
  const [data, setData] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCSV = async () => {
      try {
        const response = await fetch('https://docs.google.com/spreadsheets/d/198NAUMaMO3nAUH0isiT6Ugx1EpM-S1o6eYLt7aKKJrI/export?format=csv');
        const text = await response.text();
        
        Papa.parse<ParceriaRow>(text, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const parsedData = results.data;
            const categories: Categoria[] = [];
            let currentCategory: Categoria | null = null;
            
            parsedData.forEach(row => {
              const name = row["Estabelecimento "]?.trim() || "";
              const discount = row["Desconto"]?.trim() || "";
              const address = row["Endereço"]?.trim() || "";
              const phone = row["Telefone"]?.trim() || "";
              
              if (name && !discount && !address && !phone) {
                // This is a category header
                currentCategory = {
                  nome: name,
                  items: []
                };
                categories.push(currentCategory);
              } else if (name || discount || address || phone) {
                if (!currentCategory) {
                  currentCategory = {
                    nome: "Outros",
                    items: []
                  };
                  categories.push(currentCategory);
                }
                currentCategory.items.push(row);
              }
            });
            setData(categories);
            setLoading(false);
          }
        });
      } catch (error) {
        console.error("Erro ao carregar parcerias", error);
        setLoading(false);
      }
    };
    
    fetchCSV();
  }, []);

  return (
    <div className="flex flex-col pt-0 w-full overflow-hidden bg-[#0A192F] min-h-screen pb-24 font-sans text-slate-300">
      
      {/* Hero Section */}
      <div className="relative z-0 h-[40vh] min-h-[300px] overflow-hidden flex items-center justify-center pt-16">
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-sky-900/90 via-[#0A192F] to-[#0A192F] z-0" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-500/10 via-transparent to-transparent z-0" />
        
        <div className="relative z-10 flex flex-col items-center justify-center px-4 max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center justify-center p-3 bg-sky-500/10 rounded-2xl border border-sky-500/20 backdrop-blur-md mb-2">
            <Gift className="w-8 h-8 text-sky-400" />
          </div>
          <h1 className="text-white text-5xl md:text-6xl font-extrabold tracking-tight drop-shadow-xl">
            Clube de <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300">Vantagens</span>
          </h1>
          <p className="text-slate-300 text-lg md:text-xl max-w-2xl font-light">
            A SCAER firmou diversas parcerias para oferecer descontos exclusivos e benefícios especiais aos nossos associados.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 lg:px-12 py-8 max-w-7xl mx-auto w-full -mt-8 relative z-20">
        {loading ? (
          <div className="flex flex-col justify-center items-center h-64 space-y-4">
             <div className="w-12 h-12 border-4 border-sky-500/30 border-t-sky-400 rounded-full animate-spin"></div>
             <p className="text-sky-300 text-lg font-medium animate-pulse">Carregando parceiros incríveis...</p>
          </div>
        ) : (
          <div className="flex flex-col gap-16">
            {data.map((cat, idx) => (
              <div key={idx} className="flex flex-col space-y-6">
                
                {/* Category Header */}
                <div className="flex items-center space-x-4 border-b border-sky-800/60 pb-3">
                  <div className="p-2 bg-sky-500/10 rounded-lg">
                    <Building2 className="w-6 h-6 text-sky-400" />
                  </div>
                  <h2 className="text-3xl font-bold text-white tracking-wide">{cat.nome}</h2>
                </div>
                
                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {cat.items.map((item, i) => (
                    <div 
                      key={i} 
                      className="group relative bg-[#112240] rounded-2xl p-6 border border-sky-800/40 shadow-lg hover:shadow-sky-500/10 hover:-translate-y-1 hover:border-sky-500/50 transition-all duration-300 flex flex-col h-full overflow-hidden"
                    >
                      {/* Subtle hover gradient background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-sky-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      
                      <div className="relative z-10 flex flex-col h-full">
                        <h3 className="text-xl font-bold text-slate-100 mb-5 group-hover:text-sky-300 transition-colors line-clamp-2">
                          {item["Estabelecimento "]}
                        </h3>
                        
                        <div className="flex flex-col gap-4 flex-grow">
                          {item["Desconto"] && (
                            <div className="bg-emerald-500/10 rounded-xl p-4 border border-emerald-500/20 relative overflow-hidden group/discount">
                              <div className="absolute -right-4 -top-4 w-16 h-16 bg-emerald-500/10 rounded-full blur-xl group-hover/discount:bg-emerald-500/20 transition-colors" />
                              <div className="flex items-start space-x-3 relative z-10">
                                <BadgePercent className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                                <div>
                                  <span className="text-[10px] font-bold text-emerald-500/90 uppercase tracking-widest block mb-1">Benefício Exclusivo</span>
                                  <p className="text-emerald-300 font-medium text-sm sm:text-base leading-snug">{item["Desconto"]}</p>
                                </div>
                              </div>
                            </div>
                          )}
                          
                          {item["Endereço"] && (
                            <div className="flex items-start space-x-3 mt-2">
                              <MapPin className="w-5 h-5 text-sky-500/70 flex-shrink-0 mt-0.5" />
                              <div className="flex-1">
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">Endereço</span>
                                <p className="text-slate-300 text-sm leading-relaxed">{item["Endereço"]}</p>
                              </div>
                            </div>
                          )}
                        </div>
                        
                        {item["Telefone"] && (
                          <div className="mt-5 pt-4 border-t border-slate-700/50 flex items-center space-x-3">
                            <div className="p-2 bg-slate-800/50 rounded-lg group-hover:bg-sky-500/10 transition-colors">
                              <Phone className="w-4 h-4 text-slate-400 group-hover:text-sky-400 transition-colors" />
                            </div>
                            <div>
                              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-0.5">Contato</span>
                              <p className="text-slate-200 text-sm font-medium">{item["Telefone"]}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            
            {data.length === 0 && (
              <div className="bg-[#112240] rounded-3xl p-16 text-center border border-sky-800/30 flex flex-col items-center justify-center space-y-4 shadow-xl">
                <Tag className="w-16 h-16 text-slate-600 mb-2" />
                <h3 className="text-2xl font-bold text-slate-200">Nenhuma parceria encontrada</h3>
                <p className="text-slate-400 max-w-md mx-auto">Estamos trabalhando para trazer novos benefícios para você. Volte novamente em breve!</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

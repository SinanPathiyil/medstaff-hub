
import React, { useState, useMemo } from 'react';
import { useApp } from '../store/AppContext';
import { KPICard } from '../components/DashboardCards';
import { Role, Status } from '../types';
import { 
  Users, 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  Wallet, 
  AlertTriangle,
  Zap,
  Filter,
  ChevronDown,
  Trophy,
  Medal,
  Target,
  Rocket,
  Crown,
  Sparkles
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { BRANCHES, TARGET_SLABS } from '../constants';
import { formatCurrency } from '../utils';

const Dashboard: React.FC = () => {
  const { leads, incentives, currentUser, invoices } = useApp();
  const [selectedBranch, setSelectedBranch] = useState<string>('GLOBAL CONTROL');

  const isSalesman = currentUser?.role === Role.SALESMAN;
  const isExecutive = [Role.CEO, Role.CHAIRMAN, Role.CTO].includes(currentUser?.role!);

  // Filter leads based on role and branch
  const filteredLeads = useMemo(() => {
    let result = leads;
    if (isSalesman) {
      result = result.filter(l => l.createdById === currentUser?.id);
    }
    if (isExecutive && selectedBranch !== 'GLOBAL CONTROL') {
      result = result.filter(l => l.branch === selectedBranch);
    }
    return result;
  }, [leads, isSalesman, isExecutive, selectedBranch, currentUser]);

  const filteredInvoices = useMemo(() => {
    const leadIds = new Set(filteredLeads.map(l => l.id));
    return invoices.filter(inv => leadIds.has(inv.leadId));
  }, [invoices, filteredLeads]);

  const currentRevenue = filteredInvoices.reduce((acc, inv) => acc + inv.amount, 0);
  const targetAmount = currentUser?.targetAmount || 100000;
  const achievementProgress = currentRevenue / targetAmount;

  // Determine current slab
  const currentSlab = useMemo(() => {
    let activeSlab = TARGET_SLABS[0];
    for (const slab of TARGET_SLABS) {
      if (achievementProgress >= slab.threshold) {
        activeSlab = slab;
      }
    }
    return activeSlab;
  }, [achievementProgress]);

  const totalLeads = filteredLeads.length;
  const completedLeads = filteredLeads.filter(l => l.status === Status.COMPLETED).length;
  const processingLeads = filteredLeads.filter(l => l.status === Status.PROCESSING).length;
  
  const conversionRate = totalLeads ? ((completedLeads / totalLeads) * 100).toFixed(1) : 0;
  
  const totalIncentivesValue = useMemo(() => {
    const leadIds = new Set(filteredLeads.map(l => l.id));
    return incentives
      .filter(i => leadIds.has(i.leadId))
      .reduce((acc, i) => acc + i.salesAmount + i.creAmount + i.mmAmount, 0);
  }, [filteredLeads, incentives]);

  const chartData = [
    { name: 'Mon', count: 4 }, { name: 'Tue', count: 7 }, { name: 'Wed', count: 5 },
    { name: 'Thu', count: 8 }, { name: 'Fri', count: 12 }, { name: 'Sat', count: 3 }, { name: 'Sun', count: 2 },
  ];

  const getMilestoneIcon = (label: string) => {
    switch (label) {
      case 'Bronze': return <Medal size={24} />;
      case 'Silver': return <Trophy size={24} />;
      case 'Gold': return <Medal size={24} />;
      case 'Platinum': return <Crown size={24} />;
      case 'Diamond': return <Sparkles size={24} />;
      default: return <Target size={24} />;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic">
            {isSalesman ? 'Sales Personal' : 'Performance'} Hub
          </h1>
          <p className="text-slate-500 font-bold text-sm mt-1 uppercase tracking-widest">
            {isSalesman ? 'My Lead Tracking & Conversion' : `Monitoring: ${selectedBranch}`}
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          {isExecutive && (
             <div className="relative group min-w-[180px]">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-600">
                <Filter size={14} />
              </div>
              <select 
                className="appearance-none bg-white border border-slate-200 rounded-2xl pl-10 pr-10 py-2.5 text-[10px] font-black uppercase tracking-widest outline-none focus:ring-4 focus:ring-blue-100 transition-all w-full cursor-pointer shadow-sm"
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
              >
                <option value="GLOBAL CONTROL">Global Scope</option>
                {BRANCHES.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
              <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          )}
          <div className="flex gap-2 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm">
             <div className="px-4 py-1.5 rounded-xl bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest">Real-time</div>
             <div className="px-4 py-1.5 rounded-xl text-slate-400 text-[10px] font-black uppercase tracking-widest">History</div>
          </div>
        </div>
      </div>

      {/* Target & Milestone Tracker */}
      <div className={`p-8 rounded-[40px] border-2 ${currentSlab.border} bg-white shadow-xl relative overflow-hidden transition-all duration-700`}>
        <div className={`absolute top-0 right-0 w-64 h-64 ${currentSlab.color} opacity-5 -translate-y-1/2 translate-x-1/2 rounded-full`}></div>
        <div className="flex flex-col lg:flex-row items-center gap-8 relative z-10">
          <div className="flex-1 w-full space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter flex items-center gap-3">
                  <span className={`${currentSlab.text} transition-colors`}>{getMilestoneIcon(currentSlab.label)}</span>
                  {currentSlab.label} Milestone
                </h2>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-1">Current Performance Slab & Achievement Tracker</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Monthly Yield</p>
                <p className={`text-2xl font-black ${currentSlab.text} tracking-tight italic`}>{Math.min(100, Math.round(achievementProgress * 100))}%</p>
              </div>
            </div>

            <div className="h-6 w-full bg-slate-100 rounded-full overflow-hidden flex p-1">
              <div 
                className={`h-full ${currentSlab.color} rounded-full transition-all duration-1000 relative`}
                style={{ width: `${Math.min(100, achievementProgress * 100)}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
              </div>
            </div>

            <div className="flex justify-between items-end">
              <div className="space-y-1">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Revenue Achieved</p>
                <p className="text-xl font-black text-slate-800 tracking-tight italic">{formatCurrency(currentRevenue)}</p>
              </div>
              <div className="flex gap-2">
                {TARGET_SLABS.map((slab, idx) => {
                  const isReached = achievementProgress >= slab.threshold;
                  return (
                    <div key={idx} className="flex flex-col items-center gap-1">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-500 ${isReached ? slab.color + ' text-white scale-110 shadow-lg' : 'bg-slate-100 text-slate-300'}`}>
                        {getMilestoneIcon(slab.label)}
                      </div>
                      <span className={`text-[8px] font-black uppercase ${isReached ? slab.text : 'text-slate-300'}`}>{slab.label}</span>
                    </div>
                  );
                })}
              </div>
              <div className="text-right space-y-1">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Monthly Target</p>
                <p className="text-xl font-black text-slate-800 tracking-tight italic opacity-40">{formatCurrency(targetAmount)}</p>
              </div>
            </div>
          </div>
          
          <div className={`hidden lg:flex shrink-0 w-48 h-48 rounded-[32px] ${currentSlab.color} items-center justify-center text-white shadow-2xl relative group overflow-hidden`}>
             <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
             <div className="relative z-10 flex flex-col items-center gap-2">
                <div className="animate-bounce">
                  {getMilestoneIcon(currentSlab.label)}
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">{currentSlab.label} Status</span>
             </div>
             <div className="absolute -bottom-4 -right-4 opacity-10 scale-150 rotate-12 transition-transform group-hover:scale-125">
                <Crown size={80} />
             </div>
          </div>
        </div>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard 
          label="# Customers / Leads" 
          value={totalLeads} 
          subValue="Active in pipeline"
          icon={Users} 
          trend="up" 
          trendValue="12%" 
          color="blue" 
        />
        <KPICard 
          label="# Finished Tasks" 
          value={completedLeads} 
          subValue="Jobs successfully closed"
          icon={CheckCircle} 
          color="green" 
        />
        <KPICard 
          label="Conversion Efficiency" 
          value={`${conversionRate}%`} 
          subValue="Won vs Total"
          icon={TrendingUp} 
          color="purple" 
        />
        <KPICard 
          label={isSalesman ? "Pending Actions" : "Total Incentives"} 
          value={isSalesman ? processingLeads : formatCurrency(totalIncentivesValue)} 
          subValue={isSalesman ? "Require follow-up" : "Payout pool for selection"}
          icon={isSalesman ? Zap : Wallet} 
          color="orange" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-blue-600"></div>
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="font-black text-slate-800 uppercase tracking-widest text-xs mb-1">Weekly Lead Intake</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase">Activity Distribution</p>
            </div>
          </div>
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 10, fontWeight: 800}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 10, fontWeight: 800}} dx={-10} />
                <Tooltip 
                  cursor={{fill: '#F8FAFC'}} 
                  contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '12px'}} 
                  itemStyle={{fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase'}}
                  labelStyle={{fontSize: '11px', fontWeight: '900', marginBottom: '4px'}}
                />
                <Bar dataKey="count" fill="#3B82F6" radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-black text-slate-800 uppercase tracking-widest text-xs">Priority Notifications</h3>
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          </div>
          <div className="space-y-5 flex-1 overflow-y-auto pr-2 custom-scrollbar">
            <div className="group flex gap-4 p-4 bg-red-50/50 rounded-2xl border border-red-100 hover:bg-red-50 transition-all cursor-pointer">
              <div className="p-2.5 bg-white rounded-xl text-red-600 shadow-sm border border-red-200">
                <AlertTriangle size={18} />
              </div>
              <div>
                <p className="text-[11px] font-black text-red-900 uppercase tracking-tight">System Alert</p>
                <p className="text-[10px] text-red-700 font-bold mt-0.5">High failure rate detected</p>
                <p className="text-[9px] text-red-400 mt-2 font-black uppercase">Requires Review</p>
              </div>
            </div>
            <div className="group flex gap-4 p-4 bg-blue-50/50 rounded-2xl border border-blue-100 hover:bg-blue-50 transition-all cursor-pointer">
              <div className="p-2.5 bg-white rounded-xl text-blue-600 shadow-sm border border-blue-200">
                <Clock size={18} />
              </div>
              <div>
                <p className="text-[11px] font-black text-blue-900 uppercase tracking-tight">Pipeline Status</p>
                <p className="text-[10px] text-blue-700 font-bold mt-0.5">Global Intake +5% vs yesterday</p>
                <p className="text-[9px] text-blue-400 mt-2 font-black uppercase">Live Update</p>
              </div>
            </div>
          </div>
          <button className="w-full mt-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 bg-slate-50 hover:bg-slate-100 rounded-2xl transition-all border border-slate-200 shadow-sm">
            View All Activity
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

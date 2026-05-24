import React, { useState, useMemo } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { TrendingUp, Users, Calendar, Award, Activity, Sparkles, AlertCircle } from 'lucide-react';
import { BookingSlot, Counselor } from '../types';

interface AdminAnalyticsProps {
  slots: BookingSlot[];
  counselors: Counselor[];
}

const BRAND_COLORS = {
  navy: '#0B2538',
  green: '#6E9381',
  blue: '#7BA4CA',
  tan: '#D6C9B8',
  bg: '#DED5C8',
  cream: '#F5EFEB',
  white: '#FFFFFF',
  rose: '#FDA4AF',
  violet: '#C084FC'
};

const PIE_COLORS = [
  BRAND_COLORS.green,
  BRAND_COLORS.blue,
  BRAND_COLORS.navy,
  BRAND_COLORS.tan,
  '#A78BFA', // violet
  '#F472B6', // pink
];

export const AdminAnalytics: React.FC<AdminAnalyticsProps> = ({ slots, counselors }) => {
  const [isDemoMode, setIsDemoMode] = useState<boolean>(true);

  // 1. Generate Demo Data for a rich visual presentation
  const demoData = useMemo(() => {
    const today = new Date();
    const demoCounselors = [
      { id: 'mylene', name: 'Mylene Lee' },
      { id: 'sarah_j', name: 'Sarah Jenkins' },
      { id: 'john_r', name: 'Jonathan Reed' },
      { id: 'elena_v', name: 'Elena Rostova' }
    ];

    const demoSlots: BookingSlot[] = [];
    const times = ['09:00 AM', '11:00 AM', '01:00 PM', '03:00 PM', '05:00 PM'];
    const sessionTypes = [
      'Individual Coaching Session (60 Min)',
      'Couples Counselling (90 Min)',
      'Executive Leadership Coaching',
      'Career Alignment Workshop',
      'Introductory Enquiry Call (15 Min - Complimentary)'
    ];
    const services = [
      'Individual Coaching',
      'Relationship & Couples',
      'Executive Wellness',
      'Corporate Alignment',
      'Career Elevation'
    ];

    // Seed bookings across the next 30 days
    for (let dayOffset = 0; dayOffset < 30; dayOffset++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + dayOffset);
      const dateStr = currentDate.toISOString().split('T')[0];

      // Create random slots for each counselor
      demoCounselors.forEach(c => {
        // High density of sessions
        const slotsPerDay = 1 + Math.floor(Math.sin(dayOffset + c.id.length) * 2) + Math.floor(Math.cos(dayOffset) * 2);
        const actualSlotsCount = Math.max(1, Math.min(4, slotsPerDay));

        for (let i = 0; i < actualSlotsCount; i++) {
          const time = times[i % times.length];
          const isBooked = Math.sin(dayOffset * 3 + c.id.length + i) > -0.2; // ~60% booked rate
          const randomTypeIndex = Math.abs(dayOffset + i) % sessionTypes.length;
          
          demoSlots.push({
            id: `demo_${dayOffset}_${c.id}_${i}`,
            date: dateStr,
            time,
            isBooked,
            counselorId: c.id,
            bookedBy: isBooked ? ['Arthur Dent', 'Diana Prince', 'Bruce Wayne', 'Selina Kyle', 'Clara Oswald', 'Evelyn Salt', 'Tony Stark'][Math.abs(dayOffset - i) % 7] : undefined,
            bookedEmail: isBooked ? 'client@upworkz.com' : undefined,
            sessionType: isBooked ? sessionTypes[randomTypeIndex] : undefined,
            serviceInterested: isBooked ? services[randomTypeIndex % services.length] : undefined
          });
        }
      });
    }
    return { slots: demoSlots, counselors: demoCounselors };
  }, []);

  // 2. Select data source based on toggle
  const activeData = useMemo(() => {
    if (isDemoMode) {
      return {
        slots: demoData.slots,
        counselors: demoData.counselors as Counselor[],
      };
    }
    return { slots, counselors };
  }, [isDemoMode, slots, counselors, demoData]);

  // 3. Process data for charts
  const analytics = useMemo(() => {
    const today = new Date();
    const endOfMonth = new Date();
    endOfMonth.setDate(today.getDate() + 30);

    const currentMonthSlots = activeData.slots.filter(s => {
      const d = new Date(s.date);
      return d >= today && d <= endOfMonth;
    });

    const bookedSlots = currentMonthSlots.filter(s => s.isBooked);

    // Calc counselor stats
    const bookingsByCounselor = activeData.counselors.map(c => {
      const bookedCount = bookedSlots.filter(s => s.counselorId === c.id).length;
      const totalCount = currentMonthSlots.filter(s => s.counselorId === c.id).length;
      return {
        name: c.name,
        booked: bookedCount,
        available: totalCount - bookedCount,
        total: totalCount,
        occupancyRate: totalCount > 0 ? Math.round((bookedCount / totalCount) * 100) : 0
      };
    }).sort((a, b) => b.booked - a.booked);

    // Group bookings by week over the coming month
    const timelineData: Record<string, { weekLabel: string; dateObj: Date; booked: number; total: number }> = {};
    
    // Set up weekly intervals
    for (let i = 0; i < 4; i++) {
      const wStart = new Date(today);
      wStart.setDate(today.getDate() + (i * 7));
      const wEnd = new Date(today);
      wEnd.setDate(today.getDate() + ((i + 1) * 7) - 1);
      
      const label = `Week ${i + 1} (${wStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })})`;
      timelineData[i] = {
        weekLabel: label,
        dateObj: wStart,
        booked: 0,
        total: 0
      };
    }

    currentMonthSlots.forEach(s => {
      const sDate = new Date(s.date);
      const diffTime = Math.abs(sDate.getTime() - today.getTime());
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      const weekIndex = Math.min(3, Math.floor(diffDays / 7));
      
      if (timelineData[weekIndex]) {
        timelineData[weekIndex].total += 1;
        if (s.isBooked) {
          timelineData[weekIndex].booked += 1;
        }
      }
    });

    const chartTimeline = Object.values(timelineData);

    // Service Breakdown
    const serviceCounts: Record<string, number> = {};
    bookedSlots.forEach(s => {
      const svc = s.serviceInterested || 'General Coaching';
      serviceCounts[svc] = (serviceCounts[svc] || 0) + 1;
    });

    const serviceData = Object.entries(serviceCounts).map(([name, value]) => ({
      name,
      value
    })).sort((a, b) => b.value - a.value);

    // Summary Info
    const totalBooked = bookedSlots.length;
    const totalSlotsCount = currentMonthSlots.length;
    const totalCapacityPercent = totalSlotsCount > 0 ? Math.round((totalBooked / totalSlotsCount) * 100) : 0;
    const topCounselor = bookingsByCounselor.length > 0 ? bookingsByCounselor[0] : null;

    return {
      bookingsByCounselor,
      chartTimeline,
      serviceData,
      totalBooked,
      totalSlotsCount,
      totalCapacityPercent,
      topCounselor
    };
  }, [activeData]);

  return (
    <div className="space-y-12 mb-16 animate-in fade-in slide-in-from-bottom duration-700">
      
      {/* Analytics Navigation Bar */}
      <div className="bg-white p-6 sm:p-8 rounded-[2.5rem] shadow-xl border border-brand-tan/10 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h3 className="text-2xl font-bold text-brand-navy font-serif italic flex items-center gap-2">
            <Sparkles className="text-brand-green h-6 w-6" />
            Bookings Forecast & Analytics
          </h3>
          <p className="text-brand-navy/60 text-xs mt-1 font-serif">
            Visualizing counselor capacity and client slots booked over the coming 30 days.
          </p>
        </div>
        
        {/* Toggle Switch */}
        <div className="flex items-center gap-3 bg-brand-bg/30 p-2 rounded-2xl border border-brand-tan/10">
          <button
            onClick={() => setIsDemoMode(false)}
            className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${
              !isDemoMode 
                ? 'bg-brand-navy text-white shadow-md' 
                : 'text-brand-navy/60 hover:text-brand-navy'
            }`}
          >
            Live Data
          </button>
          <button
            onClick={() => setIsDemoMode(true)}
            className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${
              isDemoMode 
                ? 'bg-brand-green text-white shadow-md' 
                : 'text-brand-navy/60 hover:text-brand-navy'
            }`}
          >
            Demo Forecast
          </button>
        </div>
      </div>

      {isDemoMode && (
        <div className="bg-brand-blue/10 border border-brand-blue/20 rounded-3xl p-5 flex items-center gap-4 text-brand-navy/80 text-xs">
          <AlertCircle className="text-brand-blue h-5 w-5 flex-shrink-0" />
          <p>
            <strong className="font-bold">Demo Forecast active: </strong> 
            Showing a projected distribution of sessions across a realistic 4-week pool for 4 advisors to illustrate a mature practice. Turn off to see your real, current database schedule.
          </p>
        </div>
      )}

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-8 rounded-[2.5rem] border border-brand-tan/10 shadow-lg relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
          <div className="absolute top-0 right-0 w-24 h-24 bg-brand-green/5 rounded-full -mr-12 -mt-12 group-hover:scale-125 transition-transform"></div>
          <div className="flex items-center gap-4 text-brand-green mb-4">
            <div className="p-3 bg-brand-green/10 rounded-2xl">
              <Calendar className="h-6 w-6" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-navy/40">Total Bookings</span>
          </div>
          <p className="text-4xl font-extrabold text-brand-navy font-serif italic mb-1">{analytics.totalBooked}</p>
          <p className="text-[10px] font-medium text-brand-navy/50">Next 30 days projection</p>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-brand-tan/10 shadow-lg relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
          <div className="absolute top-0 right-0 w-24 h-24 bg-brand-blue/5 rounded-full -mr-12 -mt-12 group-hover:scale-125 transition-transform"></div>
          <div className="flex items-center gap-4 text-brand-blue mb-4">
            <div className="p-3 bg-brand-blue/10 rounded-2xl">
              <Activity className="h-6 w-6" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-navy/40">Booking Density</span>
          </div>
          <p className="text-4xl font-extrabold text-brand-navy font-serif italic mb-1">{analytics.totalCapacityPercent}%</p>
          <p className="text-[10px] font-medium text-brand-navy/50">Capacity util. rate</p>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-brand-tan/10 shadow-lg relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
          <div className="absolute top-0 right-0 w-24 h-24 bg-brand-navy/5 rounded-full -mr-12 -mt-12 group-hover:scale-125 transition-transform"></div>
          <div className="flex items-center gap-4 text-brand-navy mb-4">
            <div className="p-3 bg-brand-navy/10 rounded-2xl">
              <Award className="h-6 w-6 text-brand-navy" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-navy/40">Top Counselor</span>
          </div>
          <p className="text-xl font-bold text-brand-navy truncate mb-1">
            {analytics.topCounselor ? analytics.topCounselor.name : 'N/A'}
          </p>
          <p className="text-[10px] font-medium text-brand-navy/50">
            {analytics.topCounselor ? `${analytics.topCounselor.booked} sessions booked` : 'No active sessions'}
          </p>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-brand-tan/10 shadow-lg relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
          <div className="absolute top-0 right-0 w-24 h-24 bg-brand-tan/15 rounded-full -mr-12 -mt-12 group-hover:scale-125 transition-transform"></div>
          <div className="flex items-center gap-4 text-brand-green mb-4">
            <div className="p-3 bg-brand-tan/20 rounded-2xl">
              <Users className="h-6 w-6 text-brand-navy" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-navy/40">Open Channels</span>
          </div>
          <p className="text-4xl font-extrabold text-brand-navy font-serif italic mb-1">
            {activeData.counselors.length}
          </p>
          <p className="text-[10px] font-medium text-brand-navy/50">Active medical / wellness advisors</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Chart 1: Bar Chart of Bookings Per Counselor */}
        <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-brand-tan/10">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h4 className="text-xl font-bold text-brand-navy font-serif italic">Bookings per Counselor</h4>
              <p className="text-[10px] font-bold text-brand-navy/40 uppercase tracking-wider mt-1">Next 30 days active vs available</p>
            </div>
            <div className="p-2 bg-brand-bg/20 rounded-xl">
              <TrendingUp className="h-5 w-5 text-brand-navy/60" />
            </div>
          </div>

          <div className="h-72 w-full">
            {analytics.bookingsByCounselor.length === 0 ? (
              <div className="h-full flex items-center justify-center text-brand-navy/40 font-serif italic">
                Add counselors and slots to start recording data
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={analytics.bookingsByCounselor}
                  margin={{ top: 10, right: 10, left: -20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1EFEA" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    stroke={BRAND_COLORS.navy} 
                    fontSize={10}
                    fontWeight="bold"
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    stroke={BRAND_COLORS.navy}
                    fontSize={10} 
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: BRAND_COLORS.navy, 
                      borderRadius: '16px', 
                      color: BRAND_COLORS.white,
                      border: 'none',
                      fontSize: '12px',
                      fontFamily: 'Inter, sans-serif'
                    }} 
                  />
                  <Legend 
                    wrapperStyle={{ fontSize: '10px', paddingTop: '15px', fontWeight: 'bold' }} 
                  />
                  <Bar dataKey="booked" name="Booked Slots" fill={BRAND_COLORS.green} radius={[8, 8, 0, 0]} />
                  <Bar dataKey="available" name="Available Capacity" fill={BRAND_COLORS.blue} radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Chart 2: Timeline Area Chart */}
        <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-brand-tan/10">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h4 className="text-xl font-bold text-brand-navy font-serif italic">Weekly Schedule Allocation</h4>
              <p className="text-[10px] font-bold text-brand-navy/40 uppercase tracking-wider mt-1">Bookings pacing by week</p>
            </div>
            <div className="p-2 bg-brand-bg/20 rounded-xl">
              <Calendar className="h-5 w-5 text-brand-navy/60" />
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={analytics.chartTimeline}
                margin={{ top: 10, right: 10, left: -20, bottom: 5 }}
              >
                <defs>
                  <linearGradient id="colorBooked" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={BRAND_COLORS.green} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={BRAND_COLORS.green} stopOpacity={0.05}/>
                  </linearGradient>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={BRAND_COLORS.blue} stopOpacity={0.6}/>
                    <stop offset="95%" stopColor={BRAND_COLORS.blue} stopOpacity={0.01}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1EFEA" vertical={false} />
                <XAxis 
                  dataKey="weekLabel" 
                  stroke={BRAND_COLORS.navy} 
                  fontSize={10}
                  fontWeight="bold"
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  stroke={BRAND_COLORS.navy}
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: BRAND_COLORS.navy, 
                    borderRadius: '16px', 
                    color: BRAND_COLORS.white,
                    border: 'none',
                    fontSize: '12px',
                    fontFamily: 'Inter, sans-serif'
                  }} 
                />
                <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '15px', fontWeight: 'bold' }} />
                <Area type="monotone" dataKey="total" name="Total Slots Opened" stroke={BRAND_COLORS.blue} fillOpacity={1} fill="url(#colorTotal)" strokeWidth={2} />
                <Area type="monotone" dataKey="booked" name="Confirmed Bookings" stroke={BRAND_COLORS.green} fillOpacity={1} fill="url(#colorBooked)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Pie Chart of Service Breakdown */}
        <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-brand-tan/10 lg:col-span-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <div>
              <h4 className="text-xl font-bold text-brand-navy font-serif italic">Services Breakdown</h4>
              <p className="text-[10px] font-bold text-brand-navy/40 uppercase tracking-wider mt-1">Counseling interest topics & session pathways</p>
            </div>
            <div className="flex flex-wrap gap-4 text-[10px]">
              {analytics.serviceData.slice(0, 4).map((entry, index) => (
                <div key={entry.name} className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-brand-navy/70">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: PIE_COLORS[index % PIE_COLORS.length] }}></span>
                  <span>{entry.name.replace(/Session|Coaching|Counselling/g, '').trim()}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-5 gap-8 items-center">
            
            {/* Pie Chart Display */}
            <div className="md:col-span-2 h-64 w-full">
              {analytics.serviceData.length === 0 ? (
                <div className="h-full flex items-center justify-center text-brand-navy/40 font-serif italic">
                  No topics booked yet
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={analytics.serviceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={85}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {analytics.serviceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: BRAND_COLORS.navy, 
                        borderRadius: '16px', 
                        color: BRAND_COLORS.white,
                        border: 'none',
                        fontSize: '12px'
                      }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>

            {/* List breakdown */}
            <div className="md:col-span-3 space-y-4">
              <h5 className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40 border-b border-brand-tan/10 pb-3">Session Volume Breakdown</h5>
              <div className="grid sm:grid-cols-2 gap-4">
                {analytics.serviceData.slice(0, 6).map((item, index) => {
                  const percentage = analytics.totalBooked > 0 ? Math.round((item.value / analytics.totalBooked) * 100) : 0;
                  return (
                    <div key={item.name} className="p-4 bg-brand-bg/20 rounded-2xl border border-brand-tan/10 hover:border-brand-blue/20 transition-colors">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: PIE_COLORS[index % PIE_COLORS.length] }}></span>
                        <p className="font-bold text-brand-navy text-xs truncate" title={item.name}>{item.name}</p>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-serif italic font-extrabold text-brand-navy">{item.value}</span>
                        <span className="text-[10px] text-brand-navy/40 font-bold">{percentage}% of bookings</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminAnalytics;


import React, { useState, useMemo, useRef } from 'react';
import { BookingSlot } from '../types';
import HCaptcha from '@hcaptcha/react-hcaptcha';

const HCAPTCHA_SITEKEY = ((import.meta as any).env?.VITE_HCAPTCHA_SITEKEY as string) || '10000000-ffff-ffff-ffff-ffffffffffff';

interface BookingCalendarProps {
  slots: BookingSlot[];
  onBook: (slotId: string, name: string, email: string, sessionType: string, serviceInterested: string, captchaToken?: string) => void;
  isAdmin?: boolean;
  onAddSlot?: (date: string, time: string) => void;
  onRemoveSlot?: (slotId: string) => void;
}

const BookingCalendar: React.FC<BookingCalendarProps> = ({ 
  slots, 
  onBook, 
  isAdmin, 
  onAddSlot,
  onRemoveSlot
}) => {
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [showBookingModal, setShowBookingModal] = useState<string | null>(null);
  const [bookingName, setBookingName] = useState('');
  const [bookingEmail, setBookingEmail] = useState('');
  const [sessionType, setSessionType] = useState('Introductory Enquiry Session (15 Min - Complimentary)');
  const [serviceInterested, setServiceInterested] = useState('Individual Coaching');
  const [bookingCaptchaToken, setBookingCaptchaToken] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const bookingCaptchaRef = useRef<any>(null);

  const dates = useMemo(() => {
    const d = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const next = new Date(today);
      next.setDate(today.getDate() + i);
      d.push(next.toISOString().split('T')[0]);
    }
    return d;
  }, []);

  const filteredSlots = slots.filter(s => s.date === selectedDate);

  const handleBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingCaptchaToken) {
      setErrorMsg('Please verify that you are not a robot.');
      return;
    }
    setErrorMsg('');
    if (showBookingModal && bookingName && bookingEmail) {
      onBook(showBookingModal, bookingName, bookingEmail, sessionType, serviceInterested, bookingCaptchaToken);
      setShowBookingModal(null);
      setBookingName('');
      setBookingEmail('');
      setSessionType('Introductory Enquiry Session (15 Min - Complimentary)');
      setServiceInterested('Individual Coaching');
      setBookingCaptchaToken('');
      bookingCaptchaRef.current?.resetCaptcha();
    }
  };

  const formatTime = (time24: string) => {
    const [hours, minutes] = time24.split(':');
    const h = parseInt(hours);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    return `${h12}:${minutes} ${ampm}`;
  };

  return (
    <div className="bg-brand-tan/10 backdrop-blur-md rounded-[4rem] shadow-2xl overflow-hidden border border-brand-tan/20">
      <div className="p-12 bg-brand-navy text-white flex flex-col md:flex-row md:items-center justify-between gap-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="relative z-10">
            <h3 className="text-3xl font-bold mb-2 font-serif italic tracking-tight">
            {isAdmin ? 'Manage Availability' : 'Find Your Time'}
            </h3>
            <p className="text-brand-blue/90 text-lg font-serif">Pick a date to see open slots for your session.</p>
        </div>
        {isAdmin && (
            <div className="px-6 py-2 bg-brand-green/20 text-brand-green rounded-full text-[10px] font-black uppercase tracking-[0.3em] border border-brand-green/20 w-fit relative z-10 shadow-lg backdrop-blur-sm">
                Counselor Dashboard
            </div>
        )}
      </div>

      <div className="p-12">
        <div className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide">
          {dates.map(date => {
            const dateObj = new Date(date);
            const isSelected = selectedDate === date;
            return (
              <button
                key={date}
                onClick={() => setSelectedDate(date)}
                className={`flex-shrink-0 flex flex-col items-center justify-center w-24 h-28 rounded-3xl transition-all duration-500 ease-out ${
                  isSelected 
                  ? 'bg-brand-navy text-white shadow-2xl shadow-brand-navy/20 scale-105' 
                  : 'bg-brand-bg text-brand-navy/60 hover:bg-brand-tan/20 hover:text-brand-navy'
                }`}
              >
                <span className={`text-[9px] uppercase font-black mb-2 tracking-[0.2em] ${isSelected ? 'text-brand-blue' : 'text-brand-navy/40'}`}>
                    {dateObj.toLocaleDateString('en-US', { weekday: 'short' })}
                </span>
                <span className={`text-2xl font-bold font-serif italic ${isSelected ? 'text-white' : 'text-brand-navy'}`}>{dateObj.getDate()}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-12 space-y-8">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-brand-navy text-xl flex items-center gap-4 font-serif italic">
              <span className="w-3 h-3 rounded-full bg-brand-green shadow-lg animate-pulse"></span>
              Sessions for {new Date(selectedDate).toLocaleDateString(undefined, { dateStyle: 'long' })}
            </h4>
          </div>
          
          {filteredSlots.length === 0 ? (
            <div className="py-24 text-center text-brand-navy/30 border-2 border-dashed border-brand-tan/10 rounded-[4rem] bg-brand-bg/30">
              <div className="w-20 h-20 bg-brand-tan/20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-lg font-serif italic">No available slots for this day.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSlots.map(slot => (
                <div 
                  key={slot.id}
                  className={`p-8 rounded-[2.5rem] border-2 transition-all duration-500 flex flex-col justify-between group h-full ${
                    slot.isBooked 
                    ? 'bg-brand-bg border-brand-tan/5 opacity-50' 
                    : 'bg-brand-tan/20 backdrop-blur-sm border-brand-tan/20 hover:border-brand-blue hover:shadow-2xl hover:shadow-brand-blue/10 cursor-pointer'
                  }`}
                >
                  <div className="flex justify-between items-start mb-10">
                    <span className="text-2xl font-bold text-brand-navy tracking-tight font-serif italic">{slot.time}</span>
                    {slot.isBooked && (
                      <span className="text-[9px] bg-brand-tan/30 text-brand-navy/70 px-4 py-1.5 rounded-full font-black uppercase tracking-widest">Booked</span>
                    )}
                  </div>
                  {!slot.isBooked && !isAdmin && (
                    <button 
                      onClick={() => setShowBookingModal(slot.id)}
                      className="w-full py-4 bg-brand-navy text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-brand-green transition-all shadow-xl shadow-brand-navy/10 active:scale-95"
                    >
                      Book Session
                    </button>
                  )}
                  {isAdmin && (
                    <button 
                      onClick={() => onRemoveSlot?.(slot.id)}
                      className="w-full py-4 bg-rose-50 text-rose-600 text-[9px] font-black rounded-2xl hover:bg-rose-100 transition-colors uppercase tracking-[0.2em]"
                    >
                      Remove Slot
                    </button>
                  )}
                  {isAdmin && slot.isBooked && (
                     <div className="mt-6 p-5 bg-brand-bg rounded-2xl text-[11px] text-brand-navy/60 font-bold border border-brand-tan/5 space-y-2">
                        <p className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand-navy/20"></span> {slot.bookedBy}</p>
                        <p className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand-navy/20"></span> {slot.bookedEmail}</p>
                        {slot.sessionType && (
                          <div className="mt-2 pt-2 border-t border-brand-tan/20">
                            <span className="text-[9px] bg-brand-green/20 text-brand-green px-2 py-0.5 rounded uppercase tracking-wider font-extrabold block w-fit mb-1">Type</span>
                            <p className="text-brand-navy font-semibold">{slot.sessionType}</p>
                          </div>
                        )}
                        {slot.serviceInterested && (
                          <div className="mt-2 pt-2 border-t border-brand-tan/20">
                            <span className="text-[9px] bg-brand-blue/20 text-brand-blue px-2 py-0.5 rounded uppercase tracking-wider font-extrabold block w-fit mb-1">Interest</span>
                            <p className="text-brand-navy font-semibold">{slot.serviceInterested}</p>
                          </div>
                        )}
                     </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        
        {isAdmin && (
          <div className="mt-20 pt-16 border-t border-brand-tan/10">
            <h4 className="font-black text-brand-navy/40 mb-8 uppercase tracking-[0.3em] text-[10px] ml-2">Add New Availability</h4>
            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl">
              <div className="flex-1 relative">
                <input 
                    type="time" 
                    id="newTime"
                    className="w-full p-6 border border-brand-tan/10 rounded-[2rem] focus:ring-4 focus:ring-brand-blue/10 focus:bg-white outline-none font-bold text-brand-navy bg-brand-bg/50 transition-all"
                />
              </div>
              <button 
                onClick={() => {
                  const input = document.getElementById('newTime') as HTMLInputElement;
                  if (input.value) {
                    onAddSlot?.(selectedDate, formatTime(input.value));
                    input.value = '';
                  }
                }}
                className="px-10 py-6 bg-brand-navy text-white rounded-[2rem] font-black uppercase tracking-[0.3em] text-[10px] hover:bg-brand-green transition-all shadow-xl shadow-brand-navy/10 active:scale-95"
              >
                Add Time Slot
              </button>
            </div>
          </div>
        )}
      </div>

      {showBookingModal && (
        <div className="fixed inset-0 bg-brand-navy/90 backdrop-blur-xl z-[60] flex items-center justify-center p-4">
          <div className="bg-brand-bg rounded-[2.5rem] w-full max-w-lg shadow-2xl animate-in fade-in zoom-in duration-500 border border-brand-tan/10 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-8 bg-brand-tan/20 border-b border-brand-tan/5 text-center relative overflow-hidden shrink-0">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-brand-green"></div>
              <h3 className="text-3xl font-bold text-brand-navy tracking-tight font-serif italic mb-2">Complete Booking</h3>
              <p className="text-brand-navy/50 text-base font-serif">
                Session at <span className="text-brand-navy font-bold">{slots.find(s => s.id === showBookingModal)?.time}</span> on {new Date(selectedDate).toLocaleDateString(undefined, { dateStyle: 'long' })}
              </p>
            </div>
            <form onSubmit={handleBookSubmit} className="p-8 space-y-6 overflow-y-auto">
              <div className="space-y-3">
                <label className="block text-[10px] font-black uppercase tracking-[0.25em] text-brand-navy/70 ml-4">Full Name</label>
                <input 
                  required
                  type="text" 
                  value={bookingName}
                  onChange={(e) => setBookingName(e.target.value)}
                  className="w-full p-4.5 bg-white border border-brand-tan/80 rounded-2xl shadow-sm focus:ring-4 focus:ring-brand-blue/10 focus:border-brand-navy focus:bg-white outline-none font-semibold text-brand-navy placeholder:text-brand-navy/35 transition-all text-sm"
                  placeholder="e.g. Jane Smith"
                />
              </div>
              <div className="space-y-3">
                <label className="block text-[10px] font-black uppercase tracking-[0.25em] text-brand-navy/70 ml-4">Email Address</label>
                <input 
                  required
                  type="email" 
                  value={bookingEmail}
                  onChange={(e) => setBookingEmail(e.target.value)}
                  className="w-full p-4.5 bg-white border border-brand-tan/80 rounded-2xl shadow-sm focus:ring-4 focus:ring-brand-blue/10 focus:border-brand-navy focus:bg-white outline-none font-semibold text-brand-navy placeholder:text-brand-navy/35 transition-all text-sm"
                  placeholder="jane@example.com"
                />
              </div>
              <div className="space-y-3">
                <label className="block text-[10px] font-black uppercase tracking-[0.25em] text-brand-navy/70 ml-4">Session Type / Goal</label>
                <div className="relative">
                  <select 
                    required
                    value={sessionType}
                    onChange={(e) => setSessionType(e.target.value)}
                    className="w-full p-4.5 bg-white border border-brand-tan/80 rounded-2xl shadow-sm focus:ring-4 focus:ring-brand-blue/10 focus:border-brand-navy focus:bg-white outline-none font-bold text-brand-navy transition-all appearance-none cursor-pointer pr-10 text-sm"
                  >
                    <option value="Introductory Enquiry Session (15 Min - Complimentary)">
                      Introductory Enquiry Session (15 Min - Complimentary)
                    </option>
                    <option value="Individual Coaching Session (60 Min)">
                      Individual Coaching Session (60 Min)
                    </option>
                    <option value="Individual Counselling Session (60 Min)">
                      Individual Counselling Session (60 Min)
                    </option>
                    <option value="Couple Counselling Session (90 Min)">
                      Couple Counselling Session (90 Min)
                    </option>
                    <option value="Custom Program / Organisation Inquiry (15 Min - Complimentary)">
                      Custom Program / Organisation Inquiry (15 Min - Complimentary)
                    </option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-brand-navy/60">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </div>
                </div>
                <div className="px-4 py-1.5 bg-brand-green/15 text-brand-green text-[10px] font-black uppercase tracking-wider rounded-xl w-fit">
                  {sessionType.includes('Complimentary') ? '✨ Complimentary Discovery Session (Strictly 15 min)' : 'Standard rates apply'}
                </div>
              </div>
              <div className="space-y-3">
                <label className="block text-[10px] font-black uppercase tracking-[0.25em] text-brand-navy/70 ml-4">Service of Interest</label>
                <div className="relative">
                  <select 
                    required
                    value={serviceInterested}
                    onChange={(e) => setServiceInterested(e.target.value)}
                    className="w-full p-4.5 bg-white border border-brand-tan/80 rounded-2xl shadow-sm focus:ring-4 focus:ring-brand-blue/10 focus:border-brand-navy focus:bg-white outline-none font-bold text-brand-navy transition-all appearance-none cursor-pointer pr-10 text-sm"
                  >
                    <option value="Individual Coaching">Individual Coaching</option>
                    <option value="Group Coaching">Group Coaching</option>
                    <option value="Individual Counselling">Individual Counselling</option>
                    <option value="Couple Counselling">Couple Counselling</option>
                    <option value="Experiential Workshops">Experiential Workshops</option>
                    <option value="Team & Organisational Programmes">Team & Organisational Programmes</option>
                    <option value="Custom Programmes">Custom Programmes</option>
                    <option value="Clinical Supervision">Clinical Supervision</option>
                    <option value="Other / General Inquiry">Other / General Inquiry</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-brand-navy/60">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="bg-brand-blue/5 p-6 rounded-3xl border border-brand-blue/10 text-[11px] font-medium text-brand-navy/70 leading-relaxed shadow-sm">
                <div className="flex gap-4">
                    <div className="w-8 h-8 bg-brand-blue/20 rounded-lg flex items-center justify-center shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-brand-blue" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <span><strong>Friendly reminder:</strong> Any session cancellations or rescheduling made with less than 24 hours' notice will incur a charge of the full fee and is non-refundable. We will send an email reminder to you 24 hours before your session to help you stay on track.</span>
                </div>
              </div>

              {/* hCaptcha Verification */}
              <div className="flex flex-col items-center justify-center my-4 space-y-3 shrink-0">
                <HCaptcha
                  id="booking-captcha"
                  ref={bookingCaptchaRef}
                  sitekey={HCAPTCHA_SITEKEY}
                  onVerify={(token) => {
                    setBookingCaptchaToken(token);
                    setErrorMsg('');
                  }}
                  onExpire={() => setBookingCaptchaToken('')}
                />
                {errorMsg && (
                  <p className="text-rose-600 text-[10px] font-black uppercase tracking-wider bg-rose-50 border border-rose-100 px-4 py-2 rounded-xl text-center">
                    {errorMsg}
                  </p>
                )}
              </div>

              <div className="flex gap-4 pt-4 shrink-0">
                <button 
                  type="button"
                  onClick={() => {
                    setShowBookingModal(null);
                    setBookingCaptchaToken('');
                    setErrorMsg('');
                    bookingCaptchaRef.current?.resetCaptcha();
                  }}
                  className="flex-1 py-4 text-brand-navy/40 font-black uppercase tracking-[0.2em] text-[10px] hover:text-brand-navy transition-all"
                >
                  Go Back
                </button>
                <button 
                  type="submit"
                  className="flex-[2] py-4 bg-brand-navy text-white font-black uppercase tracking-[0.3em] text-[11px] rounded-full hover:bg-brand-green shadow-2xl shadow-brand-navy/20 active:scale-95 transition-all"
                >
                  Confirm Slot
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingCalendar;

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';
import { Button } from '@/src/components/ui/Button';
import { MapPin, Briefcase, Star, MessageSquare, Calendar, CheckCircle2, Award, Globe, Shield, BrainCircuit, Users, Search, ArrowLeft, MoreHorizontal, Share2, Loader2 } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { cn } from '@/src/utils/cn';

interface Consultant {
  consultant_id: number;
  name: string;
  title: string;
  domain: string;
  industry_expertise: string;
  strategic_specialization: string;
  geographies: string; // JSON string from backend
  years_experience: number;
  projects: string; // JSON string from backend
  ai_rating: number;
  availability: string;
  transformation_specialty: string;
  profile_photo: string;
  bio: string;
  hourly_rate: number;
}

export default function ConsultantProfile() {
  const { id } = useParams();
  const [consultant, setConsultant] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState<'schedule' | 'payment' | 'success'>('schedule');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const fetchConsultant = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/consultants/${id}`);
        if (response.ok) {
          const data = await response.json();
          
          // Parse JSON strings from SQLite
          const parsedData = {
            ...data,
            geographies: JSON.parse(data.geographies),
            projects: JSON.parse(data.projects),
            specialties: data.strategic_specialization.split(',').map((s: string) => s.trim()),
            industries: data.industry_expertise.split(',').map((i: string) => i.trim())
          };
          
          setConsultant(parsedData);
        }
      } catch (error) {
        console.error('Failed to fetch consultant:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchConsultant();
  }, [id]);

  const handleBooking = async () => {
    setIsProcessing(true);
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          enterprise_id: 1, // Mock enterprise ID
          consultant_id: consultant.consultant_id,
          scheduled_at: `${selectedDate}T${selectedTime}:00`,
          duration_hours: 1,
          title: `Advisory Session with ${consultant.name}`
        })
      });

      if (response.ok) {
        setBookingStep('success');
      }
    } catch (error) {
      console.error('Booking failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <Loader2 className="h-8 w-8 text-interaction-primary animate-spin" />
        <p className="text-text-muted font-medium">Loading profile...</p>
      </div>
    );
  }

  if (!consultant) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-bold text-text-main">Consultant not found</h2>
        <Link to="/network" className="text-interaction-primary hover:underline mt-4 inline-block">Back to Network</Link>
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-12 relative">
      {/* Booking Modal */}
      <AnimatePresence>
        {isBookingOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsBookingOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-border-light flex items-center justify-between">
                <h3 className="text-lg font-bold text-text-main">
                  {bookingStep === 'schedule' && 'Schedule Advisory Session'}
                  {bookingStep === 'payment' && 'Confirm & Pay'}
                  {bookingStep === 'success' && 'Booking Confirmed'}
                </h3>
                <button onClick={() => setIsBookingOpen(false)} className="text-text-muted hover:text-text-main">
                  <MoreHorizontal className="h-5 w-5" />
                </button>
              </div>

              <div className="p-6">
                {bookingStep === 'schedule' && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-text-muted uppercase tracking-widest">Select Date</label>
                      <input 
                        type="date" 
                        className="w-full p-3 rounded-xl border border-border-light focus:ring-2 focus:ring-interaction-primary/20 focus:border-interaction-primary outline-none transition-all"
                        onChange={(e) => setSelectedDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-text-muted uppercase tracking-widest">Select Time</label>
                      <select 
                        className="w-full p-3 rounded-xl border border-border-light focus:ring-2 focus:ring-interaction-primary/20 focus:border-interaction-primary outline-none transition-all"
                        onChange={(e) => setSelectedTime(e.target.value)}
                      >
                        <option value="">Choose a slot...</option>
                        <option value="09:00">09:00 AM</option>
                        <option value="10:00">10:00 AM</option>
                        <option value="11:00">11:00 AM</option>
                        <option value="14:00">02:00 PM</option>
                        <option value="15:00">03:00 PM</option>
                        <option value="16:00">04:00 PM</option>
                      </select>
                    </div>
                    <Button 
                      disabled={!selectedDate || !selectedTime}
                      onClick={() => setBookingStep('payment')}
                      className="w-full h-12 bg-interaction-primary text-white font-bold rounded-xl mt-4"
                    >
                      Continue to Payment
                    </Button>
                  </div>
                )}

                {bookingStep === 'payment' && (
                  <div className="space-y-6">
                    <div className="p-4 bg-gray-50 rounded-xl border border-border-light space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-text-muted">Advisory Session (1 hr)</span>
                        <span className="font-bold text-text-main">${consultant.hourly_rate}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-text-muted">Platform Fee (15%)</span>
                        <span className="font-bold text-text-main">${(consultant.hourly_rate * 0.15).toFixed(2)}</span>
                      </div>
                      <div className="pt-3 border-t border-border-light flex justify-between items-center">
                        <span className="font-bold text-text-main">Total Amount</span>
                        <span className="text-xl font-bold text-interaction-primary">${(consultant.hourly_rate * 1.15).toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="p-4 rounded-xl border border-interaction-primary bg-interaction-primary/5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Shield className="h-5 w-5 text-interaction-primary" />
                          <div>
                            <p className="text-xs font-bold text-text-main">Enterprise Billing</p>
                            <p className="text-[10px] text-text-muted">Matrix Global • •••• 4242</p>
                          </div>
                        </div>
                        <CheckCircle2 className="h-4 w-4 text-interaction-primary" />
                      </div>
                    </div>

                    <Button 
                      onClick={handleBooking}
                      disabled={isProcessing}
                      className="w-full h-12 bg-interaction-primary text-white font-bold rounded-xl"
                    >
                      {isProcessing ? <Loader2 className="h-5 w-5 animate-spin" /> : `Pay & Confirm Booking`}
                    </Button>
                  </div>
                )}

                {bookingStep === 'success' && (
                  <div className="text-center py-6 space-y-4">
                    <div className="h-20 w-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="h-10 w-10 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-text-main">Session Booked!</h4>
                      <p className="text-sm text-text-muted mt-2">
                        Your advisory session with {consultant.name} is confirmed for {selectedDate} at {selectedTime}.
                      </p>
                    </div>
                    <div className="pt-4">
                      <Button 
                        onClick={() => setIsBookingOpen(false)}
                        className="w-full h-12 bg-secondary-bg text-text-main border border-border-light font-bold rounded-xl"
                      >
                        Close
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Navigation & Actions */}
      <div className="flex items-center justify-between">
        <Link to="/network" className="flex items-center text-sm font-medium text-text-muted hover:text-interaction-primary transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Network
        </Link>
        <div className="flex items-center gap-2">
          <Button variant="secondary" className="h-9 px-3 bg-white border-border-light">
            <Share2 className="h-4 w-4" />
          </Button>
          <Button variant="secondary" className="h-9 px-3 bg-white border-border-light">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Profile Header Card */}
      <Card className="border-border-light bg-white shadow-sm overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-interaction-primary/10 to-ai-cyan/10 relative">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        </div>
        <CardContent className="p-5 pt-0 relative">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-end -mt-12 mb-4">
            <div className="relative">
              <img 
                src={consultant.profile_photo || `https://picsum.photos/seed/expert${consultant.consultant_id}/200/200`} 
                alt={consultant.name} 
                className="w-32 h-32 rounded-2xl object-cover border-4 border-white shadow-lg"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-alert-opportunity border-2 border-white flex items-center justify-center shadow-md">
                <CheckCircle2 className="h-3 w-3 text-white" />
              </div>
            </div>
            <div className="flex-1 pb-1">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl font-bold text-text-main">{consultant.name}</h1>
                <Badge variant="secondary" className="bg-interaction-primary/10 text-interaction-primary border-none text-[10px] px-2 py-0">
                  Verified Expert
                </Badge>
              </div>
              <p className="text-sm font-medium text-interaction-primary mb-3">{consultant.title}</p>
              <div className="flex flex-wrap gap-4 text-xs text-text-muted">
                <div className="flex items-center">
                  <Globe className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
                  {consultant.geographies.join(', ')}
                </div>
                <div className="flex items-center">
                  <Briefcase className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
                  {consultant.years_experience}+ Years Exp
                </div>
                <div className="flex items-center text-amber-500">
                  <Star className="h-3.5 w-3.5 mr-1.5 fill-current" />
                  {consultant.ai_rating} AI Rating
                </div>
              </div>
            </div>
            <div className="flex gap-2 w-full md:w-auto pb-1">
              <Button 
                onClick={() => {
                  setBookingStep('schedule');
                  setIsBookingOpen(true);
                }}
                variant="secondary" 
                className="flex-1 md:flex-none bg-white h-10 px-6 text-sm border-border-light font-bold"
              >
                <Calendar className="mr-2 h-4 w-4" />
                Book Paid Session
              </Button>
              <Button variant="primary" className="flex-1 md:flex-none h-10 px-6 text-sm bg-interaction-primary text-white border-none font-bold">
                Request Consultation
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-border-light bg-white shadow-sm">
            <CardHeader className="py-4 px-5 border-b border-border-light">
              <CardTitle className="text-base font-bold">Professional Background</CardTitle>
            </CardHeader>
            <CardContent className="p-5">
              <div className="text-sm text-text-muted leading-relaxed space-y-4">
                <p>
                  {consultant.bio || `${consultant.name} is a strategic advisor specializing in ${consultant.industry_expertise} across the ${consultant.region} region. With over ${consultant.years_experience} years of experience, they support organizations navigating complex strategic landscapes.`}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border-light bg-white shadow-sm">
            <CardHeader className="py-4 px-5 border-b border-border-light">
              <CardTitle className="text-base font-bold">Expertise & Strategic Domains</CardTitle>
            </CardHeader>
            <CardContent className="p-5">
              <div className="space-y-6">
                <div>
                  <h4 className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-3">Industry Focus</h4>
                  <div className="flex flex-wrap gap-2">
                    {consultant.industries.map((industry: string) => (
                      <Badge key={industry} variant="secondary" className="bg-secondary-bg text-text-main py-1 px-3 text-xs font-medium border-border-light">
                        {industry}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-3">Strategic Specialization</h4>
                  <div className="flex flex-wrap gap-2">
                    {consultant.specialties.map((skill: string) => (
                      <Badge key={skill} variant="secondary" className="bg-interaction-primary/5 text-interaction-primary py-1 px-3 text-xs font-medium border-interaction-primary/20">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border-light bg-white shadow-sm">
            <CardHeader className="py-4 px-5 border-b border-border-light">
              <CardTitle className="text-base font-bold">Key Projects</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border-light">
                {consultant.projects.map((project: string, i: number) => (
                  <div key={i} className="p-5">
                    <h3 className="font-bold text-text-main text-sm mb-1">{project}</h3>
                    <p className="text-xs font-medium text-interaction-primary mb-3">Strategic Transformation Initiative</p>
                    <p className="text-text-muted text-xs mb-4 leading-relaxed">
                      High-impact project involving {consultant.domain.toLowerCase()} and {consultant.transformation_specialty.toLowerCase()} for global enterprise clients.
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Sidebar */}
        <div className="space-y-6">
          <Card className="border-border-light bg-white shadow-sm">
            <CardHeader className="py-4 px-5 border-b border-border-light">
              <CardTitle className="text-base font-bold">Advisory Details</CardTitle>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-border-light">
                <span className="text-xs text-text-muted">Hourly Rate</span>
                <span className="text-sm font-bold text-interaction-primary">${consultant.hourly_rate}/hr</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-gray-50 rounded-lg border border-border-light flex-shrink-0">
                  <Award className="w-4 h-4 text-interaction-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-text-main text-xs mb-0.5">MBA, INSEAD</h4>
                  <p className="text-[10px] text-text-muted">Singapore Campus, 2015</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-gray-50 rounded-lg border border-border-light flex-shrink-0">
                  <Globe className="w-4 h-4 text-interaction-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-text-main text-xs mb-0.5">Languages</h4>
                  <p className="text-[10px] text-text-muted">English (Native), Mandarin (Fluent)</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border-light bg-white shadow-sm">
            <CardHeader className="py-4 px-5 border-b border-border-light">
              <CardTitle className="text-base font-bold">Availability</CardTitle>
            </CardHeader>
            <CardContent className="p-5">
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-border-light">
                  <span className="text-xs text-text-muted">Current Status</span>
                  <Badge className={cn(
                    "border-none text-[10px] px-2 py-0",
                    consultant.availability === 'Available' ? "bg-emerald-100 text-emerald-700" : 
                    consultant.availability === 'Limited' ? "bg-amber-100 text-amber-700" : "bg-rose-100 text-rose-700"
                  )}>
                    {consultant.availability}
                  </Badge>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-border-light">
                  <span className="text-xs text-text-muted">Response Time</span>
                  <span className="text-xs font-bold text-text-main">&lt; 12 hours</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-text-muted">Strategic Rating</span>
                  <span className="text-xs font-bold text-interaction-primary">{consultant.ai_rating}/5.0</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border-light bg-interaction-primary text-white shadow-md">
            <CardContent className="p-5 text-center">
              <h3 className="font-bold mb-2">Ready to collaborate?</h3>
              <p className="text-xs text-white/80 mb-6">
                Discuss your strategic challenges with {consultant.name.split(' ')[0]} to see if there's a fit.
              </p>
              <Button 
                onClick={() => {
                  setBookingStep('schedule');
                  setIsBookingOpen(true);
                }}
                className="w-full bg-white text-interaction-primary hover:bg-white/90 border-none h-10 text-sm font-bold"
              >
                Book Paid Session
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

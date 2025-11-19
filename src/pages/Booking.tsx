import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useForm } from '@formspree/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  Loader2, 
  CheckCircle, 
  XCircle, 
  Clock,
  Gamepad2,
  Coffee,
  Calculator,
  AlertTriangle,
  Calendar,
  Plus,
  Minus,
  User,
  Mail,
  Phone,
  MapPin,
  Info,
  ChevronRight,
  Star,
  ArrowLeft,
  ArrowRight,
  X
} from 'lucide-react';
import { GAMES } from '@/constants/data';
import { SNACKS } from '@/constants/data';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useToast } from '@/hooks/use-toast';

import valoImage from '@/assets/valo.png';
import fc24 from '@/assets/fc24.png';
import gta from '@/assets/gta.png';
import csgo from '@/assets/csgo.png';
import fort from '@/assets/fort.png';
import cod from '@/assets/cod.png';
import apex from '@/assets/apex.png';
import mine from '@/assets/mine.png';
import mortal from '@/assets/mortal.png';
import halo from '@/assets/halo.png';
import league from '@/assets/league.png';
import rocket from '@/assets/rock.png';

// Formspree endpoint - REPLACE WITH YOUR ACTUAL FORM ID
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xwpakqdg';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  gameSlugs: string[];
  decideAtVenue: boolean;
  date: string;
  timeSlot: string;
  duration: number;
  snacks: Record<string, number>;
  notes: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  gameSlugs?: string;
  date?: string;
  timeSlot?: string;
  duration?: string;
}

const Booking = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [state, handleFormspreeSubmit] = useForm("xwpakqdg");
  
  // Form state
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    gameSlugs: [],
    decideAtVenue: false,
    date: '',
    timeSlot: '',
    duration: 1,
    snacks: {},
    notes: ''
  });

  // UI state
  const [errors, setErrors] = useState<FormErrors>({});
  const [activeTab, setActiveTab] = useState('personal');

  // Preselected game from URL parameter
  const preselectedGameSlug = searchParams.get('game');
  
  // Generate time slots for a day
  const generateTimeSlots = () => {
    const slots = [];
    const startHour = 9; // 9 AM
    const endHour = 22; // 10 PM
    
    for (let hour = startHour; hour <= endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const displayTime = hour <= 12 
          ? `${hour === 0 ? 12 : hour}:${minute.toString().padStart(2, '0')} ${hour === 12 ? 'PM' : 'AM'}`
          : `${hour - 12}:${minute.toString().padStart(2, '0')} PM`;
        
        slots.push({
          id: time,
          label: displayTime,
          value: time,
          available: Math.random() > 0.2 // Randomly make some slots unavailable
        });
      }
    }
    
    return slots;
  };

  const timeSlots = useMemo(() => generateTimeSlots(), []);

  // Duration options
  const durationOptions = [
    { label: '1 hour', value: 1 },
    { label: '2 hours', value: 2 },
    { label: '3 hours', value: 3 },
    { label: '4 hours', value: 4 }
  ];

  // Get selected games details
  const selectedGames = useMemo(() => {
    return GAMES.filter(game => formData.gameSlugs.includes(game.slug));
  }, [formData.gameSlugs]);

  // Fixed hourly rate
  const HOURLY_RATE = 99;

  // Get game image based on slug
  const getGameImage = (slug: string) => {
    const imageMap: Record<string, string> = {
      'valorant': valoImage,
      'fifa24': fc24,
      'gta5': gta,
      'csgo': csgo,
      'fortnite': fort,
      'cod': cod,
      'apex': apex,
      'minecraft': mine,
      'halo': halo,
      'league': league,
      'rocket': rocket,
      'mortal': mortal,
    };
    
    return imageMap[slug] || '/images/thunder-gaming-zone.jpg';
  };

  // Calculate total price
  const totalPrice = useMemo(() => {
    let total = 0;
    
    // Game price - fixed rate per hour
    total += HOURLY_RATE * formData.duration;
    
    // Snacks price
    Object.entries(formData.snacks).forEach(([snackId, quantity]) => {
      const snack = SNACKS.find(s => s.id === snackId);
      if (snack && quantity > 0) {
        total += snack.price * quantity;
      }
    });
    
    return total;
  }, [formData.duration, formData.snacks]);

  // Initialize preselected game
  useEffect(() => {
    if (preselectedGameSlug) {
      const game = GAMES.find(g => g.slug === preselectedGameSlug);
      if (game) {
        setFormData(prev => ({ 
          ...prev, 
          gameSlugs: prev.gameSlugs.includes(game.slug) 
            ? prev.gameSlugs 
            : [...prev.gameSlugs, game.slug]
        }));
      }
    }
  }, [preselectedGameSlug]);

  // Set minimum date to today
  const today = new Date().toISOString().split('T')[0];

  // Handle form field changes
  const handleInputChange = (field: keyof FormData, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  // Handle game selection
  const handleGameSelect = (value: string) => {
    if (value === 'decide-at-venue') {
      setFormData(prev => ({
        ...prev,
        decideAtVenue: true,
        gameSlugs: []
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        decideAtVenue: false,
        gameSlugs: prev.gameSlugs.includes(value) 
          ? prev.gameSlugs 
          : [...prev.gameSlugs, value]
      }));
    }
    if (errors.gameSlugs) {
      setErrors(prev => ({ ...prev, gameSlugs: undefined }));
    }
  };

  // Remove game from selection
  const removeGame = (gameSlug: string) => {
    setFormData(prev => ({
      ...prev,
      gameSlugs: prev.gameSlugs.filter(slug => slug !== gameSlug)
    }));
  };

  // Handle snack selection
  const handleSnackChange = (snackId: string, quantity: number) => {
    setFormData(prev => ({
      ...prev,
      snacks: {
        ...prev.snacks,
        [snackId]: Math.max(0, quantity)
      }
    }));
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (formData.phone && !/^[+]?[\d\s\-()]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.decideAtVenue && formData.gameSlugs.length === 0) {
      newErrors.gameSlugs = 'Please select at least one game or choose to decide at venue';
    }

    if (!formData.date) {
      newErrors.date = 'Please select a date';
    }

    if (!formData.timeSlot) {
      newErrors.timeSlot = 'Please select a time slot';
    }

    if (!formData.duration) {
      newErrors.duration = 'Please select a duration';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      const firstErrorField = Object.keys(errors)[0] as keyof FormData;
      const element = document.getElementById(firstErrorField);
      if (element) {
        element.focus();
      }
      return;
    }

    // Submit to Formspree
    await handleFormspreeSubmit(e);
  };

  // Handle success/error states from Formspree
  useEffect(() => {
    if (state.succeeded) {
      toast({
        title: "Booking Confirmed!",
        description: `A confirmation email will be sent to ${formData.email}`,
        variant: "default",
      });
      
      // Redirect to home after 2 seconds
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }

    if (state.errors) {
      toast({
        title: "Submission Failed",
        description: "Please try again or contact us directly",
        variant: "destructive",
      });
    }
  }, [state.succeeded, state.errors, navigate]);
  
  // Get snack quantity
  const getSnackQuantity = (snackId: string): number => {
    return formData.snacks[snackId] || 0;
  };

  // Calculate snacks subtotal
  const snacksSubtotal = useMemo(() => {
    return Object.entries(formData.snacks).reduce((total, [snackId, quantity]) => {
      const snack = SNACKS.find(s => s.id === snackId);
      if (snack && quantity > 0) {
        return total + (snack.price * quantity);
      }
      return total;
    }, 0);
  }, [formData.snacks]);

  // Tab navigation for mobile
  const tabs = [
    { id: 'personal', label: 'Personal', icon: User },
    { id: 'game', label: 'Game', icon: Gamepad2 },
    { id: 'schedule', label: 'Schedule', icon: Calendar },
    { id: 'snacks', label: 'Snacks', icon: Coffee }
  ];

  const currentTabIndex = tabs.findIndex(tab => tab.id === activeTab);
  const canGoNext = currentTabIndex < tabs.length - 1;
  const canGoPrevious = currentTabIndex > 0;

  const handleNextTab = () => {
    if (canGoNext) {
      setActiveTab(tabs[currentTabIndex + 1].id);
    }
  };

  const handlePreviousTab = () => {
    if (canGoPrevious) {
      setActiveTab(tabs[currentTabIndex - 1].id);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <Navbar />

      <section className="pt-20 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 tracking-tight">
              Book Your Gaming Session
            </h1>
            <p className="text-base sm:text-lg text-gray-400">
              Reserve your spot and pre-order snacks for ultimate gaming experience
            </p>
          </div>

          {state.succeeded && (
            <Alert className="mb-6 bg-green-900/20 border-green-600/30 text-green-400">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                Booking confirmed! A confirmation email will be sent to {formData.email}.
              </AlertDescription>
            </Alert>
          )}

          {state.errors && (
            <Alert className="mb-6 bg-red-900/20 border-red-600/30 text-red-400">
              <XCircle className="h-4 w-4" />
              <AlertDescription>
                Submission failed. Please try again or contact us directly.
              </AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
            {/* Main Form - Takes 2 columns on xl screens */}
            <div className="xl:col-span-2">
              <Card className="bg-gray-900/80 border border-red-900/20 shadow-xl">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl text-white">Booking Details</CardTitle>
                  <CardDescription className="text-gray-400">
                    Fill in your information and preferences
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pb-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Hidden fields for Formspree - FIXED: Added missing fields */}
                    <input type="hidden" name="fullName" value={formData.fullName} />
                    <input type="hidden" name="email" value={formData.email} />
                    <input type="hidden" name="phone" value={formData.phone} />
                    <input type="hidden" name="games" value={
                      formData.decideAtVenue 
                        ? "I'll decide at venue" 
                        : selectedGames.map(g => g.title).join(', ') || 'Not decided'
                    } />
                    <input type="hidden" name="duration" value={formData.duration} />
                    <input type="hidden" name="date" value={formData.date} />
                    <input type="hidden" name="timeSlot" value={formData.timeSlot} />
                    <input type="hidden" name="totalPrice" value={totalPrice} />
                    <input type="hidden" name="snacks" value={
                      Object.entries(formData.snacks)
                        .filter(([_, qty]) => qty > 0)
                        .map(([id, qty]) => {
                          const snack = SNACKS.find(s => s.id === id);
                          return `${snack?.name} x${qty}`;
                        }).join(', ') || 'None'
                    } />
                    <input type="hidden" name="notes" value={formData.notes} />
                    
                    {/* Mobile Tab Navigation */}
                    <div className="flex items-center justify-between mb-4 lg:hidden">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={handlePreviousTab}
                        disabled={!canGoPrevious}
                        className="text-gray-400 hover:text-white"
                      >
                        <ArrowLeft className="h-4 w-4 mr-1" />
                        Previous
                      </Button>
                      <div className="flex items-center space-x-1">
                        {tabs.map((tab, index) => (
                          <div
                            key={tab.id}
                            className={`h-2 w-2 rounded-full ${
                              index <= currentTabIndex ? 'bg-red-600' : 'bg-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={handleNextTab}
                        disabled={!canGoNext}
                        className="text-gray-400 hover:text-white"
                      >
                        Next
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>

                    {/* Desktop Tab Navigation */}
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full hidden lg:block">
                      <TabsList className="grid w-full grid-cols-4 bg-gray-800 border border-gray-700 h-auto p-1">
                        {tabs.map((tab) => (
                          <TabsTrigger
                            key={tab.id}
                            value={tab.id}
                            className="data-[state=active]:bg-red-600 data-[state=active]:text-white py-2 px-3 text-sm"
                          >
                            {tab.label}
                          </TabsTrigger>
                        ))}
                      </TabsList>
                    </Tabs>
                    
                    {/* Tab Content */}
                    <div className="mt-6">
                      {/* Personal Information Tab */}
                      {activeTab === 'personal' && (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-white flex items-center">
                              <User className="mr-2 h-5 w-5 text-red-500" />
                              Personal Information
                            </h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="fullName" className="text-white flex items-center">
                                  Full Name <span className="text-red-500 ml-1">*</span>
                                </Label>
                                <div className="relative">
                                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                  <Input
                                    id="fullName"
                                    name="fullName"
                                    type="text"
                                    value={formData.fullName}
                                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                                    className="bg-gray-800 border-gray-700 text-white pl-10 h-12 text-base"
                                    placeholder="John Doe"
                                    aria-required="true"
                                    aria-invalid={!!errors.fullName}
                                  />
                                </div>
                                {errors.fullName && (
                                  <p className="text-red-500 text-sm" role="alert">
                                    {errors.fullName}
                                  </p>
                                )}
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="email" className="text-white flex items-center">
                                  Email <span className="text-red-500 ml-1">*</span>
                                </Label>
                                <div className="relative">
                                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                  <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                    className="bg-gray-800 border-gray-700 text-white pl-10 h-12 text-base"
                                    placeholder="john@example.com"
                                    aria-required="true"
                                    aria-invalid={!!errors.email}
                                  />
                                </div>
                                {errors.email && (
                                  <p className="text-red-500 text-sm" role="alert">
                                    {errors.email}
                                  </p>
                                )}
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="phone" className="text-white flex items-center">
                                Phone
                              </Label>
                              <div className="relative">
                                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                  id="phone"
                                  name="phone"
                                  type="tel"
                                  value={formData.phone}
                                  onChange={(e) => handleInputChange('phone', e.target.value)}
                                  className="bg-gray-800 border-gray-700 text-white pl-10 h-12 text-base"
                                  placeholder="+91 1234567890"
                                  aria-invalid={!!errors.phone}
                                />
                              </div>
                              {errors.phone && (
                                <p className="text-red-500 text-sm" role="alert">
                                  {errors.phone}
                                </p>
                              )}
                            </div>
                          </div>
                          
                          {/* Mobile Navigation Buttons */}
                          <div className="flex justify-between lg:hidden">
                            <Button
                              type="button"
                              variant="outline"
                              onClick={handlePreviousTab}
                              disabled={!canGoPrevious}
                              className="border-gray-700 text-white hover:bg-gray-800 h-12 px-6"
                            >
                              <ArrowLeft className="mr-2 h-4 w-4" />
                              Previous
                            </Button>
                            <Button
                              type="button"
                              onClick={handleNextTab}
                              disabled={!canGoNext}
                              className="bg-red-600 hover:bg-red-700 text-white h-12 px-6"
                            >
                              Next
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </div>
                          
                          {/* Desktop Navigation Button */}
                          <div className="hidden lg:flex justify-end">
                            <Button 
                              type="button" 
                              onClick={handleNextTab}
                              className="bg-red-600 hover:bg-red-700 text-white h-12 px-8"
                            >
                              Next <ChevronRight className="ml-1 h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      )}
                      
                      {/* Game Selection Tab */}
                      {activeTab === 'game' && (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-white flex items-center">
                              <Gamepad2 className="mr-2 h-5 w-5 text-red-500" />
                              Game Selection
                            </h3>
                            
                            <div className="space-y-2">
                              <Label htmlFor="gameSlug" className="text-white flex items-center">
                                Select Games <span className="text-red-500 ml-1">*</span>
                              </Label>
                              <Select onValueChange={handleGameSelect} disabled={formData.decideAtVenue}>
                                <SelectTrigger className="bg-gray-800 border-gray-700 text-white h-12">
                                  <SelectValue placeholder={
                                    formData.decideAtVenue 
                                      ? "I'll decide at venue" 
                                      : "Choose your games"
                                  } />
                                </SelectTrigger>
                                <SelectContent className="bg-gray-800 border-gray-700">
                                  <SelectItem value="decide-at-venue" className="text-white">
                                    <div className="flex items-center">
                                      <span>I'll decide at venue</span>
                                      <Badge variant="secondary" className="ml-2 bg-gray-600/20 text-gray-400">
                                        No selection needed
                                      </Badge>
                                    </div>
                                  </SelectItem>
                                  {GAMES.filter(game => !formData.gameSlugs.includes(game.slug)).map((game) => (
                                    <SelectItem key={game.id} value={game.slug} className="text-white">
                                      <div className="flex items-center justify-between w-full">
                                        <span>{game.title}</span>
                                        <Badge variant="secondary" className="ml-2 bg-red-600/20 text-red-400">
                                          {game.platform}
                                        </Badge>
                                      </div>
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              {errors.gameSlugs && (
                                <p className="text-red-500 text-sm" role="alert">
                                  {errors.gameSlugs}
                                </p>
                              )}
                            </div>
                            
                            {/* "Decide at venue" selected message */}
                            {formData.decideAtVenue && (
                              <div className="bg-blue-900/20 border border-blue-600/30 rounded-lg p-4">
                                <div className="flex items-start">
                                  <Info className="h-5 w-5 text-blue-400 mt-0.5 mr-2 flex-shrink-0" />
                                  <div className="text-sm text-blue-300">
                                    <p className="font-medium mb-1">Flexible Game Selection</p>
                                    <p>You can choose your games when you arrive at venue. Our staff will help you select from our wide range of options.</p>
                                  </div>
                                </div>
                              </div>
                            )}
                            
                            {/* Selected Games as Badges */}
                            {!formData.decideAtVenue && selectedGames.length > 0 && (
                              <div className="space-y-2">
                                <Label className="text-white">Selected Games:</Label>
                                <div className="flex flex-wrap gap-2">
                                  {selectedGames.map((game) => (
                                    <Badge 
                                      key={game.id} 
                                      className="bg-red-600/20 text-red-400 border border-red-600/30 px-3 py-1 flex items-center gap-1"
                                    >
                                      {game.title}
                                      <button
                                        type="button"
                                        onClick={() => removeGame(game.slug)}
                                        className="ml-1 hover:text-red-300"
                                      >
                                        <X className="h-3 w-3" />
                                      </button>
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                            
                            {/* Selected Games Preview */}
                            {!formData.decideAtVenue && selectedGames.length > 0 && (
                              <div className="space-y-3">
                                <h4 className="text-white font-medium">Game Details:</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                  {selectedGames.map((game) => (
                                    <div key={game.id} className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                                      <div className="flex items-start space-x-4">
                                        <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                                          <img 
                                            src={getGameImage(game.slug)} 
                                            alt={game.title}
                                            className="w-full h-full object-cover"
                                          />
                                        </div>
                                        <div className="flex-1">
                                          <h4 className="text-white font-medium">{game.title}</h4>
                                          <p className="text-gray-400 text-sm mt-1">{game.description}</p>
                                          <div className="flex items-center gap-2 flex-wrap mt-2">
                                            <Badge variant="outline" className="text-xs bg-gray-700 text-gray-300 border-gray-600">
                                              {game.genre}
                                            </Badge>
                                            <Badge variant="outline" className="text-xs bg-gray-700 text-gray-300 border-gray-600">
                                              {game.platform}
                                            </Badge>
                                            <div className="flex items-center">
                                              <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                              <span className="text-gray-300 text-sm ml-1">{game.rating}</span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="duration" className="text-white flex items-center">
                                  Duration <span className="text-red-500 ml-1">*</span>
                                </Label>
                                <Select 
                                  value={formData.duration.toString()} 
                                  onValueChange={(value) => handleInputChange('duration', parseInt(value))}
                                >
                                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white h-12">
                                    <SelectValue placeholder="Select duration" />
                                  </SelectTrigger>
                                  <SelectContent className="bg-gray-800 border-gray-700">
                                    {durationOptions.map((option) => (
                                      <SelectItem key={option.value} value={option.value.toString()} className="text-white">
                                        {option.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                {errors.duration && (
                                  <p className="text-red-500 text-sm" role="alert">
                                    {errors.duration}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          {/* Mobile Navigation Buttons */}
                          <div className="flex justify-between lg:hidden">
                            <Button
                              type="button"
                              variant="outline"
                              onClick={handlePreviousTab}
                              disabled={!canGoPrevious}
                              className="border-gray-700 text-white hover:bg-gray-800 h-12 px-6"
                            >
                              <ArrowLeft className="mr-2 h-4 w-4" />
                              Previous
                            </Button>
                            <Button
                              type="button"
                              onClick={handleNextTab}
                              disabled={!canGoNext}
                              className="bg-red-600 hover:bg-red-700 text-white h-12 px-6"
                            >
                              Next
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </div>
                          
                          {/* Desktop Navigation Buttons */}
                          <div className="hidden lg:flex justify-between">
                            <Button 
                              type="button" 
                              onClick={handlePreviousTab}
                              variant="outline"
                              className="border-gray-700 text-white hover:bg-gray-800 h-12 px-6"
                            >
                              Previous
                            </Button>
                            <Button 
                              type="button" 
                              onClick={handleNextTab}
                              className="bg-red-600 hover:bg-red-700 text-white h-12 px-8"
                            >
                              Next <ChevronRight className="ml-1 h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      )}
                      
                      {/* Schedule Tab */}
                      {activeTab === 'schedule' && (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-white flex items-center">
                              <Calendar className="mr-2 h-5 w-5 text-red-500" />
                              Schedule Your Session
                            </h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="date" className="text-white flex items-center">
                                  Select Date <span className="text-red-500 ml-1">*</span>
                                </Label>
                                <div className="relative">
                                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                  <Input
                                    id="date"
                                    type="date"
                                    value={formData.date}
                                    onChange={(e) => handleInputChange('date', e.target.value)}
                                    className="bg-gray-800 border-gray-700 text-white pl-10 h-12 text-base"
                                    min={today}
                                    aria-required="true"
                                    aria-invalid={!!errors.date}
                                  />
                                </div>
                                {errors.date && (
                                  <p className="text-red-500 text-sm" role="alert">
                                    {errors.date}
                                  </p>
                                )}
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <Label className="text-white flex items-center">
                                Select Time Slot <span className="text-red-500 ml-1">*</span>
                              </Label>
                              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-60 overflow-y-auto p-2 bg-gray-800/50 rounded-lg border border-gray-700">
                                {timeSlots.map((slot) => (
                                  <Button
                                    key={slot.id}
                                    type="button"
                                    variant={formData.timeSlot === slot.value ? "default" : "outline"}
                                    className={`justify-center text-xs h-12 ${
                                      formData.timeSlot === slot.value 
                                        ? "bg-red-600 hover:bg-red-700 text-white" 
                                        : slot.available 
                                          ? "border-gray-700 text-white hover:bg-gray-700" 
                                          : "border-gray-700 text-gray-500 cursor-not-allowed opacity-50"
                                    }`}
                                    onClick={() => slot.available && handleInputChange('timeSlot', slot.value)}
                                    disabled={!slot.available}
                                  >
                                    {slot.label}
                                  </Button>
                                ))}
                              </div>
                              {errors.timeSlot && (
                                <p className="text-red-500 text-sm" role="alert">
                                  {errors.timeSlot}
                                </p>
                              )}
                            </div>
                            
                            <div className="bg-blue-900/20 border border-blue-600/30 rounded-lg p-4">
                              <div className="flex items-start">
                                <Info className="h-5 w-5 text-blue-400 mt-0.5 mr-2 flex-shrink-0" />
                                <div className="text-sm text-blue-300">
                                  <p className="font-medium mb-1">Booking Information</p>
                                  <p>Time slots are available on a first-come, first-served basis. Your booking will be confirmed once payment is processed.</p>
                                </div>
                              </div>
                            </div>
                            
                            {/* Mobile Navigation Buttons */}
                            <div className="flex justify-between lg:hidden">
                              <Button
                                type="button"
                                variant="outline"
                                onClick={handlePreviousTab}
                                disabled={!canGoPrevious}
                                className="border-gray-700 text-white hover:bg-gray-800 h-12 px-6"
                              >
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Previous
                              </Button>
                              <Button
                                type="button"
                                onClick={handleNextTab}
                                disabled={!canGoNext}
                                className="bg-red-600 hover:bg-red-700 text-white h-12 px-6"
                              >
                                Next
                                <ArrowRight className="ml-2 h-4 w-4" />
                              </Button>
                            </div>
                            
                            {/* Desktop Navigation Buttons */}
                            <div className="hidden lg:flex justify-between">
                              <Button 
                                type="button" 
                                onClick={handlePreviousTab}
                                variant="outline"
                                className="border-gray-700 text-white hover:bg-gray-800 h-12 px-6"
                              >
                                Previous
                              </Button>
                              <Button 
                                type="button" 
                                onClick={handleNextTab}
                                className="bg-red-600 hover:bg-red-700 text-white h-12 px-8"
                              >
                                Next <ChevronRight className="ml-1 h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Snacks Tab */}
                      {activeTab === 'snacks' && (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-white flex items-center">
                              <Coffee className="mr-2 h-5 w-5 text-red-500" />
                              Pre-order Snacks & Beverages
                            </h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {SNACKS.map((snack) => {
                                const quantity = getSnackQuantity(snack.id);
                                return (
                                  <div key={snack.id} className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center space-x-3">
                                        <div>
                                          <h4 className="text-white font-medium">{snack.name}</h4>
                                          <p className="text-gray-400 text-sm mt-1">{snack.description}</p>
                                          <span className="text-red-400 font-medium">₹{snack.price}</span>
                                        </div>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <Button
                                          type="button"
                                          variant="outline"
                                          size="icon"
                                          className="h-10 w-10 rounded-full border-gray-700 text-white hover:bg-gray-700"
                                          onClick={() => handleSnackChange(snack.id, quantity - 1)}
                                          disabled={quantity === 0}
                                        >
                                          <Minus className="h-4 w-4" />
                                        </Button>
                                        <span className="w-8 text-center text-white font-medium">{quantity}</span>
                                        <Button
                                          type="button"
                                          variant="outline"
                                          size="icon"
                                          className="h-10 w-10 rounded-full border-gray-700 text-white hover:bg-gray-700"
                                          onClick={() => handleSnackChange(snack.id, quantity + 1)}
                                        >
                                          <Plus className="h-4 w-4" />
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="notes" className="text-white">
                                Special Requests or Notes
                              </Label>
                              <Textarea
                                id="notes"
                                name="notes"
                                value={formData.notes}
                                onChange={(e) => handleInputChange('notes', e.target.value)}
                                className="bg-gray-800 border-gray-700 text-white"
                                placeholder="Any special requests or dietary restrictions..."
                                rows={3}
                              />
                            </div>
                          </div>
                          
                          {/* Mobile Navigation Buttons */}
                          <div className="flex justify-between lg:hidden">
                            <Button
                              type="button"
                              variant="outline"
                              onClick={handlePreviousTab}
                              disabled={!canGoPrevious}
                              className="border-gray-700 text-white hover:bg-gray-800 h-12 px-6"
                            >
                              <ArrowLeft className="mr-2 h-4 w-4" />
                              Previous
                            </Button>
                            <Button
                              type="submit"
                              disabled={state.submitting}
                              className="bg-red-600 hover:bg-red-700 text-white font-bold h-12 px-6"
                            >
                              {state.submitting ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  Submitting...
                                </>
                              ) : (
                                'Confirm Booking'
                              )}
                            </Button>
                          </div>
                          
                          {/* Desktop Navigation Buttons */}
                          <div className="hidden lg:flex justify-between">
                            <Button 
                              type="button" 
                              onClick={handlePreviousTab}
                              variant="outline"
                              className="border-gray-700 text-white hover:bg-gray-800 h-12 px-6"
                            >
                              Previous
                            </Button>
                            <Button 
                              type="submit"
                              disabled={state.submitting}
                              className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3 text-lg transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-red-600/25 disabled:opacity-50 disabled:cursor-not-allowed h-12"
                            >
                              {state.submitting ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  Submitting...
                                </>
                              ) : (
                                'Confirm Booking'
                              )}
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
            
            {/* Order Summary - Responsive Sidebar */}
            <div className="xl:col-span-1">
              <div className="sticky top-24 space-y-6">
                <Card className="bg-gray-900/80 border border-red-900/20 shadow-xl">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg text-white flex items-center">
                      <Calculator className="mr-2 h-5 w-5 text-red-500" />
                      Booking Summary
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {(selectedGames.length > 0 || formData.decideAtVenue) && (
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Games</span>
                        </div>
                        <div className="text-white">
                          {formData.decideAtVenue 
                            ? "I'll decide at venue"
                            : selectedGames.map((game, index) => (
                              <div key={game.id} className="mb-1">
                                {game.title}
                                {index < selectedGames.length - 1 && ', '}
                              </div>
                            ))
                          }
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Duration</span>
                          <span className="text-white">{formData.duration} hour{formData.duration > 1 ? 's' : ''}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Date</span>
                          <span className="text-white">{formData.date || 'Not selected'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Time</span>
                          <span className="text-white">
                            {formData.timeSlot 
                              ? timeSlots.find(s => s.value === formData.timeSlot)?.label 
                              : 'Not selected'
                            }
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Hourly Rate</span>
                          <span className="text-white">₹99/hr</span>
                        </div>
                      </div>
                    )}
                    
                    {snacksSubtotal > 0 && (
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Snacks</span>
                          <span className="text-white">₹{snacksSubtotal}</span>
                        </div>
                        <div className="text-sm text-gray-500 pl-4">
                          {Object.entries(formData.snacks)
                            .filter(([_, qty]) => qty > 0)
                            .map(([id, qty]) => {
                              const snack = SNACKS.find(s => s.id === id);
                              return snack ? `${snack.name} x${qty}` : null;
                            })
                            .filter(Boolean)
                            .join(', ')
                          }
                        </div>
                      </div>
                    )}
                    
                    <Separator className="bg-gray-700" />
                    
                    <div className="flex justify-between text-lg font-bold">
                      <span className="text-white">Total</span>
                      <span className="text-red-500">₹{totalPrice}</span>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="bg-gray-900/80 border border-red-900/20 shadow-xl">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-lg text-white flex items-center">
                        <MapPin className="mr-2 h-5 w-5 text-red-500" />
                        Location
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <p className="text-gray-300">GameZone Arena</p>
                        <p className="text-gray-400">123 Gaming Street</p>
                        <p className="text-gray-400">Tech City, TC 12345</p>
                        <div className="pt-2">
                          <Button variant="outline" size="sm" className="text-xs border-gray-700 text-white hover:bg-gray-800">
                            Get Directions
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gray-900/80 border border-red-900/20 shadow-xl">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-lg text-white flex items-center">
                        <Info className="mr-2 h-5 w-5 text-red-500" />
                        Booking Policies
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="space-y-3 text-sm">
                        <div className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 mr-2 flex-shrink-0" />
                          <p className="text-gray-300">Free cancellation up to 24 hours before</p>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 mr-2 flex-shrink-0" />
                          <p className="text-gray-300">No booking fees</p>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 mr-2 flex-shrink-0" />
                          <p className="text-gray-300">Instant confirmation</p>
                        </div>
                        <div className="flex items-start">
                          <AlertTriangle className="h-4 w-4 text-yellow-400 mt-0.5 mr-2 flex-shrink-0" />
                          <p className="text-gray-300">Arrive 10 minutes early</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Booking;
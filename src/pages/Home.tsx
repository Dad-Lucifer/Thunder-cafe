import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Monitor,
  Gamepad2,
  Trophy,
  Coffee,
  ChevronRight,
  Users,
  DollarSign,
  Calendar,
  ArrowRight,
  Play,
  Menu,
  X
} from 'lucide-react';
import { GAMES } from '@/constants/data';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useScrollAnimation } from '@/hooks';

import cafe1 from '@/assets/cafe1.png';
import cafe2 from '@/assets/cafe2.png';
import cafe3 from '@/assets/cafe3.png';

const Home = () => {
  const [currentCafeImage, setCurrentCafeImage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Custom hooks for scroll animations
  const heroRef = useScrollAnimation(0.1);
  const featuresRef = useScrollAnimation(0.1);
  const gamesRef = useScrollAnimation(0.1);
  const whyRef = useScrollAnimation(0.1);

  const cafeImages = [cafe1, cafe2, cafe3];

  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Auto-rotate cafe images every 5 seconds, unless paused
    const interval = setInterval(() => {
      if (!isPlaying) {
        setCurrentCafeImage((prev) => (prev + 1) % cafeImages.length);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const shuffleCafeImage = () => {
    setCurrentCafeImage((prev) => (prev + 1) % cafeImages.length);
  };

  const features = [
    {
      icon: Monitor,
      title: 'PC Gaming',
      description: 'High-end rigs with latest components',
      slug: 'pc-gaming'
    },
    {
      icon: Gamepad2,
      title: 'PS5 Arena',
      description: 'Next-gen console gaming experience',
      slug: 'ps5-arena'
    },
    {
      icon: Trophy,
      title: 'Xbox Lounge',
      description: 'Series X gaming in comfort',
      slug: 'xbox-lounge'
    },
    {
      icon: Coffee,
      title: 'Snack Bar',
      description: 'Refreshments and gaming fuel',
      slug: 'snack-bar'
    }
  ];

  const whyChooseUs = [
    {
      icon: Trophy,
      title: 'Premium Rigs',
      description: 'Top-tier hardware with RTX 4090, latest processors, and 144Hz displays'
    },
    {
      icon: DollarSign,
      title: 'Competitive Pricing',
      description: 'Affordable hourly rates with package deals and membership benefits'
    },
    {
      icon: Calendar,
      title: 'Community Events',
      description: 'Regular tournaments, game nights, and exclusive member events'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />

      {/* 
        Hero Section - Mobile Optimized
        FIX: Added `pt-20 sm:pt-24` to create space for the fixed navbar.
        This prevents the heading from being overlapped on mobile and desktop views.
      */}
      <section ref={heroRef.ref} className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-red-950/10 to-black animate-pulse-slow"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(239,68,68,0.1),transparent_50%)] animate-glow"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text - Mobile Optimized */}
          <div className={`space-y-6 text-center lg:text-left ${heroRef.isVisible ? 'animate-fade-in-left' : 'opacity-0'}`}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight text-white leading-none animate-fade-in-down">
              Thunder
              <br />
              Gaming
              <br />
              Café
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 font-medium leading-relaxed animate-fade-in-up animate-stagger-2">
              Unleash Heist Within — Play. Connect. Win.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4 animate-fade-in-up animate-stagger-3">
              <Button asChild size="lg" className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-red-600/25 animate-hover-glow">
                <Link to="/games" aria-label="Explore our games collection">
                  Explore Games
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg" className="border-red-600 text-red-500 hover:bg-red-600 hover:text-white font-bold px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg transition-all duration-200 hover:scale-105 animate-hover-lift">
                <Link to="/booking" aria-label="Book a gaming session">
                  Book Now
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Column - Hero Card - Mobile Optimized */}
          <div className={`relative ${heroRef.isVisible ? 'animate-fade-in-right animate-stagger-2' : 'opacity-0'}`}>
            <div className="relative">
              {/* Glowing background effect */}
              <div className="absolute inset-0 bg-red-600/20 rounded-2xl blur-3xl scale-110 animate-glow"></div>
              
              {/* Main card */}
              <Card className="relative bg-gray-900/90 border border-red-900/30 rounded-2xl p-4 sm:p-6 lg:p-8 backdrop-blur-sm shadow-2xl animate-hover-lift animate-float cursor-pointer transition-transform hover:scale-105" onClick={shuffleCafeImage}>
                <CardContent className="p-0">
                  <div className="space-y-4 sm:space-y-6">
                    {/* Cafe Image - Mobile Optimized */}
                    <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden rounded-lg">
                      <img src={cafeImages[currentCafeImage]} alt="Gaming cafe setup" className="w-full h-full object-cover transition-all duration-500 ease-in-out" />
                      
                      {/* Play/Pause Button */}
                      <button
                        className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm rounded-full p-2 text-white hover:bg-black/70 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsPlaying(!isPlaying);
                        }}
                        aria-label={isPlaying ? "Pause image carousel" : "Play image carousel"}
                      >
                        {isPlaying ? <X className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      </button>
                      
                      {/* Image Indicators */}
                      <div className="absolute bottom-4 left-4 flex space-x-1">
                        {cafeImages.map((_, index) => (
                          <button
                            key={index}
                            className={`h-2 w-2 rounded-full transition-colors ${index === currentCafeImage ? 'bg-red-500' : 'bg-white/50'}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              setCurrentCafeImage(index);
                            }}
                            aria-label={`Go to image ${index + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <div className="text-center animate-fade-in-up animate-stagger-4">
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Ultimate Gaming Experience</h3>
                      <p className="text-gray-400 text-sm sm:text-base">State-of-the-art setups await</p>
                      <p className="text-red-500 text-xs sm:text-sm mt-2">Click to see more</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Section - Mobile Optimized */}
      <section ref={featuresRef.ref} className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-red-950/5">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-12 sm:mb-16 ${featuresRef.isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">Gaming Zones</h2>
            <p className="text-lg sm:text-xl text-gray-400">Choose your battlefield</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {features.map((feature, index) => (
              <Card key={feature.slug} className={`bg-gray-900/80 border border-red-900/20 hover:border-red-600/40 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-600/10 animate-hover-lift ${featuresRef.isVisible ? `animate-fade-in-up animate-stagger-${index + 1}` : 'opacity-0'}`}>
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-red-600/20 rounded-full flex items-center justify-center mb-4 animate-hover-scale">
                    <feature.icon className="h-6 w-6 sm:h-8 sm:w-8 text-red-500" />
                  </div>
                  <CardTitle className="text-white text-lg sm:text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <CardDescription className="text-gray-400 text-sm sm:text-base">{feature.description}</CardDescription>
                  <Button asChild variant="outline" size="sm" className="border-red-600 text-red-500 hover:bg-red-600 hover:text-white transition-all duration-200 animate-hover-glow w-full sm:w-auto">
                    <Link to={`/booking?game=${feature.slug}`} aria-label={`Book ${feature.title}`}>Book This</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Games Preview Section - Mobile Optimized */}
      <section ref={gamesRef.ref} className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-12 sm:mb-16 ${gamesRef.isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">Popular Games</h2>
            <p className="text-lg sm:text-xl text-gray-400">Fan favorites and competitive titles</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {GAMES.slice(0, 6).map((game, index) => (
              <Card key={game.id} className={`bg-gray-900/80 border border-red-900/20 hover:border-red-600/40 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-600/10 animate-hover-lift ${gamesRef.isVisible ? `animate-fade-in-up animate-stagger-${index + 1}` : 'opacity-0'}`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white text-lg sm:text-xl">{game.title}</CardTitle>
                    <Badge variant="secondary" className="bg-red-600/20 text-red-400 border-red-600/30 animate-hover-scale text-xs">{game.platform}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Button asChild size="sm" className="bg-red-600 hover:bg-red-700 text-white animate-hover-glow w-full sm:w-auto">
                      <Link to={`/booking?game=${game.slug}`} aria-label={`Book ${game.title}`}>Book Now</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* View All Games Button - Mobile Optimized */}
          <div className="text-center mt-8 sm:mt-12">
            <Button asChild variant="outline" size="lg" className="border-red-600 text-red-500 hover:bg-red-600 hover:text-white font-bold px-6 sm:px-8 py-3 text-base sm:text-lg transition-all duration-200 hover:scale-105">
              <Link to="/games" aria-label="View all games">
                View All Games
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section - Mobile Optimized */}
      <section ref={whyRef.ref} className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-red-950/5 to-black">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-12 sm:mb-16 ${whyRef.isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">Why Choose Us</h2>
            <p className="text-lg sm:text-xl text-gray-400">The ultimate gaming destination</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {whyChooseUs.map((item, index) => (
              <div key={item.title} className={`text-center space-y-4 animate-hover-lift ${whyRef.isVisible ? `animate-fade-in-up animate-stagger-${index + 1}` : 'opacity-0'}`}>
                <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 bg-red-600/20 rounded-full flex items-center justify-center animate-hover-scale animate-float">
                  <item.icon className="h-8 w-8 sm:h-10 sm:w-10 text-red-500" aria-hidden="true" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed max-w-sm mx-auto text-sm sm:text-base">{item.description}</p>
              </div>
            ))}
          </div>
          
          {/* CTA Button - Mobile Optimized */}
          <div className="text-center mt-12 sm:mt-16">
            <Button asChild size="lg" className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-red-600/25">
              <Link to="/booking" aria-label="Book a gaming session">
                Book Your Session Now
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
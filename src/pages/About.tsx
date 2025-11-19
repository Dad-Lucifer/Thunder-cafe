import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Monitor, 
  Gamepad2, 
  Trophy,
  Coffee,
  Wifi,
  Shield,
  Users,
  Clock,
  MapPin,
  ChevronRight,
  Zap,
  Headphones
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

import cafe1 from '@/assets/cafe1.png';
import cafe2 from '@/assets/cafe2.png';
import cafe3 from '@/assets/cafe3.png';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [currentCafeImage, setCurrentCafeImage] = useState(0);
  const heroRef = useScrollAnimation(0.1);
  const contentRef = useScrollAnimation(0.1);
  const facilitiesRef = useScrollAnimation(0.1);
  const communityRef = useScrollAnimation(0.1);
  const hoursRef = useScrollAnimation(0.1);
  const ctaRef = useScrollAnimation(0.1);

  const cafeImages = [cafe1, cafe2, cafe3];

  const shuffleCafeImage = () => {
    setCurrentCafeImage((prev) => (prev + 1) % cafeImages.length);
  };

  const facilities = [
    {
      icon: Monitor,
      title: 'High-End Rigs',
      description: 'RTX 4090 powered gaming stations'
    },
    {
      icon: Gamepad2,
      title: 'PS5 Suite',
      description: 'Next-gen console gaming experience'
    },
    {
      icon: Trophy,
      title: 'Xbox Pods',
      description: 'Private gaming chambers'
    },
    {
      icon: Coffee,
      title: 'Dedicated Snack Bar',
      description: 'Gaming fuel and refreshments'
    },
    {
      icon: Wifi,
      title: 'Fast Internet',
      description: 'Fiber-optic 1Gbps connectivity'
    },
    {
      icon: Shield,
      title: 'Hygiene & Safety',
      description: 'Sanitized stations daily'
    }
  ];

  const communityFeatures = [
    {
      icon: Users,
      title: 'Tournaments',
      description: 'Weekly competitive events'
    },
    {
      icon: Headphones,
      title: 'Pro Coaching',
      description: 'Learn from the best players'
    },
    {
      icon: Zap,
      title: 'Instant Setup',
      description: 'Your profile ready in seconds'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero Header */}
      {/* 
        FIX: Changed pt-32 to pt-20 sm:pt-24 to ensure consistent spacing across all screen sizes
        This prevents the heading from being overlapped by the navigation bar on mobile devices
      */}
      <section ref={heroRef.ref} className="pt-20 sm:pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className={`max-w-7xl mx-auto text-center ${
          heroRef.isVisible ? 'animate-fade-in-up' : 'opacity-0'
        }`}>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            About Thunder Gaming Café
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            A community built around passion, play, and power.
          </p>
        </div>
      </section>

      {/* Two-Column Content */}
      <section ref={contentRef.ref} className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className={`space-y-6 ${
                contentRef.isVisible ? 'animate-fade-in-left' : 'opacity-0'
              }`}>
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                  The Vision
                </h2>
                <p className="text-gray-300 leading-relaxed text-lg">
                  Thunder Gaming Café wasn't just built—it was orchestrated. Like a perfectly planned heist, 
                  we brought together the finest elements of gaming culture: cutting-edge technology, 
                  competitive spirit, and a community that understands the thrill of the game.
                </p>
              </div>

              <div className={`space-y-6 ${
                contentRef.isVisible ? 'animate-fade-in-left animate-stagger-2' : 'opacity-0'
              }`}>
                <h3 className="text-2xl font-bold text-white">
                  The Atmosphere
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Step into a world where every detail matters. Dark, immersive environments with 
                  ambient red lighting create the perfect backdrop for intense gaming sessions.
                </p>
              </div>
            </div>

            <div className={`relative ${
              contentRef.isVisible ? 'animate-fade-in-right animate-stagger-2' : 'opacity-0'
            }`}>
              <div 
                className="aspect-square rounded-2xl overflow-hidden bg-gray-900 border border-red-900/20 animate-hover-lift cursor-pointer transition-transform hover:scale-105"
                onClick={shuffleCafeImage}
              >
                <img
                  src={cafeImages[currentCafeImage]}
                  alt="Thunder Gaming Cafe interior"
                  className="w-full h-full object-cover transition-all duration-500 ease-in-out"
                  loading="lazy"
                />
              </div>
              <p className="text-red-500 text-sm mt-3 text-center">
                Click to see more
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Grid */}
      <section ref={facilitiesRef.ref} className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-red-950/5">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 ${
            facilitiesRef.isVisible ? 'animate-fade-in-up' : 'opacity-0'
          }`}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              World-Class Facilities
            </h2>
            <p className="text-xl text-gray-400">
              Everything you need for the perfect gaming experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilities.map((facility, index) => (
              <Card 
                key={facility.title}
                className={`bg-gray-900/80 border border-red-900/20 hover:border-red-600/40 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-600/10 animate-hover-lift ${
                  facilitiesRef.isVisible ? `animate-fade-in-up animate-stagger-${index + 1}` : 'opacity-0'
                }`}
              >
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center mb-4 animate-hover-scale">
                    <facility.icon className="h-8 w-8 text-red-500" />
                  </div>
                  <CardTitle className="text-white text-xl">{facility.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-gray-400">
                    {facility.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section ref={ctaRef.ref} className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-red-900/20 to-red-800/20 border-y border-red-900/30">
        <div className={`max-w-4xl mx-auto text-center space-y-8 ${
          ctaRef.isVisible ? 'animate-fade-in-up' : 'opacity-0'
        }`}>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Ready to Join the Crew?
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Your gaming adventure starts here. Book your station and experience gaming like never before.
          </p>
          <Button 
            asChild
            size="lg"
            className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 text-lg transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-red-600/25 animate-hover-glow"
          >
            <Link to="/booking" aria-label="Book your game slot now">
              Book Your Game Slot Now
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
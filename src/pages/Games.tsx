import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Monitor, 
  Gamepad2, 
  Trophy,
  ChevronRight,
  Home,
  Filter
} from 'lucide-react';
import { GAMES } from '@/constants/data';
import Navbar from '@/components/layout/Navbar';
import valoImage from '@/assets/valo.png';
import gta from '@/assets/gta.png';
import csgo from '@/assets/csgo.png';
import fc24 from '@/assets/fc24.png'; 
import fort from '@/assets/fort.png';
import cod from '@/assets/cod.png';
import apex from '@/assets/apex.png';
import mine from '@/assets/mine.png';
import halo from '@/assets/halo.png';
import league from '@/assets/league.png';
import rocket from '@/assets/rock.png';
import mortal from '@/assets/mortal.png';

import Footer from '@/components/layout/Footer';
import { useScrollAnimation } from '@/hooks';
import { getPlatformIcon, getPlatformColor } from '@/lib/animations';
import { getGameDescription } from '@/lib/formatters';
import type { PlatformFilter, Game } from '@/types';

const Games = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [platformFilter, setPlatformFilter] = useState<PlatformFilter>('all');
  const headerRef = useScrollAnimation(0.1);
  const filtersRef = useScrollAnimation(0.1);
  const gamesRef = useScrollAnimation(0.1);

  // Enhanced games data with descriptions
  const gamesWithDescriptions: Game[] = useMemo(() => 
    GAMES.map(game => ({
      ...game,
      description: getGameDescription(game.title, game.platform)
    })), []
  );

  // Filter games based on selected platform
  const filteredGames = useMemo(() => {
    if (platformFilter === 'all') {
      return gamesWithDescriptions;
    }
    return gamesWithDescriptions.filter(game => 
      game.platform.toLowerCase() === platformFilter.toLowerCase() ||
      (platformFilter === 'multi' && game.platform.toLowerCase() === 'multi')
    );
  }, [platformFilter, gamesWithDescriptions]);

  // Get game image based on slug
  const getGameImage = (slug: string) => {
    // Map game slugs to their respective images
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

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Page Header */}
      <section ref={headerRef.ref} className="pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <div className={`max-w-7xl mx-auto text-center ${
          headerRef.isVisible ? 'animate-fade-in-up' : 'opacity-0'
        }`}>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Available Games
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Choose your battlefield from our curated selection of premium gaming experiences
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section ref={filtersRef.ref} className="pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className={`flex items-center justify-center mb-8 ${
            filtersRef.isVisible ? 'animate-fade-in-up animate-stagger-1' : 'opacity-0'
          }`}>
            <Filter className="h-5 w-5 text-red-500 mr-2 animate-pulse-slow" />
            <span className="text-gray-400 mr-4">Filter by platform:</span>
          </div>
          
          <div className={`w-full max-w-2xl mx-auto ${
            filtersRef.isVisible ? 'animate-fade-in-up animate-stagger-2' : 'opacity-0'
          }`}>
            <Tabs 
              value={platformFilter} 
              onValueChange={(value) => setPlatformFilter(value as PlatformFilter)}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-5 bg-gray-900 border border-red-900/20">
                <TabsTrigger 
                  value="all" 
                  className="data-[state=active]:bg-red-600 data-[state=active]:text-white transition-all duration-200 hover:scale-105"
                  aria-label="Show all games"
                >
                  All
                </TabsTrigger>
                <TabsTrigger 
                  value="pc" 
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all duration-200 hover:scale-105"
                  aria-label="Filter PC games"
                >
                  PC
                </TabsTrigger>
                <TabsTrigger 
                  value="ps5" 
                  className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white transition-all duration-200 hover:scale-105"
                  aria-label="Filter PS5 games"
                >
                  PS5
                </TabsTrigger>
                <TabsTrigger 
                  value="xbox" 
                  className="data-[state=active]:bg-green-600 data-[state=active]:text-white transition-all duration-200 hover:scale-105"
                  aria-label="Filter Xbox games"
                >
                  Xbox
                </TabsTrigger>
                <TabsTrigger 
                  value="multi" 
                  className="data-[state=active]:bg-purple-600 data-[state=active]:text-white transition-all duration-200 hover:scale-105"
                  aria-label="Filter multi-platform games"
                >
                  Multi
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Games Grid */}
      <section ref={gamesRef.ref} className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {filteredGames.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGames.map((game, index) => (
                <Card 
                  key={game.id}
                  className={`bg-gray-900/80 border border-red-900/20 hover:border-red-600/40 transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-red-600/10 group animate-hover-lift ${
                    gamesRef.isVisible ? `animate-fade-in-up animate-stagger-${index + 1}` : 'opacity-0'
                  }`}
                >
                  <CardHeader className="pb-4">
                    {/* Game Thumbnail */}
                    <div className="relative aspect-square w-full mb-4 overflow-hidden rounded-lg bg-gray-800">
                      <img
                        src={getGameImage(game.slug)}
                        alt={`${game.title} game cover art`}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            parent.innerHTML = `
                              <div class="w-full h-full bg-gradient-to-br from-red-900/20 to-gray-800 flex items-center justify-center">
                                <div class="text-center">
                                  <div class="text-4xl mb-2">${getPlatformIcon(game.platform)}</div>
                                  <p class="text-gray-400 text-sm">${game.title}</p>
                                </div>
                              </div>
                            `;
                          }
                        }}
                      />
                    </div>
                    
                    {/* Game Title and Platform */}
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-white text-xl group-hover:text-red-400 transition-colors">
                        {game.title}
                      </CardTitle>
                      <Badge 
                        variant="secondary" 
                        className={`${getPlatformColor(game.platform)} flex items-center gap-1 animate-hover-scale`}
                      >
                        {getPlatformIcon(game.platform)}
                        {game.platform}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Game Description */}
                    <CardDescription className="text-gray-400 line-clamp-2">
                      {game.description}
                    </CardDescription>
                    
                    {/* Pricing */}
                    <div className="flex items-center justify-between pt-2 border-t border-gray-800">
                      
                      
                      {/* Book Button */}
                      <Button 
                        asChild
                        className="bg-red-600 hover:bg-red-700 text-white font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-red-600/25 animate-hover-glow"
                      >
                        <Link 
                          to={`/booking?game=${game.slug}`}
                          aria-label={`Book ${game.title} for gaming session`}
                        >
                          Book This Game
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className={`text-center py-20 ${
              gamesRef.isVisible ? 'animate-fade-in-up' : 'opacity-0'
            }`}>
              <div className="max-w-md mx-auto space-y-6">
                <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto animate-pulse-slow">
                  <Filter className="h-12 w-12 text-gray-600" />
                </div>
                
                <h3 className="text-2xl font-bold text-white">
                  No games found
                </h3>
                
                <p className="text-gray-400">
                  No games are available for the selected platform. Try selecting a different platform or browse all games.
                </p>
                
                <div className="space-y-3">
                  <Button 
                    variant="outline"
                    onClick={() => setPlatformFilter('all')}
                    className="border-red-600 text-red-500 hover:bg-red-600 hover:text-white animate-hover-glow"
                  >
                    Show All Games
                  </Button>
                  
                  <Button 
                    asChild
                    variant="ghost"
                    className="text-gray-400 hover:text-white w-full animate-hover-lift"
                  >
                    <Link to="/" aria-label="Return to home page">
                      <Home className="mr-2 h-4 w-4" />
                      Back to Home
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Games;

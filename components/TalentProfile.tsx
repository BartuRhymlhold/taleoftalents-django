import React from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Mail, Share2, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { mockTalents } from '../data/mockData';
import { TALENT_ROLES } from '../types';

const TalentProfile: React.FC = () => {
  const { id } = useParams();
  const talent = mockTalents.find(t => t.id === id);

  if (!talent) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Talent Not Found</h2>
          <p className="text-gray-600">The profile you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const roleInfo = TALENT_ROLES.find(r => r.value === talent.role);

  // Mock additional profile data to match the design
  const profileDetails = {
    height: "5ft 7in",
    genderIdentification: "Female",
    pronouns: "She/Her",
    hair: "Brown",
    eyeColor: "Brown",
    performanceStyle: getPerformanceStyle(talent.role),
    specialties: getSpecialties(talent.role),
    agency: "Elite Talent Agency",
    unionAffiliations: getUnionAffiliations(talent.role),
    availability: "Available for tours"
  };

  function getPerformanceStyle(role: string) {
    switch (role) {
      case 'dancer': return 'Contemporary, Latin, Jazz';
      case 'acrobat': return 'Aerial, Hand Balancing';
      case 'performer': return 'Theater, Musical';
      case 'musician': return 'Jazz, Blues, Pop';
      case 'entertainer': return 'Comedy, Interactive';
      case 'bar_service': return 'Mixology, Fine Dining';
      default: return 'Various Styles';
    }
  }

  function getSpecialties(role: string) {
    switch (role) {
      case 'dancer': return 'Choreography, Partner Work';
      case 'acrobat': return 'Silks, Trapeze, Contortion';
      case 'performer': return 'Character Work, Improv';
      case 'musician': return 'Multi-instrumental';
      case 'entertainer': return 'Audience Interaction';
      case 'bar_service': return 'Craft Cocktails, Wine';
      default: return 'Multi-disciplinary';
    }
  }

  function getUnionAffiliations(role: string) {
    switch (role) {
      case 'dancer': return 'AGMA';
      case 'acrobat': return 'IATSE';
      case 'performer': return 'AEA, SAG-AFTRA';
      case 'musician': return 'AFM';
      case 'entertainer': return 'AGVA';
      case 'bar_service': return 'UNITE HERE';
      default: return 'N/A';
    }
  }

  const personalityTags = [
    "PROFESSIONAL", "CREATIVE", "PASSIONATE",
    "RELIABLE", "ENERGETIC", "VERSATILE",
    "COLLABORATIVE", "DEDICATED", "INNOVATIVE",
    "EXPERIENCED", "ADAPTABLE", "SKILLED"
  ];

  const portfolioImages = [
    "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=500&fit=crop"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-light tracking-wider text-gray-800">
              TALE OF TALENTS
            </div>
            <div className="text-sm text-gray-600">
              Already a member? <span className="text-blue-600 cursor-pointer">Sign In</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Photo */}
          <div className="space-y-6">
            <div className="aspect-[3/4] bg-gray-200 rounded-lg overflow-hidden">
              <img
                src={talent.profileImage}
                alt={talent.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="space-y-8">
            {/* Name and Location */}
            <div className="space-y-4">
              <h1 className="text-4xl font-light text-gray-800 tracking-wide uppercase">
                {talent.uniqueId}
              </h1>
              <div className="flex items-center text-gray-600">
                <MapPin size={16} className="mr-2" />
                <span>Currently in {talent.city}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-6">
              <button className="flex items-center text-gray-600 hover:text-gray-800 transition-colors">
                <Mail size={16} className="mr-2" />
                Contact Talent
              </button>
              <button className="flex items-center text-gray-600 hover:text-gray-800 transition-colors">
                <Share2 size={16} className="mr-2" />
                Share Profile
              </button>
              <button className="flex items-center text-gray-600 hover:text-gray-800 transition-colors">
                <Plus size={16} className="mr-2" />
                Add to list
              </button>
            </div>

            {/* Profile Details Grid */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-6">
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-800">Height</h3>
                <p className="text-gray-600 pb-2 border-b border-gray-200">{profileDetails.height}</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-800">Gender Identification</h3>
                <p className="text-gray-600 pb-2 border-b border-gray-200">{profileDetails.genderIdentification}</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-800">Pronouns</h3>
                <p className="text-gray-600 pb-2 border-b border-gray-200">{profileDetails.pronouns}</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-800">Hair</h3>
                <p className="text-gray-600 pb-2 border-b border-gray-200">{profileDetails.hair}</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-800">Performance Style</h3>
                <p className="text-gray-600 pb-2 border-b border-gray-200">{profileDetails.performanceStyle}</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-800">Specialties</h3>
                <p className="text-gray-600 pb-2 border-b border-gray-200">{profileDetails.specialties}</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-800">Experience</h3>
                <p className="text-gray-600 pb-2 border-b border-gray-200">{talent.experience}</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-800">Agency</h3>
                <p className="text-gray-600 pb-2 border-b border-gray-200">{profileDetails.agency}</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-800">Union Affiliations</h3>
                <p className="text-gray-600 pb-2 border-b border-gray-200">{profileDetails.unionAffiliations}</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-800">Availability</h3>
                <p className="text-gray-600 pb-2 border-b border-gray-200">{profileDetails.availability}</p>
              </div>
            </div>

            {/* Social Handle */}
            <div className="flex items-center justify-center py-4">
              <div className="flex items-center space-x-2 text-gray-500">
                <div className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center">
                  <span className="text-xs">@</span>
                </div>
                <span className="text-sm">{talent.uniqueId.toLowerCase()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Biography Section */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h2 className="text-2xl font-light text-gray-800 tracking-wide uppercase">Biography</h2>
            <p className="text-gray-700 leading-relaxed">
              {talent.bio}
            </p>
          </div>

          {/* Tags Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-light text-gray-800 tracking-wide uppercase">Tags</h2>
            <div className="flex flex-wrap gap-3">
              {personalityTags.map((tag, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-full hover:bg-gray-300 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Photos Section */}
        <div className="mt-16 space-y-8">
          <h2 className="text-2xl font-light text-gray-800 tracking-wide uppercase">Photos</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {portfolioImages.map((image, index) => (
              <div
                key={index}
                className="aspect-[3/4] bg-gray-200 rounded-lg overflow-hidden hover:opacity-90 transition-opacity cursor-pointer"
              >
                <img
                  src={image}
                  alt={`Portfolio ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="flex justify-center space-x-4 pt-4">
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <ChevronLeft size={20} />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Videos Section */}
        <div className="mt-16 space-y-8">
          <h2 className="text-2xl font-light text-gray-800 tracking-wide uppercase">Videos</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Demo Reel */}
            <div className="bg-gray-900 rounded-lg overflow-hidden aspect-video relative group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <div className="w-0 h-0 border-l-[12px] border-l-gray-800 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1" />
                </div>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-white font-medium text-sm">Demo Reel 2024</h3>
                <p className="text-white/80 text-xs">2:30</p>
              </div>
            </div>

            {/* Performance Video */}
            <div className="bg-gray-900 rounded-lg overflow-hidden aspect-video relative group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-pink-600/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <div className="w-0 h-0 border-l-[12px] border-l-gray-800 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1" />
                </div>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-white font-medium text-sm">Live Performance</h3>
                <p className="text-white/80 text-xs">4:15</p>
              </div>
            </div>

            {/* Training Video */}
            <div className="bg-gray-900 rounded-lg overflow-hidden aspect-video relative group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-green-600/20 to-teal-600/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <div className="w-0 h-0 border-l-[12px] border-l-gray-800 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1" />
                </div>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-white font-medium text-sm">Training Session</h3>
                <p className="text-white/80 text-xs">1:45</p>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="flex justify-center space-x-4 pt-4">
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <ChevronLeft size={20} />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TalentProfile;
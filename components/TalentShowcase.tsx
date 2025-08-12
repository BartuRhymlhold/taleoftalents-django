import React, { useState } from 'react';
import { Search, Filter, MapPin, Clock, Play } from 'lucide-react';
import { mockTalents } from '../data/mockData';
import { TALENT_ROLES } from '../types';
import { TalentRole } from '../types';

const TalentShowcase: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<TalentRole | 'all'>('all');
  const [locationFilter, setLocationFilter] = useState('all');

  // Only show approved talents
  const approvedTalents = mockTalents.filter(talent => talent.status === 'approved');

  const filteredTalents = approvedTalents.filter(talent => {
    const matchesSearch = talent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         talent.bio.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || talent.role === roleFilter;
    const matchesLocation = locationFilter === 'all' || talent.city.toLowerCase().includes(locationFilter.toLowerCase());
    
    return matchesSearch && matchesRole && matchesLocation;
  });

  const uniqueLocations = [...new Set(approvedTalents.map(talent => talent.city))];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Discover Amazing Talent
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Browse our verified professionals in hospitality and entertainment, ready to bring their skills to your venue.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search talents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value as TalentRole | 'all')}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
              >
                <option value="all">All Talent Types</option>
                {TALENT_ROLES.map(role => (
                  <option key={role.value} value={role.value}>
                    {role.icon} {role.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
              >
                <option value="all">All Locations</option>
                {uniqueLocations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredTalents.length} of {approvedTalents.length} talents
          </p>
        </div>

        {/* Talent Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTalents.map((talent) => {
            const roleInfo = TALENT_ROLES.find(r => r.value === talent.role);
            return (
              <div key={talent.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group">
                <div className="relative">
                  <img
                    src={talent.profileImage}
                    alt={talent.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Role Badge */}
                  <div className="absolute top-4 left-4 bg-white rounded-full px-3 py-1 shadow-md">
                    <span className="text-sm font-medium flex items-center">
                      <span className="mr-1">{roleInfo?.icon}</span>
                      {roleInfo?.label}
                    </span>
                  </div>

                  {/* Video Badge */}
                  {talent.videoUrl && (
                    <div className="absolute top-4 right-4 bg-black bg-opacity-70 text-white rounded-full p-2 hover:bg-opacity-90 transition-colors cursor-pointer">
                      <Play size={16} fill="white" />
                    </div>
                  )}

                  {/* Experience Badge */}
                  <div className="absolute bottom-4 right-4 bg-blue-600 text-white rounded-full px-3 py-1 text-sm font-medium">
                    <Clock size={14} className="inline mr-1" />
                    {talent.experience}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold text-gray-800">{talent.name}</h3>
                    <div className="flex items-center text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                        </svg>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPin size={16} className="mr-1" />
                    <span className="text-sm">{talent.city}</span>
                  </div>

                  <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                    {talent.bio}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {talent.videoUrl && (
                        <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                          Video Portfolio
                        </span>
                      )}
                      {talent.cvUrl && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          CV Available
                        </span>
                      )}
                    </div>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                      View Profile
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredTalents.length === 0 && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">No talents found</h3>
              <p className="text-gray-600">
                Try adjusting your search criteria or browse all our amazing talents.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setRoleFilter('all');
                  setLocationFilter('all');
                }}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TalentShowcase;
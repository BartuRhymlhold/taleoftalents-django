import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Users, Shield, Zap } from 'lucide-react';
import { mockTalents } from '../data/mockData';
import { TALENT_ROLES } from '../types';

const HomePage: React.FC = () => {
  const featuredTalents = mockTalents.filter(talent => talent.status === 'approved').slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Where Hospitality <span className="text-yellow-400">Talent</span> Meets Opportunity
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Connect with premier hotels and entertainment venues worldwide. Showcase your skills and land your dream job in hospitality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/auth"
                className="bg-yellow-500 text-blue-900 font-semibold px-8 py-4 rounded-lg hover:bg-yellow-400 transition-colors flex items-center justify-center group"
              >
                Apply as Talent
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
              <Link
                to="/talents"
                className="border-2 border-white text-white font-semibold px-8 py-4 rounded-lg hover:bg-white hover:text-blue-800 transition-colors"
              >
                Browse Talents
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-white" size={32} />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">500+</h3>
              <p className="text-gray-600">Verified Talents</p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="text-white" size={32} />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">150+</h3>
              <p className="text-gray-600">Partner Hotels</p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="text-white" size={32} />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">100%</h3>
              <p className="text-gray-600">Verified Profiles</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Talents */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Featured Talents</h2>
            <p className="text-xl text-gray-600">Meet some of our exceptional professionals</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {featuredTalents.map((talent) => {
              const roleInfo = TALENT_ROLES.find(r => r.value === talent.role);
              return (
                <div key={talent.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group">
                  <div className="aspect-w-1 aspect-h-1 relative">
                    <img
                      src={talent.profileImage}
                      alt={talent.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md">
                      <span className="text-2xl">{roleInfo?.icon}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{talent.name}</h3>
                    <p className="text-blue-600 font-medium mb-2">{roleInfo?.label}</p>
                    <p className="text-gray-600 text-sm mb-2">{talent.city}</p>
                    <p className="text-gray-700 text-sm line-clamp-3">{talent.bio}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <Link
              to="/talents"
              className="bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center group"
            >
              View All Talents
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Simple steps to showcase your talent</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Create Your Profile</h3>
              <p className="text-gray-600">Sign up and complete your professional profile with photos, videos, and experience details.</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Get Verified</h3>
              <p className="text-gray-600">Our moderators review and verify your profile to ensure quality and authenticity.</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Get Discovered</h3>
              <p className="text-gray-600">Hotels and venues browse verified profiles and connect with talents that match their needs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Showcase Your Talent?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of hospitality professionals who have found their perfect opportunities through our platform.
          </p>
          <Link
            to="/auth"
            className="bg-yellow-500 text-blue-900 font-semibold px-8 py-4 rounded-lg hover:bg-yellow-400 transition-colors inline-flex items-center group text-lg"
          >
            <Zap className="mr-2" size={24} />
            Get Started Today
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
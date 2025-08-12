import React from 'react';
import { Users, Award, Globe, Shield, Heart, Target, Mail, Phone, MapPin } from 'lucide-react';

const AboutPage: React.FC = () => {
  const features = [
    {
      icon: Users,
      title: 'Talent Verification',
      description: 'Every profile is carefully reviewed and verified by our expert team to ensure quality and authenticity.'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Connect with opportunities worldwide, from luxury resorts to entertainment venues in major cities.'
    },
    {
      icon: Shield,
      title: 'Secure Platform',
      description: 'Your personal information and portfolio are protected with enterprise-grade security measures.'
    },
    {
      icon: Award,
      title: 'Quality Standards',
      description: 'We maintain high standards to ensure only the best talents are showcased to our partner venues.'
    }
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=faces',
      bio: 'Former hospitality executive with 15+ years of experience in luxury hotel management.'
    },
    {
      name: 'Michael Chen',
      role: 'Head of Talent Relations',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=faces',
      bio: 'Entertainment industry veteran specializing in talent acquisition and career development.'
    },
    {
      name: 'Emma Rodriguez',
      role: 'Platform Operations',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=faces',
      bio: 'Technology leader focused on creating seamless user experiences and platform reliability.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About Tale of Talents
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8">
            Bridging the gap between exceptional hospitality talent and world-class venues since 2024.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <Target className="w-8 h-8 text-blue-600 mr-3" />
                <h2 className="text-3xl font-bold text-gray-800">Our Mission</h2>
              </div>
              <p className="text-lg text-gray-700 mb-6">
                We believe that exceptional hospitality experiences are created by exceptional people. Our mission is to connect talented professionals in the hospitality and entertainment sectors with the opportunities they deserve.
              </p>
              <p className="text-lg text-gray-700">
                By focusing on blue-collar professionals like waiters, dancers, DJs, chefs, and performers, we're filling a crucial gap in the talent marketplace and helping venues find the skilled professionals who make experiences memorable.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="flex items-center mb-4">
                <Heart className="w-6 h-6 text-red-500 mr-2" />
                <h3 className="text-xl font-semibold text-gray-800">Our Values</h3>
              </div>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Quality and professionalism in every interaction
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Respect for the dignity of all work
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Transparency and trust in our processes
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Innovation in talent discovery
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose Tale of Talents?</h2>
            <p className="text-xl text-gray-600">We provide a comprehensive platform designed specifically for hospitality professionals</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600">Passionate professionals dedicated to connecting talent with opportunity</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <h3 className="text-4xl font-bold mb-2">500+</h3>
              <p className="text-blue-100">Verified Talents</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold mb-2">150+</h3>
              <p className="text-blue-100">Partner Hotels</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold mb-2">25+</h3>
              <p className="text-blue-100">Countries</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold mb-2">95%</h3>
              <p className="text-blue-100">Success Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Get in Touch</h2>
            <p className="text-xl text-gray-600">Have questions? We'd love to hear from you.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Email Us</h3>
              <p className="text-gray-600">info@taleoftalents.com</p>
            </div>

            <div className="text-center p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Call Us</h3>
              <p className="text-gray-600">+1 (555) 123-4567</p>
            </div>

            <div className="text-center p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Visit Us</h3>
              <p className="text-gray-600">Miami, FL<br />United States</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
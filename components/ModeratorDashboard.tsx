import React, { useState } from 'react';
import { CheckCircle, XCircle, Edit, Eye, Filter, Search } from 'lucide-react';
import { mockTalents } from '../data/mockData';
import { TALENT_ROLES } from '../types';
import { Talent } from '../types';

const ModeratorDashboard: React.FC = () => {
  const [talents, setTalents] = useState<Talent[]>(mockTalents);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const handleApprove = (talentId: string) => {
    setTalents(prev => prev.map(talent => 
      talent.id === talentId ? { ...talent, status: 'approved' } : talent
    ));
  };

  const handleReject = (talentId: string) => {
    setTalents(prev => prev.map(talent => 
      talent.id === talentId ? { ...talent, status: 'rejected' } : talent
    ));
  };

  const filteredTalents = talents.filter(talent => {
    const matchesFilter = filter === 'all' || talent.status === filter;
    const matchesSearch = talent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         talent.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         talent.city.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusCount = (status: string) => {
    return talents.filter(talent => talent.status === status).length;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Moderator Dashboard</h1>
          <p className="text-gray-600">Review and manage talent applications</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-500">Total Applications</h3>
            <p className="text-2xl font-bold text-gray-800">{talents.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-500">Pending Review</h3>
            <p className="text-2xl font-bold text-yellow-600">{getStatusCount('pending')}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-500">Approved</h3>
            <p className="text-2xl font-bold text-green-600">{getStatusCount('approved')}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-500">Rejected</h3>
            <p className="text-2xl font-bold text-red-600">{getStatusCount('rejected')}</p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, role, or city..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        {/* Talents List */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">
              Talent Applications ({filteredTalents.length})
            </h2>
          </div>

          <div className="divide-y divide-gray-200">
            {filteredTalents.map((talent) => {
              const roleInfo = TALENT_ROLES.find(r => r.value === talent.role);
              return (
                <div key={talent.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start space-x-4">
                    <img
                      src={talent.profileImage}
                      alt={talent.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">{talent.name}</h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-2xl">{roleInfo?.icon}</span>
                            <span className="text-blue-600 font-medium">{roleInfo?.label}</span>
                            <span className="text-gray-400">•</span>
                            <span className="text-gray-600">{talent.city}</span>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(talent.status)}`}>
                          {talent.status.charAt(0).toUpperCase() + talent.status.slice(1)}
                        </span>
                      </div>
                      
                      <p className="text-gray-700 mt-2 line-clamp-2">{talent.bio}</p>
                      
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>📧 {talent.email}</span>
                          <span>📱 {talent.phone}</span>
                          <span>⏰ {talent.submittedAt.toLocaleDateString()}</span>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            <Eye size={16} />
                          </button>
                          <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
                            <Edit size={16} />
                          </button>
                          {talent.status !== 'approved' && (
                            <button
                              onClick={() => handleApprove(talent.id)}
                              className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors"
                            >
                              <CheckCircle size={16} />
                            </button>
                          )}
                          {talent.status !== 'rejected' && (
                            <button
                              onClick={() => handleReject(talent.id)}
                              className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <XCircle size={16} />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredTalents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No talents found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModeratorDashboard;
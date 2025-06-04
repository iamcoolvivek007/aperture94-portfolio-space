
import React, { useState } from 'react';

const ContactWindow = () => {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <div className="h-full flex flex-col">
      {/* Tabs */}
      <div className="flex border-b border-gray-400">
        <button
          className={`px-4 py-2 text-xs border-r border-gray-400 ${
            activeTab === 'general' ? 'bg-white' : 'bg-gray-200'
          }`}
          onClick={() => setActiveTab('general')}
        >
          General
        </button>
        <button
          className={`px-4 py-2 text-xs border-r border-gray-400 ${
            activeTab === 'social' ? 'bg-white' : 'bg-gray-200'
          }`}
          onClick={() => setActiveTab('social')}
        >
          Social Media
        </button>
        <button
          className={`px-4 py-2 text-xs ${
            activeTab === 'business' ? 'bg-white' : 'bg-gray-200'
          }`}
          onClick={() => setActiveTab('business')}
        >
          Business
        </button>
      </div>

      {/* Tab Content */}
      <div className="flex-1 p-4 bg-white overflow-auto">
        {activeTab === 'general' && (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="text-4xl">📧</div>
              <div>
                <h3 className="font-bold text-sm mb-1">Email Address</h3>
                <p className="text-xs mb-2">alicja@example.com</p>
                <button className="win95-button px-3 py-1 text-xs">
                  Send Mail
                </button>
              </div>
            </div>
            
            <div className="border-t border-gray-300 pt-4">
              <div className="flex items-center gap-4">
                <div className="text-4xl">📞</div>
                <div>
                  <h3 className="font-bold text-sm mb-1">Phone</h3>
                  <p className="text-xs">+1 (555) 123-4567</p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-300 pt-4">
              <div className="flex items-center gap-4">
                <div className="text-4xl">📍</div>
                <div>
                  <h3 className="font-bold text-sm mb-1">Location</h3>
                  <p className="text-xs">Available for remote work worldwide</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'social' && (
          <div className="space-y-4">
            <div className="space-y-3">
              {[
                { platform: 'LinkedIn', icon: '💼', handle: '@alicja-dev' },
                { platform: 'GitHub', icon: '🐙', handle: '@alicja-codes' },
                { platform: 'Twitter', icon: '🐦', handle: '@alicja_dev' },
                { platform: 'Instagram', icon: '📸', handle: '@alicja.codes' },
              ].map((social) => (
                <div key={social.platform} className="flex items-center justify-between p-2 border border-gray-300">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{social.icon}</span>
                    <div>
                      <div className="font-bold text-xs">{social.platform}</div>
                      <div className="text-xs text-gray-600">{social.handle}</div>
                    </div>
                  </div>
                  <button className="win95-button px-2 py-1 text-xs">
                    Visit
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'business' && (
          <div className="space-y-4">
            <div className="bg-gray-100 border border-gray-300 p-3">
              <h3 className="font-bold text-sm mb-2">Professional Services</h3>
              <ul className="text-xs space-y-1">
                <li>• Frontend Development (React, TypeScript)</li>
                <li>• Full-stack Web Applications</li>
                <li>• UI/UX Design Consultation</li>
                <li>• Code Review & Optimization</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-sm">Availability</h3>
              <p className="text-xs">Currently accepting new projects</p>
              <p className="text-xs">Response time: Within 24 hours</p>
            </div>

            <div className="flex gap-2">
              <button className="win95-button px-3 py-2 text-xs">
                💼 Download Resume
              </button>
              <button className="win95-button px-3 py-2 text-xs">
                📝 Request Quote
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactWindow;

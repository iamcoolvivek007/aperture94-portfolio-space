
import React, { useState } from 'react';

const ContactWindow = () => {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <div className="h-full flex flex-col bg-gray-200" style={{ fontFamily: 'MS Sans Serif', fontSize: '11px' }}>
      {/* Tabs */}
      <div className="flex border-b-2 border-gray-500">
        {[
          { id: 'general', label: 'General' },
          { id: 'social', label: 'Social Media' },
          { id: 'professional', label: 'Professional' }
        ].map(tab => (
          <button
            key={tab.id}
            className={`px-4 py-2 text-xs border-r border-gray-400 ${
              activeTab === tab.id 
                ? 'bg-gray-200 border-t-2 border-l-2 border-r-2 border-gray-500' 
                : 'bg-gray-300 border-t border-l border-r border-gray-500'
            }`}
            onClick={() => setActiveTab(tab.id)}
            style={{
              borderTop: activeTab === tab.id ? '2px outset #c0c0c0' : '1px outset #c0c0c0',
              borderLeft: activeTab === tab.id ? '2px outset #c0c0c0' : '1px outset #c0c0c0',
              borderRight: activeTab === tab.id ? '2px outset #c0c0c0' : '1px outset #c0c0c0'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 p-4 bg-gray-200 overflow-auto">
        {activeTab === 'general' && (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="text-4xl">📧</div>
              <div>
                <h3 className="font-bold text-sm mb-1">Primary Email</h3>
                <p className="text-xs mb-2">vivekanandpanigrahy@gmail.com</p>
                <button 
                  className="win95-button px-3 py-1 text-xs"
                  onClick={() => window.open('mailto:vivekanandpanigrahy@gmail.com')}
                >
                  📤 Send Mail
                </button>
              </div>
            </div>
            
            <div className="border-t-2 border-gray-500 pt-4" style={{ borderTop: '2px inset #c0c0c0' }}>
              <div className="flex items-center gap-4">
                <div className="text-4xl">📱</div>
                <div>
                  <h3 className="font-bold text-sm mb-1">Contact</h3>
                  <p className="text-xs">Available via email & social platforms</p>
                  <p className="text-xs">Response time: Within 24 hours</p>
                </div>
              </div>
            </div>

            <div className="border-t-2 border-gray-500 pt-4" style={{ borderTop: '2px inset #c0c0c0' }}>
              <div className="flex items-center gap-4">
                <div className="text-4xl">🏫</div>
                <div>
                  <h3 className="font-bold text-sm mb-1">Education</h3>
                  <p className="text-xs">IIIT Bhubaneswar</p>
                  <p className="text-xs">B.Tech Computer Science & Engineering</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'social' && (
          <div className="space-y-3">
            {[
              { 
                platform: 'LinkedIn', 
                icon: '💼', 
                handle: 'vivekanand-panigrahy',
                url: 'https://linkedin.com/in/vivekanand-panigrahy'
              },
              { 
                platform: 'GitHub', 
                icon: '🐙', 
                handle: 'vivekanandpv',
                url: 'https://github.com/vivekanandpv'
              },
              { 
                platform: 'Portfolio', 
                icon: '🌐', 
                handle: 'portfoliovivekanand.netlify.app',
                url: 'https://portfoliovivekanand.netlify.app'
              },
              { 
                platform: 'Instagram', 
                icon: '📸', 
                handle: '@vivekanand.dev',
                url: '#'
              }
            ].map((social) => (
              <div key={social.platform} className="flex items-center justify-between p-2 bg-white border-2 border-gray-500" style={{ border: '2px inset #c0c0c0' }}>
                <div className="flex items-center gap-3">
                  <span className="text-xl">{social.icon}</span>
                  <div>
                    <div className="font-bold text-xs">{social.platform}</div>
                    <div className="text-xs text-gray-600">{social.handle}</div>
                  </div>
                </div>
                <button 
                  className="win95-button px-2 py-1 text-xs"
                  onClick={() => social.url !== '#' && window.open(social.url, '_blank')}
                >
                  🔗 Visit
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'professional' && (
          <div className="space-y-4">
            <div className="bg-white border-2 border-gray-500 p-3" style={{ border: '2px inset #c0c0c0' }}>
              <h3 className="font-bold text-sm mb-2">🚀 Services Offered</h3>
              <ul className="text-xs space-y-1">
                <li>• Full-Stack Web Development (MERN/MEAN)</li>
                <li>• Frontend Development (React, Next.js, TypeScript)</li>
                <li>• Backend Development (Node.js, Python, APIs)</li>
                <li>• Database Design & Management</li>
                <li>• UI/UX Design & Implementation</li>
                <li>• Code Review & Technical Consultation</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-sm">📊 Current Status</h3>
              <div className="bg-green-100 border border-green-400 p-2 text-xs">
                <p>✅ Open to Internship Opportunities</p>
                <p>✅ Available for Freelance Projects</p>
                <p>✅ Seeking Full-time Positions (2025)</p>
              </div>
            </div>

            <div className="flex gap-2 flex-wrap">
              <button 
                className="win95-button px-3 py-2 text-xs"
                onClick={() => window.open('https://portfoliovivekanand.netlify.app', '_blank')}
              >
                📄 View Resume
              </button>
              <button 
                className="win95-button px-3 py-2 text-xs"
                onClick={() => window.open('mailto:vivekanandpanigrahy@gmail.com?subject=Project Inquiry', '_blank')}
              >
                💬 Discuss Project
              </button>
              <button 
                className="win95-button px-3 py-2 text-xs"
                onClick={() => window.open('https://portfoliovivekanand.netlify.app', '_blank')}
              >
                🎯 View Projects
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactWindow;

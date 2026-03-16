import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Save,
  User,
  Mail,
  MapPin,
  Phone,
  Github,
  Linkedin,
  Twitter,
  Globe,
  CheckCircle,
  Camera,
  Briefcase,
  Award,
  Clock,
  Instagram,
  Youtube,
  ExternalLink,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { usePortfolioData } from '../../contexts/DataContext';

export default function SettingsManager() {
  const { data, updateSettings, isSyncing, syncError } = usePortfolioData();
  const [settings, setSettings] = useState(data.settings);
  const [saved, setSaved] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'contact' | 'social' | 'resume'>('profile');

  // Only sync from Firebase when NOT editing locally
  useEffect(() => {
    if (!hasChanges) {
      setSettings(data.settings);
    }
  }, [data.settings, hasChanges]);

  const handleSave = () => {
    console.log('Saving settings:', settings);
    updateSettings(settings);
    setSaved(true);
    setHasChanges(false);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleChange = (field: string, value: string | number | boolean | string[]) => {
    setHasChanges(true);
    const fields = field.split('.');
    if (fields.length === 1) {
      setSettings(prev => ({ ...prev, [field]: value }));
    } else if (fields.length === 2) {
      const [parent, child] = fields;
      setSettings(prev => ({
        ...prev,
        [parent]: {
          ...(prev as any)[parent],
          [child]: value
        }
      }));
    }
  };

  const handleSpecializationsChange = (value: string) => {
    const specs = value.split(',').map(s => s.trim()).filter(Boolean);
    handleChange('profile.specializations', specs);
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <User className="w-4 h-4" /> },
    { id: 'contact', label: 'Contact', icon: <Mail className="w-4 h-4" /> },
    { id: 'social', label: 'Social', icon: <Globe className="w-4 h-4" /> },
    { id: 'resume', label: 'Resume', icon: <Briefcase className="w-4 h-4" /> },
  ];

  return (
    <div className="space-y-6">
      {/* Sync Error Banner */}
      {syncError && (
        <div className="bg-orange-500/20 border border-orange-500/30 rounded-lg p-3 flex items-center gap-2 text-orange-400 text-sm">
          <AlertCircle className="w-4 h-4" />
          {syncError}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-cyber font-bold text-accent">Site Settings</h2>
          <p className="text-sm text-gray-400 font-mono">
            Configure your portfolio information
            {hasChanges && <span className="text-yellow-400 ml-2">(unsaved changes)</span>}
          </p>
        </div>
        <motion.button
          onClick={handleSave}
          disabled={isSyncing}
          className={`cyber-button flex items-center gap-2 ${hasChanges ? 'border-yellow-400/50' : ''}`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isSyncing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Syncing...
            </>
          ) : saved ? (
            <>
              <CheckCircle className="w-5 h-5 text-green-400" />
              Saved!
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              Save Changes
            </>
          )}
        </motion.button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-cyber-light/20 pb-4">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-sm transition-all ${
              activeTab === tab.id
                ? 'bg-primary/20 text-primary border border-primary/30'
                : 'text-gray-400 hover:bg-cyber-light/10 hover:text-accent'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="space-y-6">
          {/* Profile Picture & Cover */}
          <div className="cyber-card p-6">
            <h3 className="text-lg font-cyber font-bold text-accent mb-6 flex items-center gap-2">
              <Camera className="w-5 h-5 text-primary" />
              Profile Images
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Profile Picture */}
              <div>
                <label className="block text-sm font-mono text-accent mb-2">
                  Profile Picture URL
                </label>
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-20 h-20 rounded-full bg-cyber-light/20 border-2 border-primary/30 overflow-hidden flex items-center justify-center">
                    {settings.profile?.profilePicture ? (
                      <img 
                        src={settings.profile.profilePicture} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    ) : (
                      <User className="w-8 h-8 text-gray-500" />
                    )}
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      value={settings.profile?.profilePicture || ''}
                      onChange={(e) => handleChange('profile.profilePicture', e.target.value)}
                      className="terminal-input w-full"
                      placeholder="/images/profile.png"
                    />
                  </div>
                </div>
                <p className="text-xs text-gray-500 font-mono">
                  Place your image in public/images/ folder
                </p>
              </div>

              {/* Cover Image */}
              <div>
                <label className="block text-sm font-mono text-accent mb-2">
                  Cover Image URL
                </label>
                <div className="h-20 rounded-lg bg-cyber-light/10 border border-cyber-light/20 overflow-hidden mb-3">
                  {settings.profile?.coverImage && (
                    <img 
                      src={settings.profile.coverImage} 
                      alt="Cover" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  )}
                </div>
                <input
                  type="text"
                  value={settings.profile?.coverImage || ''}
                  onChange={(e) => handleChange('profile.coverImage', e.target.value)}
                  className="terminal-input w-full"
                  placeholder="/images/cover.jpg"
                />
              </div>
            </div>
          </div>

          {/* Basic Info */}
          <div className="cyber-card p-6">
            <h3 className="text-lg font-cyber font-bold text-accent mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Basic Information
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-mono text-accent mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={settings.profile?.fullName || settings.siteName}
                  onChange={(e) => handleChange('profile.fullName', e.target.value)}
                  className="terminal-input w-full"
                  placeholder="Your Full Name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-mono text-accent mb-2">
                  Display Name
                </label>
                <input
                  type="text"
                  value={settings.profile?.displayName || ''}
                  onChange={(e) => handleChange('profile.displayName', e.target.value)}
                  className="terminal-input w-full"
                  placeholder="Nickname or First Name"
                />
              </div>

              <div>
                <label className="block text-sm font-mono text-accent mb-2">
                  Professional Title
                </label>
                <input
                  type="text"
                  value={settings.profile?.title || settings.tagline}
                  onChange={(e) => handleChange('profile.title', e.target.value)}
                  className="terminal-input w-full"
                  placeholder="Full Stack Developer"
                />
              </div>

              <div>
                <label className="block text-sm font-mono text-accent mb-2 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  Years of Experience
                </label>
                <input
                  type="number"
                  value={settings.profile?.yearsOfExperience || 0}
                  onChange={(e) => handleChange('profile.yearsOfExperience', parseInt(e.target.value) || 0)}
                  className="terminal-input w-full"
                  min="0"
                  max="50"
                />
              </div>

              <div>
                <label className="block text-sm font-mono text-accent mb-2">
                  Current Company
                </label>
                <input
                  type="text"
                  value={settings.profile?.currentCompany || ''}
                  onChange={(e) => handleChange('profile.currentCompany', e.target.value)}
                  className="terminal-input w-full"
                  placeholder="Company Name or Freelance"
                />
              </div>

              <div>
                <label className="block text-sm font-mono text-accent mb-2">
                  Current Role
                </label>
                <input
                  type="text"
                  value={settings.profile?.currentRole || ''}
                  onChange={(e) => handleChange('profile.currentRole', e.target.value)}
                  className="terminal-input w-full"
                  placeholder="Your current position"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-mono text-accent mb-2">
                Short Bio (One-liner)
              </label>
              <input
                type="text"
                value={settings.profile?.shortBio || ''}
                onChange={(e) => handleChange('profile.shortBio', e.target.value)}
                className="terminal-input w-full"
                placeholder="Computer Engineer | Developer | Creator"
              />
            </div>

            <div className="mt-6">
              <label className="block text-sm font-mono text-accent mb-2">
                Full Bio
              </label>
              <textarea
                value={settings.profile?.bio || ''}
                onChange={(e) => handleChange('profile.bio', e.target.value)}
                className="terminal-input w-full resize-none"
                rows={4}
                placeholder="Tell your story..."
              />
            </div>

            <div className="mt-6">
              <label className="block text-sm font-mono text-accent mb-2 flex items-center gap-2">
                <Award className="w-4 h-4 text-gray-400" />
                Specializations (comma-separated)
              </label>
              <input
                type="text"
                value={settings.profile?.specializations?.join(', ') || ''}
                onChange={(e) => handleSpecializationsChange(e.target.value)}
                className="terminal-input w-full"
                placeholder="Web Development, AI/ML, IoT"
              />
              <div className="flex flex-wrap gap-2 mt-3">
                {settings.profile?.specializations?.map((spec, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 bg-primary/20 border border-primary/30 rounded text-xs font-mono text-primary"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <input
                type="checkbox"
                id="availableForHire"
                checked={settings.profile?.availableForHire || false}
                onChange={(e) => handleChange('profile.availableForHire', e.target.checked)}
                className="w-5 h-5 rounded border-cyber-light/30 bg-cyber-light/10 text-primary focus:ring-primary"
              />
              <label htmlFor="availableForHire" className="text-sm font-mono text-accent">
                Available for Hire
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Contact Tab */}
      {activeTab === 'contact' && (
        <div className="cyber-card p-6">
          <h3 className="text-lg font-cyber font-bold text-accent mb-6 flex items-center gap-2">
            <Mail className="w-5 h-5 text-primary" />
            Contact Information
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-mono text-accent mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-400" />
                Email Address
              </label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="terminal-input w-full"
                placeholder="your@email.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-mono text-accent mb-2 flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-400" />
                Phone Number
              </label>
              <input
                type="tel"
                value={settings.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="terminal-input w-full"
                placeholder="+1 234 567 8900"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-mono text-accent mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                Location
              </label>
              <input
                type="text"
                value={settings.location}
                onChange={(e) => handleChange('location', e.target.value)}
                className="terminal-input w-full"
                placeholder="City, Country"
              />
            </div>

            <div>
              <label className="block text-sm font-mono text-accent mb-2">
                Site Name
              </label>
              <input
                type="text"
                value={settings.siteName}
                onChange={(e) => handleChange('siteName', e.target.value)}
                className="terminal-input w-full"
                placeholder="Your Name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-mono text-accent mb-2">
                Tagline
              </label>
              <input
                type="text"
                value={settings.tagline}
                onChange={(e) => handleChange('tagline', e.target.value)}
                className="terminal-input w-full"
                placeholder="Full Stack Developer"
              />
            </div>
          </div>
        </div>
      )}

      {/* Social Tab */}
      {activeTab === 'social' && (
        <div className="cyber-card p-6">
          <h3 className="text-lg font-cyber font-bold text-accent mb-6 flex items-center gap-2">
            <Globe className="w-5 h-5 text-primary" />
            Social Links
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-mono text-accent mb-2 flex items-center gap-2">
                <Github className="w-4 h-4 text-gray-400" />
                GitHub
              </label>
              <input
                type="url"
                value={settings.socials?.github || ''}
                onChange={(e) => handleChange('socials.github', e.target.value)}
                className="terminal-input w-full"
                placeholder="https://github.com/username"
              />
            </div>
            
            <div>
              <label className="block text-sm font-mono text-accent mb-2 flex items-center gap-2">
                <Linkedin className="w-4 h-4 text-gray-400" />
                LinkedIn
              </label>
              <input
                type="url"
                value={settings.socials?.linkedin || ''}
                onChange={(e) => handleChange('socials.linkedin', e.target.value)}
                className="terminal-input w-full"
                placeholder="https://linkedin.com/in/username"
              />
            </div>
            
            <div>
              <label className="block text-sm font-mono text-accent mb-2 flex items-center gap-2">
                <Twitter className="w-4 h-4 text-gray-400" />
                Twitter / X
              </label>
              <input
                type="url"
                value={settings.socials?.twitter || ''}
                onChange={(e) => handleChange('socials.twitter', e.target.value)}
                className="terminal-input w-full"
                placeholder="https://twitter.com/username"
              />
            </div>

            <div>
              <label className="block text-sm font-mono text-accent mb-2 flex items-center gap-2">
                <Instagram className="w-4 h-4 text-gray-400" />
                Instagram
              </label>
              <input
                type="url"
                value={settings.socials?.instagram || ''}
                onChange={(e) => handleChange('socials.instagram', e.target.value)}
                className="terminal-input w-full"
                placeholder="https://instagram.com/username"
              />
            </div>

            <div>
              <label className="block text-sm font-mono text-accent mb-2 flex items-center gap-2">
                <Youtube className="w-4 h-4 text-gray-400" />
                YouTube
              </label>
              <input
                type="url"
                value={settings.socials?.youtube || ''}
                onChange={(e) => handleChange('socials.youtube', e.target.value)}
                className="terminal-input w-full"
                placeholder="https://youtube.com/@channel"
              />
            </div>

            <div>
              <label className="block text-sm font-mono text-accent mb-2 flex items-center gap-2">
                <ExternalLink className="w-4 h-4 text-gray-400" />
                Personal Website
              </label>
              <input
                type="url"
                value={settings.socials?.website || ''}
                onChange={(e) => handleChange('socials.website', e.target.value)}
                className="terminal-input w-full"
                placeholder="https://yourwebsite.com"
              />
            </div>
          </div>
        </div>
      )}

      {/* Resume Tab */}
      {activeTab === 'resume' && (
        <div className="cyber-card p-6">
          <h3 className="text-lg font-cyber font-bold text-accent mb-6 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-primary" />
            Resume / CV
          </h3>
          
          <div>
            <label className="block text-sm font-mono text-accent mb-2">
              Resume URL (PDF)
            </label>
            <input
              type="text"
              value={settings.resumeUrl || ''}
              onChange={(e) => handleChange('resumeUrl', e.target.value)}
              className="terminal-input w-full"
              placeholder="/cv/your-resume.pdf"
            />
            <p className="text-xs text-gray-500 font-mono mt-2">
              Upload your resume to the public/cv/ folder and enter the path here
            </p>
          </div>

          <div className="mt-6 p-4 bg-cyber-light/5 border border-cyber-light/20 rounded-lg">
            <h4 className="text-sm font-cyber font-bold text-accent mb-2">How to add your resume:</h4>
            <ol className="text-xs text-gray-400 font-mono space-y-1 list-decimal list-inside">
              <li>Create a folder called "cv" inside the "public" folder</li>
              <li>Place your PDF resume in the "cv" folder</li>
              <li>Enter the path as: /cv/your-filename.pdf</li>
              <li>Click Save Changes</li>
            </ol>
          </div>
        </div>
      )}
    </div>
  );
}

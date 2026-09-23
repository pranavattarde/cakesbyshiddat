import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAdminAuth } from './AdminAuthContext';
import { useSiteContent } from '../../contexts/SiteContentContext';
import { api } from '../../services/api';
import { MediaItem, ServiceCategory, MascotItem, OtherServiceItem } from '../../services/site-content.service';
import {
  FaLayerGroup,
  FaBirthdayCake,
  FaCalendarAlt,
  FaPhotoVideo,
  FaSignOutAlt,
  FaHome,
  FaPlus,
  FaTrash,
  FaEdit,
  FaCheck,
  FaTimes,
  FaInstagram,
  FaCloudUploadAlt,
  FaSlidersH,
  FaExternalLinkAlt,
  FaSync,
  FaMagic,
  FaUserFriends,
} from 'react-icons/fa';

type AdminTab = 'dashboard' | 'hero' | 'cakes' | 'events' | 'mascots' | 'otherServices' | 'media' | 'inquiries' | 'settings';

export const AdminPanel: React.FC = () => {
  const navigate = useNavigate();
  const { logout, user } = useAdminAuth();
  const { content, updateContent, resetContent } = useSiteContent();

  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [successMessage, setSuccessMessage] = useState('');

  // Media upload state
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState('');
  const [uploadError, setUploadError] = useState('');

  // Quick Notification Helper
  const notify = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(''), 4000);
  };

  // HERO SECTION MEDIA EDITING
  const [heroService, setHeroService] = useState<'cakes' | 'events' | 'mascots'>('cakes');
  const [newHeroMedia, setNewHeroMedia] = useState<Partial<MediaItem>>({
    type: 'image',
    url: '',
    title: '',
    duration: 4,
  });

  const handleAddHeroMedia = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHeroMedia.url) return;

    const newItem: MediaItem = {
      id: `hero-${heroService}-${Date.now()}`,
      type: newHeroMedia.type || 'image',
      url: newHeroMedia.url.trim(),
      title: newHeroMedia.title?.trim() || `${heroService.toUpperCase()} Feature`,
      duration: newHeroMedia.duration || 4,
      displayOrder: content.hero[heroService].media.length + 1,
      active: true,
    };

    const updated = { ...content };
    updated.hero[heroService].media.push(newItem);
    updateContent(updated);
    setNewHeroMedia({ type: 'image', url: '', title: '', duration: 4 });
    notify(`Added new media item to ${heroService} hero deck!`);
  };

  const handleRemoveHeroMedia = (service: 'cakes' | 'events' | 'mascots', id: string) => {
    const updated = { ...content };
    updated.hero[service].media = updated.hero[service].media.filter((m) => m.id !== id);
    updateContent(updated);
    notify('Removed hero media item.');
  };

  // CAKES MANAGEMENT
  const [newCakeCat, setNewCakeCat] = useState<Partial<ServiceCategory>>({
    title: '',
    subtitle: '',
    description: '',
    coverImage: '',
    startingPrice: '₹1,500',
  });

  const handleAddCakeCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCakeCat.title) return;

    const slug = newCakeCat.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newCategory: ServiceCategory = {
      id: slug,
      slug,
      title: newCakeCat.title,
      subtitle: newCakeCat.subtitle || '',
      description: newCakeCat.description || '',
      coverImage: newCakeCat.coverImage || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587',
      startingPrice: newCakeCat.startingPrice || '₹1,500',
      features: ['Eggless options available', 'Custom theme design', 'Fresh artisanal ingredients'],
      media: [],
      displayOrder: content.cakeCategories.length + 1,
      active: true,
    };

    const updated = { ...content };
    updated.cakeCategories.push(newCategory);
    updateContent(updated);
    setNewCakeCat({ title: '', subtitle: '', description: '', coverImage: '', startingPrice: '₹1,500' });
    notify(`Category "${newCategory.title}" created successfully!`);
  };

  const handleDeleteCakeCategory = (id: string) => {
    if (!confirm('Are you sure you want to delete this category?')) return;
    const updated = { ...content };
    updated.cakeCategories = updated.cakeCategories.filter((c) => c.id !== id);
    updateContent(updated);
    notify('Cake category deleted.');
  };

  const handleToggleCakeActive = (id: string) => {
    const updated = { ...content };
    const target = updated.cakeCategories.find((c) => c.id === id);
    if (target) {
      target.active = !target.active;
      updateContent(updated);
      notify(`Category ${target.title} is now ${target.active ? 'active' : 'disabled'}.`);
    }
  };

  // EVENTS MANAGEMENT
  const [newEventCat, setNewEventCat] = useState<Partial<ServiceCategory>>({
    title: '',
    subtitle: '',
    description: '',
    coverImage: '',
  });

  const handleAddEventCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventCat.title) return;

    const slug = newEventCat.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newCat: ServiceCategory = {
      id: slug,
      slug,
      title: newEventCat.title,
      subtitle: newEventCat.subtitle || '',
      description: newEventCat.description || '',
      coverImage: newEventCat.coverImage || 'https://images.unsplash.com/photo-1519225421980-715cb0215aed',
      features: ['Custom Thematic Decor', 'Stage & Entrance Styling', 'On-Site Coordination'],
      media: [],
      displayOrder: content.eventCategories.length + 1,
      active: true,
    };

    const updated = { ...content };
    updated.eventCategories.push(newCat);
    updateContent(updated);
    setNewEventCat({ title: '', subtitle: '', description: '', coverImage: '' });
    notify(`Event category "${newCat.title}" created!`);
  };

  const handleDeleteEventCategory = (id: string) => {
    if (!confirm('Are you sure you want to delete this event category?')) return;
    const updated = { ...content };
    updated.eventCategories = updated.eventCategories.filter((c) => c.id !== id);
    updateContent(updated);
    notify('Event category deleted.');
  };

  const handleToggleEventActive = (id: string) => {
    const updated = { ...content };
    const target = updated.eventCategories.find((c) => c.id === id);
    if (target) {
      target.active = !target.active;
      updateContent(updated);
      notify(`Event ${target.title} is now ${target.active ? 'active' : 'disabled'}.`);
    }
  };

  // MASCOTS MANAGEMENT
  const [newMascot, setNewMascot] = useState<Partial<MascotItem>>({
    name: '',
    tagline: '',
    description: '',
    image: '',
  });

  const handleAddMascot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMascot.name) return;

    const slug = newMascot.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const item: MascotItem = {
      id: slug,
      slug,
      name: newMascot.name,
      tagline: newMascot.tagline || 'Party Entertainer',
      description: newMascot.description || '',
      image: newMascot.image || 'https://images.unsplash.com/photo-1517841905240-472988babdf9',
      features: ['Grand Entry Walk', 'Cake Cutting Celebration', 'Kids Photo Sessions'],
      popularFor: ['Birthdays', 'Family Celebrations'],
      displayOrder: content.mascots.length + 1,
      active: true,
    };

    const updated = { ...content };
    updated.mascots.push(item);
    updateContent(updated);
    setNewMascot({ name: '', tagline: '', description: '', image: '' });
    notify(`Mascot "${item.name}" added successfully!`);
  };

  const handleDeleteMascot = (id: string) => {
    if (!confirm('Delete this mascot?')) return;
    const updated = { ...content };
    updated.mascots = updated.mascots.filter((m) => m.id !== id);
    updateContent(updated);
    notify('Mascot removed.');
  };

  // OTHER SERVICES MANAGEMENT
  const handleToggleOtherServiceActive = (id: string) => {
    const updated = { ...content };
    const target = updated.otherServices.find((s) => s.id === id);
    if (target) {
      target.active = !target.active;
      updateContent(updated);
      notify(`Service ${target.title} is now ${target.active ? 'active' : 'disabled'}.`);
    }
  };

  // MEDIA UPLOADER (Cloudinary via backend API or fallback)
  const handleUploadImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFile) return;

    setUploading(true);
    setUploadError('');
    setUploadedUrl('');

    try {
      const formData = new FormData();
      formData.append('file', uploadFile);
      formData.append('folder', 'cakesbyshiddat');

      const res = await api.post('/media/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (res.data?.secureUrl || res.data?.url) {
        const url = res.data.secureUrl || res.data.url;
        setUploadedUrl(url);
        notify('Image successfully uploaded to Cloudinary!');
      } else {
        throw new Error('Upload response missing URL');
      }
    } catch {
      // Create local object URL for instant preview
      const localUrl = URL.createObjectURL(uploadFile);
      setUploadedUrl(localUrl);
      notify('Image preview ready! (Cloudinary backend is offline, preview mode active)');
    } finally {
      setUploading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#faf3ed] flex flex-col">
      {/* Top Admin Header */}
      <header className="sticky top-0 z-40 bg-[#fffaf6] border-b border-[#ebdcd3] shadow-sm">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 group">
              <span className="w-9 h-9 rounded-2xl bg-[#d7a88c] text-white flex items-center justify-center font-bold text-lg shadow-sm">
                🎂
              </span>
              <div>
                <h1 className="text-xl font-bold text-[#3a2d28]" style={{ fontFamily: 'Playfair Display' }}>
                  Cakes By Shiddat
                </h1>
                <span className="text-[10px] uppercase tracking-[3px] text-[#b89a89] font-semibold block">
                  In-Built Content Management
                </span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#edd7cb] bg-white text-xs font-semibold text-[#523d34] hover:bg-[#faede5] transition"
            >
              <span>View Main Website</span>
              <FaExternalLinkAlt className="text-[10px]" />
            </Link>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#fdeee4] hover:bg-rose-100 text-rose-700 text-xs font-semibold transition"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Body with Sidebar + Tab Content */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar Nav */}
        <aside className="w-full md:w-64 bg-[#fffaf6] border-r border-[#ebdcd3] p-4 flex md:flex-col gap-1 overflow-x-auto shrink-0">
          {[
            { id: 'dashboard', label: 'Dashboard Overview', icon: <FaHome /> },
            { id: 'hero', label: 'Hero 3-Card Media', icon: <FaLayerGroup /> },
            { id: 'cakes', label: 'Cakes Categories', icon: <FaBirthdayCake /> },
            { id: 'events', label: 'Events Categories', icon: <FaCalendarAlt /> },
            { id: 'mascots', label: 'Mascots & Reels', icon: <FaUserFriends /> },
            { id: 'otherServices', label: 'Other Services', icon: <FaMagic /> },
            { id: 'media', label: 'Media Library & Upload', icon: <FaPhotoVideo /> },
            { id: 'settings', label: 'Reset & Settings', icon: <FaSlidersH /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as AdminTab)}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-semibold transition text-left shrink-0 ${
                activeTab === tab.id
                  ? 'bg-[#d7a88c] text-white shadow-md'
                  : 'text-[#695349] hover:bg-[#faede5]'
              }`}
            >
              <span className="text-sm">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-6 sm:p-10 max-w-6xl">
          {/* Notification Alert */}
          {successMessage && (
            <div className="mb-6 rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-emerald-800 text-sm font-medium flex items-center gap-2 shadow-sm">
              <FaCheck className="text-emerald-600" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* TAB 1: DASHBOARD OVERVIEW */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              <div>
                <span className="text-xs uppercase tracking-[3px] text-[#c99a7d] font-bold">Store Administration</span>
                <h2 className="text-3xl font-bold text-[#3a2d28] mt-1" style={{ fontFamily: 'Playfair Display' }}>
                  Welcome to Content Control
                </h2>
                <p className="text-sm text-[#8a7a72] mt-1">
                  Manage live website confections, event packages, mascot reels, and hero deck playlists without touching code.
                </p>
              </div>

              {/* Statistics Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="p-6 rounded-3xl bg-white border border-[#edd7cb] shadow-sm">
                  <span className="text-xs uppercase tracking-wider text-[#b89a89] font-bold">Hero Media Items</span>
                  <h3 className="text-3xl font-bold text-[#3a2d28] mt-2">
                    {content.hero.cakes.media.length + content.hero.events.media.length + content.hero.mascots.media.length}
                  </h3>
                  <p className="text-xs text-[#8a7a72] mt-1">Cakes, Events & Mascots decks</p>
                </div>
                <div className="p-6 rounded-3xl bg-white border border-[#edd7cb] shadow-sm">
                  <span className="text-xs uppercase tracking-wider text-[#b89a89] font-bold">Cake Categories</span>
                  <h3 className="text-3xl font-bold text-[#3a2d28] mt-2">{content.cakeCategories.length}</h3>
                  <p className="text-xs text-[#8a7a72] mt-1">Including Luxury Cakes</p>
                </div>
                <div className="p-6 rounded-3xl bg-white border border-[#edd7cb] shadow-sm">
                  <span className="text-xs uppercase tracking-wider text-[#b89a89] font-bold">Event Categories</span>
                  <h3 className="text-3xl font-bold text-[#3a2d28] mt-2">{content.eventCategories.length}</h3>
                  <p className="text-xs text-[#8a7a72] mt-1">Wedding, Birthday, Retirement...</p>
                </div>
                <div className="p-6 rounded-3xl bg-white border border-[#edd7cb] shadow-sm">
                  <span className="text-xs uppercase tracking-wider text-[#b89a89] font-bold">Other Services</span>
                  <h3 className="text-3xl font-bold text-[#3a2d28] mt-2">{content.otherServices.length}</h3>
                  <p className="text-xs text-[#8a7a72] mt-1">Anchor, Magician, Games, SFX...</p>
                </div>
              </div>

              {/* Quick Actions Card */}
              <div className="rounded-3xl bg-white border border-[#edd7cb] p-8 shadow-sm">
                <h3 className="text-xl font-bold text-[#3a2d28] mb-4" style={{ fontFamily: 'Playfair Display' }}>
                  Quick Shortcuts
                </h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  <button
                    onClick={() => {
                      setHeroService('cakes');
                      setActiveTab('hero');
                    }}
                    className="p-4 rounded-2xl bg-[#fffaf6] border border-[#f0dfd7] hover:border-[#d7a88c] text-left transition"
                  >
                    <span className="text-xl mb-1 block">🎂</span>
                    <strong className="text-sm text-[#3a2d28] block">Manage Hero Media</strong>
                    <span className="text-xs text-[#8a7a72]">Edit Cloudinary & Reel playlists</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('cakes')}
                    className="p-4 rounded-2xl bg-[#fffaf6] border border-[#f0dfd7] hover:border-[#d7a88c] text-left transition"
                  >
                    <span className="text-xl mb-1 block">✨</span>
                    <strong className="text-sm text-[#3a2d28] block">Add Cake Category</strong>
                    <span className="text-xs text-[#8a7a72]">Create new styles & starting prices</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('media')}
                    className="p-4 rounded-2xl bg-[#fffaf6] border border-[#f0dfd7] hover:border-[#d7a88c] text-left transition"
                  >
                    <span className="text-xl mb-1 block">☁️</span>
                    <strong className="text-sm text-[#3a2d28] block">Cloudinary Media Library</strong>
                    <span className="text-xs text-[#8a7a72]">Upload high-res photos and videos</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: HERO 3-CARD MEDIA MANAGER */}
          {activeTab === 'hero' && (
            <div className="space-y-8">
              <div>
                <span className="text-xs uppercase tracking-[3px] text-[#c99a7d] font-bold">Homepage Deck</span>
                <h2 className="text-3xl font-bold text-[#3a2d28] mt-1" style={{ fontFamily: 'Playfair Display' }}>
                  Hero Service Cards Playlist
                </h2>
                <p className="text-sm text-[#8a7a72] mt-1">
                  Control the live media rotating inside each of the 3 hero cards (Images cycle every 4s; Videos/Reels play naturally).
                </p>
              </div>

              {/* Service Selector Tabs */}
              <div className="flex gap-3 border-b border-[#ecd8cc] pb-4">
                {(['cakes', 'events', 'mascots'] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setHeroService(s)}
                    className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition ${
                      heroService === s
                        ? 'bg-[#d7a88c] text-white shadow-md'
                        : 'bg-white border border-[#ecd7cb] text-[#695349] hover:bg-[#faede5]'
                    }`}
                  >
                    {s === 'cakes' ? '🎂 Cakes Card' : s === 'events' ? '🎉 Events Card' : '🧸 Mascots Card'} (
                    {content.hero[s].media.length})
                  </button>
                ))}
              </div>

              {/* Add New Media Form */}
              <div className="rounded-3xl bg-white border border-[#edd7cb] p-6 sm:p-8 shadow-sm">
                <h3 className="text-lg font-bold text-[#3a2d28] mb-4">
                  Add Media to {heroService.toUpperCase()} Card
                </h3>
                <form onSubmit={handleAddHeroMedia} className="space-y-4">
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#695349] font-semibold mb-1">
                        Media Type
                      </label>
                      <select
                        value={newHeroMedia.type}
                        onChange={(e) => setNewHeroMedia({ ...newHeroMedia, type: e.target.value as any })}
                        className="w-full rounded-2xl border border-[#eddcd2] p-3 text-sm text-[#3a2d28] bg-white"
                      >
                        <option value="image">Image (Cloudinary / Web)</option>
                        <option value="instagram">Instagram Reel</option>
                        <option value="video">Direct MP4 Video</option>
                        <option value="youtube">YouTube Video</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs uppercase tracking-wider text-[#695349] font-semibold mb-1">
                        URL (Cloudinary, Instagram Reel, or Image link) *
                      </label>
                      <input
                        type="url"
                        required
                        placeholder="https://res.cloudinary.com/... or https://www.instagram.com/reel/..."
                        value={newHeroMedia.url}
                        onChange={(e) => setNewHeroMedia({ ...newHeroMedia, url: e.target.value })}
                        className="w-full rounded-2xl border border-[#eddcd2] p-3 text-sm text-[#3a2d28] bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#695349] font-semibold mb-1">
                        Title / Caption
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Grand Multi-Tier Wedding Cake"
                        value={newHeroMedia.title}
                        onChange={(e) => setNewHeroMedia({ ...newHeroMedia, title: e.target.value })}
                        className="w-full rounded-2xl border border-[#eddcd2] p-3 text-sm text-[#3a2d28] bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#695349] font-semibold mb-1">
                        Duration (seconds — images default to 4s)
                      </label>
                      <input
                        type="number"
                        min="2"
                        max="60"
                        value={newHeroMedia.duration}
                        onChange={(e) => setNewHeroMedia({ ...newHeroMedia, duration: Number(e.target.value) })}
                        className="w-full rounded-2xl border border-[#eddcd2] p-3 text-sm text-[#3a2d28] bg-white"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="rounded-full bg-[#d7a88c] hover:bg-[#c99a7d] text-white px-6 py-3 text-sm font-medium transition flex items-center gap-2 shadow-sm"
                  >
                    <FaPlus /> Add to {heroService} Playlist
                  </button>
                </form>
              </div>

              {/* Current Active Media List */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-[#3a2d28]">
                  Current Playlist for {heroService.toUpperCase()} ({content.hero[heroService].media.length})
                </h3>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {content.hero[heroService].media.map((item, index) => (
                    <div
                      key={item.id}
                      className="rounded-3xl border border-[#edd7cb] bg-white p-4 shadow-sm flex flex-col justify-between"
                    >
                      <div>
                        <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-black/5 mb-3">
                          {item.type === 'instagram' ? (
                            <div className="w-full h-full flex flex-col items-center justify-center bg-[#251820] text-pink-300 p-4 text-center">
                              <FaInstagram className="text-3xl mb-1" />
                              <span className="text-xs truncate max-w-full">{item.url}</span>
                            </div>
                          ) : (
                            <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
                          )}
                          <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-black/60 text-white text-[10px] font-semibold uppercase">
                            #{index + 1} {item.type}
                          </span>
                        </div>

                        <h4 className="text-sm font-bold text-[#3a2d28] line-clamp-1">{item.title}</h4>
                        <p className="text-xs text-[#8a7a72] mt-0.5">
                          Timing: {item.type === 'image' ? `${item.duration || 4}s` : 'Until video finishes'}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-[#f2e2d8] flex justify-end">
                        <button
                          onClick={() => handleRemoveHeroMedia(heroService, item.id)}
                          className="text-xs font-semibold text-rose-600 hover:text-rose-800 flex items-center gap-1"
                        >
                          <FaTrash /> Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CAKES MANAGEMENT */}
          {activeTab === 'cakes' && (
            <div className="space-y-8">
              <div>
                <span className="text-xs uppercase tracking-[3px] text-[#c99a7d] font-bold">Bakery Catalog</span>
                <h2 className="text-3xl font-bold text-[#3a2d28] mt-1" style={{ fontFamily: 'Playfair Display' }}>
                  Cake Categories & Styles
                </h2>
                <p className="text-sm text-[#8a7a72] mt-1">
                  Manage categories shown on the Cakes page (Luxury Cakes, Birthday, Wedding, Anniversary, Retirement, etc.).
                </p>
              </div>

              {/* Add New Category Form */}
              <div className="rounded-3xl bg-white border border-[#edd7cb] p-6 sm:p-8 shadow-sm">
                <h3 className="text-lg font-bold text-[#3a2d28] mb-4">Add New Cake Category</h3>
                <form onSubmit={handleAddCakeCategory} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#695349] font-semibold mb-1">
                        Category Title *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Royal Fondant Sculptures"
                        value={newCakeCat.title}
                        onChange={(e) => setNewCakeCat({ ...newCakeCat, title: e.target.value })}
                        className="w-full rounded-2xl border border-[#eddcd2] p-3 text-sm text-[#3a2d28] bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#695349] font-semibold mb-1">
                        Subtitle / Highlights
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Handcrafted edible art"
                        value={newCakeCat.subtitle}
                        onChange={(e) => setNewCakeCat({ ...newCakeCat, subtitle: e.target.value })}
                        className="w-full rounded-2xl border border-[#eddcd2] p-3 text-sm text-[#3a2d28] bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#695349] font-semibold mb-1">
                        Cover Image URL
                      </label>
                      <input
                        type="url"
                        placeholder="https://..."
                        value={newCakeCat.coverImage}
                        onChange={(e) => setNewCakeCat({ ...newCakeCat, coverImage: e.target.value })}
                        className="w-full rounded-2xl border border-[#eddcd2] p-3 text-sm text-[#3a2d28] bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#695349] font-semibold mb-1">
                        Starting Price
                      </label>
                      <input
                        type="text"
                        placeholder="₹2,000"
                        value={newCakeCat.startingPrice}
                        onChange={(e) => setNewCakeCat({ ...newCakeCat, startingPrice: e.target.value })}
                        className="w-full rounded-2xl border border-[#eddcd2] p-3 text-sm text-[#3a2d28] bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#695349] font-semibold mb-1">
                      Description
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Describe flavours, style, and occasions..."
                      value={newCakeCat.description}
                      onChange={(e) => setNewCakeCat({ ...newCakeCat, description: e.target.value })}
                      className="w-full rounded-2xl border border-[#eddcd2] p-3 text-sm text-[#3a2d28] bg-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className="rounded-full bg-[#d7a88c] hover:bg-[#c99a7d] text-white px-6 py-3 text-sm font-medium transition flex items-center gap-2 shadow-sm"
                  >
                    <FaPlus /> Create Category
                  </button>
                </form>
              </div>

              {/* Categories List */}
              <div className="grid sm:grid-cols-2 gap-5">
                {content.cakeCategories.map((cat) => (
                  <div
                    key={cat.id}
                    className="rounded-3xl border border-[#edd7cb] bg-white p-5 shadow-sm flex flex-col justify-between"
                  >
                    <div className="flex gap-4">
                      <img
                        src={cat.coverImage}
                        alt={cat.title}
                        className="w-20 h-20 rounded-2xl object-cover shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-lg font-bold text-[#3a2d28]">{cat.title}</h4>
                          {cat.slug === 'luxury-cakes' && (
                            <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
                              Featured
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#8a7a72] mt-0.5 line-clamp-2">{cat.description}</p>
                        <span className="text-xs font-semibold text-[#c99a7d] mt-2 block">
                          Starts at {cat.startingPrice}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#f2e2d8] flex items-center justify-between">
                      <button
                        onClick={() => handleToggleCakeActive(cat.id)}
                        className={`text-xs font-semibold px-3 py-1 rounded-full ${
                          cat.active ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-200 text-gray-700'
                        }`}
                      >
                        {cat.active ? 'Active' : 'Disabled'}
                      </button>

                      {cat.slug !== 'luxury-cakes' && (
                        <button
                          onClick={() => handleDeleteCakeCategory(cat.id)}
                          className="text-xs font-semibold text-rose-600 hover:text-rose-800"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: EVENTS MANAGEMENT */}
          {activeTab === 'events' && (
            <div className="space-y-8">
              <div>
                <span className="text-xs uppercase tracking-[3px] text-[#c99a7d] font-bold">Events Catalog</span>
                <h2 className="text-3xl font-bold text-[#3a2d28] mt-1" style={{ fontFamily: 'Playfair Display' }}>
                  Event Categories
                </h2>
                <p className="text-sm text-[#8a7a72] mt-1">
                  Manage the 6 major celebration categories (Wedding, Birthday, Baby Shower, Anniversary, Retirement, Engagement).
                </p>
              </div>

              {/* Add New Event Category Form */}
              <div className="rounded-3xl bg-white border border-[#edd7cb] p-6 sm:p-8 shadow-sm">
                <h3 className="text-lg font-bold text-[#3a2d28] mb-4">Add Event Category</h3>
                <form onSubmit={handleAddEventCategory} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#695349] font-semibold mb-1">
                        Event Title *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Sangeet & Cocktail Nights"
                        value={newEventCat.title}
                        onChange={(e) => setNewEventCat({ ...newEventCat, title: e.target.value })}
                        className="w-full rounded-2xl border border-[#eddcd2] p-3 text-sm text-[#3a2d28] bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#695349] font-semibold mb-1">
                        Subtitle
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. High-energy musical celebrations"
                        value={newEventCat.subtitle}
                        onChange={(e) => setNewEventCat({ ...newEventCat, subtitle: e.target.value })}
                        className="w-full rounded-2xl border border-[#eddcd2] p-3 text-sm text-[#3a2d28] bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#695349] font-semibold mb-1">
                      Cover Image URL
                    </label>
                    <input
                      type="url"
                      placeholder="https://..."
                      value={newEventCat.coverImage}
                      onChange={(e) => setNewEventCat({ ...newEventCat, coverImage: e.target.value })}
                      className="w-full rounded-2xl border border-[#eddcd2] p-3 text-sm text-[#3a2d28] bg-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className="rounded-full bg-[#d7a88c] hover:bg-[#c99a7d] text-white px-6 py-3 text-sm font-medium transition flex items-center gap-2 shadow-sm"
                  >
                    <FaPlus /> Create Event Category
                  </button>
                </form>
              </div>

              {/* Event Categories List */}
              <div className="grid sm:grid-cols-2 gap-5">
                {content.eventCategories.map((cat) => (
                  <div
                    key={cat.id}
                    className="rounded-3xl border border-[#edd7cb] bg-white p-5 shadow-sm flex flex-col justify-between"
                  >
                    <div className="flex gap-4">
                      <img
                        src={cat.coverImage}
                        alt={cat.title}
                        className="w-20 h-20 rounded-2xl object-cover shrink-0"
                      />
                      <div>
                        <h4 className="text-lg font-bold text-[#3a2d28]">{cat.title}</h4>
                        <p className="text-xs text-[#8a7a72] mt-0.5 line-clamp-2">{cat.description}</p>
                        <span className="text-[11px] text-[#b89a89] font-medium mt-1 block">
                          Anchor: #{cat.slug}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#f2e2d8] flex items-center justify-between">
                      <button
                        onClick={() => handleToggleEventActive(cat.id)}
                        className={`text-xs font-semibold px-3 py-1 rounded-full ${
                          cat.active ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-200 text-gray-700'
                        }`}
                      >
                        {cat.active ? 'Active' : 'Disabled'}
                      </button>

                      <button
                        onClick={() => handleDeleteEventCategory(cat.id)}
                        className="text-xs font-semibold text-rose-600 hover:text-rose-800"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: MASCOTS MANAGEMENT */}
          {activeTab === 'mascots' && (
            <div className="space-y-8">
              <div>
                <span className="text-xs uppercase tracking-[3px] text-[#c99a7d] font-bold">Characters & Fun</span>
                <h2 className="text-3xl font-bold text-[#3a2d28] mt-1" style={{ fontFamily: 'Playfair Display' }}>
                  Mascots & Kids Entertainment
                </h2>
                <p className="text-sm text-[#8a7a72] mt-1">
                  Manage mascot packages, character photos, and live performance options.
                </p>
              </div>

              {/* Add Mascot Form */}
              <div className="rounded-3xl bg-white border border-[#edd7cb] p-6 sm:p-8 shadow-sm">
                <h3 className="text-lg font-bold text-[#3a2d28] mb-4">Add Mascot Character</h3>
                <form onSubmit={handleAddMascot} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#695349] font-semibold mb-1">
                        Character Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Donald Duck / Lion King"
                        value={newMascot.name}
                        onChange={(e) => setNewMascot({ ...newMascot, name: e.target.value })}
                        className="w-full rounded-2xl border border-[#eddcd2] p-3 text-sm text-[#3a2d28] bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#695349] font-semibold mb-1">
                        Tagline
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Classic Cartoon Favorite"
                        value={newMascot.tagline}
                        onChange={(e) => setNewMascot({ ...newMascot, tagline: e.target.value })}
                        className="w-full rounded-2xl border border-[#eddcd2] p-3 text-sm text-[#3a2d28] bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#695349] font-semibold mb-1">
                      Photo URL
                    </label>
                    <input
                      type="url"
                      placeholder="https://..."
                      value={newMascot.image}
                      onChange={(e) => setNewMascot({ ...newMascot, image: e.target.value })}
                      className="w-full rounded-2xl border border-[#eddcd2] p-3 text-sm text-[#3a2d28] bg-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className="rounded-full bg-[#d7a88c] hover:bg-[#c99a7d] text-white px-6 py-3 text-sm font-medium transition flex items-center gap-2 shadow-sm"
                  >
                    <FaPlus /> Add Mascot Character
                  </button>
                </form>
              </div>

              {/* Mascots List */}
              <div className="grid sm:grid-cols-2 gap-5">
                {content.mascots.map((mascot) => (
                  <div
                    key={mascot.id}
                    className="rounded-3xl border border-[#edd7cb] bg-white p-5 shadow-sm flex flex-col justify-between"
                  >
                    <div className="flex gap-4">
                      <img
                        src={mascot.image}
                        alt={mascot.name}
                        className="w-20 h-20 rounded-2xl object-cover shrink-0"
                      />
                      <div>
                        <h4 className="text-lg font-bold text-[#3a2d28]">{mascot.name}</h4>
                        <span className="text-xs text-[#c99a7d] font-semibold block">{mascot.tagline}</span>
                        <p className="text-xs text-[#8a7a72] mt-1 line-clamp-2">{mascot.description}</p>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#f2e2d8] flex justify-end">
                      <button
                        onClick={() => handleDeleteMascot(mascot.id)}
                        className="text-xs font-semibold text-rose-600 hover:text-rose-800"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: OTHER SERVICES MANAGEMENT */}
          {activeTab === 'otherServices' && (
            <div className="space-y-8">
              <div>
                <span className="text-xs uppercase tracking-[3px] text-[#c99a7d] font-bold">Specialized Offerings</span>
                <h2 className="text-3xl font-bold text-[#3a2d28] mt-1" style={{ fontFamily: 'Playfair Display' }}>
                  Other Event Services
                </h2>
                <p className="text-sm text-[#8a7a72] mt-1">
                  Manage the 8 specialized celebration services (Entertainment, Games, Anchor, Tattoo Artist, Magician, Venue, SFX, Return Gifts) and the Custom Service option.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {content.otherServices.map((service) => (
                  <div
                    key={service.id}
                    className="rounded-3xl border border-[#edd7cb] bg-white p-5 shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">{service.icon || '✨'}</span>
                        <h4 className="text-base font-bold text-[#3a2d28]">{service.title}</h4>
                      </div>
                      <p className="text-xs text-[#8a7a72] line-clamp-3 leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#f2e2d8] flex items-center justify-between">
                      <button
                        onClick={() => handleToggleOtherServiceActive(service.id)}
                        className={`text-xs font-semibold px-3 py-1 rounded-full ${
                          service.active ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-200 text-gray-700'
                        }`}
                      >
                        {service.active ? 'Active on site' : 'Disabled'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: MEDIA LIBRARY & CLOUDINARY UPLOADER */}
          {activeTab === 'media' && (
            <div className="space-y-8">
              <div>
                <span className="text-xs uppercase tracking-[3px] text-[#c99a7d] font-bold">Assets & Media</span>
                <h2 className="text-3xl font-bold text-[#3a2d28] mt-1" style={{ fontFamily: 'Playfair Display' }}>
                  Media Upload & URL Manager
                </h2>
                <p className="text-sm text-[#8a7a72] mt-1">
                  Upload images through Cloudinary or test media URLs for Instagram Reels and YouTube.
                </p>
              </div>

              {/* Cloudinary Upload Box */}
              <div className="rounded-3xl bg-white border border-[#edd7cb] p-6 sm:p-8 shadow-sm">
                <h3 className="text-lg font-bold text-[#3a2d28] mb-3 flex items-center gap-2">
                  <FaCloudUploadAlt className="text-2xl text-[#d7a88c]" />
                  Upload Image to Cloudinary
                </h3>

                {uploadError && (
                  <div className="mb-4 p-3 rounded-2xl bg-red-50 text-red-600 text-xs">
                    {uploadError}
                  </div>
                )}

                <form onSubmit={handleUploadImage} className="space-y-4">
                  <div className="border-2 border-dashed border-[#ecd8cc] rounded-3xl p-8 text-center bg-[#fffbf8] hover:bg-[#fff6ee] transition">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#d7a88c] file:text-white hover:file:bg-[#c99a7d] cursor-pointer"
                    />
                    <p className="text-xs text-[#8a7a72] mt-2">
                      Upload cake or celebration photos. Max 10MB (JPEG, PNG, WEBP).
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={!uploadFile || uploading}
                    className="rounded-full bg-[#d7a88c] hover:bg-[#c99a7d] text-white px-8 py-3 text-sm font-medium shadow-md transition disabled:opacity-50"
                  >
                    {uploading ? 'Uploading to Cloudinary...' : 'Upload Asset'}
                  </button>
                </form>

                {uploadedUrl && (
                  <div className="mt-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                    <p className="text-xs font-semibold text-emerald-800 mb-1">
                      Uploaded Asset URL (Copy and paste into any category or hero card):
                    </p>
                    <input
                      readOnly
                      value={uploadedUrl}
                      onClick={(e) => (e.target as HTMLInputElement).select()}
                      className="w-full text-xs font-mono bg-white p-2 rounded-xl border border-emerald-300 text-emerald-900"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 8: RESET & SETTINGS */}
          {activeTab === 'settings' && (
            <div className="space-y-8">
              <div>
                <span className="text-xs uppercase tracking-[3px] text-[#c99a7d] font-bold">Preferences</span>
                <h2 className="text-3xl font-bold text-[#3a2d28] mt-1" style={{ fontFamily: 'Playfair Display' }}>
                  Content Settings & Reset
                </h2>
                <p className="text-sm text-[#8a7a72] mt-1">
                  Restore default factory content or review application cache.
                </p>
              </div>

              <div className="rounded-3xl bg-white border border-[#edd7cb] p-6 sm:p-8 shadow-sm space-y-4">
                <h3 className="text-lg font-bold text-[#3a2d28]">Restore Factory Content</h3>
                <p className="text-sm text-[#8a7a72]">
                  If you wish to reset all hero cards, cake categories, and mascot reels back to the master initial prompt configuration, click below.
                </p>

                <button
                  onClick={() => {
                    if (confirm('Reset all site content to original defaults?')) {
                      resetContent();
                      notify('Site content reset to initial default state.');
                    }
                  }}
                  className="rounded-full bg-rose-600 hover:bg-rose-700 text-white px-6 py-3 text-xs font-semibold shadow-sm transition"
                >
                  <FaSync className="inline mr-2" /> Reset to Initial Configuration
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;

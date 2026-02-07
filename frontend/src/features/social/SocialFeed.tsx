
import React, { useState, useEffect, useRef } from 'react';
import { User, SocialPost, SocialComment, Language } from '@shared/types';
import { ApiService } from '@/services/apiService';
import { MessageSquare, Heart, User as UserIcon, Send, Image as ImageIcon, X, Trash2, Paperclip, Mic } from 'lucide-react';
import { translations } from '@/locales/translations';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

interface SocialFeedProps {
  currentUser: User;
  onViewProfile: (userId: string) => void;
  lang: Language;
}

const SocialFeed: React.FC<SocialFeedProps> = ({ currentUser, onViewProfile, lang }) => {
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [newPostContent, setNewPostContent] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<{ name: string; dataUrl: string } | null>(null);
  const [selectedAudio, setSelectedAudio] = useState<{ name: string; dataUrl: string } | null>(null);
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const [isExpanded, setIsExpanded] = useState(true);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  const t = translations.socialFeed;

  const loadPosts = async () => {
    const fetchedPosts = await ApiService.getPosts();
    setPosts(fetchedPosts);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim() && !selectedImage && !selectedFile && !selectedAudio) return;

    try {
      const newPost: SocialPost = {
        id: `post_${Date.now()}`,
        authorId: currentUser.uid,
        authorName: currentUser.name,
        authorPhoto: currentUser.photoUrl,
        content: newPostContent,
        imageUrl: selectedImage || undefined,
        fileUrl: selectedFile?.dataUrl,
        fileName: selectedFile?.name,
        audioUrl: selectedAudio?.dataUrl,
        audioName: selectedAudio?.name,
        timestamp: Date.now(),
        likes: [],
        comments: []
      };

      console.log('Adding post:', newPost);
      await ApiService.addPost(newPost);
      await loadPosts();
      setNewPostContent('');
      setSelectedImage(null);
      setSelectedFile(null);
      setSelectedAudio(null);
      setIsExpanded(false);
    } catch (error) {
      console.error('Error adding post:', error);
      alert('Failed to add post. Please try again.');
    }
  };

  const processImageFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setIsExpanded(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processImageFile(file);
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const file = items[i].getAsFile();
        if (file) processImageFile(file);
      }
    }
  };

  const handleGeneralFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = ev => {
      setSelectedFile({
        name: file.name,
        dataUrl: ev.target?.result as string
      });
      setIsExpanded(true);
    };
    reader.readAsDataURL(file);
  };

  const handleAudioFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = ev => {
      setSelectedAudio({
        name: file.name,
        dataUrl: ev.target?.result as string
      });
      setIsExpanded(true);
    };
    reader.readAsDataURL(file);
  };

  const startRecording = async () => {
    if (!navigator.mediaDevices?.getUserMedia) return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      const chunks: BlobPart[] = [];

      recorder.ondataavailable = event => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.onload = ev => {
          setSelectedAudio({
            name: 'Recording.webm',
            dataUrl: ev.target?.result as string
          });
          setIsExpanded(true);
        };
        reader.readAsDataURL(blob);
        stream.getTracks().forEach(t => t.stop());
      };

      recorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  const stopRecording = () => {
    const recorder = mediaRecorderRef.current;
    if (recorder && recorder.state !== 'inactive') {
      recorder.stop();
    }
    setIsRecording(false);
  };

  const handleLike = async (postId: string) => {
    await ApiService.toggleLike(postId, currentUser.uid);
    loadPosts();
  };

  const handleComment = async (postId: string) => {
    const content = commentInputs[postId];
    if (!content?.trim()) return;

    const comment: SocialComment = {
      id: `comm_${Date.now()}`,
      authorId: currentUser.uid,
      authorName: currentUser.name,
      content,
      timestamp: Date.now()
    };

    await ApiService.addComment(postId, comment);
    loadPosts();
    setCommentInputs({ ...commentInputs, [postId]: '' });
  };

  const handleDeleteComment = async (postId: string, commentId: string) => {
    if (!window.confirm('Are you sure you want to delete this comment?')) return;
    await ApiService.deleteComment(postId, commentId);
    loadPosts();
  };

  const handleDeletePost = async (postId: string, authorId: string) => {
    if (currentUser.uid !== authorId && currentUser.role !== 'admin') {
      alert('You can only delete your own posts.');
      return;
    }
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    await ApiService.deletePost(postId);
    loadPosts();
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 space-y-12">
      {/* Create Post */}
      <Card className="p-0 overflow-hidden border-2 border-slate-200 shadow-2xl bg-white ring-4 ring-slate-50">
        <form onSubmit={handlePost}>
          <div className="p-8">
            <div className="flex gap-6">
              <div 
                className="w-16 h-16 rounded-2xl bg-slate-900 overflow-hidden flex-shrink-0 cursor-pointer hover:ring-4 hover:ring-yellow-400 transition-all shadow-lg"
                onClick={() => onViewProfile(currentUser.uid)}
              >
                {currentUser.photoUrl ? (
                  <img src={currentUser.photoUrl} alt={currentUser.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-yellow-400">
                    <UserIcon className="w-8 h-8" />
                  </div>
                )}
              </div>
              <textarea
                className="flex-1 bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 text-2xl font-bold text-slate-900 placeholder:text-slate-400 focus:border-yellow-400 focus:bg-white transition-all outline-none resize-none"
                placeholder={t.placeholder[lang]}
                rows={isExpanded ? 4 : 1}
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                onFocus={() => setIsExpanded(true)}
                onPaste={handlePaste}
              />
            </div>

            {/* Media Previews */}
            {(selectedImage || selectedFile || selectedAudio) && (
              <div className="mt-8 grid grid-cols-1 gap-4">
                {selectedImage && (
                  <div className="relative rounded-3xl overflow-hidden group border-4 border-slate-50">
                    <img src={selectedImage} alt="Preview" className="w-full max-h-[500px] object-contain bg-slate-900" />
                    <Button 
                      onClick={() => setSelectedImage(null)}
                      variant="secondary"
                      icon={X}
                      className="absolute top-4 right-4 p-3 bg-black/50 text-white rounded-2xl hover:bg-black/70 backdrop-blur-md border-none"
                    />
                  </div>
                )}
                {selectedFile && (
                  <div className="flex items-center justify-between p-6 bg-slate-100 rounded-3xl border-2 border-slate-200">
                    <div className="flex items-center gap-4">
                      <Paperclip className="w-6 h-6 text-slate-400" />
                      <span className="font-bold text-slate-600">{selectedFile.name}</span>
                    </div>
                    <Button 
                      onClick={() => setSelectedFile(null)} 
                      variant="outline"
                      icon={X}
                      className="p-2 hover:bg-slate-200 rounded-xl border-none" 
                    />
                  </div>
                )}
                {selectedAudio && (
                  <div className="flex items-center justify-between p-6 bg-slate-100 rounded-3xl border-2 border-slate-200">
                    <div className="flex items-center gap-4">
                      <Mic className="w-6 h-6 text-red-500" />
                      <span className="font-bold text-slate-600">{selectedAudio.name}</span>
                    </div>
                    <Button 
                      onClick={() => setSelectedAudio(null)} 
                      variant="outline"
                      icon={X}
                      className="p-2 hover:bg-slate-200 rounded-xl border-none" 
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="px-8 py-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                type="button"
                onClick={() => imageInputRef.current?.click()}
                variant="outline"
                icon={ImageIcon}
                className="p-4 text-slate-400 hover:text-yellow-600 hover:bg-yellow-50 rounded-2xl border-none"
              />
              <Button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
                icon={Paperclip}
                className="p-4 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-2xl border-none"
              />
              <Button
                type="button"
                onMouseDown={startRecording}
                onMouseUp={stopRecording}
                onMouseLeave={stopRecording}
                variant="outline"
                icon={Mic}
                className={`p-4 rounded-2xl border-none ${isRecording ? 'bg-red-100 text-red-600 animate-pulse' : 'text-slate-400 hover:text-red-600 hover:bg-red-50'}`}
              />
              <input type="file" ref={imageInputRef} hidden accept="image/*" onChange={handleImageChange} />
              <input type="file" ref={fileInputRef} hidden onChange={handleGeneralFileChange} />
              <input type="file" ref={audioInputRef} hidden accept="audio/*" onChange={handleAudioFileChange} />
            </div>
            
            <Button 
              type="submit" 
              variant="primary" 
              size="md" 
              disabled={!newPostContent.trim() && !selectedImage && !selectedFile && !selectedAudio}
              className="px-10"
            >
              <Send className="w-5 h-5 mr-3" />
              {t.postBtn[lang]}
            </Button>
          </div>
        </form>
      </Card>

      {/* Feed */}
      <div className="space-y-12">
        {posts.length === 0 ? (
          <Card className="p-24 text-center border-dashed border-4 border-slate-200">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <MessageSquare className="w-12 h-12 text-slate-200" />
            </div>
            <p className="text-2xl font-bold text-slate-300">{t.noPosts[lang]}</p>
          </Card>
        ) : (
          posts.map((post) => (
            <Card key={post.id} className="p-0 overflow-hidden border-slate-300 shadow-lg hover:shadow-2xl transition-all duration-500 group">
              <div className="p-8 space-y-8">
                {/* Post Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-5">
                    <div 
                      className="w-14 h-14 rounded-2xl bg-slate-900 overflow-hidden cursor-pointer shadow-md"
                      onClick={() => onViewProfile(post.authorId)}
                    >
                      {post.authorPhoto ? (
                        <img src={post.authorPhoto} alt={post.authorName} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-yellow-400">
                          <UserIcon className="w-6 h-6" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="font-black text-xl text-slate-900 hover:text-yellow-600 cursor-pointer transition-colors" onClick={() => onViewProfile(post.authorId)}>
                        {post.authorName}
                      </h4>
                      <p className="text-xs font-black text-slate-300 uppercase tracking-widest">
                        {new Date(post.timestamp).toLocaleDateString(lang === 'en' ? 'en-US' : 'am-ET', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                  {post.authorId === currentUser.uid && (
                    <Button 
                      onClick={() => handleDeletePost(post.id, post.authorId)}
                      variant="danger"
                      icon={Trash2}
                      className="p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl border-none"
                      title={t.deletePost[lang]}
                    />
                  )}
                </div>

                {/* Content */}
                <div className="space-y-6">
                  {post.content && (
                    <p className="text-2xl font-bold text-slate-700 leading-relaxed whitespace-pre-wrap">
                      {post.content}
                    </p>
                  )}
                  {post.imageUrl && (
                    <div className="rounded-3xl overflow-hidden border-4 border-slate-50 shadow-inner bg-slate-900">
                      <img src={post.imageUrl} alt="Post" className="w-full max-h-[600px] object-contain" />
                    </div>
                  )}
                  {post.fileUrl && (
                    <a 
                      href={post.fileUrl} 
                      download={post.fileName}
                      className="flex items-center gap-4 p-6 bg-slate-100 rounded-3xl border-2 border-slate-200 hover:bg-white hover:border-blue-300 transition-all group/file"
                    >
                      <div className="p-4 bg-white rounded-2xl shadow-sm group-hover/file:bg-blue-50 transition-colors">
                        <Paperclip className="w-6 h-6 text-blue-500" />
                      </div>
                      <span className="font-black text-slate-600">{post.fileName}</span>
                    </a>
                  )}
                  {post.audioUrl && (
                    <div className="p-6 bg-slate-100 rounded-3xl border-2 border-slate-200 space-y-4">
                      <div className="flex items-center gap-3 mb-2">
                        <Mic className="w-5 h-5 text-red-500" />
                        <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{post.audioName || 'Voice Note'}</span>
                      </div>
                      <audio controls src={post.audioUrl} className="w-full h-10" />
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-8 pt-6 border-t border-slate-50">
                  <button 
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center gap-3 transition-all ${post.likes.includes(currentUser.uid) ? 'text-red-500' : 'text-slate-400 hover:text-red-500'}`}
                  >
                    <div className={`p-3 rounded-xl transition-all ${post.likes.includes(currentUser.uid) ? 'bg-red-50' : 'bg-slate-50 group-hover:bg-red-50'}`}>
                      <Heart className={`w-6 h-6 ${post.likes.includes(currentUser.uid) ? 'fill-current' : ''}`} />
                    </div>
                    <span className="font-black text-lg">{post.likes.length}</span>
                  </button>
                  <div className="flex items-center gap-3 text-slate-400">
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <MessageSquare className="w-6 h-6" />
                    </div>
                    <span className="font-black text-lg">{post.comments.length}</span>
                  </div>
                </div>

                {/* Comments Section */}
                <div className="space-y-6 pt-6">
                  {post.comments.map((comment) => (
                    <div key={comment.id} className="flex gap-4 group/comment">
                      <div 
                        className="w-10 h-10 rounded-xl bg-slate-900 overflow-hidden flex-shrink-0 cursor-pointer shadow-sm"
                        onClick={() => onViewProfile(comment.authorId)}
                      >
                        {comment.authorPhoto ? (
                          <img src={comment.authorPhoto} alt={comment.authorName} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-yellow-400">
                            <UserIcon className="w-5 h-5" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="bg-slate-100 p-5 rounded-3xl rounded-tl-none border-2 border-slate-200 group-hover/comment:bg-white transition-colors relative">
                          <div className="flex justify-between items-start">
                            <h5 className="font-black text-slate-900 text-sm mb-1 hover:text-yellow-600 cursor-pointer transition-colors" onClick={() => onViewProfile(comment.authorId)}>
                              {comment.authorName}
                            </h5>
                            {comment.authorId === currentUser.uid && (
                              <button 
                                onClick={() => handleDeleteComment(post.id, comment.id)}
                                className="text-slate-300 hover:text-red-500 transition-colors p-1"
                                title="Delete Comment"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                          <p className="text-lg font-bold text-slate-600 leading-relaxed">{comment.content}</p>
                        </div>
                        <div className="flex items-center gap-4 px-2">
                          <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                            {new Date(comment.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Comment Input */}
                  <div className="flex gap-4 pt-6 border-t border-slate-100 mt-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-900 overflow-hidden flex-shrink-0 shadow-md">
                      {currentUser.photoUrl ? (
                        <img src={currentUser.photoUrl} alt={currentUser.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-yellow-400">
                          <UserIcon className="w-6 h-6" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 relative group">
                      <input
                        type="text"
                        placeholder={t.commentPlaceholder[lang]}
                        className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl px-8 py-4 font-bold text-slate-900 placeholder:text-slate-400 focus:border-yellow-400 focus:bg-white focus:shadow-lg transition-all outline-none"
                        value={commentInputs[post.id] || ''}
                        onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                        onKeyPress={(e) => e.key === 'Enter' && handleComment(post.id)}
                      />
                      <button 
                        onClick={() => handleComment(post.id)}
                        disabled={!commentInputs[post.id]?.trim()}
                        className={`absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-xl transition-all ${commentInputs[post.id]?.trim() ? 'bg-yellow-400 text-slate-900 shadow-md scale-110 hover:bg-yellow-500' : 'bg-slate-100 text-slate-300'}`}
                      >
                        <Send className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default SocialFeed;

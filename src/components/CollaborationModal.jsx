import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { collaborationManager } from '../utils/collaboration';

export default function CollaborationModal({ isOpen, onClose, nodes, edges, onFlowUpdate }) {
  const [roomId, setRoomId] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [userName, setUserName] = useState(collaborationManager.userName);
  const [peers, setPeers] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [copied, setCopied] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    const unsubscribe = collaborationManager.addListener((type, data) => {
      switch (type) {
        case 'peers_updated':
          setPeers(data);
          break;
        case 'flow_update':
          if (onFlowUpdate) {
            onFlowUpdate(data.nodes, data.edges, data.isFullSync);
          }
          break;
        case 'chat_message':
          setChatMessages(prev => [...prev, data]);
          break;
        case 'state_requested':
          // Send current state to new peer
          collaborationManager.sendStateResponse(data.requesterId, nodes, edges);
          break;
      }
    });

    return () => unsubscribe();
  }, [nodes, edges, onFlowUpdate]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleCreateRoom = () => {
    const newRoomId = collaborationManager.generateRoomId();
    setRoomId(newRoomId);
    collaborationManager.setUserName(userName);
    collaborationManager.joinRoom(newRoomId);
    setIsConnected(true);
  };

  const handleJoinRoom = () => {
    if (roomId.trim()) {
      collaborationManager.setUserName(userName);
      collaborationManager.joinRoom(roomId.trim().toUpperCase());
      setIsConnected(true);
    }
  };

  const handleLeaveRoom = () => {
    collaborationManager.leaveRoom();
    setIsConnected(false);
    setPeers([]);
    setChatMessages([]);
    setRoomId('');
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      collaborationManager.sendChatMessage(newMessage.trim());
      setChatMessages(prev => [...prev, {
        userId: collaborationManager.userId,
        userName: collaborationManager.userName,
        userColor: collaborationManager.userColor,
        message: newMessage.trim(),
        timestamp: Date.now(),
        isOwn: true,
      }]);
      setNewMessage('');
    }
  };

  const handleCopyRoomId = () => {
    navigator.clipboard.writeText(roomId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-slate-800 border border-slate-700 rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-slate-700 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                <span className="text-xl">👥</span>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">Canlı İşbirliği</h2>
                <p className="text-sm text-slate-400">
                  {isConnected ? `Oda: ${roomId}` : 'Bir oda oluştur veya katıl'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-5 flex-1 overflow-y-auto">
            {!isConnected ? (
              <>
                {/* User Name */}
                <div>
                  <label className="text-sm text-slate-400 mb-2 block">Adınız</label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Adınızı girin"
                  />
                </div>

                {/* Create Room */}
                <div className="p-4 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl">
                  <h3 className="font-medium text-white mb-2 flex items-center gap-2">
                    <span>✨</span> Yeni Oda Oluştur
                  </h3>
                  <p className="text-sm text-slate-400 mb-3">
                    Başkalarını davet edebileceğiniz bir oda oluşturun
                  </p>
                  <button
                    onClick={handleCreateRoom}
                    className="w-full py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 rounded-lg font-medium text-white transition-colors"
                  >
                    Oda Oluştur
                  </button>
                </div>

                {/* Join Room */}
                <div className="p-4 bg-slate-900/50 border border-slate-700 rounded-xl">
                  <h3 className="font-medium text-white mb-2 flex items-center gap-2">
                    <span>🚪</span> Mevcut Odaya Katıl
                  </h3>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={roomId}
                      onChange={(e) => setRoomId(e.target.value.toUpperCase())}
                      className="flex-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white font-mono tracking-wider focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="ODA KODU"
                      maxLength={6}
                    />
                    <button
                      onClick={handleJoinRoom}
                      disabled={!roomId.trim()}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:cursor-not-allowed rounded-lg font-medium text-white transition-colors"
                    >
                      Katıl
                    </button>
                  </div>
                </div>

                {/* Info */}
                <div className="flex items-start gap-2 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <span className="text-blue-400">ℹ️</span>
                  <p className="text-sm text-blue-300">
                    İşbirliği özelliği aynı tarayıcıda birden fazla sekme/pencere arasında çalışır. 
                    Oda kodunu paylaşarak arkadaşlarınızı davet edin.
                  </p>
                </div>
              </>
            ) : (
              <>
                {/* Room Info */}
                <div className="flex items-center justify-between p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                    <div>
                      <div className="text-sm text-slate-400">Oda Kodu</div>
                      <div className="text-xl font-mono font-bold text-white tracking-wider">{roomId}</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleCopyRoomId}
                      className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm text-white transition-colors"
                    >
                      {copied ? '✓ Kopyalandı' : '📋 Kopyala'}
                    </button>
                    <button
                      onClick={handleLeaveRoom}
                      className="px-3 py-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg text-sm transition-colors"
                    >
                      Ayrıl
                    </button>
                  </div>
                </div>

                {/* Peers */}
                <div>
                  <h3 className="text-sm text-slate-400 mb-2">Katılımcılar ({peers.length + 1})</h3>
                  <div className="flex flex-wrap gap-2">
                    {/* Self */}
                    <div 
                      className="flex items-center gap-2 px-3 py-1.5 rounded-full border"
                      style={{ 
                        backgroundColor: `${collaborationManager.userColor}20`,
                        borderColor: `${collaborationManager.userColor}50`,
                      }}
                    >
                      <div 
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: collaborationManager.userColor }}
                      />
                      <span className="text-sm text-white">{userName} (siz)</span>
                    </div>
                    {/* Other peers */}
                    {peers.map(peer => (
                      <div 
                        key={peer.id}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full border"
                        style={{ 
                          backgroundColor: `${peer.color}20`,
                          borderColor: `${peer.color}50`,
                        }}
                      >
                        <div 
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: peer.color }}
                        />
                        <span className="text-sm text-white">{peer.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Chat */}
                <div className="flex-1 flex flex-col min-h-[200px]">
                  <h3 className="text-sm text-slate-400 mb-2">Sohbet</h3>
                  <div className="flex-1 bg-slate-900/50 border border-slate-700 rounded-lg p-3 overflow-y-auto max-h-[200px] space-y-2">
                    {chatMessages.length === 0 ? (
                      <p className="text-sm text-slate-500 text-center py-4">
                        Henüz mesaj yok
                      </p>
                    ) : (
                      chatMessages.map((msg, i) => (
                        <div key={i} className={`text-sm ${msg.isOwn ? 'text-right' : ''}`}>
                          <span 
                            className="font-medium"
                            style={{ color: msg.userColor }}
                          >
                            {msg.isOwn ? 'Siz' : msg.userName}:
                          </span>{' '}
                          <span className="text-slate-300">{msg.message}</span>
                        </div>
                      ))
                    )}
                    <div ref={chatEndRef} />
                  </div>
                  <form onSubmit={handleSendMessage} className="mt-2 flex gap-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="flex-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Mesaj yazın..."
                    />
                    <button
                      type="submit"
                      disabled={!newMessage.trim()}
                      className="px-4 py-2 bg-green-600 hover:bg-green-500 disabled:bg-slate-700 disabled:cursor-not-allowed rounded-lg text-white transition-colors"
                    >
                      Gönder
                    </button>
                  </form>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

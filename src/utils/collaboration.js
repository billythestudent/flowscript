// Collaboration utilities using BroadcastChannel API
// This enables real-time collaboration between browser tabs/windows

const CHANNEL_PREFIX = 'flowscript_collab_';

class CollaborationManager {
  constructor() {
    this.channel = null;
    this.roomId = null;
    this.userId = this.generateUserId();
    this.userName = `User ${this.userId.slice(0, 4)}`;
    this.userColor = this.generateUserColor();
    this.listeners = new Set();
    this.peers = new Map(); // userId -> { name, color, cursor, lastSeen }
  }

  generateUserId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2);
  }

  generateUserColor() {
    const colors = [
      '#ef4444', '#f97316', '#f59e0b', '#84cc16', '#22c55e',
      '#14b8a6', '#06b6d4', '#3b82f6', '#6366f1', '#8b5cf6',
      '#a855f7', '#d946ef', '#ec4899', '#f43f5e',
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  setUserName(name) {
    this.userName = name;
    this.broadcastPresence();
  }

  joinRoom(roomId) {
    this.leaveRoom();
    
    this.roomId = roomId;
    this.channel = new BroadcastChannel(CHANNEL_PREFIX + roomId);
    
    this.channel.onmessage = (event) => {
      this.handleMessage(event.data);
    };
    
    // Announce presence
    this.broadcastPresence();
    
    // Request current state from other peers
    this.broadcast({
      type: 'request_state',
      userId: this.userId,
    });
    
    // Heartbeat to maintain presence
    this.heartbeatInterval = setInterval(() => {
      this.broadcastPresence();
      this.cleanupStalePeers();
    }, 3000);
    
    return true;
  }

  leaveRoom() {
    if (this.channel) {
      this.broadcast({
        type: 'peer_leave',
        userId: this.userId,
      });
      this.channel.close();
      this.channel = null;
    }
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
    this.roomId = null;
    this.peers.clear();
  }

  handleMessage(data) {
    switch (data.type) {
      case 'presence':
        this.peers.set(data.userId, {
          name: data.userName,
          color: data.userColor,
          cursor: data.cursor,
          lastSeen: Date.now(),
        });
        this.notifyListeners('peers_updated', this.getPeers());
        break;
        
      case 'peer_leave':
        this.peers.delete(data.userId);
        this.notifyListeners('peers_updated', this.getPeers());
        break;
        
      case 'flow_update':
        if (data.userId !== this.userId) {
          this.notifyListeners('flow_update', {
            nodes: data.nodes,
            edges: data.edges,
            userId: data.userId,
          });
        }
        break;
        
      case 'cursor_move':
        if (data.userId !== this.userId) {
          const peer = this.peers.get(data.userId);
          if (peer) {
            peer.cursor = data.cursor;
            this.notifyListeners('cursor_update', {
              userId: data.userId,
              cursor: data.cursor,
              color: peer.color,
              name: peer.name,
            });
          }
        }
        break;
        
      case 'request_state':
        // New peer requesting state - current state will be sent by flowManager
        this.notifyListeners('state_requested', { requesterId: data.userId });
        break;
        
      case 'state_response':
        if (data.targetUserId === this.userId) {
          this.notifyListeners('flow_update', {
            nodes: data.nodes,
            edges: data.edges,
            userId: data.userId,
            isFullSync: true,
          });
        }
        break;
        
      case 'chat_message':
        this.notifyListeners('chat_message', {
          userId: data.userId,
          userName: data.userName,
          userColor: data.userColor,
          message: data.message,
          timestamp: data.timestamp,
        });
        break;
    }
  }

  broadcast(data) {
    if (this.channel) {
      this.channel.postMessage(data);
    }
  }

  broadcastPresence() {
    this.broadcast({
      type: 'presence',
      userId: this.userId,
      userName: this.userName,
      userColor: this.userColor,
      cursor: this.cursor,
    });
  }

  broadcastFlowUpdate(nodes, edges) {
    this.broadcast({
      type: 'flow_update',
      userId: this.userId,
      nodes: nodes.map(n => ({
        id: n.id,
        type: n.type,
        position: n.position,
        data: n.data,
      })),
      edges: edges.map(e => ({
        id: e.id,
        source: e.source,
        target: e.target,
      })),
    });
  }

  broadcastCursor(x, y) {
    this.cursor = { x, y };
    this.broadcast({
      type: 'cursor_move',
      userId: this.userId,
      cursor: { x, y },
    });
  }

  sendStateResponse(targetUserId, nodes, edges) {
    this.broadcast({
      type: 'state_response',
      userId: this.userId,
      targetUserId,
      nodes: nodes.map(n => ({
        id: n.id,
        type: n.type,
        position: n.position,
        data: n.data,
      })),
      edges: edges.map(e => ({
        id: e.id,
        source: e.source,
        target: e.target,
      })),
    });
  }

  sendChatMessage(message) {
    this.broadcast({
      type: 'chat_message',
      userId: this.userId,
      userName: this.userName,
      userColor: this.userColor,
      message,
      timestamp: Date.now(),
    });
  }

  cleanupStalePeers() {
    const now = Date.now();
    let changed = false;
    
    for (const [userId, peer] of this.peers) {
      if (now - peer.lastSeen > 10000) {
        this.peers.delete(userId);
        changed = true;
      }
    }
    
    if (changed) {
      this.notifyListeners('peers_updated', this.getPeers());
    }
  }

  getPeers() {
    return Array.from(this.peers.entries()).map(([id, peer]) => ({
      id,
      ...peer,
    }));
  }

  addListener(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notifyListeners(type, data) {
    this.listeners.forEach(listener => listener(type, data));
  }

  generateRoomId() {
    return Math.random().toString(36).slice(2, 8).toUpperCase();
  }

  isConnected() {
    return this.channel !== null;
  }
}

// Singleton instance
export const collaborationManager = new CollaborationManager();

// Hook for React components
export function useCollaboration() {
  return collaborationManager;
}

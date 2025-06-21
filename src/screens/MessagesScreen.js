import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert,
  RefreshControl,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import messages from '../data/messages';

const MessagesScreen = ({ navigation }) => {
  const [messageList, setMessageList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [isSelectionMode, setIsSelectionMode] = useState(false);

  useEffect(() => {
    loadMessages();
  }, []);

  useEffect(() => {
    filterMessages();
  }, [searchQuery, messageList]);

  const loadMessages = () => {
    // Add read status and timestamp to messages
    const messagesWithStatus = messages.map(msg => ({
      ...msg,
      isRead: Math.random() > 0.5, // Random read status for demo
      timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000), // Random timestamp within last week
      priority: Math.random() > 0.7 ? 'high' : 'normal',
    }));
    setMessageList(messagesWithStatus);
  };

  const filterMessages = () => {
    if (searchQuery.trim() === '') {
      setFilteredMessages(messageList);
    } else {
      const filtered = messageList.filter(message =>
        message.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        message.message.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredMessages(filtered);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      loadMessages();
      setRefreshing(false);
    }, 1000);
  };

  const markAsRead = (messageId) => {
    setMessageList(prev => 
      prev.map(msg => 
        msg.id === messageId ? { ...msg, isRead: true } : msg
      )
    );
  };

  const deleteMessage = (messageId) => {
    setMessageList(prev => prev.filter(msg => msg.id !== messageId));
    setSelectedMessages(prev => prev.filter(id => id !== messageId));
  };

  const handleLongPress = (messageId) => {
    setIsSelectionMode(true);
    setSelectedMessages([messageId]);
  };

  const toggleSelection = (messageId) => {
    if (isSelectionMode) {
      setSelectedMessages(prev => {
        if (prev.includes(messageId)) {
          const newSelection = prev.filter(id => id !== messageId);
          if (newSelection.length === 0) {
            setIsSelectionMode(false);
          }
          return newSelection;
        } else {
          return [...prev, messageId];
        }
      });
    }
  };

  const handleDeleteSelected = () => {
    Alert.alert(
      'Delete Messages',
      `Are you sure you want to delete ${selectedMessages.length} message(s)?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            selectedMessages.forEach(id => deleteMessage(id));
            setIsSelectionMode(false);
            setSelectedMessages([]);
          },
        },
      ]
    );
  };

  const markAllAsRead = () => {
    setMessageList(prev => 
      prev.map(msg => ({ ...msg, isRead: true }))
    );
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const msgDate = new Date(timestamp);
    const diffInHours = (now - msgDate) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  const handleBackPress = () => {
    navigation.navigate('Home'); // Navigate back to home screen
  };

  const renderMessage = ({ item }) => {
    const isSelected = selectedMessages.includes(item.id);
    
    return (
      <TouchableOpacity
        style={[
          styles.messageContainer,
          !item.isRead && styles.unreadMessage,
          isSelected && styles.selectedMessage,
          item.priority === 'high' && styles.highPriorityMessage,
        ]}
        onPress={() => {
          if (isSelectionMode) {
            toggleSelection(item.id);
          } else {
            markAsRead(item.id);
            // Navigate to message details if needed
            // navigation.navigate('MessageDetail', { message: item });
          }
        }}
        onLongPress={() => handleLongPress(item.id)}
        activeOpacity={0.7}
      >
        <View style={styles.messageHeader}>
          <View style={styles.messageTitleContainer}>
            <Text style={[
              styles.messageTitle,
              !item.isRead && styles.unreadTitle
            ]}>
              {item.title}
            </Text>
            {item.priority === 'high' && (
              <Ionicons name="alert-circle" size={16} color="#FF4444" style={styles.priorityIcon} />
            )}
          </View>
          <Text style={styles.timestamp}>{formatTimestamp(item.timestamp)}</Text>
        </View>
        
        <Text style={[
          styles.messageText,
          !item.isRead && styles.unreadText
        ]} numberOfLines={2}>
          {item.message}
        </Text>
        
        <View style={styles.messageFooter}>
          {!item.isRead && <View style={styles.unreadIndicator} />}
          {isSelectionMode && (
            <View style={styles.selectionIndicator}>
              <Ionicons 
                name={isSelected ? "checkmark-circle" : "ellipse-outline"} 
                size={20} 
                color={isSelected ? "#1E3A8A" : "#9CA3AF"} 
              />
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#9CA3AF" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search messages..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#9CA3AF"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        )}
      </View>
      
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={markAllAsRead}>
          <Ionicons name="checkmark-done" size={20} color="#1E3A8A" />
          <Text style={styles.actionText}>Mark All Read</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Ionicons name="mail-outline" size={64} color="#9CA3AF" />
      <Text style={styles.emptyStateTitle}>No messages found</Text>
      <Text style={styles.emptyStateText}>
        {searchQuery ? 'Try adjusting your search terms' : 'You have no messages at the moment'}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Navigation Header */}
      <View style={styles.navigationHeader}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Messages</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Selection Mode Header */}
      {isSelectionMode && (
        <View style={styles.selectionHeader}>
          <TouchableOpacity
            style={styles.selectionAction}
            onPress={() => {
              setIsSelectionMode(false);
              setSelectedMessages([]);
            }}
          >
            <Text style={styles.selectionActionText}>Cancel</Text>
          </TouchableOpacity>
          
          <Text style={styles.selectionTitle}>
            {selectedMessages.length} selected
          </Text>
          
          <TouchableOpacity
            style={styles.selectionAction}
            onPress={handleDeleteSelected}
          >
            <Ionicons name="trash" size={20} color="#FF4444" />
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        data={filteredMessages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyState}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  navigationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1E3A8A',
    paddingHorizontal: 16,
    paddingVertical: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  backButton: {
    padding: 8,
  },
  screenTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  placeholder: {
    width: 40, // To balance the layout
  },
  listContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  headerContainer: {
    padding: 16,
    backgroundColor: '#F8FAFC',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  actionText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#1E3A8A',
    fontWeight: '500',
  },
  messageContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginVertical: 4,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  unreadMessage: {
    borderLeftWidth: 4,
    borderLeftColor: '#1E3A8A',
  },
  selectedMessage: {
    backgroundColor: '#EFF6FF',
    borderColor: '#1E3A8A',
    borderWidth: 1,
  },
  highPriorityMessage: {
    borderLeftWidth: 4,
    borderLeftColor: '#FF4444',
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  messageTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  messageTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  unreadTitle: {
    color: '#1E3A8A',
  },
  priorityIcon: {
    marginLeft: 4,
  },
  timestamp: {
    fontSize: 12,
    color: '#6B7280',
  },
  messageText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 8,
  },
  unreadText: {
    color: '#1F2937',
    fontWeight: '500',
  },
  messageFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  unreadIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#1E3A8A',
  },
  selectionIndicator: {
    marginLeft: 'auto',
  },
  selectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  selectionAction: {
    paddingVertical: 4,
  },
  selectionActionText: {
    fontSize: 16,
    color: '#1E3A8A',
  },
  selectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingTop: 64,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 22,
  },
});

export default MessagesScreen;
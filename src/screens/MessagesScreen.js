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
  Dimensions,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import messages from '../data/messages';

const { width, height } = Dimensions.get('window');

// Responsive scaling functions from SeeAllScreen
const scale = (size) => (width / 375) * size;
const verticalScale = (size) => (height / 812) * size;
const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;

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
              <Ionicons 
                name="alert-circle" 
                size={moderateScale(16)} 
                color="#E53E3E" 
                style={styles.priorityIcon} 
              />
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
                size={moderateScale(20)} 
                color={isSelected ? "#1E2A78" : "#9CA3AF"} 
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
        <Ionicons 
          name="search" 
          size={moderateScale(20)} 
          color="#9CA3AF" 
          style={styles.searchIcon} 
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search messages..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#9CA3AF"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={moderateScale(20)} color="#9CA3AF" />
          </TouchableOpacity>
        )}
      </View>
      
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={markAllAsRead}>
          <Ionicons name="checkmark-done" size={moderateScale(20)} color="#1E2A78" />
          <Text style={styles.actionText}>Mark All Read</Text>
        </TouchableOpacity>
      </View>

      {/* Results Count */}
      <View style={styles.resultsContainer}>
        <Text style={styles.resultsText}>
          {filteredMessages.length} message{filteredMessages.length !== 1 ? 's' : ''} found
          {searchQuery && ` for "${searchQuery}"`}
        </Text>
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Ionicons name="mail-outline" size={moderateScale(64)} color="#9CA3AF" />
      <Text style={styles.emptyStateTitle}>No messages found</Text>
      <Text style={styles.emptyStateText}>
        {searchQuery ? 'Try adjusting your search terms' : 'You have no messages at the moment'}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={handleBackPress}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={moderateScale(24)} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Messages</Text>
        <View style={styles.headerRightSpace} />
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
            <Ionicons name="trash" size={moderateScale(20)} color="#E53E3E" />
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
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(12),
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    width: scale(40),
    height: scale(40),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(8),
    backgroundColor: '#F3F4F6',
  },
  headerTitle: {
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    color: '#333',
  },
  headerRightSpace: {
    width: scale(40),
  },
  listContainer: {
    flexGrow: 1,
    paddingBottom: verticalScale(20),
  },
  headerContainer: {
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(16),
    backgroundColor: '#F9FAFB',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: scale(12),
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(10),
    marginBottom: verticalScale(12),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchIcon: {
    marginRight: scale(8),
  },
  searchInput: {
    flex: 1,
    fontSize: moderateScale(16),
    color: '#1F2937',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: verticalScale(12),
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(8),
    backgroundColor: '#FFFFFF',
    borderRadius: scale(8),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  actionText: {
    marginLeft: scale(6),
    fontSize: moderateScale(14),
    color: '#1E2A78',
    fontWeight: '500',
  },
  resultsContainer: {
    paddingVertical: verticalScale(8),
  },
  resultsText: {
    fontSize: moderateScale(14),
    color: '#6B7280',
    fontWeight: '500',
  },
  messageContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: scale(16),
    padding: scale(16),
    borderRadius: scale(12),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  unreadMessage: {
    borderLeftWidth: scale(4),
    borderLeftColor: '#1E2A78',
    backgroundColor: '#FAFBFF',
  },
  selectedMessage: {
    backgroundColor: '#EFF6FF',
    borderColor: '#1E2A78',
    borderWidth: 1,
  },
  highPriorityMessage: {
    borderLeftWidth: scale(4),
    borderLeftColor: '#E53E3E',
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: verticalScale(8),
  },
  messageTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: scale(8),
  },
  messageTitle: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: '#1F2937',
    flexShrink: 1,
  },
  unreadTitle: {
    color: '#1E2A78',
    fontWeight: 'bold',
  },
  priorityIcon: {
    marginLeft: scale(6),
  },
  timestamp: {
    fontSize: moderateScale(12),
    color: '#6B7280',
    fontWeight: '500',
  },
  messageText: {
    fontSize: moderateScale(14),
    color: '#6B7280',
    lineHeight: moderateScale(20),
    marginBottom: verticalScale(12),
  },
  unreadText: {
    color: '#374151',
    fontWeight: '500',
  },
  messageFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  unreadIndicator: {
    width: scale(8),
    height: scale(8),
    borderRadius: scale(4),
    backgroundColor: '#1E2A78',
  },
  selectionIndicator: {
    marginLeft: 'auto',
  },
  selectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(12),
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  selectionAction: {
    paddingVertical: verticalScale(4),
    paddingHorizontal: scale(8),
  },
  selectionActionText: {
    fontSize: moderateScale(16),
    color: '#1E2A78',
    fontWeight: '500',
  },
  selectionTitle: {
    fontSize: moderateScale(18),
    fontWeight: '600',
    color: '#333',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(32),
    paddingTop: verticalScale(64),
  },
  emptyStateTitle: {
    fontSize: moderateScale(20),
    fontWeight: '600',
    color: '#1F2937',
    marginTop: verticalScale(16),
    marginBottom: verticalScale(8),
  },
  emptyStateText: {
    fontSize: moderateScale(16),
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: moderateScale(22),
  },
  itemSeparator: {
    height: verticalScale(8),
  },
});

export default MessagesScreen;
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, FlatList, TextInput } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import AppSkeleton from '../components/AppSkeleton'
import Header from '../components/BacKHeader'
import { fonts } from '../assets/fonts/Fonts'
import { moderateScale, scale, verticalScale } from '../utils/helper'
import { chatMessages } from '../assets/dummyData/dummyData'
import Icon from '../assets/icon/Icon'
import { useRoute } from '@react-navigation/native'
import Colors from '../assets/colors/Color'

const Chat = () => {
    const route = useRoute();
    const { driver } = route?.params || {};
    const [messages, setMessages] = useState(chatMessages);
    const [newMessage, setNewMessage] = useState('');
    const scrollViewRef = useRef();

    // Default driver data if not provided
    const defaultDriver = {
        name: 'Driver',
        image: require('../assets/images/profile.png'),
        status: 'Online'
    };

    const currentDriver = driver || defaultDriver;

    const sendMessage = () => {
        if (newMessage.trim()) {
            const message = {
                _id: Date.now().toString(),
                message: newMessage.trim(),
                sender: 'user',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                date: new Date().toISOString().split('T')[0]
            };

            setMessages(prev => [...prev, message]);
            setNewMessage('');

            // Simulate driver reply after 2 seconds
            setTimeout(() => {
                const driverReplies = [
                    'Got it! I\'ll be there soon.',
                    'Thank you for the message.',
                    'I\'m on my way to your location.',
                    'Please wait, I\'ll arrive shortly.',
                    'Order received and confirmed.'
                ];

                const randomReply = driverReplies[Math.floor(Math.random() * driverReplies.length)];
                const driverMessage = {
                    _id: (Date.now() + 1).toString(),
                    message: randomReply,
                    sender: 'driver',
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    date: new Date().toISOString().split('T')[0]
                };

                setMessages(prev => [...prev, driverMessage]);
            }, 2000);
        }
    };

    const renderMessage = ({ item }) => {
        const isUser = item.sender === 'user';

        return (
            <View style={[styles.messageContainer, isUser ? styles.userMessage : styles.driverMessage]}>
                {!isUser && (
                    <Image
                        source={currentDriver.image || require('../assets/images/profile.png')}
                        style={styles.driverAvatar}
                    />
                )}
                <View style={[styles.messageBubble, isUser ? styles.userBubble : styles.driverBubble]}>
                    <Text style={[styles.messageText, isUser ? styles.userMessageText : styles.driverMessageText]}>
                        {item.message}
                    </Text>
                    <Text style={[styles.timestamp, isUser ? styles.userTimestamp : styles.driverTimestamp]}>
                        {item.timestamp}
                    </Text>
                </View>
            </View>
        );
    };

    useEffect(() => {
        setTimeout(() => {
            scrollViewRef.current?.scrollToEnd({ animated: true });
        }, 100);
    }, [messages]);

    return (
        <AppSkeleton disableScroll={true}>
            <View style={styles.driverHeader}>
                <Header />
                <Image
                    source={currentDriver.image || require('../assets/images/profile.png')}
                    style={styles.driverImage}
                />
                <View style={styles.driverInfo}>
                    <Text style={styles.driverName}>{currentDriver.name || 'Driver'}</Text>
                    <View style={styles.statusContainer}>
                        <View style={styles.onlineIndicator} />
                        <Text style={styles.statusText}>{currentDriver.status || 'Online'} </Text>
                    </View>
                </View>
            </View>

            <View style={styles.chatContainer}>
                <FlatList
                    ref={scrollViewRef}
                    data={messages}
                    renderItem={renderMessage}
                    keyExtractor={item => item._id}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.messagesList}
                />
            </View>

            <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                    <TextInput
                        placeholder="Type your message..."
                        value={newMessage}
                        onChangeText={setNewMessage}
                        style={styles.messageInput}
                        placeholderTextColor={Colors.lightGrey}
                    />
                    <TouchableOpacity
                        style={[styles.sendButton, !newMessage.trim() && styles.sendButtonDisabled]}
                        onPress={sendMessage}
                        disabled={!newMessage.trim()}
                    >
                        <Icon
                            family="MaterialIcons"
                            name="send"
                            size={20}
                            color={newMessage.trim() ? Colors.white : Colors.lightGrey}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </AppSkeleton>
    )
}

const styles = StyleSheet.create({
    driverHeader: {
        flexDirection: 'row',
        gap: scale(25),
        alignItems: 'center',
        paddingHorizontal: scale(5),
        paddingVertical: verticalScale(10),
        backgroundColor: Colors.white,
        borderBottomWidth: 1,
        borderBottomColor: Colors.greyV2,
    },
    driverImage: {
        width: moderateScale(40),
        height: moderateScale(40),
        borderRadius: moderateScale(20),
        marginRight: scale(12),
    },
    driverInfo: {
        flex: 1,
    },
    driverName: {
        fontFamily: fonts.bold,
        fontSize: moderateScale(16),
        color: Colors.black,
        marginBottom: verticalScale(2),
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    onlineIndicator: {
        width: moderateScale(8),
        height: moderateScale(8),
        borderRadius: moderateScale(4),
        backgroundColor: Colors.verify,
        marginRight: scale(6),
    },
    statusText: {
        fontFamily: fonts.regular,
        fontSize: moderateScale(12),
        color: Colors.lightGrey,
    },
    chatContainer: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    messagesList: {
        paddingHorizontal: scale(10),
        paddingVertical: verticalScale(10),
    },
    messageContainer: {
        flexDirection: 'row',
        marginBottom: verticalScale(10),
        alignItems: 'flex-end',
    },
    userMessage: {
        justifyContent: 'flex-end',
    },
    driverMessage: {
        justifyContent: 'flex-start',
    },
    driverAvatar: {
        width: moderateScale(32),
        height: moderateScale(32),
        borderRadius: moderateScale(16),
        marginRight: scale(8),
    },
    messageBubble: {
        maxWidth: '75%',
        paddingHorizontal: scale(12),
        paddingVertical: verticalScale(10),
        borderRadius: moderateScale(16),
    },
    userBubble: {
        backgroundColor: Colors.orange,
        borderBottomRightRadius: moderateScale(4),
    },
    driverBubble: {
        backgroundColor: Colors.white,
        borderBottomLeftRadius: moderateScale(4),
        elevation: 1,
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    messageText: {
        fontFamily: fonts.regular,
        fontSize: moderateScale(14),
        lineHeight: moderateScale(20),
        marginBottom: verticalScale(4),
    },
    userMessageText: {
        color: Colors.white,
    },
    driverMessageText: {
        color: Colors.black,
    },
    timestamp: {
        fontFamily: fonts.regular,
        fontSize: moderateScale(10),
    },
    userTimestamp: {
        color: Colors.white,
        opacity: 0.8,
        textAlign: 'right',
    },
    driverTimestamp: {
        color: Colors.lightGrey,
        textAlign: 'left',
    },
    inputContainer: {
        backgroundColor: Colors.white,
        paddingHorizontal: scale(16),
        paddingVertical: verticalScale(12),
        borderTopWidth: 1,
        borderTopColor: Colors.greyV2,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: scale(8),
    },
    messageInput: {
        flex: 1,
        marginBottom: 0,
        backgroundColor: Colors.greyV3,
        borderRadius: moderateScale(20),
        paddingHorizontal: scale(16),
        paddingVertical: verticalScale(10),
        fontFamily: fonts.regular,
        fontSize: moderateScale(14),
    },
    inputText: {
        backgroundColor: Colors.greyV3,
        borderRadius: moderateScale(20),
        paddingHorizontal: scale(16),
        paddingVertical: verticalScale(10),
        fontFamily: fonts.regular,
        fontSize: moderateScale(14),
    },
    sendButton: {
        backgroundColor: Colors.orange,
        width: moderateScale(40),
        height: moderateScale(40),
        borderRadius: moderateScale(20),
        justifyContent: 'center',
        alignItems: 'center',
    },
    sendButtonDisabled: {
        backgroundColor: Colors.greyV2,
    },
});

export default Chat
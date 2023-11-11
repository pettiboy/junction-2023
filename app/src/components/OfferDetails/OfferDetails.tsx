import { router, useNavigation } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Image } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

type OfferDetailsProps = {
    title: string;
    discount: string;
    points: string;
};

const OfferDetails = ({ title, discount, points }: OfferDetailsProps) => {
    const navigation = useNavigation();

    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Offer Details',
            headerBackTitle: 'Instagram',
        });
    }, [navigation]);

    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    return (
        <View style={{
            backgroundColor: "#EAF9E1",
            padding: 20,
            borderRadius: 10,
            marginTop: 20,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
        }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 15, color: '#4CAF50' }}>{title}</Text>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                <Text style={{ fontSize: 18, marginRight: 10, color: '#4CAF50' }}>🔒 {discount}</Text>
                <Text style={{ fontSize: 18, color: '#333' }}>on your next order</Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                <Text style={{ fontSize: 18, marginRight: 10, color: '#4CAF50' }}>🌟 {points} points</Text>
                <Text style={{ fontSize: 18, color: '#333' }}>required</Text>
            </View>

            <TouchableOpacity
                style={{
                    backgroundColor: "#4CAF50",
                    padding: 12,
                    borderRadius: 8,
                    alignItems: 'center',
                    marginTop: 15,
                }}
                onPress={toggleModal}
            >
                <Text style={{ color: 'white', fontSize: 18 }}>Claim Your Reward</Text>
            </TouchableOpacity>

            <Modal visible={isModalVisible}>
                <View style={{ flex: 1, height: 100, justifyContent: 'center', alignItems: 'center' }}>
                    {/* Customize the QR Code data as needed */}
                    <QRCode value="YourRewardDataHere" size={200} color={"#4CAF50"} />
                    <TouchableOpacity onPress={toggleModal}>
                        <Text style={{ fontSize: 36, color: '#4CAF50', marginTop: 150 }}>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
};

export default OfferDetails;

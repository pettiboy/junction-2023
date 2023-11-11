import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import OfferDetails from '../../src/components/OfferDetails/OfferDetails'

type Props = {}

const wallet = (props: Props) => {
    return (
        <SafeAreaView>
            <View style={{ padding: 20 }}>
                <View style={{
                    backgroundColor: "#4CAF50",
                    padding: 20,
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
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
                    <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10, color: 'white' }}>Your Balance</Text>
                    <Text style={{ fontSize: 60, fontWeight: 'bold', color: 'white' }}>52</Text>
                </View>

                <OfferDetails
                    title='Starbucks'
                    discount='5%'
                    points='25'
                />

                <OfferDetails
                    title='Roberts Coffee'
                    discount='9%'
                    points='35'
                />


                {/* <View style={{
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
                    <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 15, color: '#4CAF50' }}>Rewards</Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                        <Text style={{ fontSize: 18, marginRight: 10, color: '#4CAF50' }}>🔒 5% discount</Text>
                        <Text style={{ fontSize: 18, color: '#333' }}>on your next order</Text>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                        <Text style={{ fontSize: 18, marginRight: 10, color: '#4CAF50' }}>🌟 25 Points</Text>
                        <Text style={{ fontSize: 18, color: '#333' }}>earned</Text>
                    </View>

                    <TouchableOpacity style={{
                        backgroundColor: "#4CAF50",
                        padding: 12,
                        borderRadius: 8,
                        alignItems: 'center',
                        marginTop: 15,
                    }}>
                        <Text style={{ color: 'white', fontSize: 18 }}>Claim Your Reward</Text>
                    </TouchableOpacity>
                </View> */}

            </View>

        </SafeAreaView>
    )
}

export default wallet
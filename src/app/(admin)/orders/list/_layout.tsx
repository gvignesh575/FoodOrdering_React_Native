import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Tabs,withLayoutContext } from "expo-router"
import { StyleSheet,Platform, StatusBar, SafeAreaView } from 'react-native';

const TopTabs = withLayoutContext(createMaterialTopTabNavigator().Navigator);


function OrderListNavigator()
{
    return (
            <SafeAreaView style={styles.AndroidSafeArea}>

                <TopTabs>
                    <TopTabs.Screen name='index' 
                    options={{ title: 'Active' }}
                    />
                </TopTabs>
            </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    AndroidSafeArea: {
        flex: 1,
        backgroundColor: "white",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
      }
});

export default OrderListNavigator;
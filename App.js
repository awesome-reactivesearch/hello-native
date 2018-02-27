import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image
} from 'react-native';
import {
    ReactiveBase,
    DataSearch,
    ReactiveList
} from '@appbaseio/reactivesearch-native';

const styles = StyleSheet.create({
    container: {
        padding: 10,
        marginTop: 25
    },
    image: {
        width: 100,
        height: 100
    },
    result: {
        flexDirection: 'row',
        width: '100%',
        margin: 5,
        alignItems: 'center',
    },
    item: {
        flexDirection: 'column',
        paddingLeft: 10
    },
    title: {
        fontWeight: 'bold'
    }
});

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            isReady: false
        }
    }

    async componentWillMount() {
        await Expo.Font.loadAsync({
            Roboto: require('native-base/Fonts/Roboto.ttf'),
            Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
            Ionicons: require('@expo/vector-icons/fonts/Ionicons.ttf'),
        });

        this.setState({ isReady: true });
    }

    render() {
        if (!this.state.isReady) {
            return (
                <View style={styles.container}>
                    <Text>Loading...</Text>
                </View>
            )
        }

        return (
            <ReactiveBase
                app="good-books-ds"
                credentials="nY6NNTZZ6:27b76b9f-18ea-456c-bc5e-3a5263ebc63d"
            >
                <ScrollView>
                    <View style={styles.container}>
                        <DataSearch
                            componentId="searchbox"
                            dataField={[
                                'original_title',
                                'original_title.search',
                                'authors',
                                'authors.search',
                            ]}
                            placeholder="Search for books"
                            autosuggest={false}
                        />
                        <ReactiveList
                            componentId="results"
                            dataField="original_title"
                            size={7}
                            showResultStats={false}
                            pagination={true}
                            react={{
                                and: "searchbox"
                            }}
                            onData={(res) => (
                                <View style={styles.result}>
                                    <Image source={{ uri: res.image }} style={styles.image} />
                                    <View style={styles.item}>
                                        <Text style={styles.title}>{res.original_title}</Text>
                                        <Text>{res.authors}</Text>
                                    </View>
                                </View>
                            )}
                        />
                    </View>
                </ScrollView>
            </ReactiveBase>
        );
    }
}
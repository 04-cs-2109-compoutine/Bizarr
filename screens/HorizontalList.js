import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text ,View, SectionList, SafeAreaView, Image, FlatList } from 'react-native'

const ListItem = ({item}) => {
return(
<View>
<Image
source={{uri: item.uri,
}}
style={styles.itemPhoto}
resizeMode="cover"
/>
<Text style={styles.itemText}>{item.text}</Text>
</View>
)
}

export default () => {
return(
  <View style={styles.container}>
<StatusBar style="light" />
<SafeAreaView style={{ flex: 1 }}>
  <SectionList 
  contentContainerStyle={{ paddingHorizontal: 10 }}
  stickySectionHeadersEnabled={false}
  sections={SECTIONS}
  renderSectionHeader={({ section }) => (
    <>
    <Text style={styles.sectionHeader}>{section.title}</Text>
    {section.horizontal ? (
    <FlatList
                horizontal
                data={section.data}
                renderItem={({ item }) => <ListItem item={item} />}
                showsHorizontalScrollIndicator={false}
    />
    ) : null }
    </>
  )}
  renderItem={({item, section}) => {
  if (section.horizontal === true){
    return null
  }
  return <ListItem item={item} />
}}
/>
</SafeAreaView>
  </View>
)

}

const SECTIONS = [
  {
title: "new listings",
horizontal: true,
data: [
{
key: "1",
text: "Item text 1",
uri: "https://npr.brightspotcdn.com/dims4/default/ef28cfd/2147483647/strip/true/crop/800x533+0+0/resize/880x586!/quality/90/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2Flegacy%2Fsites%2Fkut%2Ffiles%2F201909%2Fshmutz_01.jpg"
},
{
  key: "2",
  text: "Item text 1",
  uri: "https://npr.brightspotcdn.com/dims4/default/ef28cfd/2147483647/strip/true/crop/800x533+0+0/resize/880x586!/quality/90/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2Flegacy%2Fsites%2Fkut%2Ffiles%2F201909%2Fshmutz_01.jpg"
  },
  {
    key: "3",
    text: "Item text 1",
    uri: "https://npr.brightspotcdn.com/dims4/default/ef28cfd/2147483647/strip/true/crop/800x533+0+0/resize/880x586!/quality/90/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2Flegacy%2Fsites%2Fkut%2Ffiles%2F201909%2Fshmutz_01.jpg"
    }
]
}];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
  sectionHeader: {
    fontWeight: '800',
    fontSize: 16,
    color: 'black',
    marginTop: 20,
    marginLeft: 30,
    marginBottom: 5,
  },
  item: {
    margin: 10,
    paddingRight: 10,
    backgroundColor: 'green',
  },
  itemPhoto: {
    width: 160,
    height: 160,
  },
  itemText: {
    color: 'rgba(255, 255, 255, 0.5)',
    marginTop: 5,
  },
});

import React from 'react';
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
<SafeAreaView style={{ flex: 1}}>
  <SectionList 
  contentContainerStyle={{ paddingHorizontal: 10}}
  stickySectionHeadersEnabled={false}
  sections={SECTIONS}
  renderSectionHeader={({section}) => (
    <Text style={styles.sectionHeader}>{section.title}</Text>
  )}
  renderItem={({item, section}) => {return <ListItem item={item} />}}
  
  />
</SafeAreaView>
  </View>
)

}

const SECTIONS = [
  {
title: "your items",
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
import React from "react";
import { View, StyleSheet, Image, TouchableHighlight } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Swipeable from "react-native-gesture-handler/Swipeable";
import Text from "./Config/Text";
import colors from "./Config/colors";
import { widthPixel, heightPixel, fontPixel, pixelSizeVertical, pixelSizeHorizontal} from "./Config/responsive"


function ListItem({
  title,
  image,
  subTitle,
  IconComponent,
  onPress,
  renderRightActions,
}) {
  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableHighlight underlayColor={colors.light} onPress={onPress}>
        <View style={styles.container}>
          {IconComponent}
          {image && <Image style={styles.image} source={{ uri: image }} />}
          <View style={styles.detailsContainer}>
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
            {subTitle && (
              <Text style={styles.subTitle} numberOfLines={2}>
                {subTitle} listings
              </Text>
            )}
          </View>
          <MaterialCommunityIcons
            color={colors.grey}
            name="chevron-right"
            size={25}
          />
        </View>
      </TouchableHighlight>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    padding: pixelSizeVertical(11),
    backgroundColor: colors.light,
    borderBottomColor: colors.main,
    borderBottomWidth: 1,
    opacity: 2,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: pixelSizeHorizontal(10),
    justifyContent: "center",
  },
  image: {
    width: widthPixel(50),
    height: heightPixel(50),
    borderRadius: 35,
  },
  subTitle: {
    color: colors.grey,
  },
  title: {
    fontWeight: "500",
  },
});

export default ListItem;

import React from "react";
import PostListingScreen from "../../screens/PostListingScreen";
import MyListingScreen from "../../screens/MyListingScreen";
import PostedScreen from "../../screens/PostedScreen";

function PostNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Post Listing"
        component={PostListingScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="My Listings"
        component={MyListingScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Posted Screen"
        component={PostedScreen}
      />
    </Stack.Navigator>
  );
}

// export default PostNavigator;

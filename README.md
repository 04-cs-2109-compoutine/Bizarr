# **Bizarr**

A marketplace app that is fully integrated with mapping, allowing users to find exactly what they're searching for.

## Table of Contents

- [Introduction](#introduction)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Getting Started](#next-steps)
- [Next Steps](#creators)
- [Creators](#creators)
- [Acknowledgements](#acknowledgements)

## Introduction

Bizarr is a collaborative marketplace where all users are able to buy and sell their items.

Bizarr keeps it simple but having everything you would need in a Marketplace in one simple application. Bizarr uses your location in order to find the listing close to you and pinpoints it to the map for your convenience. Users can also chat with each other about items in order to discuss any details and finalize their purchases. No more fuss and no more uncertainty about when and where your desired item will be in your hands.

Watch our full 4-minute demo video [here](https://www.youtube....) or a short one-minute demo [here](https:www.youtube...)

## Tech Stack

- React native
- Firebase (Firestore & Authentication)
- Cloudinary
- Expo (and Expo Image Picker)
- Node. js
- XCode Simulator
- Google Places API
- LottieView (for animation)

## Features

### Create an account

First register by entering your full name, email, and a password! Then, navigate to My Account using the bottom navigator and go to Account details to finish setting up your account with Bizarr!


![Welcome Page](https://media.giphy.com/media/fdE2bIVqGQKYRFkam4/giphy.gif) ![signup](https://media.giphy.com/media/T88a6DnJQxdlZUDu9n/giphy.gif)  ![login](https://media.giphy.com/media/IJ743J65t9YmPXso8K/giphy.gif)


### Homepage navigation with map view

After logging in, users can see the Home screen. There are 4 sections in the home screen. First section is the category section, users can find their product by clicking into the different categories icons. The following section is the map view. The map will be populated with markers showing the user's the item that are close by based on the user's current location. When clicking on one of these markers, the image of the item will pop up. When the image is clicked on, the user will be navigated to that item's description page.

Next section is New Listings. New Listings will show the user 6 of the new listings on the applicaiton. The last section is Made for You. Made for You will display 10 randomly chosen items to the user.


![Home Page](https://media.giphy.com/media/FfgM2OomITDDufZCWL/giphy.gif) ![Home navigation1](https://media.giphy.com/media/9CosLsua5BY6icjvGD/giphy.gif) ![Home navigation2](https://media.giphy.com/media/6OfnKR4ZnOWNOXDm6T/giphy.gif)

### View all our product listings

Starting at the Homepage, users can see all the products that are listed for sell near them on the map, as well as latest listings and a special section of listings made just for the user! Users can also click on ‘All Listings’ in the bottom navigator to scroll through a list of products. The filter icon on the top allows the users to filter all the items based on price in descending order. The search bar also provides users the abilitiy to easily search for a specific item and will continuously search based on each key stroke.


![All Listings Page](https://media.giphy.com/media/HZqmjmXWP0bg5W6l1W/giphy.gif) ![Search bar](https://media.giphy.com/media/PK0mYlFS8ctfuhSHSt/giphy.gif)

### Post a product

Click on the post button in the middle of the bottom navigator to switch to the Post Listing screen. When creating a post, the user is prompted to enter information about the product with an image. Enter a location you would like for people to pick up the product — it could be a specific address or just the city that you’re in. Your product’s location will automatically be rendered in the map view! Once you’re done, click ‘Post’ and you should see your product under the 'My Listings' screen in your account page.

(assets/apple-touch-icon.png)[image or screencast]

### Contact sellers

When you see a product you are interested in, you can click on it to bring up information about that specific product, including the seller’s information and a ‘Message’ button to contact the seller. Any messages you send to sellers can be viewed by navigating to the ‘Messages’ screen in the bottom navigator. Users can also pull down to refresh the message screen and swipe left on the message to delete.

(assets/apple-touch-icon.png)[image or screencast]

### Change account details

When a user is logged in and signed up, they can navigate to the 'Account Details' screen to change their email, password, name, phone number and profile picture.

(assets/apple-touch-icon.png)[image or screencast]

### Marked as sold

In 'My listings' under 'Account Screen', users can see their own posts. Navigate into a single listing, there is a button with Available. If that item is sold, users can toggle the button and mark it as sold. Then the sold item will be pushed into 'Sold History'.

### Favorite listings

In 'All Listings' screen, if the user tab the heart in a single item, they can save the item into 'Saved' under Account Screen. Users can de-selected if they no longer want to favorite the item.

## Getting Started

1. Fork and clone this repo, then npm install or expo install
2. Create a file in Bizarr folder as secret.js
3. Follow this tutorial and create a project in fire base [https://www.youtube.com/watch?v=eeGKcZGkKrc]
4. Follow this tutorial and create your own Google API key [https://www.youtube.com/watch?v=xLHiVsR7hX0]

```git
cd Bizarr && touch secret.js
```

Put all your firebase configs and google api key from firebase into secret.js as this:

```javascript
process.env.FIRESTORE_API_KEY = "YOUR KEY";
process.env.FIRESTORE_AUTH_DOMAIN = "YOUR AUTH_DOMAIN";
process.env.FIRESTORE_DATABASE_URL = "YOUR DATABASE_URL";
process.env.FIRESTORE_PROJECT_ID = "YOUR FIREBASE PROJECT ID";
process.env.FIRESTORE_STORAGE_BUCKET = "YOUR STORAGE_BUCKET";
process.env.FIRESTORE_MESSAGING_SENDER_ID = "YOUR MESSAGING_SENDER_ID";
process.env.FIRESTORE_APP_ID = "YOUR FIRESTORE_APP_ID";

process.env.GOOGLE_PLACES_API_KEY = "YOUR OWN GOOGLE API KEY";
```

4. Start this project: npm start/expo start

**_ You may need to reconfigure some other files that call these keys to match what you have in this file _**

## Next Steps

The future of Bizarr includes making our application accessible to Android users and adding a payment function so that users can actually complete their transactions in-app. We may also add a calendar so that users can choose dates and times for their meet-ups.

## Creators


:blue_heart:
![grace-profile](assets/readmePics/grace.png "grace-profile-pic")
Grace Lin:
[Github](https://github.com/gracelin95) | [Linkedin](https://www.linkedin.com/in/gracesqlin/)

:green_heart:
Liat Guvenc: [Github](https://github.com/liat-g) | [Linkedin](https://www.linkedin.com/in/liat-guvenc-8394b0179/)

:yellow_heart:
![zoe-profile](assets/readmePics/zoe.png "zoe-profile-pic")
Zoe Zhang:[Github](https://github.com/YizhuoZhang3) | [Linkedin](https://www.linkedin.com/in/zoezhang33/)

:purple_heart:
![sen-profile](assets/readmePics/sen.png "sen-profile-pic")
Sen Cai: [Github](https://github.com/sencaichi) | [Linkedin](https://www.linkedin.com/in/sentsai/)


## Acknowledgements :heart:

Bizarr cannot express enough thanks to Fullstack Academy, our fellows and instructors for their continued support and encouragement:
[Josephine Wang](https://github.com/joseewang) | [McKenna Warren](https://github.com/mckennakayyy) | [Ben Rodriguez](https://github.com/b17z)

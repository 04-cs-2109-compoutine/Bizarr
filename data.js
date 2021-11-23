
const messages = [
  {
    fromUserId: 2,
    toUserId: 1,
    listingId: 1,
    content: "Is this still available?",
    id: 1,
    dateTime: 1586044521956
  },
  {
    fromUserId: 2,
    toUserId: 1,
    listingId: 1,
    content: "I'm interested in this item. Do you provide free delivery?",
    id: 2,
    dateTime: 1586044521956
  },
  {
    fromUserId: 2,
    toUserId: 1,
    listingId: 1,
    content: "Please give me a call and we'll arrange this for you.",
    id: 3,
    dateTime: 1586044521956
  }
];

const listings = [
  {
    id: 201,
    title: "Red jacket",
    images: [{ fileName: "jacket1" }],
    price: 100,
    categoryId: 5,
    userId: 1,
    location: {
      latitude: 37.78825,
      longitude: -122.4324,
    },
  },
  {
    id: 3,
    title: "Gray couch in a great condition",
    images: [{ fileName: "couch2" }],
    categoryId: 1,
    price: 1200,
    userId: 2,
    location: {
      latitude: 37.78825,
      longitude: -122.4324,
    },
  },
  {
    id: 1,
    title: "Room & Board couch (great condition) - delivery included",
    description:
      "I'm selling my furniture at a discount price. Pick up at Venice. DM me asap.",
    images: [
      { fileName: "couch1" },
      { fileName: "couch2" },
      { fileName: "couch3" },
    ],
    price: 1000,
    categoryId: 1,
    userId: 1,
    location: {
      latitude: 37.78825,
      longitude: -122.4324,
    },
  },
  {
    id: 2,
    title: "Designer wear shoes",
    images: [{ fileName: "shoes1" }],
    categoryId: 5,
    price: 100,
    userId: 2,
    location: {
      latitude: 37.78825,
      longitude: -122.4324,
    },
  },
  {
    id: 102,
    title: "Canon 400D (Great Condition)",
    images: [{ fileName: "camera1" }],
    price: 300,
    categoryId: 3,
    userId: 1,
    location: {
      latitude: 37.78825,
      longitude: -122.4324,
    },
  },
  {
    id: 101,
    title: "Nikon D850 for sale",
    images: [{ fileName: "camera2" }],
    price: 350,
    categoryId: 3,
    userId: 1,
    location: {
      latitude: 37.78825,
      longitude: -122.4324,
    },
  },
  {
    id: 4,
    title: "Sectional couch - Delivery available",
    description: "No rips no stains no odors",
    images: [{ fileName: "couch3" }],
    categoryId: 1,
    price: 950,
    userId: 2,
    location: {
      latitude: 37.78825,
      longitude: -122.4324,
    },
  },
  {
    id: 6,
    title: "Brown leather shoes",
    images: [{ fileName: "shoes2" }],
    categoryId: 5,
    price: 50,
    userId: 2,
    location: {
      latitude: 37.78825,
      longitude: -122.4324,
    },
  },
];

const users = [
  {
    id: 1,
    name: "Mosh",
    email: "mosh@domain.com",
    password: "12345",
  },
  {
    id: 2,
    name: "John",
    email: "john@domain.com",
    password: "12345",
  },
];

const categories = [
  {
    id: 1,
    name: "Furniture",
    icon: "floor-lamp",
    backgroundColor: "#fc5c65",
    color: "white"
  },
  {
    id: 2,
    name: "Cars",
    icon: "car",
    backgroundColor: "#fd9644",
    color: "white"
  },
  {
    id: 3,
    name: "Cameras",
    icon: "camera",
    backgroundColor: "#fed330",
    color: "white"
  },
  {
    id: 4,
    name: "Games",
    icon: "cards",
    backgroundColor: "#26de81",
    color: "white"
  },
  {
    id: 5,
    name: "Clothing",
    icon: "shoe-heel",
    backgroundColor: "#2bcbba",
    color: "white"
  },
  {
    id: 6,
    name: "Sports",
    icon: "basketball",
    backgroundColor: "#45aaf2",
    color: "white"
  },
  {
    id: 7,
    name: "Movies & Music",
    icon: "headphones",
    backgroundColor: "#4b7bec",
    color: "white"
  },
  {
    id: 8,
    name: "Books",
    icon: "book-open-variant",
    backgroundColor: "#a55eea",
    color: "white"
  },
  {
    id: 9,
    name: "Other",
    icon: "application",
    backgroundColor: "#778ca3",
    color: "white"
  }
];

export default {messages, users, categories, listings}
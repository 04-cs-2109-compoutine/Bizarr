import { db } from "../firebase";

const FETCH_LISTINGS = "FETCH_LISTINGS";

const _fetchListings = (listings) => {
  return {
    type: FETCH_LISTINGS,
    listings,
  };
};

export const fetchListings = () => {
  return async (dispatch) => {
    try {
      const collectionRef = db.collection("listings");
      const getPromise = collectionRef.get();
      const snapshot = await getPromise;
      const listings = snapshot.docs.map((doc) => ({}));
      dispatch(_fetchListings(listings));
    } catch (e) {
      console.log(e);
    }
  };
};

export default function listings(state = [], action) {
  switch (action.type) {
    case FETCH_LISTINGS:
      return action.listings;
    default:
      return state;
  }
}

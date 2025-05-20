import { create } from "zustand";
import axios from "axios";

axios.defaults.withCredentials = true;

const types = {
  addTrip: "ADD_TRIP",
  updateTrip: "UPDATE_TRIP",
  delete: "DELETE",
};

const tripReducer = (state, { type, payload }) => {
  switch (type) {
    case types.addTrip:
      return {
        ...state,
        trips: [...state.trips, payload],
      };
    case types.updateTrip:
      return {};
    case types.delete:
      return { count: 0 };
    default:
      return state;
  }
};

const useAuthStore = create((set, get) => ({
  user: null,
  loading: true,
  trips: [],
  message: "",
  fetchUser: async () => {
    try {
      const res = await axios.get( `${import.meta.env.VITE_BACKEND_URL}/me`);
      set({ user: res.data.user, loading: false });
    } catch {
      set({ user: null, loading: false });
    }
  },

  logout: async () => {
    await axios.post( `${import.meta.env.VITE_BACKEND_URL}/logout`);
    set({ user: null });
  },
  setUser: (user) => set({ user }),
  fetchTrips: async () => {
    try {


      const res = await axios.get( `${import.meta.env.VITE_BACKEND_URL}/trips`);

       set({ trips: res.data , loading: false });
    } catch {
      set({ loading: false });
    }
  },
  setTrips: (trips) => set({ trips }),
  addTrip: async (trip) => {
    try {
      await axios.post( `${import.meta.env.VITE_BACKEND_URL}/trips/addTrip`, trip, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      // set((state) => ({ trips: [...state.trips, res.data] }));
    } catch (error) {
      set({ message: error.response.data.message });
    }
  },
  // removeTrip: (tripId) => set((state) => ({ trips: state.trips.filter((trip) => trip.id !== tripId)  })),
  removeTrip: (tripId) => {
    const newTrips = get().trips.filter((trip) => trip.id !== tripId);
    set({ trips: newTrips });
  },
  updateTrip: (updatedTrip) =>
    set((state) => ({
      trips: state.trips.map((trip) =>
        trip.id === updatedTrip.id ? updatedTrip : trip
      ),
    })),
  dispatch: (action) => set((state) => tripReducer(state, action)),
}));

export default useAuthStore;

import { create } from "zustand";
import axios from "axios";

axios.defaults.withCredentials = true;


const useAuthStore = create((set) => ({
  user: null,
  loading: true,
  trips: [],
  message: "",
  currentContact: null,
  
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
  fetchCurrentContact: async () => {
    try {
      const res = await axios.get( `${import.meta.env.VITE_BACKEND_URL}/contact`);
      if(res.data) set({ currentContact: res.data, loading: false });
    } catch {
      set({ currentContact: null, loading: false });
    }
  },
  setCurrentContact: (currentContact) => set({ currentContact }),

 



  fetchTrips: async (sortBy,sortDirection,currentPage,limit) => {
    try {


      const res = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/trips?sortBy=${sortBy}&sortDirection=${sortDirection}&currentPage=${currentPage}&limit=${limit}`
      );

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
    

      set({ message: "Trip added successfully" });
    } catch (error) {
      set({ message: error.response.data.message });
    }
  },

  deleteTrip: async (id) => {
   const res= await axios.delete(
      `${import.meta.env.VITE_BACKEND_URL}/trips/deleteTrip/${id}`
    );
    console.log(res.data);
    set((state) => ({
      trips: state.trips.filter((trip) => trip._id !== id),
    }));
    set({ message: res.data.message });
  },
  updateTrip: async (updatedTrip,id) =>
  {
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/trips/updateTrip/${id}`,
        updatedTrip,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      set((state) => ({
        trips: state.trips.map((trip) =>
          trip._id === id ? { ...trip, ...updatedTrip } : trip
        ),
      }));
      set({ message: "Trip updated successfully" });
    } catch (error) {
      set({ message: error.response.data.message });
    }
  },
}));

export default useAuthStore;

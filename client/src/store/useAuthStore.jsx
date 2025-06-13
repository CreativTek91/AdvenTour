import { create } from "zustand";
import axios from "axios";
import $api from '../http/api.js';


const fetchInitialContact = async () => {
  try {
    const res = await $api.get(
      `/contact`
    );
    return res.data;
  } catch(err) {
   console.error("Error fetching initial contact:", err);
  }
  
}
let initialContact = await fetchInitialContact();

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  message:'',
  setMessage: (message) => set({ message }),
  error: null,
  setError: (error) => set({ error }),
  addMediaToTrip: async (mediaId, tripId) => {
    try {
      const res = await $api.post(
        `/trips/addMedia/${tripId}`,
        { mediaId }
      );
      console.log("Media added to trip:", res.data);
    } catch (error) {
      console.error("Error adding media to trip:", error);
    }
  }
  ,
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  loading: false,
  setLoading: (loading) => set({ loading }),
  trips: [],
  currentContact: initialContact || null, // Initialize with fetched contact or null
  fetchCurrentContact: async () => {
    try {
      const res = await $api.get(
        '/contact'
      );
      set({ currentContact: res.data});
    } catch(err) {
      set({ currentContact: null, error: err.response?.data?.message });
    }
   
  },
  setCurrentContact: (currentContact) => set({ currentContact }),

  fetchUser: async () => {
    set({ loading: true });
    try {
      const res = await $api.get('/me');
      set({ user: res.data.user,isAuthenticated:true, loading: false });
    } catch {
      set({ user: null, loading: false, isAuthenticated: false });
    }
  },
 checkAuth: async () => {
    set({ loading: true});
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/refresh`, {
        withCredentials: true, // Ensure cookies are sent with the request
      });
      localStorage.setItem("token", res.data.userData.accessToken);
      set({
        user: res.data.userData.user,
        isAuthenticated: true,
      });
    } catch (error) {
      set({ isAuthenticated: false });
      console.error("Authentication check failed:", error);
    }finally{
      set({ loading: false });
    }
  },
  registerUser: async (payload) => {
    try {
      const res = await $api.post("/register", payload );
      localStorage.setItem("token", res.data.userData.accessToken);
      set({user: res.data.userData.user})
      return {message:res.data.message}
    } catch (error) {
      return { user: null, isAuthenticated: false, error: error.response?.data?.message || "Registration failed" };
    }finally{
      set({ loading: false,error: null});
    }
   
  },
 
  loginUser: async (payload) => {
    try {
      const res = await $api.post("/login", payload);
      console.log("LOGIN_ResponseFRONT_AUTH:", res.data.message);
      localStorage.setItem("token", res.data.userData.accessToken);
      set({ user: res.data.userData.user, isAuthenticated: true, message: res.data.message });
      return { user: res.data.userData.user, isAuthenticated: true, message: res.data.message };
    } catch (error) {
      return { user: null, isAuthenticated: false, error: error || "Login failed" };
    }
  },
  fetchUserById: async (id) => {

    if (!id) {
      set({ user: null, loading: false });
      return;
    }
    try {
      const res = await $api.get(`/${id}`);
      set({ user: res.data, loading: false });
    } catch(error) {
      console.error("Error fetching user by ID:", error);
      set({  loading: false,user: null, error: error.response?.data?.message || "Failed to fetch user" });
    }
  },
  logout: async () => {
    await $api.post(`/logout`);
    localStorage.removeItem("token");
    set({user: null, isAuthenticated: false, loading: false });
   
  },
  setUser: (user) => set({ user }),

  fetchTrips: async (sortBy, sortDirection, currentPage, limit) => {
 
    try {
      const res = await $api.get(
        `/trips?sortBy=${sortBy}&sortDirection=${sortDirection}&currentPage=${currentPage}&limit=${limit}`
      );
      set({ trips: res.data});
    } catch(err) {
      set({error: err.response?.data?.message || "Failed to fetch trips" });
    }finally {
      set({ loading: false });
    }

  },
  setTrips: (trips) => set({ trips }),
  addTrip: async (trip) => {
    try {
      await $api.post(
        "/trips/addTrip",
        trip,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
    } catch (error) {
      console.error("Error adding trip:", error);
      
    }
  },

  deleteTrip: async (id) => {
    const res = await $api.delete(
      `/trips/deleteTrip/${id}`
    );

    set((state) => ({
      trips: state.trips.filter((trip) => trip._id !== id),
    }));
    set({ message: res.data.message });
  },
  updateTrip: async (updatedTrip, id) => {
    try {
      await $api.put(
        `/trips/updateTrip/${id}`,
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

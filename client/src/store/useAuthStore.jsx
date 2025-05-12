import { create } from "zustand";
import axios from "axios";

axios.defaults.withCredentials = true;

const types = {addTrip: 'ADD_TRIP', updateTrip: 'UPDATE_TRIP', delete: 'DELETE' }

const tripReducer = (state, { type, payload }) => {
 switch (type) {
   case types.addTrip: return { 
        ...state,
        trips: [...state.trips, payload],
   }
   case types.updateTrip: return { 

   }
   case types.delete: return { count: 0 }
   default: return state
 }
}

const useAuthStore = create((set,get) => ({
user: null,
  loading: true,
  trips:[],
  message:'',
  fetchUser: async () => {
    try {
      const res = await axios.get("http://localhost:8834/api/me");
      set({ user: res.data, loading: false, isAuthorized: true });
    } catch {
      set({ user: null, loading: false });
    }
  },

  logout: async () => {
    await axios.post("http://localhost:8834/api/logout");
    set({ user: null });
  },
  setUser: (user) => set({ user }),
  fetchTrips: async () => {
     try {
       const res = await axios.get("http://localhost:8834/api/trips");
     
       set({ trips: res.data });
     } catch {
       set({ user: null, loading: false });
     }
  },
    setTrips: (trips) => set({ trips }),
    addTrip:async (trip) =>{
        try {
         await axios.post("http://localhost:8834/api/trips/addTrip", trip);
            // set((state) => ({ trips: [...state.trips, res.data] }));
           
        }
        catch (error) {
           set({message: error.response.data.message});
        }
    } ,
    // removeTrip: (tripId) => set((state) => ({ trips: state.trips.filter((trip) => trip.id !== tripId)  })),
    removeTrip: (tripId) => {
      const newTrips =  get().trips.filter((trip) => trip.id !== tripId);
        set({ trips: newTrips });
    },
    updateTrip: (updatedTrip) => set((state) => ({
      trips: state.trips.map((trip) => (trip.id === updatedTrip.id ? updatedTrip : trip)),
    }
  )),
   dispatch: action => set(state => tripReducer(state, action))
}));

export default useAuthStore;

import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

// --- Helper to load pastes safely ---
const loadPastes = () => {
  try {
    const stored = localStorage.getItem("pastes");
    return stored ? JSON.parse(stored) : [];
  } catch (err) {
    console.error("Invalid JSON in localStorage for pastes:", err);
    localStorage.removeItem("pastes"); // clear corrupted data
    return [];
  }
};

// --- Initial State ---
const initialState = {
  pastes: loadPastes(),
};

// --- Slice ---
export const PasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPastes: (state, action) => {
      const paste = action.payload;
      const existingPaste = state.pastes.find((p) => p._id === paste._id);

      if (!existingPaste) {
        state.pastes.push(paste);
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste created successfully");
      } else {
        toast.error("Paste with this ID already exists!");
      }
    },

    updateToPastes: (state, action) => {
      const paste = action.payload;
      const index = state.pastes.findIndex((item) => item._id === paste._id);

      if (index >= 0) {
        state.pastes[index] = paste;
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste updated successfully");
      } else {
        toast.error("Paste not found!");
      }
    },

    resetAllPastes: (state) => {
      state.pastes = [];
      localStorage.removeItem("pastes");
      toast.success("All pastes have been reset");
    },

    removeFromPastes: (state, action) => {
      const pasteId = action.payload;
      const index = state.pastes.findIndex((item) => item._id === pasteId);

      if (index >= 0) {
        state.pastes.splice(index, 1);
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste removed successfully");
      } else {
        toast.error("Paste not found!");
      }
    },
  },
});

// --- Export Actions & Reducer ---
export const { addToPastes, updateToPastes, resetAllPastes, removeFromPastes } = PasteSlice.actions;
export default PasteSlice.reducer;

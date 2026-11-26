import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type PreviewLayoutMode = "grid" | "list";

export interface SidebarState {
  isCollapsed: boolean;
  isMobileOpen: boolean;
  activeDashboardTab: string;
  isFilterPanelOpen: boolean;
  previewLayout: PreviewLayoutMode;
}

const getInitialCollapsedState = (): boolean => {
  try {
    return localStorage.getItem("ep_sidebar_collapsed") === "true";
  } catch {
    return false;
  }
};

const initialState: SidebarState = {
  isCollapsed: getInitialCollapsedState(),
  isMobileOpen: false,
  activeDashboardTab: "overview",
  isFilterPanelOpen: false,
  previewLayout: "grid",
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleSidebarCollapse: (state) => {
      state.isCollapsed = !state.isCollapsed;
      try {
        localStorage.setItem("ep_sidebar_collapsed", String(state.isCollapsed));
      } catch {
        // Ignore storage errors
      }
    },
    setSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.isCollapsed = action.payload;
      try {
        localStorage.setItem("ep_sidebar_collapsed", String(state.isCollapsed));
      } catch {
        // Ignore storage errors
      }
    },
    openMobileSidebar: (state) => {
      state.isMobileOpen = true;
    },
    closeMobileSidebar: (state) => {
      state.isMobileOpen = false;
    },
    toggleMobileSidebar: (state) => {
      state.isMobileOpen = !state.isMobileOpen;
    },
    setActiveDashboardTab: (state, action: PayloadAction<string>) => {
      state.activeDashboardTab = action.payload;
    },
    toggleFilterPanel: (state) => {
      state.isFilterPanelOpen = !state.isFilterPanelOpen;
    },
    setFilterPanelOpen: (state, action: PayloadAction<boolean>) => {
      state.isFilterPanelOpen = action.payload;
    },
    setPreviewLayout: (state, action: PayloadAction<PreviewLayoutMode>) => {
      state.previewLayout = action.payload;
    },
  },
});

export const {
  toggleSidebarCollapse,
  setSidebarCollapsed,
  openMobileSidebar,
  closeMobileSidebar,
  toggleMobileSidebar,
  setActiveDashboardTab,
  toggleFilterPanel,
  setFilterPanelOpen,
  setPreviewLayout,
} = sidebarSlice.actions;

export default sidebarSlice.reducer;

export interface feedbackItem {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: string;
  text: string;
}

const CUSTOM_FEEDBACKS_KEY = "ep_user_reviews_v1";

export const feedbacks: feedbackItem[] = [
  {
    id: "rohit-sharma",
    name: "Rohit Sharma",
    role: "Student",
    avatar: "RS",
    rating: "5.0",
    text: "EasyPrint is amazing! Super fast and super easy to use. Highly recommended!",
  },
  {
    id: "priya-verma",
    name: "Priya Verma",
    role: "College Student",
    avatar: "PV",
    rating: "4.8",
    text: "Uploading documents and getting prints has never been this simple. Really convenient!",
  },
  {
    id: "aman-kumar",
    name: "Aman Kumar",
    role: "Software Developer",
    avatar: "AK",
    rating: "4",
    text: "The document editing features are really useful. Saves a lot of time!",
  },
  {
    id: "neha-singh",
    name: "Neha Singh",
    role: "University Student",
    avatar: "NS",
    rating: "3",
    text: "A smooth experience from uploading to printing. Everything works perfectly!",
  },
  {
    id: "rahul-gupta",
    name: "Rahul Gupta",
    role: "Business Owner",
    avatar: "RG",
    rating: "4.3",
    text: "Easy to use and a great solution for managing everyday printing needs.",
  },
  {
    id: "anjali-verma",
    name: "Anjali Verma",
    role: "Student",
    avatar: "AV",
    rating: "4.9",
    text: "I love how easy it is to preview and adjust my documents before printing.",
  },
];

const getInitials = (name: string): string => {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] ?? ""}${parts[parts.length - 1][0] ?? ""}`.toUpperCase();
};

export const getAllLandingFeedbacks = (): feedbackItem[] => {
  try {
    const raw = localStorage.getItem(CUSTOM_FEEDBACKS_KEY);
    if (!raw) return feedbacks;
    const saved = JSON.parse(raw) as feedbackItem[];
    if (!Array.isArray(saved) || saved.length === 0) return feedbacks;
    return [...saved, ...feedbacks];
  } catch {
    return feedbacks;
  }
};

export const saveLandingFeedback = (input: {
  name: string;
  role?: string;
  rating: number;
  message: string;
}): feedbackItem => {
  const cleanName = input.name.trim() || "Verified Shopkeeper";
  const newItem: feedbackItem = {
    id: `review-${Date.now()}`,
    name: cleanName,
    role: input.role || "Shopkeeper",
    avatar: getInitials(cleanName) || "EP",
    rating: input.rating.toFixed(1),
    text: input.message.trim(),
  };

  try {
    const raw = localStorage.getItem(CUSTOM_FEEDBACKS_KEY);
    const existing = raw ? (JSON.parse(raw) as feedbackItem[]) : [];
    const updated = [newItem, ...(Array.isArray(existing) ? existing : [])];
    localStorage.setItem(CUSTOM_FEEDBACKS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("easyprint:feedback-updated"));
  } catch {
    // Ignore storage errors
  }

  return newItem;
};

export default feedbacks;

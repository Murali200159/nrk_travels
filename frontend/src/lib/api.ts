const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

type RequestOptions = {
  method?: string;
  body?: Record<string, unknown>;
  headers?: Record<string, string>;
};

async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', body, headers = {} } = options;

  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'An unknown error occurred' }));
    throw new Error(error.message || `HTTP Error: ${response.status}`);
  }

  return response.json();
}

// ──────────────────────────────────────────────
// Contacts
// ──────────────────────────────────────────────
export const submitContact = (data: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}) => request('/contact', { method: 'POST', body: data as unknown as Record<string, unknown> });

// ──────────────────────────────────────────────
// ──────────────────────────────────────────────
// Careers
// ──────────────────────────────────────────────
export const submitCareerApplication = (data: {
  name: string;
  email: string;
  phone: string;
  position: string;
  resume_url?: string;
}) => request('/careers', { method: 'POST', body: data as unknown as Record<string, unknown> });

// ──────────────────────────────────────────────
// Enquiries
// ──────────────────────────────────────────────
export const submitEnquiry = (data: {
  name: string;
  mobile: string;
  whatsapp: string;
  pickup: string;
  drop?: string;
  tripType: string;
  date?: string;
  distance?: number;
}) => request<{ success: boolean; data: { id: string; [key: string]: unknown } }>(
  '/enquiries',
  { method: 'POST', body: data as unknown as Record<string, unknown> }
);

// ──────────────────────────────────────────────
// Bookings
// ──────────────────────────────────────────────
export const createBooking = (data: {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  booking_type: 'tour' | 'group_tour' | 'vehicle' | 'hire_driver';
  total_amount: number;
  actual_total_amount?: number;
  amount_paid?: number;
  payment_percentage?: number;
  status?: string;
  special_requests?: string;
  tour_id?: string;
  group_tour_id?: string;
  fleet_id?: string;
  travel_date?: string;
  passengers?: number;
}) => request<{ success: boolean; data: { id: string; [key: string]: unknown } }>(
  '/bookings',
  { method: 'POST', body: data as unknown as Record<string, unknown> }
);

// ──────────────────────────────────────────────
// Payments (Razorpay)
// ──────────────────────────────────────────────
export const createPaymentOrder = (bookingId: string) =>
  request<{ success: boolean; data: { id: string; amount: number; currency: string } }>(
    '/payments/create-order',
    { method: 'POST', body: { bookingId } }
  );

export const verifyPayment = (data: {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}) => request('/payments/verify', { method: 'POST', body: data as unknown as Record<string, unknown> });

// ──────────────────────────────────────────────
// Tours
// ──────────────────────────────────────────────
export const getTours = (params?: { search?: string; page?: number; limit?: number }) => {
  const query = new URLSearchParams(params as Record<string, string>).toString();
  return request<{ success: boolean; data: unknown[]; pagination: unknown }>(`/tours${query ? `?${query}` : ''}`);
};

// ──────────────────────────────────────────────
// Group Tours
// ──────────────────────────────────────────────
export const getGroupTours = (params?: { search?: string; page?: number; limit?: number }) => {
  const query = new URLSearchParams(params as Record<string, string>).toString();
  return request<{ success: boolean; data: unknown[]; pagination: unknown }>(`/group-tours${query ? `?${query}` : ''}`);
};

// ──────────────────────────────────────────────
// Fleet
// ──────────────────────────────────────────────
export const getFleet = (params?: { search?: string; status?: string }) => {
  const query = new URLSearchParams(params as Record<string, string>).toString();
  return request<{ success: boolean; data: unknown[] }>(`/fleet${query ? `?${query}` : ''}`);
};

// ──────────────────────────────────────────────
// Razorpay Script Loader
// ──────────────────────────────────────────────
export const loadRazorpay = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve(false);
      return;
    }
    if ((window as any).Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

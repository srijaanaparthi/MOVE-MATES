const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// API Response interfaces
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  error?: string;
}

export interface User {
  walletAddress: string;
  name: string;
  role: 'student' | 'tutor';
  email?: string;
  profileImage?: string;
  bio?: string;
  subjects?: string[];
  rating?: number;
  totalSessions?: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TutorsResponse {
  tutors: User[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalTutors: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export interface StudentsResponse {
  students: User[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalStudents: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export interface StatsResponse {
  totalUsers: number;
  totalTutors: number;
  totalStudents: number;
  topTutors: Array<{
    name: string;
    rating: number;
    totalSessions: number;
  }>;
}

class ApiService {
  private baseURL: string;

  constructor() {
    this.baseURL = API_BASE_URL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Authentication endpoints
  async signup(data: {
    walletAddress: string;
    name: string;
    role: 'student' | 'tutor';
    email?: string;
  }): Promise<ApiResponse<User>> {
    return this.request<ApiResponse<User>>('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async login(data: { walletAddress: string }): Promise<ApiResponse<User>> {
    return this.request<ApiResponse<User>>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getUserProfile(walletAddress: string): Promise<ApiResponse<User>> {
    return this.request<ApiResponse<User>>(`/auth/user/${walletAddress}`, {
      method: 'GET',
    });
  }

  async updateUserProfile(
    walletAddress: string,
    data: {
      name?: string;
      email?: string;
      bio?: string;
      subjects?: string[];
    }
  ): Promise<ApiResponse<User>> {
    return this.request<ApiResponse<User>>(`/auth/user/${walletAddress}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // User management endpoints
  async getTutors(params?: {
    page?: number;
    limit?: number;
    subject?: string;
    rating?: number;
  }): Promise<ApiResponse<TutorsResponse>> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.subject) queryParams.append('subject', params.subject);
    if (params?.rating) queryParams.append('rating', params.rating.toString());

    const queryString = queryParams.toString();
    const endpoint = `/users/tutors${queryString ? `?${queryString}` : ''}`;
    
    return this.request<ApiResponse<TutorsResponse>>(endpoint, {
      method: 'GET',
    });
  }

  async getStudents(params?: {
    page?: number;
    limit?: number;
  }): Promise<ApiResponse<StudentsResponse>> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const queryString = queryParams.toString();
    const endpoint = `/users/students${queryString ? `?${queryString}` : ''}`;
    
    return this.request<ApiResponse<StudentsResponse>>(endpoint, {
      method: 'GET',
    });
  }

  async searchUsers(params: {
    q: string;
    role?: 'student' | 'tutor';
    limit?: number;
  }): Promise<ApiResponse<User[]>> {
    const queryParams = new URLSearchParams();
    queryParams.append('q', params.q);
    if (params.role) queryParams.append('role', params.role);
    if (params.limit) queryParams.append('limit', params.limit.toString());

    return this.request<ApiResponse<User[]>>(`/users/search?${queryParams.toString()}`, {
      method: 'GET',
    });
  }

  async getStats(): Promise<ApiResponse<StatsResponse>> {
    return this.request<ApiResponse<StatsResponse>>('/users/stats', {
      method: 'GET',
    });
  }

  // Health check
  async healthCheck(): Promise<ApiResponse<{ timestamp: string; environment: string }>> {
    return this.request<ApiResponse<{ timestamp: string; environment: string }>>('/health', {
      method: 'GET',
    });
  }
}

export const apiService = new ApiService();
export default apiService;

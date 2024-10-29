import { Observable } from '@nativescript/core';
import { User } from '../models/user.model';

export class AuthService extends Observable {
    private static instance: AuthService;
    private currentUser: User | null = null;

    // Test user data
    private readonly testUsers = [
        {
            id: '1',
            email: 'teste@email.com',
            password: '123456',
            name: 'Usuário Teste',
            location: {
                latitude: -23.550520,
                longitude: -46.633308,
                city: 'São Paulo'
            },
            books: [],
            matches: [],
            rating: 4.5,
            profileImage: 'https://www.gravatar.com/avatar/test'
        }
    ];

    static getInstance(): AuthService {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService();
        }
        return AuthService.instance;
    }

    isLoggedIn(): boolean {
        return this.currentUser !== null;
    }

    async login(email: string, password: string): Promise<boolean> {
        try {
            const normalizedEmail = email.toLowerCase().trim();
            
            const user = this.testUsers.find(u => 
                u.email.toLowerCase() === normalizedEmail && 
                u.password === password
            );

            if (user) {
                const { password: _, ...userWithoutPassword } = user;
                this.currentUser = userWithoutPassword;
                return true;
            }
            
            return false;
        } catch (error) {
            console.error('Login error:', error);
            return false;
        }
    }

    async signUp(userData: { name: string; email: string; password: string }): Promise<boolean> {
        try {
            // Simulate API call
            const newUser: User = {
                id: Date.now().toString(),
                name: userData.name,
                email: userData.email.toLowerCase(),
                location: {
                    latitude: 0,
                    longitude: 0,
                    city: ''
                },
                books: [],
                matches: [],
                rating: 5,
                profileImage: `https://www.gravatar.com/avatar/${Date.now()}?d=mp`
            };

            this.currentUser = newUser;
            return true;
        } catch (error) {
            console.error('SignUp error:', error);
            return false;
        }
    }

    async signInWithGoogle(): Promise<boolean> {
        try {
            // Simulate Google Sign In
            const googleUser: User = {
                id: Date.now().toString(),
                name: 'Google User',
                email: 'google.user@gmail.com',
                location: {
                    latitude: 0,
                    longitude: 0,
                    city: ''
                },
                books: [],
                matches: [],
                rating: 5,
                profileImage: 'https://www.gravatar.com/avatar/google?d=mp'
            };

            this.currentUser = googleUser;
            return true;
        } catch (error) {
            console.error('Google SignIn error:', error);
            return false;
        }
    }

    logout(): void {
        this.currentUser = null;
    }

    getCurrentUser(): User | null {
        return this.currentUser;
    }
}
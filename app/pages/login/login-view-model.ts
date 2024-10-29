import { Observable } from '@nativescript/core';
import { AuthService } from '../../services/auth.service';
import { navigate } from '@nativescript/core/ui/frame';

export class LoginViewModel extends Observable {
    private authService: AuthService;
    public email: string = '';
    public password: string = '';
    public errorMessage: string = '';
    public isLoading: boolean = false;

    constructor() {
        super();
        this.authService = AuthService.getInstance();
    }

    async onLogin() {
        try {
            if (!this.email || !this.password) {
                this.set('errorMessage', 'Por favor, preencha todos os campos');
                return;
            }

            this.set('isLoading', true);
            this.set('errorMessage', '');

            const success = await this.authService.login(this.email, this.password);
            
            if (success) {
                navigate({
                    moduleName: 'pages/home/home-page',
                    clearHistory: true
                });
            } else {
                this.set('errorMessage', 'Email ou senha inválidos');
            }
        } catch (error) {
            console.error('Login error:', error);
            this.set('errorMessage', 'Ocorreu um erro ao fazer login');
        } finally {
            this.set('isLoading', false);
        }
    }

    onSignUp() {
        navigate({
            moduleName: 'pages/signup/signup-page'
        });
    }
}
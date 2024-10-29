import { Observable } from '@nativescript/core';
import { AuthService } from '../../services/auth.service';
import { navigate } from '@nativescript/core/ui/frame';

export class SignUpViewModel extends Observable {
    private authService: AuthService;
    public name: string = '';
    public email: string = '';
    public password: string = '';
    public confirmPassword: string = '';
    public errorMessage: string = '';
    public isLoading: boolean = false;

    constructor() {
        super();
        this.authService = AuthService.getInstance();
    }

    async onSignUp() {
        try {
            if (!this.validateForm()) {
                return;
            }

            this.set('isLoading', true);
            this.set('errorMessage', '');

            const success = await this.authService.signUp({
                name: this.name,
                email: this.email,
                password: this.password
            });

            if (success) {
                navigate({
                    moduleName: 'pages/home/home-page',
                    clearHistory: true
                });
            } else {
                this.set('errorMessage', 'Erro ao criar conta. Tente novamente.');
            }
        } catch (error) {
            console.error('SignUp error:', error);
            this.set('errorMessage', 'Ocorreu um erro ao criar a conta');
        } finally {
            this.set('isLoading', false);
        }
    }

    async onGoogleSignUp() {
        try {
            this.set('isLoading', true);
            this.set('errorMessage', '');

            const success = await this.authService.signInWithGoogle();

            if (success) {
                navigate({
                    moduleName: 'pages/home/home-page',
                    clearHistory: true
                });
            } else {
                this.set('errorMessage', 'Erro ao entrar com Google. Tente novamente.');
            }
        } catch (error) {
            console.error('Google SignUp error:', error);
            this.set('errorMessage', 'Ocorreu um erro ao entrar com Google');
        } finally {
            this.set('isLoading', false);
        }
    }

    private validateForm(): boolean {
        if (!this.name || !this.email || !this.password || !this.confirmPassword) {
            this.set('errorMessage', 'Por favor, preencha todos os campos');
            return false;
        }

        if (this.password !== this.confirmPassword) {
            this.set('errorMessage', 'As senhas não coincidem');
            return false;
        }

        if (this.password.length < 6) {
            this.set('errorMessage', 'A senha deve ter pelo menos 6 caracteres');
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this.email)) {
            this.set('errorMessage', 'Email inválido');
            return false;
        }

        return true;
    }
}
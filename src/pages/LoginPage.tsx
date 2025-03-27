import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import LoginForm from '@/components/auth/LoginForm';
import AnimatedSection from '@/components/shared/AnimatedSection';

const LoginPage = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-grow pt-20">
                {/* Header */}
                <section className="py-20 bg-wedding-secondary/30">
                    <div className="container max-w-5xl mx-auto px-6">
                        <AnimatedSection className="text-center" animation="fade-in">
                            <h1 className="font-serif text-5xl text-wedding-dark mb-4">Welcome</h1>
                            <div className="w-16 h-0.5 bg-wedding-primary mx-auto mb-8"></div>
                            <p className="text-wedding-muted max-w-3xl mx-auto">
                                Please sign in to access your wedding RSVP and other details.
                            </p>
                        </AnimatedSection>
                    </div>
                </section>

                {/* Login Form */}
                <section className="bg-white">
                    <div className="container max-w-3xl mx-auto px-6">
                        <AnimatedSection animation="fade-in">
                            <div className="bg-white rounded-lg shadow-soft border border-wedding-accent/10 p-8">

                                <div className="bg-white py-8 px-4 sm:px-10">
                                    <LoginForm />
                                </div>
                            </div>
                        </AnimatedSection>
                    </div>
                </section>

                {/* Contact Info */}
                <section className="py-16 bg-wedding-secondary/20">
                    <div className="container max-w-4xl mx-auto px-6">
                        <AnimatedSection className="text-center" animation="fade-in">
                            <h2 className="font-serif text-3xl text-wedding-dark mb-4">Need Help?</h2>
                            <div className="w-12 h-0.5 bg-wedding-primary mx-auto mb-6"></div>
                            <p className="text-wedding-muted max-w-2xl mx-auto mb-4">
                                If you're having trouble signing in, please contact us for assistance.
                            </p>
                            <p className="text-wedding-dark font-medium">
                                <div>
                                    Email: <a href="mailto:nihan.bir@gmail.com" className="text-wedding-primary hover:underline">nihan.bir@gmail.com</a>
                                </div>
                                <div>
                                    Phone: <a className="text-wedding-primary hover:underline">+46707314374</a>
                                </div>
                            </p>
                        </AnimatedSection>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default LoginPage;
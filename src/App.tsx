/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import BestSellers from "./components/BestSellers";
import CustomCake from "./components/CustomCake";
import BrandStory from "./components/BrandStory";
import Gallery from "./components/Gallery";
import Testimonials from "./components/Testimonials";
import FestivalSpecials from "./components/FestivalSpecials";
import MenuDisplay from "./components/MenuDisplay";
import Delivery from "./components/Delivery";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { ToastProvider } from "./components/ui/Toast";
import AdminLayout from "./admin/AdminLayout";
import Dashboard from "./admin/Dashboard";
import Products from "./admin/Products";
import Orders from "./admin/Orders";
import Inquiries from "./admin/Inquiries";
import Settings from "./admin/Settings";
import Login from "./admin/Login";

// Protected Route for Admin
const ProtectedAdmin = ({ children }: { children: React.ReactNode }) => {
  const { user, loading, isAdmin } = useAuth();

  if (loading) return <div className="h-screen w-full bg-bakery-beige flex items-center justify-center font-serif italic text-bakery-gold text-2xl animate-pulse">CMA...</div>;
  
  if (!user || !isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return <AdminLayout>{children}</AdminLayout>;
};

const HomePage = () => (
  <main className="min-h-screen bg-bakery-cream">
    <Navbar />
    <Hero />
    <div className="space-y-0">
      <Categories />
      <BestSellers />
      <MenuDisplay />
      <FestivalSpecials />
      <CustomCake />
      <BrandStory />
      <Testimonials />
      <Gallery />
      <Contact />
      <Delivery />
    </div>
    <Footer />
  </main>
);

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <ToastProvider>
          <CartProvider>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/admin/login" element={<Login />} />

              {/* Admin Routes */}
              <Route path="/admin" element={
                <ProtectedAdmin>
                  <Dashboard />
                </ProtectedAdmin>
              } />
              <Route path="/admin/products" element={
                <ProtectedAdmin>
                  <Products />
                </ProtectedAdmin>
              } />
              <Route path="/admin/orders" element={
                <ProtectedAdmin>
                  <Orders />
                </ProtectedAdmin>
              } />
              <Route path="/admin/inquiries" element={
                <ProtectedAdmin>
                  <Inquiries />
                </ProtectedAdmin>
              } />
              <Route path="/admin/settings" element={
                <ProtectedAdmin>
                  <Settings />
                </ProtectedAdmin>
              } />

              {/* Catch All */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </CartProvider>
        </ToastProvider>
      </AuthProvider>
    </Router>
  );
}


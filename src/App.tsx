/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Home } from './pages/Home';
import { Catalog } from './pages/Catalog';
import { ProductDetails } from './pages/ProductDetails';
import { Collections } from './pages/Collections';
import { Bespoke } from './pages/Bespoke';
import { Heritage } from './pages/Heritage';
import { About } from './pages/About';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Profile } from './pages/Profile';
import { CategoryPage } from './pages/CategoryPage';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/category/:name" element={<CategoryPage />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/bespoke" element={<Bespoke />} />
          <Route path="/heritage" element={<Heritage />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

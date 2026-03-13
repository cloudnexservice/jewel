/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Catalog } from './pages/Catalog';
import { ProductDetails } from './pages/ProductDetails';
import { Collections } from './pages/Collections';
import { Bespoke } from './pages/Bespoke';
import { Heritage } from './pages/Heritage';
import { About } from './pages/About';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/bespoke" element={<Bespoke />} />
        <Route path="/heritage" element={<Heritage />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

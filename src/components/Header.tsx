import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {Heart, Menu, X, Phone} from 'lucide-react'
import { motion } from 'framer-motion'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const navigation = [
    { name: '首頁', href: '/' },
    { name: '緊急協助', href: '/emergency' },
    { name: '症狀檢查', href: '/symptom-checker' },
    { name: '獸醫定位', href: '/vet-locator' },
    { name: '關於我們', href: '/about' },
  ]

  return (
    <header className="bg-white/90 backdrop-blur-md shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <Heart className="h-10 w-10 text-red-500 group-hover:scale-110 transition-transform duration-200" />
              <div className="absolute inset-0 bg-red-500/20 rounded-full blur-lg group-hover:blur-xl transition-all duration-200"></div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                寵物緊急AI
              </h1>
              <p className="text-xs text-gray-600">24小時守護毛孩健康</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  location.pathname === item.href
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Emergency Button */}
          <div className="hidden sm:flex items-center space-x-4">
            <Link
              to="/emergency"
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full font-semibold flex items-center space-x-2 transition-all duration-200 hover:shadow-lg hover:scale-105"
            >
              <Phone className="h-4 w-4" />
              <span>緊急協助</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden py-4 border-t border-gray-200"
          >
            <nav className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                    location.pathname === item.href
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/emergency"
                onClick={() => setIsMenuOpen(false)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all duration-200"
              >
                <Phone className="h-4 w-4" />
                <span>緊急協助</span>
              </Link>
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  )
}

export default Header
import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {Heart, Stethoscope, Clock, Shield, Brain, MapPin, ChevronRight, Star, Users, Award} from 'lucide-react'

const Home = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI智能診斷',
      description: '先進的機器學習算法，快速分析寵物症狀並提供專業建議',
      color: 'bg-blue-500'
    },
    {
      icon: Clock,
      title: '24小時服務',
      description: '全天候待命，隨時為您的毛孩提供緊急協助和健康諮詢',
      color: 'bg-green-500'
    },
    {
      icon: Stethoscope,
      title: '專業獸醫團隊',
      description: '與認證獸醫師合作，確保建議的專業性和準確性',
      color: 'bg-purple-500'
    },
    {
      icon: MapPin,
      title: '獸醫院定位',
      description: '智能推薦附近的優質獸醫院，緊急時刻不浪費時間',
      color: 'bg-red-500'
    }
  ]

  const stats = [
    { number: '50,000+', label: '成功協助案例' },
    { number: '24/7', label: '全天候服務' },
    { number: '98%', label: '用戶滿意度' },
    { number: '500+', label: '合作獸醫院' }
  ]

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-green-600">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/4587955/pexels-photo-4587955.jpeg')] bg-cover bg-center opacity-10"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-8">
              <div className="relative">
                <Heart className="h-24 w-24 text-white animate-pulse" />
                <div className="absolute inset-0 bg-white/30 rounded-full blur-2xl animate-ping"></div>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              守護毛孩
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                每一刻健康
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
              AI驅動的寵物緊急協助平台，24小時智能診斷、專業建議，讓您的寵物獲得最及時的照護
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                to="/emergency"
                className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-full text-lg font-semibold flex items-center space-x-2 transition-all duration-300 hover:shadow-2xl hover:scale-105 group"
              >
                <Heart className="h-5 w-5 group-hover:animate-pulse" />
                <span>緊急協助</span>
                <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                to="/symptom-checker"
                className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white px-8 py-4 rounded-full text-lg font-semibold flex items-center space-x-2 transition-all duration-300 hover:shadow-2xl border border-white/30"
              >
                <Stethoscope className="h-5 w-5" />
                <span>症狀檢查</span>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 animate-bounce delay-100">
          <div className="w-4 h-4 bg-yellow-400 rounded-full opacity-70"></div>
        </div>
        <div className="absolute top-40 right-20 animate-bounce delay-300">
          <div className="w-6 h-6 bg-pink-400 rounded-full opacity-60"></div>
        </div>
        <div className="absolute bottom-40 left-20 animate-bounce delay-500">
          <div className="w-5 h-5 bg-green-400 rounded-full opacity-50"></div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              為什麼選擇我們？
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              結合最新AI技術與專業獸醫知識，為您的寵物提供最可靠的健康守護
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className={`${feature.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              立即開始守護您的毛孩
            </h2>
            <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
              不要等到緊急時刻才行動，現在就讓AI為您的寵物健康把關
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/symptom-checker"
                className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 hover:shadow-2xl hover:scale-105 flex items-center justify-center space-x-2"
              >
                <Brain className="h-5 w-5" />
                <span>開始症狀檢查</span>
              </Link>
              
              <Link
                to="/vet-locator"
                className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <MapPin className="h-5 w-5" />
                <span>尋找附近獸醫</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home
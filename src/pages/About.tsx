import React from 'react'
import { motion } from 'framer-motion'
import {Heart, Users, Award, Shield, Brain, Clock, Target, Lightbulb, CheckCircle} from 'lucide-react'

const About = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI智能技術',
      description: '採用最先進的機器學習算法，結合獸醫專業知識庫，提供精準的症狀分析'
    },
    {
      icon: Clock,
      title: '24小時服務',
      description: '全天候不間斷的AI助理，隨時為您的寵物健康提供專業建議和緊急指導'
    },
    {
      icon: Shield,
      title: '專業可靠',
      description: '與認證獸醫師合作開發，確保所有建議都基於專業醫學知識和實際經驗'
    },
    {
      icon: Heart,
      title: '用心守護',
      description: '我們深知寵物對您的重要性，用最真誠的心為每一個毛孩的健康把關'
    }
  ]

  const team = [
    {
      name: '張醫師',
      role: '首席獸醫顧問',
      image: 'https://images.pexels.com/photos/5452268/pexels-photo-5452268.jpeg',
      description: '擁有15年臨床經驗的資深獸醫師，專精小動物內科與急診醫學'
    },
    {
      name: 'AI研發團隊',
      role: '技術開發',
      image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg',
      description: '由機器學習專家和軟體工程師組成，致力於寵物健康AI技術創新'
    },
    {
      name: '客服團隊',
      role: '用戶支援',
      image: 'https://images.pexels.com/photos/7551659/pexels-photo-7551659.jpeg',
      description: '專業親切的客服團隊，24小時為用戶提供技術支援和諮詢服務'
    }
  ]

  const stats = [
    { number: '50,000+', label: '成功協助寵物' },
    { number: '98%', label: '用戶滿意度' },
    { number: '500+', label: '合作獸醫院' },
    { number: '24/7', label: '全天候服務' }
  ]

  const values = [
    {
      icon: Target,
      title: '使命',
      description: '運用AI技術讓每一隻寵物都能獲得及時、專業的健康照護，減少因延誤就醫造成的遺憾。'
    },
    {
      icon: Lightbulb,
      title: '願景',
      description: '成為全球領先的寵物健康AI平台，讓科技與愛心結合，守護每一個家庭的毛孩成員。'
    },
    {
      icon: Heart,
      title: '價值觀',
      description: '以愛為本，以專業為基，用創新技術為寵物健康提供最可靠的守護與支持。'
    }
  ]

  return (
    <div className="min-h-screen py-12 bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="flex justify-center mb-8">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-8 rounded-full shadow-2xl">
              <Heart className="h-16 w-16 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            關於
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              寵物緊急AI
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            我們是一群熱愛動物的技術專家和獸醫師，致力於用AI技術為寵物健康提供更好的守護。
            每一隻毛孩的健康，都是我們努力的動力。
          </p>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-20 mb-20">
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
                <div className="text-4xl md:text-5xl font-bold text-purple-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            我們的優勢
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            結合最新AI技術與專業獸醫知識，為您的寵物提供最可靠的健康守護
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
            >
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 py-20 mb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              我們的信念
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              用愛心、專業和創新技術，為每一個毛孩家庭帶來安心與守護
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center hover:bg-white/20 transition-all duration-300"
              >
                <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{value.title}</h3>
                <p className="text-white/90 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            專業團隊
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            由資深獸醫師、AI專家和技術團隊組成，為您的寵物健康提供最專業的支持
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="h-64 bg-gray-200">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-purple-600 font-semibold mb-4">{member.role}</p>
                <p className="text-gray-600 leading-relaxed">{member.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              加入我們的使命
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              讓我們一起用AI技術為更多寵物帶來健康與快樂，成為毛孩最可靠的健康守護者
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="bg-purple-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-purple-600 transition-colors hover:shadow-2xl hover:scale-105 flex items-center justify-center space-x-2">
                <Heart className="h-5 w-5" />
                <span>開始使用服務</span>
              </button>
              
              <button className="border-2 border-purple-500 text-purple-500 px-8 py-4 rounded-full text-lg font-semibold hover:bg-purple-50 transition-colors flex items-center justify-center space-x-2">
                <Users className="h-5 w-5" />
                <span>聯繫我們</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default About
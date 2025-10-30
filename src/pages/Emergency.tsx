import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {AlertTriangle, Phone, Clock, Heart, Activity, Thermometer, Eye, Zap, ArrowRight} from 'lucide-react'
import toast from 'react-hot-toast'

const Emergency = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])
  const [petInfo, setPetInfo] = useState({
    type: '',
    age: '',
    weight: '',
    breed: ''
  })
  const [urgencyLevel, setUrgencyLevel] = useState<'low' | 'medium' | 'high' | null>(null)

  const emergencySymptoms = [
    { id: 'breathing', label: '呼吸困難', icon: Activity, severity: 'high' },
    { id: 'unconscious', label: '失去意識', icon: AlertTriangle, severity: 'high' },
    { id: 'bleeding', label: '大量出血', icon: Heart, severity: 'high' },
    { id: 'seizure', label: '癲癇發作', icon: Zap, severity: 'high' },
    { id: 'vomiting', label: '嚴重嘔吐', icon: Activity, severity: 'medium' },
    { id: 'fever', label: '高燒不退', icon: Thermometer, severity: 'medium' },
    { id: 'pain', label: '劇烈疼痛', icon: AlertTriangle, severity: 'medium' },
    { id: 'eye-injury', label: '眼部受傷', icon: Eye, severity: 'medium' }
  ]

  const handleSymptomToggle = (symptomId: string) => {
    setSelectedSymptoms(prev => {
      const newSymptoms = prev.includes(symptomId)
        ? prev.filter(id => id !== symptomId)
        : [...prev, symptomId]
      
      // 自動評估緊急程度
      const highSeverityCount = newSymptoms.filter(id => 
        emergencySymptoms.find(s => s.id === id)?.severity === 'high'
      ).length
      
      if (highSeverityCount > 0) {
        setUrgencyLevel('high')
      } else if (newSymptoms.length > 2) {
        setUrgencyLevel('medium')
      } else if (newSymptoms.length > 0) {
        setUrgencyLevel('low')
      } else {
        setUrgencyLevel(null)
      }
      
      return newSymptoms
    })
  }

  const handleEmergencyAssessment = () => {
    if (selectedSymptoms.length === 0) {
      toast.error('請選擇至少一個症狀')
      return
    }

    if (!petInfo.type) {
      toast.error('請填寫寵物基本資訊')
      return
    }

    // 模擬AI分析
    toast.loading('AI正在分析中...', { duration: 2000 })
    
    setTimeout(() => {
      if (urgencyLevel === 'high') {
        toast.error('緊急！建議立即就醫')
      } else if (urgencyLevel === 'medium') {
        toast.success('建議盡快諮詢獸醫')
      } else {
        toast.success('症狀較輕微，可先觀察')
      }
    }, 2000)
  }

  const getUrgencyColor = () => {
    switch (urgencyLevel) {
      case 'high': return 'bg-red-500'
      case 'medium': return 'bg-yellow-500'
      case 'low': return 'bg-green-500'
      default: return 'bg-gray-300'
    }
  }

  const getUrgencyText = () => {
    switch (urgencyLevel) {
      case 'high': return '高度緊急'
      case 'medium': return '中度緊急'
      case 'low': return '輕微症狀'
      default: return '等待評估'
    }
  }

  return (
    <div className="min-h-screen py-12 bg-gradient-to-br from-red-50 via-white to-orange-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-6">
            <div className="bg-red-500 p-6 rounded-full shadow-lg">
              <AlertTriangle className="h-12 w-12 text-white animate-pulse" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            緊急協助中心
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            立即評估您寵物的症狀，獲得專業的緊急處理建議
          </p>
        </motion.div>

        {/* Emergency Hotline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-red-500 text-white p-6 rounded-2xl mb-8 text-center"
        >
          <div className="flex items-center justify-center space-x-4">
            <Phone className="h-8 w-8 animate-bounce" />
            <div>
              <h3 className="text-xl font-bold">24小時緊急熱線</h3>
              <p className="text-2xl font-bold">0800-PET-HELP</p>
            </div>
            <Clock className="h-8 w-8" />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pet Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">寵物基本資訊</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  寵物種類
                </label>
                <select
                  value={petInfo.type}
                  onChange={(e) => setPetInfo(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">請選擇</option>
                  <option value="dog">狗</option>
                  <option value="cat">貓</option>
                  <option value="rabbit">兔子</option>
                  <option value="bird">鳥類</option>
                  <option value="other">其他</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    年齡
                  </label>
                  <input
                    type="text"
                    value={petInfo.age}
                    onChange={(e) => setPetInfo(prev => ({ ...prev, age: e.target.value }))}
                    placeholder="例：3歲"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    體重
                  </label>
                  <input
                    type="text"
                    value={petInfo.weight}
                    onChange={(e) => setPetInfo(prev => ({ ...prev, weight: e.target.value }))}
                    placeholder="例：5公斤"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  品種
                </label>
                <input
                  type="text"
                  value={petInfo.breed}
                  onChange={(e) => setPetInfo(prev => ({ ...prev, breed: e.target.value }))}
                  placeholder="例：黃金獵犬"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </motion.div>

          {/* Symptoms Selection */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">症狀選擇</h2>
            
            <div className="grid grid-cols-1 gap-3">
              {emergencySymptoms.map((symptom) => (
                <button
                  key={symptom.id}
                  onClick={() => handleSymptomToggle(symptom.id)}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 flex items-center space-x-3 ${
                    selectedSymptoms.includes(symptom.id)
                      ? symptom.severity === 'high'
                        ? 'border-red-500 bg-red-50 text-red-700'
                        : 'border-yellow-500 bg-yellow-50 text-yellow-700'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <symptom.icon className="h-5 w-5" />
                  <span className="font-medium">{symptom.label}</span>
                  {symptom.severity === 'high' && (
                    <span className="ml-auto text-xs bg-red-500 text-white px-2 py-1 rounded-full">
                      緊急
                    </span>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Urgency Assessment */}
        {urgencyLevel && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 bg-white rounded-2xl shadow-lg p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">緊急程度評估</h2>
              <div className={`px-4 py-2 rounded-full text-white font-semibold ${getUrgencyColor()}`}>
                {getUrgencyText()}
              </div>
            </div>

            {urgencyLevel === 'high' && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                <div className="flex items-center space-x-3 mb-4">
                  <AlertTriangle className="h-6 w-6 text-red-500" />
                  <h3 className="text-lg font-bold text-red-700">高度緊急 - 立即就醫</h3>
                </div>
                <p className="text-red-600 mb-4">
                  您的寵物出現嚴重症狀，建議立即前往最近的動物醫院或聯繫緊急獸醫服務。
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="bg-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors flex items-center justify-center space-x-2">
                    <Phone className="h-5 w-5" />
                    <span>撥打緊急熱線</span>
                  </button>
                  <button className="border border-red-500 text-red-500 px-6 py-3 rounded-lg font-semibold hover:bg-red-50 transition-colors">
                    尋找最近獸醫院
                  </button>
                </div>
              </div>
            )}

            <button
              onClick={handleEmergencyAssessment}
              className="w-full bg-blue-500 text-white py-4 rounded-lg font-semibold hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2 text-lg"
            >
              <span>開始AI智能分析</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Emergency
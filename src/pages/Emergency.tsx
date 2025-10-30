import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {AlertTriangle, Phone, Clock, Heart, Activity, Thermometer, Eye, Zap, ArrowRight, MapPin} from 'lucide-react'
import toast from 'react-hot-toast'

interface AIResponse {
  advice: string
  mapUrl: string
}

const Emergency = () => {
  const [description, setDescription] = useState('')
  const [petInfo, setPetInfo] = useState({
    type: '',
    age: '',
    weight: '',
    breed: ''
  })
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [aiResponse, setAiResponse] = useState<AIResponse | null>(null)

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

  const quickDescriptions = [
    '我的狗狗被車撞到,腿在流血',
    '貓咪突然倒下無法站立',
    '寵物誤食巧克力',
    '持續嘔吐和腹瀉',
    '呼吸急促,張口呼吸',
    '突然癲癇發作'
  ]

  const getGPSPosition = (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('您的瀏覽器不支援 GPS 定位'))
        return
      }
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        timeout: 10000,
        maximumAge: 0,
        enableHighAccuracy: true
      })
    })
  }

  const handleEmergencyAssessment = async () => {
    if (!description.trim()) {
      toast.error('請描述寵物的緊急情況')
      return
    }

    if (!petInfo.type) {
      toast.error('請選擇寵物種類')
      return
    }

    setIsAnalyzing(true)
    const toastId = toast.loading('正在取得 GPS 位置...')

    try {
      // 1. 取得 GPS 位置
      const position = await getGPSPosition()
      const lat = position.coords.latitude
      const lng = position.coords.longitude
      
      toast.loading('AI 正在分析中...', { id: toastId })

      // 2. 組合完整的問題描述
      const fullQuestion = `
寵物種類: ${petInfo.type}
年齡: ${petInfo.age || '未提供'}
體重: ${petInfo.weight || '未提供'}
品種: ${petInfo.breed || '未提供'}

緊急情況描述: ${description}
      `.trim()

      // 3. 呼叫 API
      const response = await fetch('/api/get-help', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: fullQuestion,
          lat,
          lng
        })
      })

      if (!response.ok) {
        throw new Error(`API 錯誤: ${response.status}`)
      }

      const data: AIResponse = await response.json()
      
      setAiResponse(data)
      toast.success('分析完成!', { id: toastId })
      
    } catch (error) {
      console.error('處理失敗:', error)
      
      if (error instanceof GeolocationPositionError) {
        if (error.code === 1) {
          toast.error('無法取得 GPS 位置,請允許瀏覽器存取您的位置', { id: toastId })
        } else if (error.code === 2) {
          toast.error('GPS 位置無法取得', { id: toastId })
        } else if (error.code === 3) {
          toast.error('GPS 取得超時', { id: toastId })
        }
      } else {
        toast.error(`發生錯誤: ${error instanceof Error ? error.message : '未知錯誤'}`, { id: toastId })
      }
    } finally {
      setIsAnalyzing(false)
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
            立即評估您寵物的症狀,獲得專業的緊急處理建議
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
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
                  寵物種類 *
                </label>
                <select
                  value={petInfo.type}
                  onChange={(e) => setPetInfo(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">請選擇</option>
                  <option value="狗">狗</option>
                  <option value="貓">貓</option>
                  <option value="兔子">兔子</option>
                  <option value="鳥類">鳥類</option>
                  <option value="其他">其他</option>
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
                    placeholder="例如:3歲"
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
                    placeholder="例如:5公斤"
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
                  placeholder="例如:黃金獵犬"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </motion.div>

          {/* Quick Symptoms */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">常見緊急症狀</h2>
            
            <div className="grid grid-cols-1 gap-3">
              {emergencySymptoms.map((symptom) => (
                <button
                  key={symptom.id}
                  onClick={() => setDescription(symptom.label)}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 flex items-center space-x-3 ${
                    description === symptom.label
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

        {/* Description Input */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">詳細描述緊急情況 *</h2>
          
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="請詳細描述您的寵物發生了什麼事情,包括症狀、持續時間、是否有受傷等..."
            rows={6}
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-lg"
          />

          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-3">快速範例:</p>
            <div className="flex flex-wrap gap-2">
              {quickDescriptions.map((example, index) => (
                <button
                  key={index}
                  onClick={() => setDescription(example)}
                  className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Submit Button */}
        <motion.button
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          onClick={handleEmergencyAssessment}
          disabled={isAnalyzing}
          className="w-full bg-red-500 text-white py-6 rounded-2xl font-bold hover:bg-red-600 transition-colors flex items-center justify-center space-x-3 text-xl shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isAnalyzing ? (
            <>
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              <span>AI 分析中...</span>
            </>
          ) : (
            <>
              <Heart className="h-6 w-6" />
              <span>立即取得 AI 協助</span>
              <ArrowRight className="h-6 w-6" />
            </>
          )}
        </motion.button>

        {/* AI Response */}
        {aiResponse && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 bg-white rounded-2xl shadow-lg p-8"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-green-500 p-3 rounded-full">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">AI 處理建議</h2>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
              <p className="text-gray-800 text-lg leading-relaxed whitespace-pre-line">
                {aiResponse.advice}
              </p>
            </div>

            <a
              href={aiResponse.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-green-500 text-white py-4 rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center justify-center space-x-2 text-lg"
            >
              <MapPin className="h-5 w-5" />
              <span>開啟地圖,前往最近的醫院</span>
            </a>

            <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div className="text-sm text-yellow-800">
                  <p className="font-medium mb-1">重要提醒</p>
                  <p>此建議僅供參考,不能替代專業獸醫診斷。如情況緊急請立即就醫。</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Emergency
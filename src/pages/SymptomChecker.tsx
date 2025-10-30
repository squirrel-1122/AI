import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {Search, Stethoscope, Brain, CheckCircle, AlertCircle, Info, ArrowRight, Filter, Star} from 'lucide-react'
import toast from 'react-hot-toast'

const SymptomChecker = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])
  const [analysisResult, setAnalysisResult] = useState<any>(null)

  const categories = [
    { id: 'all', name: '全部', icon: Stethoscope },
    { id: 'digestive', name: '消化系統', icon: Brain },
    { id: 'respiratory', name: '呼吸系統', icon: Brain },
    { id: 'skin', name: '皮膚毛髮', icon: Brain },
    { id: 'behavior', name: '行為異常', icon: Brain },
    { id: 'mobility', name: '行動能力', icon: Brain }
  ]

  const symptoms = [
    { id: 'vomiting', name: '嘔吐', category: 'digestive', severity: 'medium', description: '食物或液體從胃部逆流而出' },
    { id: 'diarrhea', name: '腹瀉', category: 'digestive', severity: 'medium', description: '糞便呈水狀或軟爛狀態' },
    { id: 'loss-appetite', name: '食慾不振', category: 'digestive', severity: 'low', description: '對食物失去興趣或進食量減少' },
    { id: 'coughing', name: '咳嗽', category: 'respiratory', severity: 'medium', description: '持續性或間歇性咳嗽' },
    { id: 'difficulty-breathing', name: '呼吸困難', category: 'respiratory', severity: 'high', description: '呼吸急促、張口呼吸或呼吸聲異常' },
    { id: 'itching', name: '搔癢', category: 'skin', severity: 'low', description: '頻繁抓撓或舔舐身體某部位' },
    { id: 'hair-loss', name: '掉毛', category: 'skin', severity: 'low', description: '異常大量掉毛或局部禿毛' },
    { id: 'lethargy', name: '精神不振', category: 'behavior', severity: 'medium', description: '活動力下降、嗜睡或反應遲鈍' },
    { id: 'aggression', name: '攻擊行為', category: 'behavior', severity: 'medium', description: '出現異常攻擊性或易怒情況' },
    { id: 'limping', name: '跛行', category: 'mobility', severity: 'medium', description: '行走時明顯偏重某一肢體' },
    { id: 'weakness', name: '四肢無力', category: 'mobility', severity: 'high', description: '肢體軟弱無力或無法正常行走' }
  ]

  const filteredSymptoms = symptoms.filter(symptom => {
    const matchesCategory = selectedCategory === 'all' || symptom.category === selectedCategory
    const matchesSearch = symptom.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         symptom.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleSymptomToggle = (symptomId: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptomId)
        ? prev.filter(id => id !== symptomId)
        : [...prev, symptomId]
    )
  }

  const handleAnalysis = async () => {
    if (selectedSymptoms.length === 0) {
      toast.error('請選擇至少一個症狀')
      return
    }

    toast.loading('AI正在分析症狀...', { duration: 3000 })
    
    // 模擬AI分析過程
    setTimeout(() => {
      const selectedSymptomData = symptoms.filter(s => selectedSymptoms.includes(s.id))
      const highSeverityCount = selectedSymptomData.filter(s => s.severity === 'high').length
      const mediumSeverityCount = selectedSymptomData.filter(s => s.severity === 'medium').length
      
      let riskLevel = 'low'
      let recommendations = []
      let possibleCauses = []

      if (highSeverityCount > 0) {
        riskLevel = 'high'
        recommendations = [
          '建議立即就醫檢查',
          '密切觀察症狀變化',
          '準備就醫相關資料'
        ]
        possibleCauses = [
          '急性疾病',
          '中毒或感染',
          '器官功能異常'
        ]
      } else if (mediumSeverityCount > 1) {
        riskLevel = 'medium'
        recommendations = [
          '建議1-2天內就醫',
          '記錄症狀持續時間',
          '避免劇烈運動'
        ]
        possibleCauses = [
          '消化系統問題',
          '輕微感染',
          '營養或環境因素'
        ]
      } else {
        riskLevel = 'low'
        recommendations = [
          '可先在家觀察',
          '保持正常作息',
          '若症狀持續建議就醫'
        ]
        possibleCauses = [
          '輕微不適',
          '環境變化',
          '飲食相關'
        ]
      }

      setAnalysisResult({
        riskLevel,
        recommendations,
        possibleCauses,
        confidence: Math.floor(Math.random() * 20) + 75 // 75-95%
      })

      toast.success('分析完成！')
    }, 3000)
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-500 bg-red-50 border-red-200'
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'low': return 'text-green-600 bg-green-50 border-green-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-red-500'
      case 'medium': return 'bg-yellow-500'
      case 'low': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <div className="min-h-screen py-12 bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-6">
            <div className="bg-blue-500 p-6 rounded-full shadow-lg">
              <Stethoscope className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            AI症狀檢查器
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            選擇您寵物的症狀，讓AI為您分析可能的原因和建議
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Symptoms Selection */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-lg p-8 mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">症狀選擇</h2>
              
              {/* Search and Filter */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="搜尋症狀..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="flex flex-wrap gap-2 mb-6">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center space-x-2 ${
                      selectedCategory === category.id
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <category.icon className="h-4 w-4" />
                    <span>{category.name}</span>
                  </button>
                ))}
              </div>

              {/* Symptoms Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredSymptoms.map((symptom) => (
                  <motion.button
                    key={symptom.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSymptomToggle(symptom.id)}
                    className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                      selectedSymptoms.includes(symptom.id)
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{symptom.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(symptom.severity)}`}>
                        {symptom.severity === 'high' ? '高' : symptom.severity === 'medium' ? '中' : '低'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{symptom.description}</p>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Analysis Button */}
            {selectedSymptoms.length > 0 && (
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={handleAnalysis}
                className="w-full bg-blue-500 text-white py-4 rounded-lg font-semibold hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2 text-lg"
              >
                <Brain className="h-6 w-6" />
                <span>開始AI分析 ({selectedSymptoms.length}個症狀)</span>
                <ArrowRight className="h-5 w-5" />
              </motion.button>
            )}
          </div>

          {/* Analysis Results */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-lg p-8 sticky top-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">分析結果</h2>
              
              {!analysisResult ? (
                <div className="text-center py-12">
                  <Brain className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">選擇症狀後開始分析</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Risk Level */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">風險等級</h3>
                    <div className={`${getRiskLevelColor(analysisResult.riskLevel)} text-white p-4 rounded-lg text-center`}>
                      <div className="text-2xl font-bold mb-1">
                        {analysisResult.riskLevel === 'high' ? '高風險' : 
                         analysisResult.riskLevel === 'medium' ? '中風險' : '低風險'}
                      </div>
                      <div className="text-sm opacity-90">
                        信心度: {analysisResult.confidence}%
                      </div>
                    </div>
                  </div>

                  {/* Possible Causes */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">可能原因</h3>
                    <div className="space-y-2">
                      {analysisResult.possibleCauses.map((cause: string, index: number) => (
                        <div key={index} className="flex items-center space-x-2 text-sm text-gray-700">
                          <Info className="h-4 w-4 text-blue-500" />
                          <span>{cause}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">建議措施</h3>
                    <div className="space-y-2">
                      {analysisResult.recommendations.map((rec: string, index: number) => (
                        <div key={index} className="flex items-center space-x-2 text-sm text-gray-700">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>{rec}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Disclaimer */}
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-start space-x-2">
                      <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                      <div className="text-sm text-yellow-800">
                        <p className="font-medium mb-1">重要提醒</p>
                        <p>此分析僅供參考，不能替代專業獸醫診斷。如有疑慮請諮詢獸醫師。</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SymptomChecker
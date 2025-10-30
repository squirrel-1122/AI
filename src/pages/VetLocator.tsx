import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {MapPin, Search, Phone, Clock, Star, Navigation, Filter, Heart, Award, Users, Zap} from 'lucide-react'
import toast from 'react-hot-toast'

const VetLocator = () => {
  const [searchLocation, setSearchLocation] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // 模擬獸醫院資料
  const vetClinics = [
    {
      id: 1,
      name: '愛心動物醫院',
      address: '台北市大安區信義路四段123號',
      phone: '02-2345-6789',
      rating: 4.8,
      reviews: 245,
      distance: 0.8,
      isOpen: true,
      specialties: ['急診', '外科', '內科'],
      hours: '24小時營業',
      image: 'https://images.pexels.com/photos/6235663/pexels-photo-6235663.jpeg',
      emergency: true,
      features: ['24小時急診', 'X光設備', '手術室', '住院部']
    },
    {
      id: 2,
      name: '毛孩健康中心',
      address: '台北市信義區松仁路98號2樓',
      phone: '02-8765-4321',
      rating: 4.6,
      reviews: 189,
      distance: 1.2,
      isOpen: true,
      specialties: ['皮膚科', '牙科', '預防醫學'],
      hours: '09:00 - 21:00',
      image: 'https://images.pexels.com/photos/6816861/pexels-photo-6816861.jpeg',
      emergency: false,
      features: ['專業洗牙', '皮膚檢測', '疫苗接種', '健康檢查']
    },
    {
      id: 3,
      name: '快樂寵物診所',
      address: '台北市中山區民生東路二段45號',
      phone: '02-2567-8901',
      rating: 4.7,
      reviews: 156,
      distance: 2.1,
      isOpen: false,
      specialties: ['骨科', '心臟科', '腫瘤科'],
      hours: '08:00 - 18:00 (週日休)',
      image: 'https://images.pexels.com/photos/6235668/pexels-photo-6235668.jpeg',
      emergency: false,
      features: ['專科醫師', '先進設備', '舒適環境', '停車方便']
    },
    {
      id: 4,
      name: '24小時動物急診中心',
      address: '台北市松山區復興北路567號',
      phone: '02-2345-9999',
      rating: 4.9,
      reviews: 312,
      distance: 2.8,
      isOpen: true,
      specialties: ['急診', '重症', '外科'],
      hours: '24小時營業',
      image: 'https://images.pexels.com/photos/6816860/pexels-photo-6816860.jpeg',
      emergency: true,
      features: ['24小時急診', 'ICU', '血液透析', '專業團隊']
    },
    {
      id: 5,
      name: '寵愛動物醫院',
      address: '台北市大同區承德路三段88號',
      phone: '02-2876-5432',
      rating: 4.5,
      reviews: 98,
      distance: 3.5,
      isOpen: true,
      specialties: ['一般內科', '疫苗', '結紮'],
      hours: '09:00 - 20:00',
      image: 'https://images.pexels.com/photos/6816854/pexels-photo-6816854.jpeg',
      emergency: false,
      features: ['親切服務', '合理收費', '經驗豐富', '設備齊全']
    }
  ]

  const filters = [
    { id: 'all', name: '全部', icon: MapPin },
    { id: 'emergency', name: '24小時急診', icon: Zap },
    { id: 'open', name: '營業中', icon: Clock },
    { id: 'nearby', name: '附近1公里', icon: Navigation }
  ]

  const filteredClinics = vetClinics.filter(clinic => {
    const matchesSearch = clinic.name.toLowerCase().includes(searchLocation.toLowerCase()) ||
                         clinic.address.toLowerCase().includes(searchLocation.toLowerCase())
    
    let matchesFilter = true
    switch (selectedFilter) {
      case 'emergency':
        matchesFilter = clinic.emergency
        break
      case 'open':
        matchesFilter = clinic.isOpen
        break
      case 'nearby':
        matchesFilter = clinic.distance <= 1
        break
    }
    
    return matchesSearch && matchesFilter
  })

  const getUserLocation = () => {
    setIsLoading(true)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
          toast.success('定位成功！')
          setIsLoading(false)
        },
        (error) => {
          toast.error('定位失敗，請手動輸入地址')
          setIsLoading(false)
        }
      )
    } else {
      toast.error('瀏覽器不支援定位功能')
      setIsLoading(false)
    }
  }

  const handleCall = (phone: string) => {
    window.open(`tel:${phone}`)
  }

  const handleDirections = (address: string) => {
    const encodedAddress = encodeURIComponent(address)
    window.open(`https://www.google.com/maps/search/${encodedAddress}`, '_blank')
  }

  return (
    <div className="min-h-screen py-12 bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-6">
            <div className="bg-green-500 p-6 rounded-full shadow-lg">
              <MapPin className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            獸醫院定位器
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            快速找到附近的優質獸醫院，24小時守護您的毛孩健康
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="搜尋地點或獸醫院名稱..."
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                />
              </div>
            </div>

            {/* Location Button */}
            <button
              onClick={getUserLocation}
              disabled={isLoading}
              className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              <Navigation className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>{isLoading ? '定位中...' : '使用我的位置'}</span>
            </button>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 mt-6">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center space-x-2 ${
                  selectedFilter === filter.id
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <filter.icon className="h-4 w-4" />
                <span>{filter.name}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Results */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredClinics.map((clinic, index) => (
            <motion.div
              key={clinic.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative h-48 bg-gray-200">
                <img
                  src={clinic.image}
                  alt={clinic.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  {clinic.emergency && (
                    <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
                      <Zap className="h-3 w-3" />
                      <span>急診</span>
                    </span>
                  )}
                  {clinic.isOpen ? (
                    <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      營業中
                    </span>
                  ) : (
                    <span className="bg-gray-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      休息中
                    </span>
                  )}
                </div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-sm font-semibold text-gray-700">
                  {clinic.distance}km
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900">{clinic.name}</h3>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-semibold text-gray-700">
                      {clinic.rating}
                    </span>
                    <span className="text-sm text-gray-500">
                      ({clinic.reviews})
                    </span>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-start space-x-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mt-0.5 text-gray-400" />
                    <span>{clinic.address}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span>{clinic.hours}</span>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {clinic.specialties.map((specialty, idx) => (
                      <span
                        key={idx}
                        className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">特色服務</h4>
                  <div className="grid grid-cols-2 gap-1 text-xs text-gray-600">
                    {clinic.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-1">
                        <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={() => handleCall(clinic.phone)}
                    className="flex-1 bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Phone className="h-4 w-4" />
                    <span>撥打電話</span>
                  </button>
                  
                  <button
                    onClick={() => handleDirections(clinic.address)}
                    className="flex-1 border border-green-500 text-green-500 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Navigation className="h-4 w-4" />
                    <span>導航</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredClinics.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <MapPin className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">找不到符合條件的獸醫院</h3>
            <p className="text-gray-600">請嘗試調整搜尋條件或篩選器</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default VetLocator
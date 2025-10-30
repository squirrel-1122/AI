import React from 'react'
import {Heart, Phone, Mail, MapPin} from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <Heart className="h-8 w-8 text-red-500" />
              <h3 className="text-2xl font-bold">寵物緊急AI</h3>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              專業的AI驅動寵物健康平台，24小時為您的毛孩提供緊急協助、症狀分析和專業建議。
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <Phone className="h-4 w-4" />
                <span>24小時緊急熱線</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">快速連結</h4>
            <ul className="space-y-2">
              <li><a href="/emergency" className="text-gray-300 hover:text-white transition-colors">緊急協助</a></li>
              <li><a href="/symptom-checker" className="text-gray-300 hover:text-white transition-colors">症狀檢查</a></li>
              <li><a href="/vet-locator" className="text-gray-300 hover:text-white transition-colors">獸醫定位</a></li>
              <li><a href="/about" className="text-gray-300 hover:text-white transition-colors">關於我們</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">聯絡資訊</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-gray-300">
                <Phone className="h-4 w-4" />
                <span>0800-PET-HELP</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Mail className="h-4 w-4" />
                <span>help@petai.com</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <MapPin className="h-4 w-4" />
                <span>台北市信義區</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 寵物緊急AI. 版權所有. | 本服務不能取代專業獸醫診斷，緊急情況請立即就醫
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
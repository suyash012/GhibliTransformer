import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CameraIcon } from "lucide-react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="bg-white/80 backdrop-blur-md py-8 border-t border-gray-200">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center gap-2">
              <CameraIcon className="w-8 h-8 text-primary" />
              <h2 className="text-xl font-bold text-primary">Ghiblify</h2>
            </div>
            <p className="text-gray-600 mt-2 max-w-xs">
              Transform your ordinary photos into magical Ghibli-inspired masterpieces with just one click.
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-3">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-primary">Features</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary">Pricing</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary">Gallery</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary">Styles</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-3">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-primary">Help Center</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary">Contact Us</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary">Privacy</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary">Terms</a></li>
              </ul>
            </div>
            
            <div className="col-span-2 sm:col-span-1">
              <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-3">Stay Updated</h3>
              <p className="text-gray-600 mb-2">Get notified about new features and updates</p>
              <form className="flex">
                <Input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="rounded-r-none" 
                />
                <Button type="submit" className="rounded-l-none">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} Ghiblify. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="#" className="text-gray-400 hover:text-primary">
              <FaFacebook className="w-6 h-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-primary">
              <FaInstagram className="w-6 h-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-primary">
              <FaTwitter className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

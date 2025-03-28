import { Button } from "@/components/ui/button";
import { CameraIcon } from "lucide-react";

export function Header() {
  return (
    <header className="py-4 px-6 bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <CameraIcon className="w-10 h-10 text-primary" />
          <h1 className="text-2xl font-bold text-primary">Ghiblify</h1>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="#how-it-works" className="px-3 py-2 rounded-md text-gray-700 hover:text-primary transition">
                How It Works
              </a>
            </li>
            <li>
              <a href="#faq" className="px-3 py-2 rounded-md text-gray-700 hover:text-primary transition">
                FAQ
              </a>
            </li>
            <li>
              <Button className="rounded-full">Sign Up</Button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

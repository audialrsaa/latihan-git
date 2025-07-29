import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTwitter, faFacebook } from '@fortawesome/free-brands-svg-icons';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-white px-4 py-10 sm:px-8 md:px-16">
      
      {/* Kolaborasi */}
      <div className="text-center mb-8">
        <h2 className="text-xl font-bold text-blue-600">Collaboration With</h2>
        <div className="flex justify-center flex-wrap gap-4 mt-4">
          <Image src="/image/collab.png" alt="Collaboration" width={300} height={100} />
        </div>
      </div>

      {/* Informasi */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-center mb-10">
        {/* Info */}
        <div>
          <h3 className="font-bold text-blue-600 mb-2 text-lg">Information</h3>
          <ul className="space-y-1 text-sm sm:text-base">
            <li className="text-blue-600">About Us</li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="font-bold text-blue-600 mb-2 text-lg">Customer Service</h3>
          <ul className="space-y-1 text-sm sm:text-base">
            <li className="text-blue-600">Contact Us</li>
            <li className="text-blue-600">How To Register</li>
            <li className="text-blue-600">How To Login</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="font-bold text-blue-600 mb-2 text-lg">Follow Us</h3>
          <div className="flex flex-col items-center space-y-2 text-sm sm:text-base">
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faInstagram} className="text-blue-600 w-4 h-4" />
              <span className="text-blue-600 font-medium">@MongieStore_ofc</span>
            </div>
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faTwitter} className="text-blue-600 w-4 h-4" />
              <span className="text-blue-600 font-medium">@MongieStore_ofc</span>
            </div>
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faFacebook} className="text-blue-600 w-4 h-4" />
              <span className="text-blue-600 font-medium">@MongieStore_ofc</span>
            </div>
          </div>
        </div>
      </div>

      {/* App Store & Play Store */}
      <div className="flex flex-wrap justify-center gap-4">
        <Image src="/image/image 3.png" alt="App Store" width={150} height={50} />
        <Image src="/image/image 4.png" alt="Google Play" width={150} height={50} />
      </div>
    </footer>
  );
}

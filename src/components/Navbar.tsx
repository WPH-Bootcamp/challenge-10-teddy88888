"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Fungsi untuk cek status login berdasarkan token di localStorage
  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    checkToken();
    // Tambahkan event listener agar Navbar terupdate saat login/logout
    window.addEventListener("storage", checkToken);
    return () => window.removeEventListener("storage", checkToken);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/login");
    router.refresh();
  };

  return (
    <nav className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* LOGO */}
          <div className="flex items-center gap-2">
            <img
              src="djn.jpg"
              alt="djn"
              className="w-10 h-10 rounded-full object-cover mb-2"
            />
            <Link
              href="/dashboard"
              className="text-2xl font-bold text-blue-900 tracking-tight"
            >
              Blog<span className="text-gray-900">.</span>
            </Link>
          </div>

          {/* MENU KANAN */}
          <div className="flex items-center gap-4">
            {!isLoggedIn ? (
              <>
                {/* Belum Login: Tampilkan Sign In & Register */}
                <Link
                  href="/login"
                  className="text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-full hover:bg-gray-700 shadow-lg shadow-blue-100 transition-all transform active:scale-95"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                {/* Sudah Login: Tampilkan Write Post & Profile */}
                <Link
                  href="/write"
                  className="hidden md:block text-sm font-medium text-gray-500 hover:text-blue-600"
                >
                  Write
                </Link>

                <div className="flex items-center gap-3 pl-3 border-l">
                  <Link href="/profile" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center border border-blue-200 overflow-hidden">
                      <img
                        src="/avatar-placeholder.png"
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="text-xs font-medium text-red-500 hover:text-red-600 border border-red-100 px-2 py-1 rounded"
                  >
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

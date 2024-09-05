'use client'

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { User } from '@supabase/supabase-js';

const Header = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'twitter',
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <header className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-2xl font-bold hover:text-gray-300 transition duration-300">
            Ana Sayfa
          </Link>
          <nav>
            <ul className="flex space-x-6 items-center">
              <li>
                <Link href="/hakkimizda" className="hover:text-gray-300 transition duration-300">
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link href="/iletisim" className="hover:text-gray-300 transition duration-300">
                  İletişim
                </Link>
              </li>
              {user ? (
                <>
                  <li>
                    <Link href="/profil" className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-full transition duration-300">
                      Profilim
                    </Link>
                  </li>
                  <li>
                    <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-full transition duration-300">
                      Çıkış Yap
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <button onClick={handleLogin} className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-full transition duration-300">
                    Giriş Yap
                  </button>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

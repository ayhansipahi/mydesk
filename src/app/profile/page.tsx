'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { User } from '@supabase/supabase-js'

const ProfilePage = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState<string | null>(null)
  const [website, setWebsite] = useState<string | null>(null)
  const [avatar_url, setAvatarUrl] = useState<string | null>(null)

  useEffect(() => {
    getProfile()
  }, [])

  async function getProfile() {
    try {
      setLoading(true)
      const { data: { user } } = await supabase.auth.getUser()

      if (user) {
        setUser(user)
        let { data, error, status } = await supabase
          .from('profiles')
          .select(`username, website, avatar_url`)
          .eq('id', user.id)
          .single()

        if (error && status !== 406) {
          throw error
        }

        if (data) {
          setUsername(data.username)
          setWebsite(data.website)
          setAvatarUrl(data.avatar_url)
        }
      }
    } catch (error) {
      alert('Profil bilgileri alınırken hata oluştu!')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div>Yükleniyor...</div>
  }

  if (!user) {
    return <div>Lütfen giriş yapın.</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-xl rounded-lg overflow-hidden p-6">
        <h1 className="text-2xl font-bold mb-4">Profil</h1>
        <div className="space-y-4">
          <p><strong>E-posta:</strong> {user.email}</p>
          <p><strong>Kullanıcı Adı:</strong> {username || 'Ayarlanmamış'}</p>
          <p><strong>Website:</strong> {website || 'Ayarlanmamış'}</p>
          {avatar_url && (
            <div>
              <strong>Profil Resmi:</strong>
              <img src={avatar_url} alt="Profil Resmi" className="mt-2 w-32 h-32 rounded-full" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProfilePage

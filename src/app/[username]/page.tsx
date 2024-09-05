import { notFound } from 'next/navigation'
import Image from 'next/image'

async function getUser(username: string) {
  // Bu fonksiyon, gerçek bir API çağrısı yapmalı
  // Şimdilik basit bir simülasyon yapıyoruz
  if (username === 'ornek_kullanici') {
    return { name: 'Örnek Kullanıcı', bio: 'Merhaba, ben bir örnek kullanıcıyım!', avatar: '/ornek-avatar.jpg' }
  }
  return null
}

const UserPage = async({ params }: { params: { username: string } }) => {
  const user = await getUser(params.username)

  if (!user) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="flex items-center space-x-6">
            <Image
              src={user.avatar}
              alt={`${user.name} avatar`}
              width={100}
              height={100}
              className="rounded-full object-cover"
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{user.name}</h1>
              <p className="text-lg text-gray-600">@{params.username}</p>
            </div>
          </div>
          <p className="mt-6 text-gray-700 leading-relaxed">{user.bio}</p>
        </div>
      </div>
    </div>
  )
}

export default UserPage

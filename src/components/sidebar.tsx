'use client'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  if (!isOpen) return null

  return (
    <>
      <div className="fixed top-0 right-0 w-96 h-full bg-white shadow-lg z-50 transition-transform transform">
        <button
          className="absolute top-4 right-4 text-gray-600"
          onClick={onClose}
        >
          ✖
        </button>
        <div className="p-4">
          <h2 className="text-xl font-bold">Carrinho</h2>
          <p>Seu carrinho está vazio.</p>
        </div>
      </div>

      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      ></div>
    </>
  )
}

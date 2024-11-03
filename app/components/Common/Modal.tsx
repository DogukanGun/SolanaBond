'use client'

import React, { useEffect } from 'react'

import { modalStore } from '@/hooks/useStore'

type ModalProp = Readonly<{
  children: React.ReactNode
}>

const Modal = ({ children }: ModalProp) => {
  const { showModal, closeAllModals } = modalStore()

  // Add event listener on component mount and remove on unmount
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeAllModals()
      }
    }

    window.addEventListener('keydown', handleEsc)

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener('keydown', handleEsc)
    }
  }, [closeAllModals]) // Empty dependency array ensures this runs once on mount and cleanup on unmount

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    const target = event.target as HTMLElement
    if (target.id === 'wrapper') {
      // If it's a keyboard event, only handle if 'Enter' or 'Space' was pressed
      if (
        event instanceof KeyboardEvent &&
        !['Enter', ' '].includes(event.key)
      ) {
        return
      }
      closeAllModals()
    }
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const target = event.target as HTMLElement
    if (target.id === 'wrapper') {
      try {
        closeAllModals()
      } catch (e) {
        console.log(e)
      }
    }
  }

  if (!showModal) return null
  return (
    <section
      role="dialog"
      id="wrapper"
      aria-modal="true"
      onKeyDown={handleKeyDown}
      onClick={handleClick}
      className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
    >
      {children}
    </section>
  )
}

export default Modal

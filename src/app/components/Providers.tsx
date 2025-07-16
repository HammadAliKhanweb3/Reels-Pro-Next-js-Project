'use client'

import { ImageKitProvider } from '@imagekit/next'
import { SessionProvider } from 'next-auth/react'
import React, { ReactNode } from 'react'

const Providers = ({children}:{children:ReactNode}) => {
  return (
    <div>
      <SessionProvider>
        <ImageKitProvider>
      {children}
        </ImageKitProvider>
      </SessionProvider>
    </div>
  )
}

export default Providers
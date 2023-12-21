'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Illustration01 from '@/public/images/background.png'

import AOS from 'aos'
import 'aos/dist/aos.css'

export default function DefaultLayout({
	children,
}: {
	children: React.ReactNode
}) {

	useEffect(() => {
		AOS.init({
			once: true,
			duration: 500,
			easing: 'ease-out-cubic',
		})
	})

	return (
		<>
			<main className="relative grow flex">

				{/* Content */}
				<div className="w-full bg-neutral-900/60 lg:bg-neutral-900 overflow-y-scroll no-scrollbar">
					<div className="w-full max-w-3xl mx-auto">
						{children}
					</div>
				</div>

				<div className="absolute lg:relative shrink-0 lg:w-1/2 overflow-hidden -z-10 shadow-lg">
					<div className="pointer-events-none h-full" aria-hidden="true">
						<Image src={Illustration01} className="h-full object-fill blur-sm lg:blur-none" alt="Hero Illustration" data-aos="fade-right" />
					</div>
				</div>

			</main>
		</>
	)
}

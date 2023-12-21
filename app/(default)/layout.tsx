'use client'

import Image from 'next/image'
import Illustration01 from '@/public/images/background.png'

export default function DefaultLayout({
	children,
}: {
	children: React.ReactNode
}) {

	return (
		<>
			<main className="relative grow flex">

				{/* Content */}
				<div className="w-full bg-neutral-900/60 overflow-y-scroll no-scrollbar z-10">
					<div className="w-full max-w-3xl mx-auto">
						{children}
					</div>
				</div>

				<div className="absolute lg:relative shrink-0 lg:w-1/2 overflow-hidden -z-10 shadow-lg">
					<div className="pointer-events-none h-full" aria-hidden="true">
						<Image src={Illustration01} className="h-screen lg:h-full w-full object-cover object-center blur-sm lg:blur-none" alt="Hero Illustration" />
					</div>
				</div>

			</main>
		</>
	)
}

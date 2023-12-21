import Button from './button'

export default function Hero() {
	return (
		<section className="relative">
			{/* Bg gradient */}
			<div
				className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-neutral-800 to-neutral-900 opacity-60 h-screen pointer-events-none -z-10"
				aria-hidden="true"
			/>
			<div className="relative max-w-6xl mx-auto px-4 sm:px-6">
				<div className="pt-32 pb-12 md:pt-40 md:pb-20">
					{/* Hero content */}
					<div className="max-w-xl mx-auto md:max-w-[640px] md:mx-0 text-center md:text-left">
						<div>
							<div className="relative text-sm text-neutral-300 bg-neutral-800 rounded-full inline-block px-4 py-1 mb-6 before:content-[''] before:absolute before:-z-10 before:inset-0 before:-m-0.5 before:bg-gradient-to-t before:from-orange-400/75 before:to-neutral-800 before:via-orange-600/75 before:rounded-full">
								<div className="text-neutral-400">
									Something delicious is coming.{' '}
								</div>
							</div>
						</div>
						<h1 className="h1 mb-6">
							Traditional Bulgarian <em className="font-merienda font-italic text-orange-500">banica</em> in the heart of Prague
						</h1>
						<p className="text-lg text-neutral-300 lg:text-neutral-400 mb-5">
							Hello 👋,<br />
							My name is Hristo and I come from a small village in Bulgaria.
							Throughout my life I have been surrounded by the most delicious food. Biased? Maybe. But I wanted to share some of that with you.
						</p>
						<p className="text-lg text-neutral-300 lg:text-neutral-400 mb-10">
							The <em className="font-italic text-orange-400">banica/banitsa (баница)</em> is a delicious pastry made with filo dough and feta cheese. It is a staple in every Bulgarian household and I am proud to share our family recipe with you.
						</p>
						<div
							className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4"
						>
							<div>
								<Button />
							</div>
							<div>
								<a className="btn text-neutral-300 bg-gradient-to-t from-neutral-800 to-neutral-700 hover:to-neutral-800 w-full shadow-lg" href="https://koev.me/" target="_blank">
									My website
								</a>
							</div>
						</div>
						<p className="text-lg text-neutral-300 lg:text-neutral-400 mt-10">
							For now, this is only an idea. If you have any interest in this, please click on the button above or let me know by contacting me.
						</p>
						<p className="text-xs text-neutral-400 lg:text-neutral-500 mt-5">
							*Voting is anonymous and takes into account your IP address and location, accessible via <a href="https://geolocation-db.com/json/" className="text-orange-400/50 underline" target="_blank">geolocation-db.com</a>. By voting, you agree to your IP address and location being stored in a database. I will not use it for any purpose other than vote counting and analytics.
						</p>
					</div>
				</div>
			</div>
		</section>
	)
}
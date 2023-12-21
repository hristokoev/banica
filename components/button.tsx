'use client'

import { useState, useEffect, Fragment } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { firestore } from '@/lib/firebase'
import { collection, doc, addDoc, onSnapshot, runTransaction, GeoPoint, query, where, getDocs } from 'firebase/firestore'

export default function Button() {

	const [count, setCount] = useState(0)
	const [isOpen, setIsOpen] = useState(false)
	const [message, setMessage] = useState({
		title: '',
		description: '',
	})
	const [geoData, setGeoData] = useState({
		ip: '',
		country: '',
		geo: new GeoPoint(0, 0),
	})
	const [spamClicksLimit, setSpamClicksLimit] = useState(1)

	const messageDefault = {
		title: 'Thank you! 😊',
		description: 'Your vote has been counted. Stay tuned and check back later for updates.',
	}

	const messageAlreadyVoted = {
		title: 'You already voted! 😊',
		description: 'Your vote has been counted. Stay tuned and check back later for updates.',
	}

	const messageErrorLocation = {
		title: 'Location error! 😕',
		description: 'You appear to be outside of the Czech Republic or your location could not be determined. Please try again later.',
	}

	// Get total votes and get geo data
	useEffect(() => {
		const docRef = doc(firestore, 'data', 'votes');
		const unsubscribe = onSnapshot(docRef, (doc) => {
			if (doc.exists()) {
				setCount(doc.data().total);
			}
		});
	
		// Resolve geo data and check if the user has already voted
		const checkVoteAndResolveGeoData = async () => {
			const geoData = await resolveGeoData();
			setGeoData(geoData);
	
			const colRef = collection(firestore, 'votes');
			const q = query(colRef, where('ip', '==', geoData.ip));
			const querySnapshot = await getDocs(q);
	
			if (querySnapshot.empty) {
				setMessage(messageDefault);
			} else {
				setMessage(messageAlreadyVoted);
			}

			if (geoData.country !== 'Czechia') {
				setMessage(messageErrorLocation);
			}
		};
	
		checkVoteAndResolveGeoData();
	
		return () => unsubscribe();
	}, []);
	
	const resolveGeoData = async () => {
		const res = await fetch('https://geolocation-db.com/json/');
		const data = await res.json();
		return {
			ip: data.IPv4,
			country: data.country_name,
			geo: new GeoPoint(data.latitude, data.longitude),
		};
	};
	
	const addVote = async () => {
		if (!geoData.ip || geoData.country !== 'Czechia') {
			return;
		}
	
		const colRef = collection(firestore, 'votes');
		const q = query(colRef, where('ip', '==', geoData.ip));
		const querySnapshot = await getDocs(q);
	
		if (querySnapshot.empty) {
			await addDoc(colRef, geoData);
			await addOneToVotes();
		}
	};

	const buttonClick = async () => {
		setIsOpen(true)
		setSpamClicksLimit(spamClicksLimit - 1)
		if (spamClicksLimit > 0) {
			await addVote()
		}
	}

	const addOneToVotes = async () => {
		const docRef = doc(firestore, 'data', 'votes')
		await runTransaction(firestore, async (transaction) => {
			const docSnap = await transaction.get(docRef)
			const newCount = (docSnap.data()?.total || 0) + 1
			transaction.update(docRef, { total: newCount })
		})
	}

	return (
		<>
			<button className={`btn text-white bg-gradient-to-t from-orange-600 to-orange-400 w-full shadow-lg group ${spamClicksLimit <= 0 ? 'cursor-not-allowed' : 'hover:to-orange-500'}`} onClick={buttonClick} disabled={spamClicksLimit <= 0}>
				I want banica!{' '}
				<span className="tracking-normal text-orange-100 ml-1">
					({count})
				</span>
			</button>
			<Transition show={isOpen} as={Fragment}>
				<Dialog onClose={() => setIsOpen(false)}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
					</Transition.Child>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0 scale-95"
						enterTo="opacity-100 scale-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100 scale-100"
						leaveTo="opacity-0 scale-95"
					>
						<div className="fixed inset-0 flex w-screen items-center justify-center p-4">
							<Dialog.Panel className="w-full max-w-sm rounded-md bg-gradient-to-b from-neutral-950 to-neutral-900 border border-neutral-800">
								<div className="p-8 space-y-4 text-center">
									<Dialog.Title className="h4">{message.title}</Dialog.Title>
									<Dialog.Description className="w-5/6 mx-auto text-sm text-neutral-300">
										{message.description}
									</Dialog.Description>
									<button className="btn text-white bg-gradient-to-t from-orange-600 to-orange-400 hover:to-orange-500 w-1/2 shadow-lg" onClick={() => setIsOpen(false)}>
										Close
									</button>
								</div>
							</Dialog.Panel>
						</div>
					</Transition.Child>
				</Dialog>
			</Transition >
		</>
	)
}
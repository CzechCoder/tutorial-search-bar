import React, { useState, type FC, type FormEvent } from 'react';
import { createRoot } from 'react-dom/client';
import {
	useQuery,
	QueryClient,
	QueryClientProvider,
} from '@tanstack/react-query';

import { getUsers } from './api';
import './app.css';

interface User {
	id: number;
	name: string;
	email: string;
}

const queryClient = new QueryClient();

const App: FC = () => (
	<QueryClientProvider client={queryClient}>
		<MainPage />
	</QueryClientProvider>
);

const MainPage: FC = () => {
	const [searchParam, setSearchParam] = useState<string>('');

	const { data: users, refetch } = useQuery<User[]>({
		queryKey: ['getUsers'],
		queryFn: () => getUsers(searchParam),
		enabled: false,
	});

	const searchUsers = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		refetch();
	};

	return (
		<div className='container'>
			<div className='content-wrapper'>
				<form onSubmit={searchUsers}>
					<div className='searchbar'>
						<input
							type='text'
							className='searchbar-input'
							placeholder='Search for ...'
							value={searchParam}
							onChange={(e) => setSearchParam(e.target.value)}
						/>
						<button className='searchbar-button' type='submit'>
							Search!
						</button>
					</div>
				</form>

				<div className='searched-content'>
					{users ? (
						users.length > 0 ? (
							users.map((user) => (
								<div key={user.id} className='user-item'>
									<b>Name:</b> {user.name}, <b>Email:</b> {user.email}
								</div>
							))
						) : (
							<div>Sorry, nothing found.</div>
						)
					) : (
						<div>Please search the desired user(s).</div>
					)}
				</div>
			</div>
		</div>
	);
};

createRoot(document.getElementById('root')!).render(<App />);

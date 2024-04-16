import axios from 'axios';

const client = axios.create();

export const getUsers = async (searchParam) => {
	const { data } = await client.get('/users', {
		params: {
			q: searchParam,
		},
	});

	return data;
};

import Router from 'express-promise-router';

const users = [
	{
		id: 1,
		name: 'John Balcar',
		email: 'john.balcar@gmail.com',
	},
	{
		id: 2,
		name: 'David Holzenberg',
		email: 'david.holzenberg@gmail.com',
	},
	{
		id: 3,
		name: 'Dianna Apone',
		email: 'dianna.apone@gmail.com',
	},
];

export const userRouter = Router();

userRouter.get('/', (req, res) => {
	const searchParam = req.query.q as string;
	let filtered_users_data;

	if (searchParam) {
		filtered_users_data = users.filter((user) =>
			user.name.toLowerCase().includes(searchParam.toLowerCase()),
		);
	} else filtered_users_data = users;

	res.json(filtered_users_data);
});

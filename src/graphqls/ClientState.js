import { GET_USER } from "./Queries";

export const defaults = {
	isLoggedIn: false,
	loginUser: {
		__typename: "User",
		id: "",
		nickName: "",
		avatarUrl: "",
	},
};
export const resolvers = {
	Mutation: {
		loginState: (_, variables, { cache }) => {
			cache.writeData({ data: { isLoggedIn: true } });
		},
	},
};

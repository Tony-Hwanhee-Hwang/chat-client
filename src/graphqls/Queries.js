import gql from "graphql-tag";

export const MAKE_USER = gql`
	mutation makeUser($nickName: String!, $avatarUrl: String) {
		makeUser(nickName: $nickName, avatarUrl: $avatarUrl) {
			id
			nickName
			avatarUrl
		}
		loginState @client
	}
`;

export const GET_CHATTING = gql`
	query {
		chatting {
			id
			sender {
				id
				nickName
				avatarUrl
			}
			message
			date
			isRead
		}
		loginUser @client {
			id
			nickName
			avatarUrl
		}
	}
`;

export const NEW_CHAT_SUBSCRIPTION = gql`
	subscription newChat {
		newChat {
			id
			sender {
				id
				nickName
				avatarUrl
			}
			message
			date
			isRead
		}
	}
`;

export const WRITE_CHAT = gql`
	mutation write($senderId: Int!, $message: String!) {
		write(senderId: $senderId, message: $message) {
			id
			message
			sender {
				id
				nickName
			}
			date
		}
	}
`;

export const GET_USER = gql`
	{
		isLoggedIn @client
		loginUser @client {
			id
			nickName
			avatarUrl
		}
	}
`;

import React from "react";
import ChatWindow from "../components/ChatWindow";
import { useQuery } from "@apollo/react-hooks";
import { GET_USER } from "../graphqls/Queries";

const ChatRoom = ({ history }) => {
	useQuery(GET_USER, {
		onCompleted: ({ isLoggedIn }) => {
			//console.log(result);
			if (!isLoggedIn) history.push("/MakeUser");
		},
	});

	return (
		<>
			<ChatWindow />
		</>
	);
};

export default ChatRoom;

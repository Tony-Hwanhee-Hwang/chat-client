import React from "react";
import { useQuery } from "@apollo/react-hooks";

import { GET_CHATTING, NEW_CHAT_SUBSCRIPTION } from "../graphqls/Queries";
import Input from "./Input";

let sub = null; //prevent to subscrbe again.

export default () => {
	const { loading, data, subscribeToMore } = useQuery(GET_CHATTING);
	if (!sub) {
		sub = subscribeToMore({
			document: NEW_CHAT_SUBSCRIPTION,
			updateQuery: (prev, { subscriptionData }) => {
				if (!subscriptionData.data) return prev;

				const { newChat } = subscriptionData.data;

				return {
					...prev,
					chatting: [...prev.chatting, newChat],
				};
			},
		});
	}
	if (loading) {
		return "Loading...";
	} else {
		return (
			<div>
				{data?.chatting?.map((chat) => {
					return (
						<h3 key={chat.id}>
							{chat.sender.nickName} : {chat.message}
						</h3>
					);
				})}
				<Input />
			</div>
		);
	}
};

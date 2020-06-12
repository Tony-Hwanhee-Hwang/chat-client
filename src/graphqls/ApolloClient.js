import { ApolloClient } from "apollo-client";
import { split } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { WebSocketLink } from "apollo-link-ws";
import { InMemoryCache } from "apollo-cache-inmemory";
import { persistCache } from "apollo-cache-persist";
import { getMainDefinition } from "apollo-utilities";
import { resolvers, defaults } from "./ClientState";

const graphQL_URL = "10.0.0.227:8080";

const httpLink = new HttpLink({
	uri: `http://${graphQL_URL}/graphql`,
});

const wsLink = new WebSocketLink({
	uri: `ws://${graphQL_URL}/subscriptions`,
	options: {
		reconnect: true,
	},
});

const link = split(
	// split based on operation type
	({ query }) => {
		const definition = getMainDefinition(query);
		return definition.kind === "OperationDefinition" && definition.operation === "subscription";
	},
	wsLink,
	httpLink
);

const cache = new InMemoryCache();

const client = new ApolloClient({
	link,
	cache,
	resolvers,
	defaults,
});

persistCache({
	cache,
	storage: window.localStorage,
}).then(() => {
	if (localStorage["apollo-cache-persist"]) {
		let cacheData = JSON.parse(localStorage["apollo-cache-persist"]);
		client.onResetStore(async () => cache.writeData({ data: cacheData }));
		//cache.restore(cacheData);
	} else {
		client.writeData({ data: { ...defaults } });
	}
});

export default client;

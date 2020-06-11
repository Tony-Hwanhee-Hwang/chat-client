import { ApolloClient } from "apollo-client";
import { split } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { WebSocketLink } from "apollo-link-ws";
import { InMemoryCache } from "apollo-cache-inmemory";
import { getMainDefinition } from "apollo-utilities";
import { resolvers, defaults } from "./ClientState";

const graphQL_URL = "localhost:8080";

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

const client = new ApolloClient({
	link,
	cache: new InMemoryCache(),
	resolvers,
	defaults,
});

client.writeData({ data: { ...defaults } });
export default client;

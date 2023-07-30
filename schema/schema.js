const graphql = require("graphql");

// import mongoose models
const Project = require("../models/Project");
const Client = require("../models/Client");

const ProjectType = new graphql.GraphQLObjectType({
	name: "Project",
	fields: () => ({
		id: { type: graphql.GraphQLID },
		name: { type: graphql.GraphQLString },
		description: { type: graphql.GraphQLString },
		status: { type: graphql.GraphQLString },
		client: {
			type: ClientType,
			resolve(parent, args) {
				return Client.findById(parent.clientID);
			},
		},
	}),
});

const ClientType = new graphql.GraphQLObjectType({
	name: "Client",
	fields: () => ({
		id: { type: graphql.GraphQLID },
		name: { type: graphql.GraphQLString },
		email: { type: graphql.GraphQLString },
		phone: { type: graphql.GraphQLInt },
	}),
});

const RootQuery = new graphql.GraphQLObjectType({
	name: "RootQueryType",
	fields: {
		projects: {
			type: new graphql.GraphQLList(ProjectType),
			resolve(parent, args) {
				return Project.find();
			},
		},
		project: {
			type: ProjectType,
			args: { id: { type: graphql.GraphQLID } },
			resolve(parent, args) {
				return Project.findById(args.id);
			},
		},

		clients: {
			type: new graphql.GraphQLList(ClientType),
			resolve(parent, args) {
				return Client.find();
			},
		},
		client: {
			type: ClientType,
			args: { id: { type: graphql.GraphQLID } },
			resolve(parent, args) {
				return Client.findById(args.id);
			},
		},
	},
});

module.exports = new graphql.GraphQLSchema({ query: RootQuery });

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
				console.log("parent", parent);
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
		phone: { type: graphql.GraphQLString },
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

const mutation = new graphql.GraphQLObjectType({
	name: "Mutation",
	fields: {
		addClient: {
			type: ClientType,
			args: {
				name: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
				email: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
				phone: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
			},
			resolve(parent, args) {
				let client = new Client({
					name: args.name,
					email: args.email,
					phone: args.phone,
				});
				return client.save();
			},
		},
		deleteClient: {
			type: ClientType,
			args: {
				id: { type: new graphql.GraphQLNonNull(graphql.GraphQLID) },
			},
			resolve(parent, args) {
				return Client.findByIdAndDelete(args.id);
			},
		},
		addProject: {
			type: ProjectType,
			args: {
				name: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
				description: {
					type: new graphql.GraphQLNonNull(graphql.GraphQLString),
				},
				status: {
					type: new graphql.GraphQLEnumType({
						name: "Status",
						values: {
							new: { value: "Not Started" },
							started: { value: "In Progress" },
							completed: { value: "Completed" },
						},
					}),
					defaultValue: "Not Started",
				},
				clientID: { type: graphql.GraphQLID },
			},
			resolve(parent, args) {
				console.log(args);
				let project = new Project({
					name: args.name,
					description: args.description,
					status: args.status,
					clientID: args.clientID,
				});
				return project.save();
			},
		},
		deleteProject: {
			type: ProjectType,
			args: {
				id: { type: new graphql.GraphQLNonNull(graphql.GraphQLID) },
			},
			resolve(parent, args) {
				return Project.findByIdAndDelete(args.id);
			},
		},
		updateProject: {
			type: ProjectType,
			args: {
				id: { type: new graphql.GraphQLNonNull(graphql.GraphQLID) },
				name: { type: graphql.GraphQLString },
				description: { type: graphql.GraphQLString },
				status: {
					type: new graphql.GraphQLEnumType({
						name: "UpdateStatus",
						values: {
							new: { value: "Not Started" },
							started: { value: "In Progress" },
							completed: { value: "Completed" },
						},
					}),
				},
			},
			resolve(parent, args) {
				return Project.findByIdAndUpdate(
					args.id,
					{
						name: args.name,
						description: args.description,
						status: args.status,
					},
					{ new: true }
				);
			},
		},
	},
});

module.exports = new graphql.GraphQLSchema({ query: RootQuery, mutation });

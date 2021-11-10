const { ApolloServer, gql } = require('apollo-server')

// TODA REQUEST É POST

// TODA REQUEST BATE NO MESMO ENDPOINT (/graphql)

// QUERY -> BUSCAR/OBTER INFORMAÇÕES (GET)
// MUTATION -> MANIPULAR DADOS (POST/PUT/PATCH/DELETE)

// SCALAR TYPES -> String, Int, Boolean, Float e ID


/*
curl --request POST \
  --header 'content-type: application/json' \
  --url http://localhost:4000/ \
  --data '{"query":"query { __typename }"}'
*/

/*
query {
	posts {
		title
		author {
			name
			email
			active
		}
	}
}

*/

const typeDefs = gql`
	type User {
		_id: ID!
		name: String!
		email: String!
		active: Boolean!
	}

	type Post {
		_id: ID!
		title: String!
		content: String!
		author: User!
	}

	type Query {
		hello: String
		users: [User!]!
		getUserByEmail(email: String!): User!
	}

	type Mutation {
		createUser(name: String!, email: String!): User!
	}
`;

let usersArray = [
	{ 
		_id: String(Math.random()), 
		name: 'alex', 
		email: 'alex@gmail.com', 
		active: true
	},
	{ 
		_id: String(Math.random()), 
		name: 'rodrigo', 
		email: 'rodrigo@gmail.com', 
		active: true
	},
	{ 
		_id: String(Math.random()), 
		name: 'ana', 
		email: 'ana@gmail.com', 
		active: false
	},
]

const resolvers = {
	Query: {
		hello: () => 'Hello World',
		users: () => usersArray,
		getUserByEmail: (_, args) => {
			return usersArray.find((user) => user.email === args.email)
		},
	},
	Mutation: {
		createUser: (_, args) => {
			const newUser = {
				_id: String(Math.random()),
				name: args.name,
				email: args.email,
				active: true,
			};

			usersArray.push(newUser)
			return newUser;
		}
	}
}; 


const server = new ApolloServer({typeDefs, resolvers})

server.listen().then(({url}) => console.log(`Server runiing at ${url}`))
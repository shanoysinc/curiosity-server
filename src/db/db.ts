import {
	createConnection,
	getConnectionOptions,
	ConnectionOptions,
} from "typeorm";

export const getDbOptions = async () => {
	let connectionOptions: ConnectionOptions;
	connectionOptions = {
		type: "postgres",
		synchronize: false,
		url: process.env.DATABASE_URL,
		entities: ["src/entity/**/*.ts"],
		migrations: ["src/migration/**/*.ts"],
		subscribers: ["src/subscriber/**/*.ts"],
		cli: {
			entitiesDir: "src/entity",
			migrationsDir: "src/migration",
			subscribersDir: "src/subscriber",
		},
	};

	if (process.env.TS_NODE_DEV) {
		connectionOptions = await getConnectionOptions();
	}
	return connectionOptions;
};

type DBOptions = () => Promise<ConnectionOptions>;
export const connect2Database = async (options: DBOptions) => {
	const connectionOptions = await options();

	return createConnection(connectionOptions);
};

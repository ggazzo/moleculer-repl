const  { HEARTBEAT_INTERVAL = 10, HEARTBEAT_TIMEOUT = 30 } = process.env;
module.exports = {
	logLevel: process.env.MOLECULER_LOG_LEVEL || "error",
	sampleCount: 1,
	metrics: true,
	transporter: process.env.TRANSPORTER || "nats://localhost:4222",
	cacher: process.env.CACHE || "Memory",
	serializer: process.env.SERIALIZER || "MsgPack",

	registry: {
		strategy: process.env.BALANCE_STRATEGY || "Random",
		preferLocal: process.env.BALANCE_PREFER_LOCAL !== "false"
	},

	namespace: "",
	nodeID: null,

	logger: true,
	logFormatter: "default",
	logObjectPrinter: null,

	requestTimeout: 10 * 1000,
	retryPolicy: {
		enabled: false,
		retries: 5,
		delay: 100,
		maxDelay: 1000,
		factor: 2,
		check: err => err && !!err.retryable
	},

	maxCallLevel: 100,
	heartbeatInterval: parseInt(HEARTBEAT_INTERVAL),
	heartbeatTimeout: parseInt(HEARTBEAT_TIMEOUT),

	tracking: {
		enabled: false,
		shutdownTimeout: 5000
	},

	disableBalancer: false,

	circuitBreaker: {
		enabled: false,
		threshold: 0.5,
		windowTime: 60,
		minRequestCount: 20,
		halfOpenTime: 10 * 1000,
		check: err => err && err.code >= 500
	},

	bulkhead: {
		enabled: process.env.BULKHEAD_ENABLED === "true",
		concurrency: process.env.BULKHEAD_CONCURRENCY
			? parseInt(process.env.BULKHEAD_CONCURRENCY)
			: 10,
		maxQueueSize: process.env.BULKHEAD_MAX_QUEUE_SIZE
			? parseInt(process.env.BULKHEAD_MAX_QUEUE_SIZE)
			: 10000
	},

	validation: true,
	validator: null,

	metricsRate: 1,

	internalServices: true,
	internalMiddlewares: true,

	hotReload: false,

	// Register custom middlewares
	middlewares: [],

	// Called after broker created.
// 	created(broker) {
// 		broker.getCpuUsage = async function() {
// 			return {
// 				avg: 1,
// 				usages: [
// 					1
// 				]
// 			};
// 		};
// 	},

	// // Called after broker starte.
	// started(/* broker*/) {

	// },

	// // Called after broker stopped.
	// stopped(/* broker*/) {

	// },

	replCommands: null
};

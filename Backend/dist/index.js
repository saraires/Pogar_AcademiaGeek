"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const routes_1 = __importDefault(require("./routes/routes"));
// Configuracion
app.use(cors_1.default());
app.use(morgan_1.default('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use('/', routes_1.default);
// Conexión a la base de datos (cluster de Mongo)
mongoose_1.default.connect('mongodb+srv://sarai:12345@cluster1.jr4tq.mongodb.net/pogar?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
}, () => console.log('Estas conectado a la base de datos'));
app.listen(5001, () => console.log('Servidor corriendo en el puerto 5001'));
//# sourceMappingURL=index.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const auth_1 = __importDefault(require("./routes/auth")); //Sale error porque el archivo "routes" esta vacio
// Configuracion
app.use(cors_1.default());
app.use(morgan_1.default('dev'));
dotenv_1.default.config();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// Conexión a la base de datos (cluster de Mongo)
mongoose_1.default.connect('mongodb+srv://sarai:12345@cluster0.jr4tq.mongodb.net/pogar?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => console.log('Estas conectado a la base de datos'));
// Middlerwares
app.use('/', auth_1.default);
app.listen(5001, () => console.log('Servidor corriendo en el puerto 5001'));
//# sourceMappingURL=index.js.map
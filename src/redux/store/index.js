import {applyMiddleware, createStore} from "redux";
import reducers from "../reducers";
import createSagaMiddleware  from "redux-saga";
import rootSaga from "../middleware/sagas/rootSaga";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    reducers,
    applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(rootSaga);

export default store;
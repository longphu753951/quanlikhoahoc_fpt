import {NavigationActions} from "react-navigation";

let _navigator;

function setTopLevelNavigator(navigatorRef){
    _navigator = navigatorRef;
}

function navigate(routeName, params){
    _navigator.dispatch(
        NavigationActions.navigate({
            routeName,
            params,
        })
    )
}

function pop(routeName){
    _navigator.dispatch(NavigationActions.pop({routeName}));
}

export default {
    navigate,
    setTopLevelNavigator,
    pop
}
/**
 * Created by jiahailiang on 2017/1/19.
 */
export function NavGoBack(navigator) {
    if (navigator && navigator.getCurrentRoutes().length > 1) {
        navigator.pop();
        return true;
    }
    return false;
}
export function isEmptyObject(obj) {
    for (var name in obj) {
        return false;
    }
    return true;
}